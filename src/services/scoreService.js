// src/services/scoreService.js
// All Firestore read/write logic for user scores.
// Kept modular so a leaderboard feature can be added later without restructuring.

import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  runTransaction,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '../firebase';

// ─── Firestore schema ────────────────────────────────────────────────────────
//
//  users/{uid}
//    displayName: string
//    email:       string
//    streak:      number
//    lastActiveDate: timestamp
//    scores: {
//      budgeting:    { highScore, attempts, lastPlayed }
//      saving:       { highScore, attempts, lastPlayed }
//      debt:         { highScore, attempts, lastPlayed }
//      investing:    { highScore, attempts, lastPlayed }
//      taxes:        { highScore, attempts, lastPlayed }
//    }
//
// ─────────────────────────────────────────────────────────────────────────────

const MODULES = ['budgeting', 'saving', 'debt', 'investing', 'taxes'];

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
// Uses setDoc with merge:true so re-registering won't wipe existing data.
// ─────────────────────────────────────────────────────────────────────────────
export async function createUserDocument(uid, displayName, email) {
  const ref = doc(db, 'users', uid);
  await setDoc(
    ref,
    {
      displayName,
      email,
      streak:         0,
      totalScore:     0,
      lastActiveDate: serverTimestamp(),
      scores:         emptyScores(),
    },
    { merge: true }
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// saveScore
// Called after a quiz finishes.
// Uses a Firestore transaction to safely:
//   - Only update highScore if newScore > existing highScore
//   - Always increment attempts
//   - Update lastPlayed timestamp
//   - Update streak (increments if played on a new day)
// ─────────────────────────────────────────────────────────────────────────────
export async function saveScore(uid, moduleKey, newScore) {
  if (!MODULES.includes(moduleKey)) {
    console.warn(`saveScore: unknown moduleKey "${moduleKey}"`);
    return;
  }

  const ref = doc(db, 'users', uid);

  await runTransaction(db, async (tx) => {
    const snap = await tx.get(ref);

    // If document doesn't exist yet, create it first
    if (!snap.exists()) {
      tx.set(ref, {
        displayName:    '',
        email:          '',
        streak:         0,
        totalScore:     newScore,
        lastActiveDate: serverTimestamp(),
        scores:         {
          ...emptyScores(),
          [moduleKey]: {
            highScore:  newScore,
            attempts:   1,
            lastPlayed: serverTimestamp(),
          },
        },
      });
      return;
    }

    const data          = snap.data();
    const existingScore = data.scores?.[moduleKey] ?? emptyModuleScore();
    const now           = new Date();

    // ── Streak logic ──────────────────────────────────────────────────────
    let newStreak = data.streak ?? 0;
    const lastActive = data.lastActiveDate?.toDate?.() ?? null;

    if (lastActive) {
      const lastDay = new Date(lastActive);
      lastDay.setHours(0, 0, 0, 0);
      const today = new Date(now);
      today.setHours(0, 0, 0, 0);
      const diffDays = Math.round((today - lastDay) / (1000 * 60 * 60 * 24));

      if (diffDays === 1) {
        newStreak += 1;       // consecutive day
      } else if (diffDays > 1) {
        newStreak = 1;        // streak broken
      }
      // diffDays === 0 → same day, keep streak
    } else {
      newStreak = 1;
    }
    // ─────────────────────────────────────────────────────────────────────

    const updatedHighScore = newScore > existingScore.highScore ? newScore : existingScore.highScore;

    let newTotalScore = 0;
    MODULES.forEach((m) => {
      if (m === moduleKey) {
        newTotalScore += updatedHighScore;
      } else {
        newTotalScore += (data.scores?.[m]?.highScore || 0);
      }
    });

    tx.update(ref, {
      [`scores.${moduleKey}.attempts`]:   existingScore.attempts + 1,
      [`scores.${moduleKey}.lastPlayed`]: serverTimestamp(),
      [`scores.${moduleKey}.highScore`]:  updatedHighScore,
      streak:         newStreak,
      totalScore:     newTotalScore,
      lastActiveDate: serverTimestamp(),
    });
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// getUserData  (one-time fetch, for non-realtime use cases)
// ─────────────────────────────────────────────────────────────────────────────
export async function getUserData(uid) {
  const snap = await getDoc(doc(db, 'users', uid));
  return snap.exists() ? snap.data() : null;
}
