import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { motion } from 'framer-motion';
import '../styles/learn.css';

const learnTopics = [
  { path: 'stocks', title: 'Stocks', desc: 'Own a piece of the company.' },
  { path: 'crypto', title: 'Crypto', desc: 'Digital decentralized currency.' },
  { path: 'debt', title: 'Debt', desc: 'Borrowing money responsibly.' },
  { path: 'credit', title: 'Credit', desc: 'Your financial reputation.' },
  { path: 'asset', title: 'Assets', desc: 'Things that put money in your pocket.' },
  { path: 'loan', title: 'Loans', desc: 'How borrowing actually works.' },
  { path: 'tax', title: 'Taxes', desc: 'Funding public services.' },
  { path: 'simple-interest', title: 'Simple Interest', desc: 'Linear financial growth.' },
  { path: 'compound-interest', title: 'Compound Interest', desc: 'The 8th wonder of the world.' },
  { path: 'leverage', title: 'Leverage', desc: 'Using debt to multiply returns.' },
];

export default function LearnPage() {
  return (
    <>
      <Navbar />
      <div className="learn-container">
        <header className="learn-header">
          <h1 className="learn-title">The Manual</h1>
          <p className="learn-subtitle">Read up on core concepts before tackling the quests.</p>
        </header>

        <div className="learn-grid">
          {learnTopics.map((topic, idx) => (
            <motion.Link 
              to={`/learn/${topic.path}`} 
              key={topic.path}
              className="learn-card"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.05 }}
            >
              <h3 className="learn-card-title">{topic.title}</h3>
              <p className="learn-card-desc">{topic.desc}</p>
            </motion.Link>
          ))}
        </div>
      </div>
    </>
  );
}
