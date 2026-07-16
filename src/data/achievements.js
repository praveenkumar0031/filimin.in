// src/data/achievements.js
// Single source of truth for all achievement definitions.
// Each achievement has:
//   id          - unique key stored in Firestore
//   title       - display name
//   desc        - description shown to user
//   emoji       - icon
//   check(data) - function that takes full user Firestore doc and returns boolean
//                 Called AFTER every quiz save to see if newly unlocked.

export const ACHIEVEMENTS = [
  // ── First Steps ────────────────────────────────────────────────────────
  {
    id: 'first_quiz',
    title: 'First Steps',
    desc: 'Complete your first quiz.',
    emoji: '🎮',
    check: (data) => {
      const scores = data?.scores || {};
      return Object.values(scores).some(s => (s.attempts || 0) >= 1);
    },
  },
  {
    id: 'all_quests',
    title: 'Full Sweep',
    desc: 'Complete all 5 quiz modules at least once.',
    emoji: '🏁',
    check: (data) => {
      const scores = data?.scores || {};
      const modules = ['budgeting', 'saving', 'debt', 'investing', 'taxes'];
      return modules.every(m => (scores[m]?.attempts || 0) >= 1);
    },
  },

  // ── Score milestones ───────────────────────────────────────────────────
  {
    id: 'perfect_quiz',
    title: 'Perfect Score',
    desc: 'Score 1000 points in any single quiz.',
    emoji: '💯',
    check: (data) => {
      const scores = data?.scores || {};
      return Object.values(scores).some(s => (s.highScore || 0) >= 1000);
    },
  },
  {
    id: 'wealth_500',
    title: 'Getting Started',
    desc: 'Accumulate 500 total XP.',
    emoji: '💰',
    check: (data) => (data?.totalScore || 0) >= 500,
  },
  {
    id: 'wealth_2000',
    title: 'High Roller',
    desc: 'Accumulate 2,000 total XP.',
    emoji: '💎',
    check: (data) => (data?.totalScore || 0) >= 2000,
  },
  {
    id: 'wealth_5000',
    title: 'Millionaire Mindset',
    desc: 'Accumulate 5,000 total XP.',
    emoji: '🤑',
    check: (data) => (data?.totalScore || 0) >= 5000,
  },

  // ── Streak milestones ──────────────────────────────────────────────────
  {
    id: 'streak_3',
    title: 'On a Roll',
    desc: 'Maintain a 3-day login streak.',
    emoji: '🔥',
    check: (data) => (data?.streak || 0) >= 3,
  },
  {
    id: 'streak_7',
    title: 'Week Warrior',
    desc: 'Maintain a 7-day login streak.',
    emoji: '⚡',
    check: (data) => (data?.streak || 0) >= 7,
  },
  {
    id: 'streak_30',
    title: 'Unstoppable',
    desc: 'Maintain a 30-day login streak.',
    emoji: '🚀',
    check: (data) => (data?.streak || 0) >= 30,
  },

  // ── Topic mastery ──────────────────────────────────────────────────────
  {
    id: 'budget_master',
    title: 'Budget Boss',
    desc: 'Score 800+ on the Budgeting quiz.',
    emoji: '📋',
    check: (data) => (data?.scores?.budgeting?.highScore || 0) >= 800,
  },
  {
    id: 'invest_master',
    title: 'Wall Street Kid',
    desc: 'Score 800+ on the Investing quiz.',
    emoji: '📈',
    check: (data) => (data?.scores?.investing?.highScore || 0) >= 800,
  },
  {
    id: 'tax_master',
    title: 'Tax Savant',
    desc: 'Score 800+ on the Taxes quiz.',
    emoji: '🧾',
    check: (data) => (data?.scores?.taxes?.highScore || 0) >= 800,
  },
  {
    id: 'debt_master',
    title: 'Debt Slayer',
    desc: 'Score 800+ on the Debt Management quiz.',
    emoji: '⚔️',
    check: (data) => (data?.scores?.debt?.highScore || 0) >= 800,
  },
  {
    id: 'saving_master',
    title: 'Saving Grace',
    desc: 'Score 800+ on the Saving quiz.',
    emoji: '🏦',
    check: (data) => (data?.scores?.saving?.highScore || 0) >= 800,
  },

  // ── Grinder ────────────────────────────────────────────────────────────
  {
    id: 'attempts_10',
    title: 'Quiz Addict',
    desc: 'Attempt quizzes 10 times in total.',
    emoji: '🎯',
    check: (data) => {
      const scores = data?.scores || {};
      const total = Object.values(scores).reduce((s, m) => s + (m.attempts || 0), 0);
      return total >= 10;
    },
  },
];
