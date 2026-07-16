import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { motion } from 'framer-motion';
import '../styles/quest-map.css';

const modules = [
  { key: 'budgeting', title: 'Budgeting', icon: '💰' },
  { key: 'saving', title: 'Saving', icon: '🏦' },
  { key: 'debt', title: 'Debt Mgmt', icon: '💳' },
  { key: 'investing', title: 'Investing', icon: '📈' },
  { key: 'taxes', title: 'Taxes', icon: '🧾' }
];

export default function QuizHomePage() {
  return (
    <>
      <Navbar />
      <motion.div 
        className="quest-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="quest-title">Choose Your Quest</h1>
        <p className="quest-subtitle">Select a module to test your knowledge and earn wealth.</p>
        
        <div className="quest-path">
          {modules.map((mod, index) => (
            <motion.div 
              className="quest-node-wrapper" 
              key={mod.key}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15, type: 'spring', stiffness: 100 }}
            >
              <Link to={`/quiz/${mod.key}`} className="quest-node">
                <span className="quest-icon">{mod.icon}</span>
                {mod.title}
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </>
  );
}
