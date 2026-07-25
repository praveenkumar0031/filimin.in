// src/components/ArticleLayout.jsx
// Shared wrapper for all learn article pages.
// Provides: Navbar, breadcrumb, back button, prev/next navigation.
// Preserves scroll position on refresh via sessionStorage.
// Accessibility: id="main-content" for skip-link target, aria-labels on nav buttons,
// aria-hidden on decorative emoji, heading hierarchy enforced.

import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from './Navbar';
import { LEARN_TOPICS } from '../data/learnTopics';
import '../styles/article-layout.css';

export default function ArticleLayout({ topicPath, children }) {
  const navigate = useNavigate();

  const currentIdx   = LEARN_TOPICS.findIndex((t) => t.path === topicPath);
  const currentTopic = LEARN_TOPICS[currentIdx];
  const prevTopic    = currentIdx > 0 ? LEARN_TOPICS[currentIdx - 1] : null;
  const nextTopic    = currentIdx < LEARN_TOPICS.length - 1 ? LEARN_TOPICS[currentIdx + 1] : null;

  // ── Scroll Restoration ───────────────────────────────────────────────────
  useEffect(() => {
    const storageKey = `scroll_learn_${topicPath}`;
    const savedY     = sessionStorage.getItem(storageKey);
    if (savedY) window.scrollTo(0, parseInt(savedY, 10));
    return () => {
      sessionStorage.setItem(storageKey, String(window.scrollY));
    };
  }, [topicPath]);

  return (
    <>
      <Navbar />
      {/* id="main-content" is the skip-link target from Navbar */}
      <main id="main-content" className="article-layout">

        {/* ── Breadcrumb ──────────────────────────────────────────────── */}
        <nav className="article-breadcrumb" aria-label="Breadcrumb">
          <Link to="/" className="breadcrumb-link">Home</Link>
          <span className="breadcrumb-sep" aria-hidden="true">/</span>
          <Link to="/learn" className="breadcrumb-link">Learn</Link>
          <span className="breadcrumb-sep" aria-hidden="true">/</span>
          <span className="breadcrumb-current" aria-current="page">
            {currentTopic?.title || topicPath}
          </span>
        </nav>

        {/* ── Back Button ─────────────────────────────────────────────── */}
        <Link to="/learn" className="btn-arcade article-back-btn" aria-label="Back to Learn library">
          ← Back to Library
        </Link>

        {/* ── Article Content ─────────────────────────────────────────── */}
        <motion.article
          className="article-content"
          aria-label={currentTopic?.title ? `Article: ${currentTopic.title}` : undefined}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          {children}
        </motion.article>

        {/* ── Prev / Next Navigation ───────────────────────────────────── */}
        <nav className="article-nav" aria-label="Article navigation">
          {prevTopic ? (
            <button
              className="article-nav-btn prev"
              onClick={() => navigate(`/learn/${prevTopic.path}`)}
              aria-label={`Previous article: ${prevTopic.title}`}
            >
              <span className="nav-btn-label" aria-hidden="true">← Previous</span>
              <span className="nav-btn-title">
                <span aria-hidden="true">{prevTopic.emoji}</span> {prevTopic.title}
              </span>
            </button>
          ) : <div aria-hidden="true" />}

          {nextTopic ? (
            <button
              className="article-nav-btn next"
              onClick={() => navigate(`/learn/${nextTopic.path}`)}
              aria-label={`Next article: ${nextTopic.title}`}
            >
              <span className="nav-btn-label" aria-hidden="true">Next Up →</span>
              <span className="nav-btn-title">
                <span aria-hidden="true">{nextTopic.emoji}</span> {nextTopic.title}
              </span>
            </button>
          ) : (
            <button
              className="article-nav-btn next"
              onClick={() => navigate('/quiz')}
              aria-label="You've finished reading — take a quiz"
            >
              <span className="nav-btn-label" aria-hidden="true">Ready?</span>
              <span className="nav-btn-title">
                <span aria-hidden="true">🕹️</span> Take a Quest
              </span>
            </button>
          )}
        </nav>

      </main>
    </>
  );
}
