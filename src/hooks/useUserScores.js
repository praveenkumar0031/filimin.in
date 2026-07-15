// src/hooks/useUserScores.js
// Real-time Firestore listener for a user's score document.
// Uses onSnapshot so the dashboard updates live when scores change.
// Returns { scores, loading, error }.

import { useState, useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
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

    const ref = doc(db, 'users', uid);

    // Subscribe to real-time updates
    const unsubscribe = onSnapshot(
      ref,
      (snap) => {
        if (snap.exists()) {
          setScores(snap.data());
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
