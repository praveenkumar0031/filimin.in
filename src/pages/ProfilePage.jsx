import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import '../styles/profile.css';

export default function ProfilePage() {
  const { user } = useAuth();
  const [profileData, setProfileData] = useState(null);
  const [displayName, setDisplayName] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!user) return;
    const fetchProfile = async () => {
      const docRef = doc(db, 'users', user.uid);
      const snap = await getDoc(docRef);
      if (snap.exists()) {
        const data = snap.data();
        setProfileData(data);
        setDisplayName(data.displayName || '');
      }
      setLoading(false);
    };
    fetchProfile();
  }, [user]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!displayName.trim()) return;
    setSaving(true);
    setMessage('');
    try {
      const docRef = doc(db, 'users', user.uid);
      await updateDoc(docRef, { displayName: displayName.trim() });
      setMessage('PLAYER TAG UPDATED.');
    } catch (err) {
      setMessage('ERROR UPDATING.');
    }
    setSaving(false);
  };

  if (loading) return null;

  const totalScore = profileData?.totalScore || 0;
  const streak = profileData?.streak || 0;

  return (
    <>
      <Navbar />
      <div className="profile-container">
        <motion.div 
          className="profile-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="profile-header">
            <h1 className="profile-title">Player Dossier</h1>
          </div>

          <div className="profile-stats">
            <div className="stat-box">
              <div className="stat-label">Total Wealth</div>
              <div className="stat-value">{totalScore.toLocaleString()}</div>
            </div>
            <div className="stat-box streak">
              <div className="stat-label">Login Streak</div>
              <div className="stat-value">{streak} 🔥</div>
            </div>
          </div>

          <form className="profile-form" onSubmit={handleUpdate}>
            <label>Gamer Tag (Public Name)</label>
            <input 
              type="text" 
              value={displayName} 
              onChange={(e) => setDisplayName(e.target.value)} 
              placeholder="Enter your gamer tag"
              maxLength={20}
            />
            <button type="submit" className="btn-update" disabled={saving}>
              {saving ? 'UPDATING...' : 'UPDATE TAG'}
            </button>
            {message && <div style={{ textAlign: 'center', marginTop: '10px', fontWeight: 'bold' }}>{message}</div>}
          </form>
        </motion.div>
      </div>
    </>
  );
}
