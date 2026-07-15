// src/components/Navbar.jsx
// Replicates the exact .navbar HTML structure from every original page.
// Uses React Router's <Link> instead of <a href> for SPA navigation.
// useLocation() drives the active-link highlight (replacing id="act").

import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar({ cssFile = 'home' }) {
  const { pathname } = useLocation();
  const { user } = useAuth();

  const isActive = (path) =>
    pathname === path || pathname.startsWith(path + '/') ? 'active-link' : '';

  return (
    <div className="navbar">
      <Link to="/contact" className={isActive('/contact')}>CONTACT US</Link>
      <Link to="/about"   className={isActive('/about')}>ABOUT</Link>
      <Link to="/learn"   className={isActive('/learn')}>LEARN</Link>

      {user ? (
        <Link to="/dashboard" className={isActive('/dashboard')}>DASHBOARD</Link>
      ) : (
        <Link to="/login" className={isActive('/login')}>LOG IN</Link>
      )}

      <Link to="/quiz" className={isActive('/quiz')}>QUIZ</Link>
      <Link to="/"     className={pathname === '/' ? 'active-link' : ''}>HOME</Link>

      <Link to="/">
        <img src="/icon.png" width="80" height="80" alt="Filimin logo" />
      </Link>
    </div>
  );
}
