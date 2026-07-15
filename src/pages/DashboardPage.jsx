// src/pages/DashboardPage.jsx
// Progress dashboard (Part 2 new feature).
// Uses useUserScores() for real-time data. Styled to match the site's dark purple/teal palette.

import { useNavigate, Link } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { useAuth } from '../context/AuthContext';
import { useUserScores } from '../hooks/useUserScores';
import Navbar from '../components/Navbar';
import { QUIZ_META } from '../data/quizData';
import '../styles/dashboard.css';

const TOTAL_QUESTIONS = 10;

// Format a Firestore Timestamp or null into a readable string
function formatDate(ts) {
  if (!ts) return 'Never';
  const d = ts.toDate ? ts.toDate() : new Date(ts);
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

// Count how many modules have been attempted at least once
function countCompleted(scores) {
  if (!scores) return 0;
  return QUIZ_META.filter((q) => (scores[q.key]?.attempts ?? 0) > 0).length;
}

// Sum of all highScores across modules
function totalHighScore(scores) {
  if (!scores) return 0;
  return QUIZ_META.reduce((sum, q) => sum + (scores[q.key]?.highScore ?? 0), 0);
}

export default function DashboardPage() {
  const navigate      = useNavigate();
  const { user }      = useAuth();
  const { scores, loading, error } = useUserScores(user?.uid);

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="dashboard-page">
        <Navbar />
        <div className="dashboard-loading">Loading your progress...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-page">
        <Navbar />
        <div className="dashboard-content">
          <p style={{ color: '#ff6b6b', textAlign: 'center' }}>
            Failed to load scores. Please refresh.
          </p>
        </div>
      </div>
    );
  }

  const moduleScores  = scores?.scores ?? {};
  const streak        = scores?.streak ?? 0;
  const completed     = countCompleted(moduleScores);
  const totalHS       = totalHighScore(moduleScores);

  return (
    <div className="dashboard-page">
      <Navbar />

      <div className="dashboard-content">
        {/* Header */}
        <h1 className="dashboard-header">
          📊 FILIM.IN — YOUR PROGRESS
        </h1>
        <p className="dashboard-subtitle">
          Welcome back, {scores?.displayName || user?.displayName || user?.email || 'Player'}!
        </p>

        {/* Summary row */}
        <div className="summary-row">
          <div className="summary-card">
            <div className="sc-value">🔥 {streak}</div>
            <div className="sc-label">Day Streak</div>
          </div>
          <div className="summary-card">
            <div className="sc-value">{completed} / {QUIZ_META.length}</div>
            <div className="sc-label">Modules Attempted</div>
          </div>
          <div className="summary-card">
            <div className="sc-value">{totalHS}</div>
            <div className="sc-label">Total High Score</div>
          </div>
          <div className="summary-card">
            <div className="sc-value">{QUIZ_META.length * TOTAL_QUESTIONS}</div>
            <div className="sc-label">Total Questions</div>
          </div>
        </div>

        {/* Per-module score cards */}
        <div className="scores-grid">
          {QUIZ_META.map((quiz) => {
            const s        = moduleScores[quiz.key] ?? {};
            const hs       = s.highScore  ?? 0;
            const attempts = s.attempts   ?? 0;
            const lastPlayed = s.lastPlayed ?? null;
            const pct      = Math.round((hs / TOTAL_QUESTIONS) * 100);

            return (
              <div className="score-card" key={quiz.key}>
                <div className="score-card-title">{quiz.label}</div>

                <div className="score-row">
                  <span className="sr-label">High Score</span>
                  <span className="sr-value highlight">
                    {hs} / {TOTAL_QUESTIONS}
                  </span>
                </div>

                <div className="score-row">
                  <span className="sr-label">Attempts</span>
                  <span className="sr-value">{attempts}</span>
                </div>

                <div className="score-row">
                  <span className="sr-label">Last Played</span>
                  <span className="sr-value">{formatDate(lastPlayed)}</span>
                </div>

                {attempts === 0 ? (
                  <p className="no-attempts">Not attempted yet</p>
                ) : (
                  <div className="score-progress">
                    <div className="score-progress-fill" style={{ width: `${pct}%` }} />
                  </div>
                )}

                <Link to={`/quiz/${quiz.key}`} className="quiz-btn">
                  {attempts === 0 ? 'Start Quiz →' : 'Retake Quiz →'}
                </Link>
              </div>
            );
          })}
        </div>

        {/* Logout */}
        <button className="logout-btn" onClick={handleLogout}>
          Log Out
        </button>
      </div>
    </div>
  );
}
