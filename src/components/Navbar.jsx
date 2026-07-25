// src/components/Navbar.jsx — Accessibility fixes:
// - aria-expanded on hamburger button
// - Escape key closes mobile drawer
// - aria-current on active link
// - focus returns to hamburger when drawer closes

import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { motion, AnimatePresence } from 'framer-motion';
import NotificationBell from './NotificationBell';
import '../styles/navbar.css';

// SVG Icons
const MenuIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
    <line x1="3" y1="12" x2="21" y2="12"></line>
    <line x1="3" y1="6" x2="21" y2="6"></line>
    <line x1="3" y1="18" x2="21" y2="18"></line>
  </svg>
);

const CloseIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

export default function Navbar() {
  const { pathname } = useLocation();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const hamburgerRef = useRef(null);
  const drawerRef    = useRef(null);

  const isActive = (path) =>
    pathname === path || (path !== '/' && pathname.startsWith(path)) ? 'active-link' : '';

  const handleLogout = async () => {
    await signOut(auth);
    closeMenu();
    navigate('/login');
  };

  const closeMenu = () => {
    setIsMobileOpen(false);
    // Return focus to the button that opened the drawer
    requestAnimationFrame(() => hamburgerRef.current?.focus());
  };

  // ── Escape key closes drawer ───────────────────────────────────────────
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape' && isMobileOpen) closeMenu();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isMobileOpen]);

  // ── Focus trap inside drawer ───────────────────────────────────────────
  useEffect(() => {
    if (!isMobileOpen || !drawerRef.current) return;
    const focusableSelector = 'a[href], button:not([disabled])';
    const focusables = Array.from(
      drawerRef.current.querySelectorAll(focusableSelector)
    );
    const first = focusables[0];
    const last  = focusables[focusables.length - 1];

    const trap = (e) => {
      if (e.key !== 'Tab') return;
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last?.focus(); }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first?.focus(); }
      }
    };

    document.addEventListener('keydown', trap);
    first?.focus();
    return () => document.removeEventListener('keydown', trap);
  }, [isMobileOpen]);

  const NavLinks = ({ onClick }) => (
    <>
      <Link to="/" onClick={onClick} className={`nav-item ${isActive('/')}`} aria-current={pathname === '/' ? 'page' : undefined}>Home</Link>
      <Link to="/learn" onClick={onClick} className={`nav-item ${isActive('/learn')}`} aria-current={pathname.startsWith('/learn') ? 'page' : undefined}>Learn</Link>
      <Link to="/quiz" onClick={onClick} className={`nav-item ${isActive('/quiz')}`} aria-current={pathname.startsWith('/quiz') ? 'page' : undefined}>Quests</Link>
      <Link to="/leaderboard" onClick={onClick} className={`nav-item ${isActive('/leaderboard')}`} aria-current={pathname === '/leaderboard' ? 'page' : undefined}>Leaderboard</Link>

      {user ? (
        <>
          <Link to="/achievements" onClick={onClick} className={`nav-item ${isActive('/achievements')}`} aria-current={pathname === '/achievements' ? 'page' : undefined}>Badges</Link>
          <Link to="/dashboard" onClick={onClick} className={`nav-item ${isActive('/dashboard')}`} aria-current={pathname === '/dashboard' ? 'page' : undefined}>Dashboard</Link>
          <Link to="/profile" onClick={onClick} className={`nav-item ${isActive('/profile')}`} aria-current={pathname === '/profile' ? 'page' : undefined}>Profile</Link>
          <button onClick={handleLogout} className="nav-item nav-action-btn">Logout</button>
        </>
      ) : (
        <Link to="/login" onClick={onClick} className={`nav-item ${isActive('/login')}`} aria-current={pathname === '/login' ? 'page' : undefined}>Log In</Link>
      )}
    </>
  );

  return (
    <>
      {/* Skip-to-content link for keyboard users */}
      <a href="#main-content" className="skip-to-content">Skip to main content</a>

      <motion.nav
        className="navbar"
        role="navigation"
        aria-label="Main navigation"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 120, damping: 20 }}
      >
        <Link to="/" className="nav-logo" aria-label="Filim.in — Go to home">
          <img src="/icon.png" alt="" aria-hidden="true" />
          <span className="nav-brand">FILIM.IN</span>
        </Link>

        {/* Desktop Menu */}
        <div className="nav-links-desktop" role="list">
          <NavLinks onClick={undefined} />
        </div>

        {/* Notification Bell (desktop) */}
        {user && (
          <div className="nav-bell-desktop">
            <NotificationBell />
          </div>
        )}

        {/* Hamburger */}
        <button
          ref={hamburgerRef}
          className="mobile-menu-btn"
          onClick={() => setIsMobileOpen(o => !o)}
          aria-expanded={isMobileOpen}
          aria-controls="mobile-drawer"
          aria-label={isMobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
        >
          {isMobileOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      </motion.nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            ref={drawerRef}
            id="mobile-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            className="mobile-drawer"
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ type: 'spring', stiffness: 150, damping: 25 }}
          >
            <NavLinks onClick={closeMenu} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
