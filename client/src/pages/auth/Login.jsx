import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SmartInput from '../../components/core/SmartInput';
import AppButton from '../../components/core/AppButton';
import { useAuth } from '../../context/AuthContext';

const API = 'http://localhost:5000/api/auth';

const TEST_ACCOUNTS = [
  { email: 'admin@aihouse.dz', password: 'Test123!', role: 'admin', name: 'Admin User' },
  { email: 'organizer@aihouse.dz', password: 'Test123!', role: 'organizer', name: 'Nour El Imane' },
  { email: 'rectorate@univ.dz', password: 'Test123!', role: 'rectorate', name: 'Rectorate Office' },
  { email: 'student1@univ.dz', password: 'Test123!', role: 'student', name: 'Karim Bouzid' },
];

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch(`${API}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Login failed.');
        setLoading(false);
        return;
      }

      login(data.user, data.token);
      navigate('/dashboard');
    } catch (err) {
      setError('Cannot reach the server. Make sure the backend is running on port 5000.');
      setLoading(false);
    }
  };

  const quickLogin = (account) => {
    setEmail(account.email);
    setPassword(account.password);
    setError('');
  };

  return (
    <div className="container fade-in-up" style={{ maxWidth: '420px', padding: '60px 20px' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '10px', textAlign: 'center' }}>welcome back.</h1>
      <p style={{ color: 'var(--text-secondary)', textAlign: 'center', marginBottom: '40px' }}>log in to access the ai ecosystem.</p>

      {error && (
        <div style={{ background: '#fff0f0', color: '#c00', padding: '12px 16px', borderRadius: '8px', marginBottom: '20px', fontSize: '0.9rem', border: '1px solid #fcc' }}>
          {error}
        </div>
      )}

      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <SmartInput label="email address" name="email" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
        <div>
          <SmartInput label="password" name="password" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
          <div style={{ textAlign: 'right', marginTop: '-10px' }}>
            <Link to="/auth/forgot-password" style={{ fontSize: '0.85rem', color: 'var(--accent-color)' }}>forgot password?</Link>
          </div>
        </div>
        <AppButton type="submit" loading={loading} style={{ width: '100%', marginTop: '10px' }}>log in</AppButton>
      </form>

      <div style={{ textAlign: 'center', marginTop: '30px', fontSize: '0.9rem' }}>
        don't have an account? <Link to="/auth/register" style={{ color: 'var(--accent-color)', fontWeight: 600 }}>register here.</Link>
      </div>

      {/* Test account hints */}
      <div style={{ marginTop: '40px', padding: '20px', background: '#f9f9f9', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
        <p style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: '12px', color: 'var(--text-secondary)' }}>quick test accounts (password: Test123!):</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {TEST_ACCOUNTS.map((acc, i) => (
            <button key={i} onClick={() => quickLogin(acc)} style={{
              background: '#fff', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '10px 14px',
              cursor: 'pointer', textAlign: 'left', fontSize: '0.85rem', fontFamily: 'var(--font-body)', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              transition: 'border-color 0.2s'
            }}>
              <span><strong>{acc.role}</strong> — {acc.email}</span>
              <span style={{ color: 'var(--accent-color)', fontWeight: 600 }}>use →</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
