// src/services/scoreService.js
// All Firestore read/write logic for user scores, achievements, and daily challenges.

import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  arrayUnion,
  runTransaction,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '../firebase';
import { ACHIEVEMENTS } from '../data/achievements';
import { getTodayChallenge, getTodayChallengeKey } from '../data/dailyChallenges';

// ─── Firestore schema ────────────────────────────────────────────────────────
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
  const ref = doc(db, 'users', uid);
  await setDoc(
    ref,
    {
      displayName,
      email,
      streak:               0,
      totalScore:           0,
      lastActiveDate:       serverTimestamp(),
      achievements:         [],
      notifications:        [],
      completedChallenges:  [],
      scores:               emptyScores(),
    },
    { merge: true }
  );
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

  const ref = doc(db, 'users', uid);

  // Fetch current state before transaction (for achievement / challenge evaluation)
  const snapBefore = await getDoc(ref);

  // ── Handle brand-new user ───────────────────────────────────────────────
  if (!snapBefore.exists()) {
    await setDoc(ref, {
      displayName:          '',
      email:                '',
      streak:               1,
      totalScore:           newScore,
      lastActiveDate:       serverTimestamp(),
      achievements:         [],
      notifications:        [],
      completedChallenges:  [],
      scores: {
        ...emptyScores(),
        [moduleKey]: { highScore: newScore, attempts: 1, lastPlayed: serverTimestamp() },
      },
    });

    // Evaluate initial achievements (e.g. "first_quiz")
    const freshSnap = await getDoc(ref);
    const newlyUnlocked = _checkAchievements({ ...freshSnap.data(), scores: { ...emptyScores(), [moduleKey]: { highScore: newScore } }, streak: 1, totalScore: newScore });
    if (newlyUnlocked.length > 0) {
      const newNotifs = newlyUnlocked.map(a => ({
        id: `ach_${a.id}_${Date.now()}`,
        title: 'Achievement Unlocked',
        msg: `${a.emoji} ${a.title}`,
        emoji: a.emoji,
        read: false,
        createdAt: new Date().toISOString(),
      }));
      await updateDoc(ref, {
        achievements: arrayUnion(...newlyUnlocked.map(a => a.id)),
        notifications: arrayUnion(...newNotifs),
      });
    }
    return { newAchievements: newlyUnlocked, challengeCompleted: false };
  }

  // ── Existing user — run transaction ────────────────────────────────────
  let newAchievements = [];
  let challengeCompleted = false;

  await runTransaction(db, async (tx) => {
    const snap = await tx.get(ref);
    const data = snap.data();
    const existingScore = data.scores?.[moduleKey] ?? emptyModuleScore();
    const now = new Date();

    // ── Streak logic ────────────────────────────────────────────────────
    let newStreak = data.streak ?? 0;
    const lastActive = data.lastActiveDate?.toDate?.() ?? null;
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

    // ── Write everything in one transaction ──────────────────────────────
    const updatePayload = {
      [`scores.${moduleKey}.attempts`]:   existingScore.attempts + 1,
      [`scores.${moduleKey}.lastPlayed`]: serverTimestamp(),
      [`scores.${moduleKey}.highScore`]:  updatedHighScore,
      streak:         newStreak,
      totalScore:     newTotalScore + bonusXP,
      lastActiveDate: serverTimestamp(),
    };

    if (newlyUnlocked.length > 0) {
      updatePayload.achievements = arrayUnion(...newlyUnlocked.map(a => a.id));
    }
    if (newNotifs.length > 0) {
      updatePayload.notifications = arrayUnion(...newNotifs);
    }
    if (challengeCompleted) {
      updatePayload.completedChallenges = arrayUnion(challengeKey);
    }

    tx.update(ref, updatePayload);
  });

  return { newAchievements, challengeCompleted };
}

// ─────────────────────────────────────────────────────────────────────────────
// markNotificationsRead — called when bell tray is opened
// ─────────────────────────────────────────────────────────────────────────────
export async function markNotificationsRead(uid) {
  const ref  = doc(db, 'users', uid);
  const snap = await getDoc(ref);
  if (!snap.exists()) return;
  const notifs = (snap.data().notifications || []).map(n => ({ ...n, read: true }));
  await updateDoc(ref, { notifications: notifs });
}

// ─────────────────────────────────────────────────────────────────────────────
// getUserData  (one-time fetch, for non-realtime use cases)
// ─────────────────────────────────────────────────────────────────────────────
export async function getUserData(uid) {
  const snap = await getDoc(doc(db, 'users', uid));
  return snap.exists() ? snap.data() : null;
}
