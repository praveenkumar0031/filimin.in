// src/components/ProtectedRoute.jsx
// Wraps any route that requires authentication.
// Shows spinner while auth state is resolving, then redirects to /login if no user.

import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: '#000',
        color: '#1DE9B6',
        fontSize: '1.2rem',
        fontFamily: 'Arial, sans-serif',
      }}>
        Loading...
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
