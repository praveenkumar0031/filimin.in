import { useAuth } from '../context/AuthContext';
import { useUserScores } from '../hooks/useUserScores';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import DailyChallengeCard from '../components/DailyChallengeCard';
import '../styles/dashboard.css';

export default function DashboardPage() {
  const { user } = useAuth();
  const { scoreData, loading } = useUserScores(user?.uid);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="dashboard-loading">
          <motion.div 
            animate={{ opacity: [0.5, 1, 0.5] }} 
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            [ LOADING PORTFOLIO_DATA... ]
          </motion.div>
        </div>
      </>
    );
  }

  // Fallback to default structure if scoreData is null (e.g., brand new user without a db document yet)
  const safeScoreData = scoreData || {
    budgeting: { highScore: 0, attempts: 0 },
    saving: { highScore: 0, attempts: 0 },
    debt: { highScore: 0, attempts: 0 },
    investing: { highScore: 0, attempts: 0 },
    taxes: { highScore: 0, attempts: 0 },
    currentStreak: 0,
    totalQuestionsAnswered: 0
  };

  // Calculate some aggregate values for the progress bars
  // Assuming a max possible score of 5000 per module for the visual bar (example scale)
  const MAX_MODULE_SCORE = 5000;

  const modules = [
    { key: 'budgeting', name: 'Budgeting', data: safeScoreData.budgeting || { highScore: 0, attempts: 0 } },
    { key: 'saving', name: 'Saving', data: safeScoreData.saving || { highScore: 0, attempts: 0 } },
    { key: 'debt', name: 'Debt Management', data: safeScoreData.debt || { highScore: 0, attempts: 0 } },
    { key: 'investing', name: 'Investing', data: safeScoreData.investing || { highScore: 0, attempts: 0 } },
    { key: 'taxes', name: 'Taxes', data: safeScoreData.taxes || { highScore: 0, attempts: 0 } },
  ];

  return (
    <>
      <Navbar />
      <motion.div 
        className="dashboard-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <header className="dashboard-header">
          <h1 className="dashboard-title">Player Portfolio</h1>
          <p className="dashboard-subtitle">&gt; USER: {user?.email || 'GUEST_001'}</p>
        </header>

        {/* Daily Challenge */}
        <DailyChallengeCard />

        {/* Top Stats - Chunky Arcade Cards */}
        <div className="stats-grid">
          <motion.div 
            className="stat-card streak"
            whileHover={{ y: -5 }}
          >
            <div className="stat-label">Current Streak</div>
            <div className="stat-value">{safeScoreData.currentStreak} 🔥</div>
          </motion.div>

          <motion.div 
            className="stat-card total"
            whileHover={{ y: -5 }}
          >
            <div className="stat-label">Total Answers</div>
            <div className="stat-value">{safeScoreData.totalQuestionsAnswered}</div>
          </motion.div>
        </div>

        {/* Module Performance List */}
        <section className="modules-section">
          <h2 className="modules-title">Quest Performance</h2>
          
          <div className="module-list">
            {modules.map((mod, index) => {
              // Calculate width percentage (cap at 100%)
              const pct = Math.min(100, Math.max(0, (mod.data.highScore / MAX_MODULE_SCORE) * 100));
              
              return (
                <motion.div 
                  className="module-row" 
                  key={mod.key}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="mod-name">{mod.name}</div>
                  <div className="mod-attempts">ATTEMPTS: <span className="font-mono">{mod.data.attempts}</span></div>
                  <div className="mod-score">{mod.data.highScore}</div>
                  <div className="mod-progress-bar">
                    <motion.div 
                      className="mod-progress-fill"
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ duration: 1, delay: 0.5 + (index * 0.1) }}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
          
          <div style={{ marginTop: '2rem', textAlign: 'center' }}>
            <Link to="/quiz" className="btn-arcade primary">
              RESUME QUESTS
            </Link>
          </div>
        </section>
      </motion.div>
    </>
  );
}
