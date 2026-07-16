// src/pages/LearnPage.jsx
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import { LEARN_TOPICS } from '../data/learnTopics';
import '../styles/learn.css';

// motion() wraps Link so Framer Motion can animate it
const MotionLink = motion(Link);

export default function LearnPage() {
  const { pathname } = useLocation();

  return (
    <>
      <Navbar />
      <div className="learn-container">
        <header className="learn-header">
          <h1 className="learn-title">The Manual</h1>
          <p className="learn-subtitle">Read up on core concepts before tackling the quests.</p>
        </header>

        <div className="learn-grid">
          {LEARN_TOPICS.map((topic, idx) => {
            const isActive = pathname === `/learn/${topic.path}`;
            return (
              <MotionLink
                key={topic.path}
                to={`/learn/${topic.path}`}
                className={`learn-card ${isActive ? 'active' : ''}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05, duration: 0.3 }}
                whileHover={{ y: -6, boxShadow: '0 10px 0px var(--color-void-dark)' }}
                whileTap={{ y: 2, boxShadow: '0 2px 0px var(--color-void-dark)' }}
              >
                <div className="learn-card-emoji">{topic.emoji}</div>
                <h3 className="learn-card-title">{topic.title}</h3>
                <p className="learn-card-desc">{topic.desc}</p>
              </MotionLink>
            );
          })}
        </div>
      </div>
    </>
  );
}
