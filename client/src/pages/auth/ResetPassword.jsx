import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import SmartInput from '../../components/core/SmartInput';
import AppButton from '../../components/core/AppButton';

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirm) {
      setError('Passwords do not match');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      navigate('/auth/login');
    }, 1000);
  };

  return (
    <div className="container" style={{ maxWidth: '400px', padding: '60px 20px' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '10px', textAlign: 'center' }}>reset password.</h1>
      <p style={{ color: 'var(--text-secondary)', textAlign: 'center', marginBottom: '40px' }}>enter your new password below.</p>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <SmartInput label="New Password" name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <SmartInput label="Confirm Password" name="confirm" type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} error={error} required />
        <AppButton type="submit" loading={loading} style={{ width: '100%', marginTop: '10px' }}>
          update password
        </AppButton>
      </form>
    </div>
  );
}
