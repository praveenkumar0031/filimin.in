import { useState } from 'react';
import { Link } from 'react-router-dom';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import '../styles/auth.css';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      setMessage('');
      setError('');
      setLoading(true);
      await sendPasswordResetEmail(auth, email);
      setMessage('RECOVERY LINK DISPATCHED. Check your inbox.');
    } catch (err) {
      setError('FAILED TO SEND RECOVERY LINK.');
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
          <h2 className="auth-title">System Recovery</h2>
          <p className="auth-subtitle">Enter your email to reset your passcode.</p>
          
          {error && <div className="auth-error">{error}</div>}
          {message && <div className="auth-message">{message}</div>}
          
          <form className="auth-form" onSubmit={handleReset}>
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
            
            <button 
              type="submit" 
              className="btn-arcade primary" 
              disabled={loading}
              style={{ marginTop: '1rem' }}
            >
              {loading ? 'SENDING...' : 'RESET PASSCODE'}
            </button>
          </form>

          <div className="auth-links">
            <div>Remembered it? <Link to="/login">Log in here</Link></div>
          </div>
        </motion.div>
      </div>
    </>
  );
}
