// src/firebase.js
// Single source of truth for all Firebase services.
// Uses Vite environment variables — never hardcode keys here.

import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

// ── Resolve and validate the Firebase config ─────────────────────────────────
// Every key must be a non-empty string. If any is missing the app will fail
// silently with "client is offline" rather than a clear config error.
const firebaseConfig = {
  apiKey:            import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain:        import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL:       import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId:         import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket:     import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId:             import.meta.env.VITE_FIREBASE_APP_ID,
};

// Validate in dev — log (masking the API key) so we know what resolved.
if (import.meta.env.DEV) {
  const masked = {
    ...firebaseConfig,
    apiKey: firebaseConfig.apiKey
      ? `${firebaseConfig.apiKey.slice(0, 8)}…` // show prefix only
      : 'MISSING',
  };
  console.info('[Firebase] Resolved config:', masked);

  // Hard-fail loudly instead of silently degrading to "client is offline"
  const REQUIRED_KEYS = [
    'apiKey', 'authDomain', 'projectId',
    'storageBucket', 'messagingSenderId', 'appId',
  ];
  const missing = REQUIRED_KEYS.filter(
    (k) => !firebaseConfig[k] || firebaseConfig[k] === 'undefined'
  );
  if (missing.length > 0) {
    throw new Error(
      `[Firebase] Missing env vars: ${missing.map(k => `VITE_FIREBASE_${k.replace(/([A-Z])/g, '_$1').toUpperCase()}`).join(', ')}.\n` +
      `Ensure your .env file exists, uses the VITE_ prefix, and that you RESTARTED the dev server after editing it.`
    );
  }
}

// ── Singleton guard — never call initializeApp twice ─────────────────────────
// Calling initializeApp() more than once (e.g. in HMR/dev) creates a duplicate
// Firebase App which can cause connection conflicts surfacing as "client is offline".
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db   = getDatabase(app);

export default app;
