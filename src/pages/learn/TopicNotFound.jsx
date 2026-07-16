// src/pages/learn/TopicNotFound.jsx
// Shown when a user navigates to /learn/something-invalid
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import '../../styles/learn.css';

export default function TopicNotFound() {
  return (
    <>
      <Navbar />
      <div className="learn-container" style={{ textAlign: 'center', paddingTop: '4rem' }}>
        <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>🗺️</div>
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'var(--text-4xl)',
          color: 'var(--color-white)',
          textTransform: 'uppercase',
          marginBottom: '1rem',
        }}>
          Topic Not Found
        </h1>
        <p style={{
          fontFamily: 'var(--font-body)',
          color: 'var(--color-white-muted)',
          fontSize: 'var(--text-lg)',
          marginBottom: '2rem',
        }}>
          That topic doesn't exist in the Library yet. Pick a valid one below.
        </p>
        <Link to="/learn" className="btn-arcade primary">← Back to The Manual</Link>
      </div>
    </>
  );
}
