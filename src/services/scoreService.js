// src/services/scoreService.js
// All RTDB read/write logic for user scores, achievements, and daily challenges.

import {
  ref,
  get,
  set,
  update,
  runTransaction,
  serverTimestamp,
  child,
} from 'firebase/database';
import { db } from '../firebase';
import { ACHIEVEMENTS } from '../data/achievements';
import { getTodayChallenge, getTodayChallengeKey } from '../data/dailyChallenges';

// ─── RTDB schema ────────────────────────────────────────────────────────
//
//  users/{uid}
//    displayName:      string
//    email:            string
//    streak:           number
//    totalScore:       number    ← sum of all module highScores
//    lastActiveDate:   timestamp
//    achievements:     string[]  ← array of achievement IDs
//    notifications:    { id, title, emoji, msg, createdAt, read: bool }[]
//    completedChallenges: string[] ← e.g. ["challenge_2025-01-15"]
//    scores: {
//      budgeting: { highScore, attempts, lastPlayed }
//      saving:    { highScore, attempts, lastPlayed }
//      debt:      { highScore, attempts, lastPlayed }
//      investing: { highScore, attempts, lastPlayed }
//      taxes:     { highScore, attempts, lastPlayed }
//    }
//
// ─────────────────────────────────────────────────────────────────────────────

export const MODULES = ['budgeting', 'saving', 'debt', 'investing', 'taxes'];

/** Empty score entry for a single module */
const emptyModuleScore = () => ({
  highScore:  0,
  attempts:   0,
  lastPlayed: null,
});

/** Full empty scores map for a brand-new user */
const emptyScores = () =>
  Object.fromEntries(MODULES.map((m) => [m, emptyModuleScore()]));

// ─────────────────────────────────────────────────────────────────────────────
// createUserDocument
// Called once on successful registration.
// ─────────────────────────────────────────────────────────────────────────────
export async function createUserDocument(uid, displayName, email) {
  const userRef = ref(db, `users/${uid}`);
  // We use update so we don't wipe out any pre-existing data if this is ever called twice,
  // although it should only be called on registration.
  await update(userRef, {
    displayName,
    email,
    streak:               0,
    totalScore:           0,
    lastActiveDate:       serverTimestamp(),
    achievements:         [],
    notifications:        [],
    completedChallenges:  [],
    scores:               emptyScores(),
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// _checkAchievements
// Given the updated user data snapshot, find all newly-unlocked achievements
// (i.e. ones whose check() passes but aren't already in the array).
// Returns array of achievement objects that are newly unlocked.
// ─────────────────────────────────────────────────────────────────────────────
function _checkAchievements(data) {
  const already = data?.achievements || [];
  return ACHIEVEMENTS.filter(
    (ach) => !already.includes(ach.id) && ach.check(data)
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// saveScore
// Called after every quiz completion. Handles:
//   - highScore tracking per module
//   - totalScore recalculation
//   - streak logic
//   - achievement evaluation + unlock
//   - daily challenge evaluation + bonus XP
//   - notification creation for new unlocks
// ─────────────────────────────────────────────────────────────────────────────
export async function saveScore(uid, moduleKey, newScore) {
  if (!MODULES.includes(moduleKey)) {
    console.warn(`saveScore: unknown moduleKey "${moduleKey}"`);
    return { newAchievements: [], challengeCompleted: false };
  }

  const userRef = ref(db, `users/${uid}`);

  // Fetch current state before transaction (for achievement / challenge evaluation).
  let snapBefore;
  try {
    snapBefore = await get(userRef);
  } catch (err) {
    console.error('[scoreService.saveScore] Pre-read failed:', err.message);
    throw err;
  }

  // ── Handle brand-new user ───────────────────────────────────────────────
  if (!snapBefore.exists()) {
    await update(userRef, {
      displayName:          '',
      email:                '',
      streak:               1,
      totalScore:           newScore,
      lastActiveDate:       serverTimestamp(),
      achievements:         [],
      notifications:        [],
      completedChallenges:  [],
      [`scores/${moduleKey}`]: { highScore: newScore, attempts: 1, lastPlayed: serverTimestamp() },
    });

    // Evaluate initial achievements (e.g. "first_quiz")
    let freshSnap;
    try {
      freshSnap = await get(userRef);
    } catch (err) {
      console.error('[scoreService.saveScore] Post-create read failed:', err.message);
      return { newAchievements: [], challengeCompleted: false };
    }

    const data = freshSnap.val();
    const newlyUnlocked = _checkAchievements(data);
    
    if (newlyUnlocked.length > 0) {
      const newNotifs = newlyUnlocked.map(a => ({
        id: `ach_${a.id}_${Date.now()}`,
        title: 'Achievement Unlocked',
        msg: `${a.emoji} ${a.title}`,
        emoji: a.emoji,
        read: false,
        createdAt: new Date().toISOString(),
      }));
      
      const achArray = data.achievements || [];
      const notifArray = data.notifications || [];
      
      await update(userRef, {
        achievements: [...achArray, ...newlyUnlocked.map(a => a.id)],
        notifications: [...notifArray, ...newNotifs],
      });
    }
    return { newAchievements: newlyUnlocked, challengeCompleted: false };
  }

  // ── Existing user — run transaction ────────────────────────────────────
  let newAchievements = [];
  let challengeCompleted = false;

  await runTransaction(userRef, (data) => {
    if (!data) return data; // Wait for data to be non-null

    const existingScore = data.scores?.[moduleKey] ?? emptyModuleScore();
    const now = new Date();

    // ── Streak logic ────────────────────────────────────────────────────
    let newStreak = data.streak ?? 0;
    const lastActive = data.lastActiveDate ?? null; // For RTDB, serverTimestamp returns a number on read
    if (lastActive) {
      const lastDay = new Date(lastActive);
      lastDay.setHours(0, 0, 0, 0);
      const today = new Date(now);
      today.setHours(0, 0, 0, 0);
      const diffDays = Math.round((today - lastDay) / (1000 * 60 * 60 * 24));
      if (diffDays === 1) newStreak += 1;
      else if (diffDays > 1) newStreak = 1;
    } else {
      newStreak = 1;
    }

    // ── Score update ────────────────────────────────────────────────────
    const updatedHighScore = newScore > existingScore.highScore ? newScore : existingScore.highScore;
    let newTotalScore = 0;
    MODULES.forEach((m) => {
      newTotalScore += m === moduleKey
        ? updatedHighScore
        : (data.scores?.[m]?.highScore || 0);
    });

    // ── Build projected data for achievement evaluation ──────────────────
    const projectedData = {
      ...data,
      streak:     newStreak,
      totalScore: newTotalScore,
      scores: {
        ...data.scores,
        [moduleKey]: { ...existingScore, highScore: updatedHighScore },
      },
    };

    // ── Evaluate achievements ────────────────────────────────────────────
    const newlyUnlocked = _checkAchievements(projectedData);
    // Since transaction runs multiple times, only capture the final run's newAchievements
    // (This works because the transaction's returned value is committed, and JS closure 
    // keeps the reference to newAchievements up to date for the caller)
    newAchievements = newlyUnlocked;

    // ── Evaluate daily challenge ─────────────────────────────────────────
    const challenge = getTodayChallenge();
    const challengeKey = getTodayChallengeKey();
    const alreadyDone = (data.completedChallenges || []).includes(challengeKey);
    let bonusXP = 0;
    if (!alreadyDone && challenge.check(moduleKey, newScore)) {
      challengeCompleted = true;
      bonusXP = challenge.bonusXP;
    }

    // ── Build notifications ──────────────────────────────────────────────
    const newNotifs = [];
    newlyUnlocked.forEach(a => {
      newNotifs.push({
        id: `ach_${a.id}_${Date.now()}_${Math.random()}`,
        title: 'Achievement Unlocked!',
        msg: `${a.emoji} ${a.title}: ${a.desc}`,
        emoji: a.emoji,
        read: false,
        createdAt: new Date().toISOString(),
      });
    });
    if (challengeCompleted) {
      newNotifs.push({
        id: `ch_${challengeKey}_${Date.now()}`,
        title: 'Daily Challenge Complete!',
        msg: `🎯 ${challenge.title} (+${bonusXP} bonus XP)`,
        emoji: '🎯',
        read: false,
        createdAt: new Date().toISOString(),
      });
    }

    // ── Apply updates to data object ─────────────────────────────────────
    
    // Arrays
    const achArray = data.achievements || [];
    if (newlyUnlocked.length > 0) {
      data.achievements = [...achArray, ...newlyUnlocked.map(a => a.id)];
    }
    
    const notifArray = data.notifications || [];
    if (newNotifs.length > 0) {
      data.notifications = [...notifArray, ...newNotifs];
    }
    
    const compArray = data.completedChallenges || [];
    if (challengeCompleted) {
      data.completedChallenges = [...compArray, challengeKey];
    }

    // Primitives & Objects
    data.streak = newStreak;
    data.totalScore = newTotalScore + bonusXP;
    // We cannot use serverTimestamp() in a transaction update directly if we return the object.
    // Instead we just use Date.now() for transactions.
    data.lastActiveDate = Date.now(); 
    
    if (!data.scores) data.scores = {};
    if (!data.scores[moduleKey]) data.scores[moduleKey] = emptyModuleScore();
    
    data.scores[moduleKey].attempts = existingScore.attempts + 1;
    data.scores[moduleKey].highScore = updatedHighScore;
    data.scores[moduleKey].lastPlayed = Date.now();

    return data;
  });

  return { newAchievements, challengeCompleted };
}

// ─────────────────────────────────────────────────────────────────────────────
// markNotificationsRead — called when bell tray is opened
// ─────────────────────────────────────────────────────────────────────────────
export async function markNotificationsRead(uid) {
  try {
    const userRef = ref(db, `users/${uid}`);
    const snap = await get(userRef);
    if (!snap.exists()) return;
    
    const data = snap.val();
    const notifs = (data.notifications || []).map(n => ({ ...n, read: true }));
    await update(userRef, { notifications: notifs });
  } catch (err) {
    console.error('[scoreService.markNotificationsRead] failed:', err.message);
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// getUserData  (one-time fetch, for non-realtime use cases)
// ─────────────────────────────────────────────────────────────────────────────
export async function getUserData(uid) {
  try {
    const snap = await get(ref(db, `users/${uid}`));
    return snap.exists() ? snap.val() : null;
  } catch (err) {
    console.error('[scoreService.getUserData] failed:', err.message);
    return null;
  }
}
