// src/pages/LeaderboardPage.jsx
// Fetches top 10 players by totalScore from Firestore.
// Uses getDocs (one-time) because leaderboard data doesn't need to be real-time for every user.
// Error handling: shows a user-facing message and logs the real error code.

import { useState, useEffect } from 'react';
import { ref, query, orderByChild, limitToLast, get } from 'firebase/database';
import { db } from '../firebase';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import '../styles/leaderboard.css';

export default function LeaderboardPage() {
  const { user } = useAuth();
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchErr, setFetchErr] = useState(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      setLoading(true);
      setFetchErr(null);
      try {
        const usersRef = ref(db, 'users');
        const snap = await get(usersRef);
        
        let results = [];
        if (snap.exists()) {
          snap.forEach((childSnap) => {
            results.push({ id: childSnap.key, ...childSnap.val() });
          });
        }
        
        // Sort descending by totalScore
        results.sort((a, b) => (b.totalScore || 0) - (a.totalScore || 0));
        
        // Take the top 10
        results = results.slice(0, 10);
        
        setLeaders(results);
        
      } catch (err) {
        console.error('[LeaderboardPage] Fetch error:', err);
        if (err.message?.includes('permission')) {
          setFetchErr('permission-denied');
        } else {
          setFetchErr('unavailable');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  // ── Friendly error messages by Firebase error code ──────────────────────
  const errorMessages = {
    'unavailable':          'You appear to be offline. Check your connection and refresh.',
    'failed-precondition':  'A Firestore index is missing. Open the link in the DevTools console error to create it.',
    'permission-denied':    'Firestore security rules are blocking this query.',
  };
  const errorMsg = fetchErr
    ? (errorMessages[fetchErr] || `Firestore error: ${fetchErr}. Check the DevTools console.`)
    : null;

  return (
    <>
      <Navbar />
      <div className="leaderboard-container">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ textAlign: 'center' }}
        >
          <h1 className="leaderboard-title">Global Hall of Fame</h1>
          <p className="leaderboard-subtitle">The top 10 wealthiest players in Filimin.</p>
        </motion.div>

        {loading ? (
          <div style={{ color: 'white', marginTop: '2rem' }}>LOADING...</div>
        ) : errorMsg ? (
          <div className="leaderboard-card" style={{ padding: '2rem', textAlign: 'center' }}>
            <p style={{ fontSize: '2rem' }}>⚡</p>
            <p style={{ fontFamily: 'var(--font-display)', color: 'var(--color-risk)', fontWeight: 700 }}>
              COULD NOT LOAD LEADERBOARD
            </p>
            <p style={{ color: 'var(--color-ink-light)', fontSize: 'var(--text-sm)', marginTop: '0.5rem' }}>
              {errorMsg}
            </p>
            <button
              className="btn-arcade primary"
              style={{ marginTop: '1rem' }}
              onClick={() => window.location.reload()}
            >
              RETRY
            </button>
          </div>
        ) : (
          <motion.div
            className="leaderboard-card"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="leaderboard-list">
              {leaders.length === 0 ? (
                <div style={{ padding: '2rem', textAlign: 'center' }}>
                  No players ranked yet.
                </div>
              ) : (
                leaders.map((player, idx) => {
                  const rank = idx + 1;
                  let rankClass = '';
                  if (rank === 1) rankClass = 'rank-1';
                  else if (rank === 2) rankClass = 'rank-2';
                  else if (rank === 3) rankClass = 'rank-3';

                  const isCurrentUser = user && user.uid === player.id;

                  return (
                    <div
                      key={player.id}
                      className={`leaderboard-row ${rankClass} ${isCurrentUser ? 'current-user' : ''}`}
                    >
                      <div className="rank-col">#{rank}</div>
                      <div className="name-col">
                        {player.displayName || `Anonymous Player ${player.id.substring(0, 4)}`}
                      </div>
                      <div className="score-col">
                        {(player.totalScore || 0).toLocaleString()}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </motion.div>
        )}
      </div>
    </>
  );
}
