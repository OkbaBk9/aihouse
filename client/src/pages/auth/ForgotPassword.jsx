import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SmartInput from '../../components/core/SmartInput';
import AppButton from '../../components/core/AppButton';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setSent(true);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="container" style={{ maxWidth: '400px', padding: '60px 20px' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '10px', textAlign: 'center' }}>recovery.</h1>
      
      {sent ? (
        <div style={{ textAlign: 'center' }}>
          <p style={{ color: '#00aa00', marginBottom: '30px' }}>restoration link sent to your email.</p>
          <Link to="/auth/login" style={{ color: 'var(--accent-color)', fontWeight: 600 }}>return to login</Link>
        </div>
      ) : (
        <>
          <p style={{ color: 'var(--text-secondary)', textAlign: 'center', marginBottom: '40px' }}>enter your email to reset your password.</p>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <SmartInput label="Email Address" name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <AppButton type="submit" loading={loading} style={{ width: '100%', marginTop: '10px' }}>
              send reset link
            </AppButton>
          </form>
          <div style={{ textAlign: 'center', marginTop: '30px', fontSize: '0.9rem' }}>
            remember your password? <Link to="/auth/login" style={{ color: 'var(--accent-color)', fontWeight: 600 }}>log in.</Link>
          </div>
        </>
      )}
    </div>
  );
}
