// src/components/NotificationBell.jsx — Accessibility fixes:
// - Escape key closes tray, focus returns to bell button
// - role="dialog" + aria-modal on tray
// - aria-live="polite" region for dynamic badge count
// - aria-label on unread badge

import { useState, useEffect, useRef } from 'react';
import { ref, onValue } from 'firebase/database';
import { db } from '../firebase';
import { useAuth } from '../context/AuthContext';
import { markNotificationsRead } from '../services/scoreService';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/notifications.css';

export default function NotificationBell() {
  const { user } = useAuth();
  const [notifs, setNotifs] = useState([]);
  const [open, setOpen]     = useState(false);
  const trayRef             = useRef(null);
  const bellRef             = useRef(null);

  // ── Live listener ──────────────────────────────────────────────────────
  useEffect(() => {
    if (!user) return;
    const unsub = onValue(ref(db, `users/${user.uid}`), (snap) => {
      if (snap.exists()) {
        const raw = snap.val().notifications || [];
        const sorted = [...raw].sort((a, b) =>
          new Date(b.createdAt) - new Date(a.createdAt)
        );
        setNotifs(sorted);
      }
    });
    return unsub;
  }, [user]);

  // ── Close on outside click ─────────────────────────────────────────────
  useEffect(() => {
    const handle = (e) => {
      if (trayRef.current && !trayRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handle);
    return () => document.removeEventListener('mousedown', handle);
  }, []);

  // ── Escape key closes tray ─────────────────────────────────────────────
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape' && open) {
        setOpen(false);
        bellRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  const unreadCount = notifs.filter(n => !n.read).length;

  const handleToggle = async () => {
    const wasOpen = open;
    setOpen(o => !o);
    if (!wasOpen && unreadCount > 0 && user) {
      await markNotificationsRead(user.uid);
    }
  };

  if (!user) return null;

  return (
    <div ref={trayRef} style={{ position: 'relative' }}>
      {/* Bell Button */}
      <button
        ref={bellRef}
        className="notif-bell-btn"
        onClick={handleToggle}
        aria-label={`Notifications — ${unreadCount} unread`}
        aria-expanded={open}
        aria-haspopup="dialog"
        id="notif-bell"
      >
        <span aria-hidden="true">🔔</span>
        {/* aria-live region announces badge changes to screen readers */}
        <span
          aria-live="polite"
          aria-atomic="true"
          className="sr-only"
        >
          {unreadCount > 0 ? `${unreadCount} unread notifications` : 'No unread notifications'}
        </span>
        {unreadCount > 0 && (
          <motion.span
            className="notif-badge"
            aria-hidden="true"
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
            role="dialog"
            aria-modal="true"
            aria-label="Notifications"
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.15 }}
          >
            <div className="notif-tray-header" id="notif-tray-heading">
              <span aria-hidden="true">🔔</span> Notifications
            </div>
            <div
              className="notif-list"
              role="list"
              aria-labelledby="notif-tray-heading"
            >
              {notifs.length === 0 ? (
                <div className="notif-empty" role="status">
                  No notifications yet. Complete a quest!
                </div>
              ) : (
                notifs.slice(0, 10).map((n) => (
                  <div
                    key={n.id}
                    role="listitem"
                    className={`notif-item ${!n.read ? 'unread' : ''}`}
                  >
                    <span className="notif-icon" aria-hidden="true">{n.emoji || '🔔'}</span>
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
