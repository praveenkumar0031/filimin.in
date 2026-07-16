// src/pages/ProfilePage.jsx
// Complete Player Profile with:
// - Hero section (avatar, name, email, stats badges)
// - Statistics cards
// - Module progress bars (live from Firestore)
// - Recent activity feed
// - Account settings (display name update)
// - Danger zone (logout, reset, delete account)

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  doc, getDoc, updateDoc, deleteDoc, setDoc, serverTimestamp
} from 'firebase/firestore';
import { signOut, deleteUser, EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth';
import { auth, db } from '../firebase';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import '../styles/profile.css';

const MODULES = [
  { key: 'budgeting', label: 'Budgeting',          emoji: '💰' },
  { key: 'saving',    label: 'Saving',              emoji: '🏦' },
  { key: 'debt',      label: 'Debt Management',     emoji: '💳' },
  { key: 'investing', label: 'Investing',           emoji: '📈' },
  { key: 'taxes',     label: 'Taxes',               emoji: '🧾' },
];

const MAX_SCORE_PER_MODULE = 1000; // 10 questions × 100 pts

function formatTimeAgo(timestamp) {
  if (!timestamp) return '';
  const date = timestamp?.toDate ? timestamp.toDate() : new Date(timestamp);
  const diff = Date.now() - date.getTime();
  const mins  = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days  = Math.floor(diff / 86400000);
  if (mins < 1)   return 'just now';
  if (mins < 60)  return `${mins}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return `${days}d ago`;
}

function SkeletonProfile() {
  return (
    <div className="profile-inner">
      <div className="profile-hero" style={{ minHeight: 160 }}>
        <div className="skeleton" style={{ width: 100, height: 100, borderRadius: 16 }} />
        <div style={{ flex: 1 }}>
          <div className="skeleton skeleton-block" style={{ width: '40%' }} />
          <div className="skeleton skeleton-block" style={{ width: '60%' }} />
          <div className="skeleton skeleton-block" style={{ width: '30%' }} />
        </div>
      </div>
      <div className="profile-section">
        <div className="profile-section-body">
          <div className="stats-grid">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="skeleton" style={{ height: 90, borderRadius: 8 }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Confirmation Modal ─────────────────────────────────────────────────────
function ConfirmModal({ title, message, confirmLabel, onConfirm, onCancel, dangerous }) {
  return (
    <motion.div
      className="modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onCancel}
    >
      <motion.div
        className="modal-card"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <h3>{title}</h3>
        <p>{message}</p>
        <div className="modal-actions">
          <button className="btn-danger" onClick={onCancel}>Cancel</button>
          <button
            className={`btn-danger${dangerous ? ' filled' : ''}`}
            onClick={onConfirm}
          >
            {confirmLabel}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function ProfilePage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [data, setData]               = useState(null);
  const [loading, setLoading]         = useState(true);
  const [displayName, setDisplayName] = useState('');
  const [saving, setSaving]           = useState(false);
  const [feedback, setFeedback]       = useState(null); // { type: 'success'|'error', msg }

  const [modal, setModal] = useState(null); // 'reset' | 'delete' | null

  // ── Fetch Firestore document ─────────────────────────────────────────
  useEffect(() => {
    if (!user) return;
    (async () => {
      const snap = await getDoc(doc(db, 'users', user.uid));
      if (snap.exists()) {
        const d = snap.data();
        setData(d);
        setDisplayName(d.displayName || '');
      }
      setLoading(false);
    })();
  }, [user]);

  // ── Derived stats ────────────────────────────────────────────────────
  const scores   = data?.scores   || {};
  const streak   = data?.streak   || 0;
  const totalScore = data?.totalScore || 0;
  const joinDate = user?.metadata?.creationTime
    ? new Date(user.metadata.creationTime).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })
    : '—';

  // Module stats
  const completedModules = MODULES.filter(m => (scores[m.key]?.attempts || 0) > 0).length;
  const totalAttempts    = MODULES.reduce((s, m) => s + (scores[m.key]?.attempts || 0), 0);
  const highestScore     = Math.max(...MODULES.map(m => scores[m.key]?.highScore || 0));

  // Favorite topic = module with highest highScore
  const favModule = MODULES.reduce(
    (best, m) => (scores[m.key]?.highScore || 0) > (scores[best.key]?.highScore || 0) ? m : best,
    MODULES[0]
  );
  const hasFav = (scores[favModule?.key]?.highScore || 0) > 0;

  // Accuracy estimate: correct answers = score pts / 100, total questions = attempts * 10
  const totalCorrect   = MODULES.reduce((s, m) => s + Math.round((scores[m.key]?.highScore || 0) / 100), 0);
  const totalQuestions = totalAttempts * 10;
  const accuracy       = totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0;

  // Build recent activity from lastPlayed timestamps
  const recentActivity = MODULES
    .filter(m => scores[m.key]?.lastPlayed)
    .sort((a, b) => {
      const ta = scores[a.key]?.lastPlayed?.toMillis?.() || 0;
      const tb = scores[b.key]?.lastPlayed?.toMillis?.() || 0;
      return tb - ta;
    })
    .slice(0, 5)
    .map(m => ({
      icon: m.emoji,
      desc: `Completed ${m.label} Quest`,
      ts:   scores[m.key]?.lastPlayed,
    }));

  // XP = totalScore (treat it as XP for display)
  const xp = totalScore;

  // ── Handlers ────────────────────────────────────────────────────────
  const handleSaveSettings = async (e) => {
    e.preventDefault();
    if (!displayName.trim()) return;
    setSaving(true);
    setFeedback(null);
    try {
      await updateDoc(doc(db, 'users', user.uid), { displayName: displayName.trim() });
      setData(prev => ({ ...prev, displayName: displayName.trim() }));
      setFeedback({ type: 'success', msg: '✔ PLAYER TAG UPDATED SUCCESSFULLY.' });
    } catch {
      setFeedback({ type: 'error', msg: '✘ FAILED TO UPDATE. TRY AGAIN.' });
    }
    setSaving(false);
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/login');
  };

  const handleResetProgress = async () => {
    setModal(null);
    // Reset scores and totalScore to zero, keep profile info
    const emptyScores = Object.fromEntries(
      MODULES.map(m => [m.key, { highScore: 0, attempts: 0, lastPlayed: null }])
    );
    await updateDoc(doc(db, 'users', user.uid), {
      scores: emptyScores,
      totalScore: 0,
      streak: 0,
    });
    setData(prev => ({ ...prev, scores: emptyScores, totalScore: 0, streak: 0 }));
    setFeedback({ type: 'success', msg: '✔ PROGRESS RESET. TIME TO START AGAIN!' });
  };

  const handleDeleteAccount = async () => {
    setModal(null);
    try {
      await deleteDoc(doc(db, 'users', user.uid));
      await deleteUser(user);
      navigate('/');
    } catch (err) {
      setFeedback({ type: 'error', msg: '✘ DELETE FAILED. Please log out and back in, then try again.' });
    }
  };

  // ── Render ───────────────────────────────────────────────────────────
  if (loading) return (
    <>
      <Navbar />
      <div className="profile-page">
        <SkeletonProfile />
      </div>
    </>
  );

  const heroName = data?.displayName || user?.email?.split('@')[0] || 'Anon Player';

  return (
    <>
      <Navbar />
      <div className="profile-page">
        <div className="profile-inner">

          {/* ── HERO ──────────────────────────────────────────────────── */}
          <motion.div
            className="profile-hero"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="hero-avatar">🎮</div>
            <div className="hero-info">
              <h1 className="hero-name">{heroName}</h1>
              <p className="hero-email">{user?.email}</p>
              <div className="hero-badges">
                <span className="hero-badge">📅 Joined {joinDate}</span>
                <span className="hero-badge green">🔥 {streak}-Day Streak</span>
                <span className="hero-badge gold">⭐ {xp.toLocaleString()} XP</span>
                <span className="hero-badge">🏆 {completedModules}/{MODULES.length} Quests</span>
              </div>
            </div>
          </motion.div>

          {/* ── STATISTICS ────────────────────────────────────────────── */}
          <motion.div
            className="profile-section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="profile-section-header">
              <span className="profile-section-icon">📊</span>
              <h2>Statistics</h2>
            </div>
            <div className="profile-section-body">
              <div className="stats-grid">
                <div className="stat-card">
                  <span className="stat-card-value">{completedModules}</span>
                  <span className="stat-card-label">Quests Done</span>
                </div>
                <div className="stat-card">
                  <span className="stat-card-value">{totalAttempts}</span>
                  <span className="stat-card-label">Total Attempts</span>
                </div>
                <div className="stat-card">
                  <span className="stat-card-value">{accuracy}%</span>
                  <span className="stat-card-label">Accuracy</span>
                </div>
                <div className="stat-card">
                  <span className="stat-card-value">{highestScore}</span>
                  <span className="stat-card-label">Best Score</span>
                </div>
                <div className="stat-card">
                  <span className="stat-card-value">
                    {hasFav ? favModule.emoji : '—'}
                  </span>
                  <span className="stat-card-label">
                    {hasFav ? favModule.label : 'No Fav Yet'}
                  </span>
                </div>
                <div className="stat-card">
                  <span className="stat-card-value">{xp.toLocaleString()}</span>
                  <span className="stat-card-label">Total XP</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── PROGRESS ──────────────────────────────────────────────── */}
          <motion.div
            className="profile-section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="profile-section-header">
              <span className="profile-section-icon">🚀</span>
              <h2>Module Mastery</h2>
            </div>
            <div className="profile-section-body">
              <div className="progress-list">
                {MODULES.map(({ key, label, emoji }) => {
                  const hs  = scores[key]?.highScore || 0;
                  const pct = Math.round((hs / MAX_SCORE_PER_MODULE) * 100);
                  return (
                    <div key={key} className="progress-item">
                      <div className="progress-item-header">
                        <span className="progress-item-label">{emoji} {label}</span>
                        <span className="progress-item-score">{hs} / {MAX_SCORE_PER_MODULE} pts</span>
                      </div>
                      <div className="progress-track">
                        <motion.div
                          className="progress-fill"
                          initial={{ width: 0 }}
                          animate={{ width: `${pct}%` }}
                          transition={{ duration: 1, delay: 0.3 }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* ── RECENT ACTIVITY ───────────────────────────────────────── */}
          <motion.div
            className="profile-section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="profile-section-header">
              <span className="profile-section-icon">⚡</span>
              <h2>Recent Activity</h2>
            </div>
            <div className="profile-section-body">
              {recentActivity.length === 0 ? (
                <p className="activity-empty">
                  No activity yet. Complete a quest to see your history!
                </p>
              ) : (
                <div className="activity-list">
                  {recentActivity.map((item, idx) => (
                    <div key={idx} className="activity-item">
                      <div className="activity-icon">{item.icon}</div>
                      <div className="activity-text">
                        <div className="activity-desc">{item.desc}</div>
                        <div className="activity-time">{formatTimeAgo(item.ts)}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>

          {/* ── ACCOUNT SETTINGS ──────────────────────────────────────── */}
          <motion.div
            className="profile-section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="profile-section-header">
              <span className="profile-section-icon">⚙️</span>
              <h2>Account Settings</h2>
            </div>
            <div className="profile-section-body">
              <form className="settings-form" onSubmit={handleSaveSettings}>
                <div className="settings-group">
                  <label htmlFor="displayName">Gamer Tag (Public Name)</label>
                  <input
                    id="displayName"
                    type="text"
                    className="settings-input"
                    value={displayName}
                    onChange={e => setDisplayName(e.target.value)}
                    placeholder="Enter your public gamer tag"
                    maxLength={24}
                  />
                </div>

                <div className="settings-group">
                  <label>Email Address</label>
                  <input
                    type="email"
                    className="settings-input"
                    value={user?.email || ''}
                    readOnly
                    style={{ opacity: 0.6, cursor: 'not-allowed' }}
                  />
                </div>

                <button
                  type="submit"
                  className="settings-save-btn"
                  disabled={saving}
                >
                  {saving ? 'SAVING...' : 'SAVE CHANGES'}
                </button>

                {feedback && (
                  <div className={`settings-feedback ${feedback.type}`}>
                    {feedback.msg}
                  </div>
                )}
              </form>
            </div>
          </motion.div>

          {/* ── DANGER ZONE ───────────────────────────────────────────── */}
          <motion.div
            className="profile-section danger-zone"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="profile-section-header">
              <span className="profile-section-icon">⚠️</span>
              <h2>Danger Zone</h2>
            </div>
            <div className="danger-actions">
              <button className="btn-danger" onClick={handleLogout}>
                🚪 Logout
              </button>
              <button className="btn-danger" onClick={() => setModal('reset')}>
                🔄 Reset Progress
              </button>
              <button className="btn-danger filled" onClick={() => setModal('delete')}>
                🗑 Delete Account
              </button>
            </div>
          </motion.div>

        </div>
      </div>

      {/* ── MODALS ──────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {modal === 'reset' && (
          <ConfirmModal
            title="Reset Progress?"
            message="This will wipe all your quiz scores, streaks, and XP. Your account will remain. This cannot be undone."
            confirmLabel="Yes, Reset Everything"
            onConfirm={handleResetProgress}
            onCancel={() => setModal(null)}
            dangerous
          />
        )}
        {modal === 'delete' && (
          <ConfirmModal
            title="Delete Account?"
            message="This permanently deletes your account and all data from our servers. You cannot recover this. Are you absolutely sure?"
            confirmLabel="Yes, Delete Forever"
            onConfirm={handleDeleteAccount}
            onCancel={() => setModal(null)}
            dangerous
          />
        )}
      </AnimatePresence>
    </>
  );
}
