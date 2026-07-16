import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import '../styles/auth.css';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setError('');
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/dashboard');
    } catch (err) {
      setError('ACCESS DENIED: Incorrect email or password.');
    }
    setLoading(false);
  };

  return (
    <>
      <Navbar />
      <div className="auth-container">
        <motion.div 
          className="auth-card"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <h2 className="auth-title">Enter The Vault</h2>
          <p className="auth-subtitle">Resume your financial quests.</p>
          
          {error && <div className="auth-error">{error}</div>}
          
          <form className="auth-form" onSubmit={handleLogin}>
            <div className="input-group">
              <label>Email Address</label>
              <input
                type="email"
                className="auth-input"
                placeholder="player@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div className="input-group">
              <label>Passcode</label>
              <input
                type="password"
                className="auth-input"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            
            <button 
              type="submit" 
              className="btn-arcade primary" 
              disabled={loading}
              style={{ marginTop: '1rem' }}
            >
              {loading ? 'AUTHENTICATING...' : 'LOGIN'}
            </button>
          </form>

          <div className="auth-links">
            <div>Need an account? <Link to="/register">Register here</Link></div>
            <div><Link to="/forgot">Forgot your passcode?</Link></div>
          </div>
        </motion.div>
      </div>
    </>
  );
}
