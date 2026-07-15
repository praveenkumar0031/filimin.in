// src/pages/ForgotPasswordPage.jsx
// Mirrors forgot.html structure. Implements real Firebase sendPasswordResetEmail.

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase';
import '../styles/log.css';
import '../styles/AR.css';

export default function ForgotPasswordPage() {
  const [email,   setEmail]   = useState('');
  const [message, setMessage] = useState('');
  const [error,   setError]   = useState('');
  const [loading, setLoading] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage('Password reset email sent! Check your inbox.');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="box">
      <img className="logo-img" width="100" height="100" src="/icon.png" alt="logo" />
      <div className="outerbox">
        <div className="login-box">
          <h1>RESET PASSWORD</h1>

          <div className="inbox">
            <ion-icon name="mail-outline"></ion-icon>
            <input
              id="user"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label htmlFor="user">EMAIL ADDRESS</label>
          </div>

          {error   && <div className="auth-error">{error}</div>}
          {message && <div className="auth-success">{message}</div>}

          <button id="reg" onClick={handleReset} disabled={loading}>
            {loading ? 'Sending...' : 'Reset'}
          </button>

          <div className="signin">
            <p>
              Remember it?&nbsp;
              <Link to="/login">Back to Login</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
