// src/pages/LoginPage.jsx
// Mirrors login.html exactly: same .box > .outerbox > .login-box structure.
// Firebase signInWithEmailAndPassword, then redirects to /dashboard.

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../firebase';
import '../styles/log.css';
import '../styles/AR.css';

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail]     = useState('');
  const [pass,  setPass]      = useState('');
  const [error, setError]     = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, pass);
      // Update lastActiveDate in Firestore (replaces RTDB last_login write)
      try {
        await updateDoc(doc(db, 'users', user.uid), {
          lastActiveDate: serverTimestamp(),
        });
      } catch (_) {
        // Document may not exist yet — that's fine, scoreService creates it
      }
      navigate('/dashboard');
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
          <h1>USER LOGIN</h1>

          <div className="inbox">
            <ion-icon name="mail-outline"></ion-icon>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label htmlFor="email">EMAIL</label>
          </div>

          <div className="inbox">
            <ion-icon name="eye-outline"></ion-icon>
            <input
              id="pass"
              type="password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              required
            />
            <label htmlFor="pass">PASSWORD</label>
          </div>

          <div className="forgt">
            <Link to="/forgot">FORGET PASSWORD</Link>
          </div>

          {error && <div className="auth-error">{error}</div>}

          <button id="reg" onClick={handleLogin} disabled={loading}>
            {loading ? 'Logging in...' : 'login'}
          </button>

          <div className="signin">
            <p>
              CREATE A NEW ACCOUNT&nbsp;
              <Link to="/register" style={{ color: 'yellow' }}>REGISTER</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
