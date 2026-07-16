import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { createUserDocument as initializeUserScores } from '../services/scoreService';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import '../styles/auth.css';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return setError('PASSCODES DO NOT MATCH.');
    }
    try {
      setError('');
      setLoading(true);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // Initialize Firestore document for new user
      await initializeUserScores(userCredential.user.uid);
      navigate('/dashboard');
    } catch (err) {
      setError('REGISTRATION FAILED: ' + err.message);
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
          <h2 className="auth-title">Create Player</h2>
          <p className="auth-subtitle">Start your journey to financial mastery.</p>
          
          {error && <div className="auth-error">{error}</div>}
          
          <form className="auth-form" onSubmit={handleRegister}>
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
              <label>Create Passcode</label>
              <input
                type="password"
                className="auth-input"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            
            <div className="input-group">
              <label>Confirm Passcode</label>
              <input
                type="password"
                className="auth-input"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            
            <button 
              type="submit" 
              className="btn-arcade primary" 
              disabled={loading}
              style={{ marginTop: '1rem' }}
            >
              {loading ? 'INITIALIZING...' : 'START QUEST'}
            </button>
          </form>

          <div className="auth-links">
            <div>Already playing? <Link to="/login">Log in here</Link></div>
          </div>
        </motion.div>
      </div>
    </>
  );
}
