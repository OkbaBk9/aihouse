import React, { useState } from 'react';
import SmartInput from '../../components/core/SmartInput';
import AppButton from '../../components/core/AppButton';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { User, LogOut } from 'lucide-react';

export default function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    focus: 'Data Science & NLP',
    bio: 'Looking forward to integrating AI in daily research.'
  });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSave = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => setLoading(false), 800);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="container fade-in-up" style={{ padding: '40px 0', maxWidth: '600px' }}>
      {/* Avatar & Identity */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '40px' }}>
        <div style={{
          width: '80px', height: '80px', borderRadius: '50%', background: 'var(--accent-color)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '2rem', fontWeight: 700
        }}>
          {user?.name?.charAt(0)?.toUpperCase() || <User size={36} />}
        </div>
        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: '2rem', margin: 0 }}>{user?.name}</h1>
          <p style={{ color: 'var(--accent-color)', fontWeight: 600, fontSize: '0.9rem' }}>{user?.role} — {user?.email}</p>
        </div>
      </div>

      <form onSubmit={handleSave}>
        <SmartInput label="full name" name="name" value={formData.name} onChange={handleChange} required />
        <SmartInput label="ai focus area" name="focus" value={formData.focus} onChange={handleChange} />
        <SmartInput label="short bio" name="bio" type="textarea" value={formData.bio} onChange={handleChange} />
        <div style={{ marginTop: '20px', display: 'flex', gap: '15px', alignItems: 'center' }}>
          <AppButton type="submit" loading={loading}>save changes</AppButton>
        </div>
      </form>

      {/* Logout moved here */}
      <div style={{ marginTop: '50px', paddingTop: '30px', borderTop: '1px solid var(--border-color)' }}>
        <button onClick={handleLogout} style={{
          display: 'flex', alignItems: 'center', gap: '8px', background: 'transparent', border: '1px solid #e60000',
          color: '#e60000', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: 600, fontFamily: 'var(--font-body)', fontSize: '0.9rem'
        }}>
          <LogOut size={16} /> log out of account
        </button>
      </div>
    </div>
  );
}
