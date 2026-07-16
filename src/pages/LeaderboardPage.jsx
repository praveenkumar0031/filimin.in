import { useState, useEffect } from 'react';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import '../styles/leaderboard.css';

export default function LeaderboardPage() {
  const { user } = useAuth();
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const usersRef = collection(db, 'users');
        const q = query(usersRef, orderBy('totalScore', 'desc'), limit(10));
        const snap = await getDocs(q);
        
        const topPlayers = snap.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        
        setLeaders(topPlayers);
      } catch (err) {
        console.error("Error fetching leaderboard:", err);
      }
      setLoading(false);
    };
    
    fetchLeaderboard();
  }, []);

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
        ) : (
          <motion.div 
            className="leaderboard-card"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="leaderboard-list">
              {leaders.length === 0 ? (
                <div style={{ padding: '2rem', textAlign: 'center' }}>No players ranked yet.</div>
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
                        {player.displayName || `Anonymous Player ${player.id.substring(0,4)}`}
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
