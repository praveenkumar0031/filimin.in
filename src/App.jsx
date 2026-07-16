// src/App.jsx
// Router setup — maps every URL to its page component.
// AuthProvider wraps everything so useAuth() works site-wide.
// ProtectedRoute guards quiz and dashboard pages.

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute  from './components/ProtectedRoute';

// Auth pages
import LoginPage          from './pages/LoginPage';
import RegisterPage       from './pages/RegisterPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';

// Main pages
import HomePage      from './pages/HomePage';
import LearnPage     from './pages/LearnPage';
import AboutPage     from './pages/AboutPage';
import ContactPage   from './pages/ContactPage';
import QuizHomePage  from './pages/QuizHomePage';
import QuizPage      from './pages/QuizPage';
import DashboardPage from './pages/DashboardPage';
import ProfilePage   from './pages/ProfilePage';
import LeaderboardPage from './pages/LeaderboardPage';

// Learn sub-pages
import StocksPage          from './pages/learn/StocksPage';
import CryptoPage          from './pages/learn/CryptoPage';
import DebtPage            from './pages/learn/DebtPage';
import CreditPage          from './pages/learn/CreditPage';
import AssetPage           from './pages/learn/AssetPage';
import LoanPage            from './pages/learn/LoanPage';
import TaxPage             from './pages/learn/TaxPage';
import SimpleInterestPage  from './pages/learn/SimpleInterestPage';
import CompoundInterestPage from './pages/learn/CompoundInterestPage';
import LeveragePage        from './pages/learn/LeveragePage';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>

          {/* ── Public routes ───────────────────────────────────── */}
          <Route path="/"        element={<HomePage />} />
          <Route path="/login"   element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot"  element={<ForgotPasswordPage />} />
          <Route path="/about"   element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />

          {/* Learn — public so visitors can browse without login */}
          <Route path="/learn" element={<LearnPage />} />
          <Route path="/learn/stocks"            element={<StocksPage />} />
          <Route path="/learn/crypto"            element={<CryptoPage />} />
          <Route path="/learn/debt"              element={<DebtPage />} />
          <Route path="/learn/credit"            element={<CreditPage />} />
          <Route path="/learn/asset"             element={<AssetPage />} />
          <Route path="/learn/loan"              element={<LoanPage />} />
          <Route path="/learn/tax"               element={<TaxPage />} />
          <Route path="/learn/simple-interest"   element={<SimpleInterestPage />} />
          <Route path="/learn/compound-interest" element={<CompoundInterestPage />} />
          <Route path="/learn/leverage"          element={<LeveragePage />} />

          {/* ── Protected routes (auth required) ────────────────── */}
          <Route
            path="/quiz"
            element={
              <ProtectedRoute>
                <QuizHomePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/quiz/:moduleKey"
            element={
              <ProtectedRoute>
                <QuizPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/leaderboard"
            element={
              <ProtectedRoute>
                <LeaderboardPage />
              </ProtectedRoute>
            }
          />

          {/* Fallback — redirect unknown URLs to home */}
          <Route path="*" element={<Navigate to="/" replace />} />

        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
