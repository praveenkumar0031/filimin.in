// src/components/ArticleLayout.jsx
// Shared wrapper for all learn article pages.
// Provides: Navbar, breadcrumb, back button, prev/next navigation.
// Preserves scroll position on refresh via sessionStorage.

import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from './Navbar';
import { LEARN_TOPICS } from '../data/learnTopics';
import '../styles/article-layout.css';

export default function ArticleLayout({ topicPath, children }) {
  const navigate = useNavigate();

  const currentIdx = LEARN_TOPICS.findIndex((t) => t.path === topicPath);
  const currentTopic = LEARN_TOPICS[currentIdx];
  const prevTopic = currentIdx > 0 ? LEARN_TOPICS[currentIdx - 1] : null;
  const nextTopic = currentIdx < LEARN_TOPICS.length - 1 ? LEARN_TOPICS[currentIdx + 1] : null;

  // ── Scroll Restoration ──────────────────────────────────────────────────────
  // On mount: restore scroll position from sessionStorage
  // On unmount: save current scroll position
  useEffect(() => {
    const storageKey = `scroll_learn_${topicPath}`;
    const savedY = sessionStorage.getItem(storageKey);
    if (savedY) {
      window.scrollTo(0, parseInt(savedY, 10));
    }

    return () => {
      sessionStorage.setItem(storageKey, String(window.scrollY));
    };
  }, [topicPath]);

  return (
    <>
      <Navbar />
      <div className="article-layout">

        {/* ── Breadcrumb ───────────────────────────────────────────────── */}
        <nav className="article-breadcrumb" aria-label="Breadcrumb">
          <Link to="/" className="breadcrumb-link">Home</Link>
          <span className="breadcrumb-sep">/</span>
          <Link to="/learn" className="breadcrumb-link">Learn</Link>
          <span className="breadcrumb-sep">/</span>
          <span className="breadcrumb-current">{currentTopic?.title || topicPath}</span>
        </nav>

        {/* ── Back Button ──────────────────────────────────────────────── */}
        <Link to="/learn" className="btn-arcade article-back-btn">
          ← Back to Library
        </Link>

        {/* ── Article Content ──────────────────────────────────────────── */}
        <motion.div
          className="article-content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          {children}
        </motion.div>

        {/* ── Prev / Next Navigation ───────────────────────────────────── */}
        <div className="article-nav">
          {prevTopic ? (
            <button
              className="article-nav-btn prev"
              onClick={() => navigate(`/learn/${prevTopic.path}`)}
            >
              <span className="nav-btn-label">Previous</span>
              <span className="nav-btn-title">{prevTopic.emoji} {prevTopic.title}</span>
            </button>
          ) : <div />}

          {nextTopic ? (
            <button
              className="article-nav-btn next"
              onClick={() => navigate(`/learn/${nextTopic.path}`)}
            >
              <span className="nav-btn-label">Next Up</span>
              <span className="nav-btn-title">{nextTopic.emoji} {nextTopic.title}</span>
            </button>
          ) : (
            <button
              className="article-nav-btn next"
              onClick={() => navigate('/quiz')}
            >
              <span className="nav-btn-label">Ready?</span>
              <span className="nav-btn-title">🕹️ Take a Quest</span>
            </button>
          )}
        </div>

      </div>
    </>
  );
}
