import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/navbar.css';

// SVG Icons to replace ion-icons
const MenuIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="12" x2="21" y2="12"></line>
    <line x1="3" y1="6" x2="21" y2="6"></line>
    <line x1="3" y1="18" x2="21" y2="18"></line>
  </svg>
);

const CloseIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

export default function Navbar() {
  const { pathname } = useLocation();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const isActive = (path) =>
    pathname === path || (path !== '/' && pathname.startsWith(path)) ? 'active-link' : '';

  const handleLogout = async () => {
    await signOut(auth);
    setIsMobileOpen(false);
    navigate('/login');
  };

  const closeMenu = () => setIsMobileOpen(false);

  // Reusable list of links
  const NavLinks = ({ isMobile }) => (
    <>
      <Link to="/" onClick={closeMenu} className={`nav-item ${isActive('/')}`}>Home</Link>
      <Link to="/learn" onClick={closeMenu} className={`nav-item ${isActive('/learn')}`}>Learn</Link>
      <Link to="/quiz" onClick={closeMenu} className={`nav-item ${isActive('/quiz')}`}>Quests</Link>
      
      {user ? (
        <>
          <Link to="/dashboard" onClick={closeMenu} className={`nav-item ${isActive('/dashboard')}`}>Dashboard</Link>
          <button onClick={handleLogout} className="nav-item nav-action-btn">Logout</button>
        </>
      ) : (
        <Link to="/login" onClick={closeMenu} className={`nav-item ${isActive('/login')}`}>Log In</Link>
      )}
    </>
  );

  return (
    <>
      <motion.nav 
        className="navbar"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 120, damping: 20 }}
      >
        <Link to="/" className="nav-logo" onClick={closeMenu}>
          <img src="/icon.png" alt="Filimin Logo" />
          <span className="nav-brand">FILIM.IN</span>
        </Link>

        {/* Desktop Menu */}
        <div className="nav-links-desktop">
          <NavLinks isMobile={false} />
        </div>

        {/* Mobile Hamburger Toggle */}
        <button className="mobile-menu-btn" onClick={() => setIsMobileOpen(!isMobileOpen)}>
          {isMobileOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      </motion.nav>

      {/* Mobile Full-Screen Drawer */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div 
            className="mobile-drawer"
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ type: 'spring', stiffness: 150, damping: 25 }}
          >
            <NavLinks isMobile={true} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
