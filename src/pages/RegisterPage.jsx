// src/pages/RegisterPage.jsx
// Mirrors register.html exactly: same .box > .outerbox > .login-box structure.
// Creates user with Firebase Auth, then creates Firestore user document.

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../firebase';
import { createUserDocument } from '../services/scoreService';
import '../styles/log.css';
import '../styles/AR.css';

export default function RegisterPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email,    setEmail]    = useState('');
  const [pass,     setPass]     = useState('');
  const [error,    setError]    = useState('');
  const [loading,  setLoading]  = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, pass);
      // Set display name
      await updateProfile(user, { displayName: username });
      // Create Firestore document with empty scores
      await createUserDocument(user.uid, username, email);
      navigate('/login');
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
          <h1>Register</h1>

          <div className="inbox">
            <ion-icon name="person-circle-outline"></ion-icon>
            <input
              id="user"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <label htmlFor="user">user name</label>
          </div>

          <div className="inbox">
            <ion-icon name="mail-outline"></ion-icon>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label htmlFor="email">email</label>
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
            <label htmlFor="pass">password</label>
          </div>

          {error && <div className="auth-error">{error}</div>}

          <button id="reg" onClick={handleRegister} disabled={loading}>
            {loading ? 'Creating account...' : 'signin'}
          </button>

          <div className="signin">
            <p>
              already have an account&nbsp;
              <Link to="/login">login</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
