// src/pages/AchievementsPage.jsx
// Displays all achievement cards — unlocked ones glow gold, locked ones are greyed.
// Fetches user's unlocked achievement IDs from Firestore once on mount.

import { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../context/AuthContext';
import { ACHIEVEMENTS } from '../data/achievements';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import '../styles/achievements.css';

export default function AchievementsPage() {
  const { user } = useAuth();
  const [unlocked, setUnlocked] = useState([]);
  const [loading, setLoading]   = useState(true);

  useEffect(() => {
    if (!user) { setLoading(false); return; }
    (async () => {
      const snap = await getDoc(doc(db, 'users', user.uid));
      if (snap.exists()) {
        setUnlocked(snap.data().achievements || []);
      }
      setLoading(false);
    })();
  }, [user]);

  const unlockedCount = unlocked.length;
  const total = ACHIEVEMENTS.length;

  return (
    <>
      <Navbar />
      <div className="achievements-page">
        <div className="achievements-inner">

          {/* ── Hero ────────────────────────────────────────────────── */}
          <motion.div
            className="achievements-hero"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="achievements-title">Achievements</h1>
            <p className="achievements-subtitle">Unlock badges by crushing quests and streaks.</p>
            <div className="achievements-count">
              {loading ? '...' : `${unlockedCount} / ${total} Unlocked`}
            </div>
          </motion.div>

          {/* ── Grid ────────────────────────────────────────────────── */}
          <div className="achievements-grid">
            {ACHIEVEMENTS.map((ach, idx) => {
              const isUnlocked = unlocked.includes(ach.id);
              return (
                <motion.div
                  key={ach.id}
                  className={`achievement-card ${isUnlocked ? 'unlocked' : 'locked'}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.04 }}
                  whileHover={isUnlocked ? { y: -4 } : {}}
                >
                  <div className="achievement-emoji">
                    {isUnlocked ? ach.emoji : '🔒'}
                  </div>
                  <div className="achievement-title">{ach.title}</div>
                  <div className="achievement-desc">
                    {isUnlocked ? ach.desc : '???'}
                  </div>
                  <span className={`achievement-badge ${isUnlocked ? 'earned' : 'locked'}`}>
                    {isUnlocked ? 'EARNED' : 'LOCKED'}
                  </span>
                </motion.div>
              );
            })}
          </div>

        </div>
      </div>
    </>
  );
}
