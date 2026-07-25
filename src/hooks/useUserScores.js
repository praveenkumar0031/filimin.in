// src/hooks/useUserScores.js
// Real-time Firestore listener for a user's score document.
// Uses onSnapshot so the dashboard updates live when scores change.
// Returns { scores, loading, error }.

import { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { db } from '../firebase';

export function useUserScores(uid) {
  const [scores,  setScores]  = useState(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  useEffect(() => {
    if (!uid) {
      setLoading(false);
      return;
    }

    const userRef = ref(db, `users/${uid}`);

    // Subscribe to real-time updates
    const unsubscribe = onValue(
      userRef,
      (snap) => {
        if (snap.exists()) {
          setScores(snap.val());
        } else {
          setScores(null);
        }
        setLoading(false);
      },
      (err) => {
        console.error('useUserScores error:', err);
        setError(err);
        setLoading(false);
      }
    );

    // Cleanup listener when uid changes or component unmounts
    return () => unsubscribe();
  }, [uid]);

  return { scores, loading, error };
}
