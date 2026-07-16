// src/components/NotificationBell.jsx
// Bell icon in Navbar. Shows unread count badge.
// Clicking opens a dropdown tray and marks all as read in Firestore.

import { useState, useEffect, useRef } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../context/AuthContext';
import { markNotificationsRead } from '../services/scoreService';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/notifications.css';

export default function NotificationBell() {
  const { user } = useAuth();
  const [notifs, setNotifs]   = useState([]);
  const [open, setOpen]       = useState(false);
  const trayRef               = useRef(null);

  // ── Live listener ────────────────────────────────────────────────────
  useEffect(() => {
    if (!user) return;
    const unsub = onSnapshot(doc(db, 'users', user.uid), (snap) => {
      if (snap.exists()) {
        const raw = snap.data().notifications || [];
        // Sort newest first
        const sorted = [...raw].sort((a, b) =>
          new Date(b.createdAt) - new Date(a.createdAt)
        );
        setNotifs(sorted);
      }
    });
    return unsub;
  }, [user]);

  // ── Close on outside click ───────────────────────────────────────────
  useEffect(() => {
    const handle = (e) => {
      if (trayRef.current && !trayRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handle);
    return () => document.removeEventListener('mousedown', handle);
  }, []);

  const unreadCount = notifs.filter(n => !n.read).length;

  const handleToggle = async () => {
    const wasOpen = open;
    setOpen(o => !o);
    // Mark as read when opening
    if (!wasOpen && unreadCount > 0 && user) {
      await markNotificationsRead(user.uid);
    }
  };

  if (!user) return null;

  return (
    <div ref={trayRef} style={{ position: 'relative' }}>
      {/* Bell Button */}
      <button
        className="notif-bell-btn"
        onClick={handleToggle}
        aria-label={`Notifications (${unreadCount} unread)`}
        id="notif-bell"
      >
        🔔
        {unreadCount > 0 && (
          <motion.span
            className="notif-badge"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            key={unreadCount}
          >
            {unreadCount > 9 ? '9+' : unreadCount}
          </motion.span>
        )}
      </button>

      {/* Dropdown Tray */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="notif-tray"
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.15 }}
          >
            <div className="notif-tray-header">🔔 Notifications</div>
            <div className="notif-list">
              {notifs.length === 0 ? (
                <div className="notif-empty">
                  No notifications yet. Complete a quest!
                </div>
              ) : (
                notifs.slice(0, 10).map((n) => (
                  <div key={n.id} className={`notif-item ${!n.read ? 'unread' : ''}`}>
                    <span className="notif-icon">{n.emoji || '🔔'}</span>
                    <div className="notif-content">
                      <div className="notif-title">{n.title}</div>
                      <div className="notif-msg">{n.msg}</div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
