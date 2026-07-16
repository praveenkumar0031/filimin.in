import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { motion } from 'framer-motion';
import '../styles/home.css';

export default function HomePage() {
  return (
    <>
      <Navbar />
      
      <main>
        <section className="hero-section">
          <motion.div 
            className="hero-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="hero-title">
              Level Up Your <span className="highlight">Financial Mastery</span>
            </h1>
            <p className="hero-subtitle">
              Embark on quests to master budgeting, investing, and wealth building. 
              Earn your streak, grow your portfolio, and beat the system.
            </p>
            <div className="hero-cta">
              <Link to="/register" className="btn-arcade primary">START PLAYING</Link>
              <Link to="/learn" className="btn-arcade">READ THE MANUAL</Link>
            </div>
          </motion.div>
        </section>

        <section className="features-section">
          <div className="features-grid">
            <motion.div 
              className="feature-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <div className="feature-icon">🕹️</div>
              <h3 className="feature-title">Arcade Quests</h3>
              <p className="feature-desc">No boring lectures. Test your knowledge in rapid-fire scenarios that mimic real-world financial decisions.</p>
            </motion.div>

            <motion.div 
              className="feature-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="feature-icon">📈</div>
              <h3 className="feature-title">Live Portfolio</h3>
              <p className="feature-desc">Watch your high scores grow like a stock ticker. Build your streak and track your mastery over time.</p>
            </motion.div>

            <motion.div 
              className="feature-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <div className="feature-icon">🛡️</div>
              <h3 className="feature-title">Zero Risk</h3>
              <p className="feature-desc">Learn how to manage debt, leverage, and compound interest before dealing with real money.</p>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  );
}
