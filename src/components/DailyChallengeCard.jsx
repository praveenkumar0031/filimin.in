// src/components/DailyChallengeCard.jsx
// Displays today's rotating daily challenge with completion status.
// Fetches user's completedChallenges from Firestore once on mount.

import { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../context/AuthContext';
import { getTodayChallenge, getTodayChallengeKey } from '../data/dailyChallenges';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './DailyChallengeCard.css';

// Map moduleKey → quiz route path
const MODULE_ROUTES = {
  budgeting: 'budgeting',
  saving:    'saving',
  debt:      'debt',
  investing: 'investing',
  taxes:     'taxes',
};

export default function DailyChallengeCard() {
  const { user } = useAuth();
  const [done, setDone]       = useState(false);
  const [loading, setLoading] = useState(true);

  const challenge    = getTodayChallenge();
  const challengeKey = getTodayChallengeKey();

  useEffect(() => {
    if (!user) { setLoading(false); return; }
    (async () => {
      const snap = await getDoc(doc(db, 'users', user.uid));
      if (snap.exists()) {
        const completed = snap.data().completedChallenges || [];
        setDone(completed.includes(challengeKey));
      }
      setLoading(false);
    })();
  }, [user, challengeKey]);

  const quizPath = challenge.moduleKey ? `/quiz/${MODULE_ROUTES[challenge.moduleKey]}` : '/quiz';

  return (
    <motion.div
      className={`daily-challenge-card ${done ? 'done' : ''}`}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      {/* Header */}
      <div className="dc-header">
        <span className="dc-icon">🎯</span>
        <div>
          <div className="dc-label">Daily Challenge</div>
          <div className="dc-title">{challenge.title}</div>
        </div>
        <div className="dc-bonus">+{challenge.bonusXP} XP</div>
      </div>

      {/* Body */}
      <div className="dc-body">
        <p className="dc-desc">{challenge.desc}</p>
        {loading ? null : done ? (
          <div className="dc-complete-badge">✔ COMPLETED TODAY</div>
        ) : (
          <Link to={quizPath} className="btn-arcade dc-cta">
            ACCEPT CHALLENGE →
          </Link>
        )}
      </div>

      {/* Progress bar decoration */}
      {done && (
        <motion.div
          className="dc-done-bar"
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ duration: 0.6 }}
        />
      )}
    </motion.div>
  );
}
