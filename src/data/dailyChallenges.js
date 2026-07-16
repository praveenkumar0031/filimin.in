// src/data/dailyChallenges.js
// A pool of daily challenge definitions.
// The active challenge is deterministically selected by hashing today's date,
// so all users see the same challenge every day — no server needed.

export const CHALLENGE_POOL = [
  {
    id: 'budget_800',
    moduleKey: 'budgeting',
    title: 'Budget Blitz',
    desc: 'Score 800+ on the Budgeting quiz today.',
    bonusXP: 150,
    check: (quizModule, score) => quizModule === 'budgeting' && score >= 800,
  },
  {
    id: 'invest_700',
    moduleKey: 'investing',
    title: 'Market Mover',
    desc: 'Score 700+ on the Investing quiz today.',
    bonusXP: 150,
    check: (quizModule, score) => quizModule === 'investing' && score >= 700,
  },
  {
    id: 'tax_600',
    moduleKey: 'taxes',
    title: 'Tax Day',
    desc: 'Score 600+ on the Taxes quiz today.',
    bonusXP: 100,
    check: (quizModule, score) => quizModule === 'taxes' && score >= 600,
  },
  {
    id: 'debt_900',
    moduleKey: 'debt',
    title: 'Debt Crusher',
    desc: 'Score 900+ on the Debt Management quiz today.',
    bonusXP: 200,
    check: (quizModule, score) => quizModule === 'debt' && score >= 900,
  },
  {
    id: 'saving_800',
    moduleKey: 'saving',
    title: 'Saver of the Day',
    desc: 'Score 800+ on the Saving quiz today.',
    bonusXP: 150,
    check: (quizModule, score) => quizModule === 'saving' && score >= 800,
  },
  {
    id: 'perfect_any',
    moduleKey: null,
    title: 'Perfectionist',
    desc: 'Score 1000 (perfect!) on any quiz today.',
    bonusXP: 300,
    check: (_quizModule, score) => score >= 1000,
  },
  {
    id: 'budget_500',
    moduleKey: 'budgeting',
    title: 'Budget Beginner',
    desc: 'Score 500+ on the Budgeting quiz today.',
    bonusXP: 100,
    check: (quizModule, score) => quizModule === 'budgeting' && score >= 500,
  },
  {
    id: 'invest_perfect',
    moduleKey: 'investing',
    title: 'Wolf of Filimin',
    desc: 'Score a perfect 1000 on the Investing quiz.',
    bonusXP: 350,
    check: (quizModule, score) => quizModule === 'investing' && score >= 1000,
  },
];

/**
 * Returns today's challenge deterministically based on the current date.
 * Same result for every user on the same day, rotates daily.
 */
export function getTodayChallenge() {
  const now   = new Date();
  // Build a stable daily index using year + day-of-year
  const start = new Date(now.getFullYear(), 0, 0);
  const diff  = now - start;
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);
  const idx = dayOfYear % CHALLENGE_POOL.length;
  return CHALLENGE_POOL[idx];
}

/**
 * Returns the key used to mark today's challenge as completed in Firestore.
 * Format: "challenge_YYYY-MM-DD"
 */
export function getTodayChallengeKey() {
  const d = new Date();
  return `challenge_${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}
