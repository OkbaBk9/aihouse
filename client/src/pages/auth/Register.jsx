import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SmartInput from '../../components/core/SmartInput';
import AppButton from '../../components/core/AppButton';
import { useAuth } from '../../context/AuthContext';

const API = 'http://localhost:5000/api/auth';

export default function Register() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    password: '',
    role: 'participant',
    department: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const passwordChecks = [
    { label: '8+ characters', valid: formData.password.length >= 8 },
    { label: 'Uppercase letter (A-Z)', valid: /[A-Z]/.test(formData.password) },
    { label: 'Lowercase letter (a-z)', valid: /[a-z]/.test(formData.password) },
    { label: 'Number (0-9)', valid: /[0-9]/.test(formData.password) },
    { label: 'Special character (!@#$...)', valid: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(formData.password) },
  ];
  const passwordValid = passwordChecks.every(c => c.valid);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!passwordValid) {
      setError('Please meet all password requirements.');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`${API}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.full_name,
          email: formData.email,
          password: formData.password,
          role: formData.role,
          department: formData.department
        })
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Registration failed.');
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

  return (
    <div className="container" style={{ maxWidth: '500px', padding: '60px 20px' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '10px', textAlign: 'center' }}>join the network.</h1>
      <p style={{ color: 'var(--text-secondary)', textAlign: 'center', marginBottom: '40px' }}>create your ai house profile.</p>

      {error && (
        <div style={{ background: '#fff0f0', color: '#c00', padding: '12px 16px', borderRadius: '8px', marginBottom: '20px', fontSize: '0.9rem', border: '1px solid #fcc' }}>
          {error}
        </div>
      )}

      <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <SmartInput label="Full Name" name="full_name" value={formData.full_name} onChange={handleChange} required />
        <SmartInput label="Email Address" name="email" type="email" value={formData.email} onChange={handleChange} required />
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
           <SmartInput 
            label="Role" 
            name="role" 
            type="select" 
            value={formData.role} 
            onChange={handleChange} 
            options={[
              {value: 'participant', label: 'participant'},
              {value: 'organizer', label: 'organizer'},
              {value: 'lecturer_rep', label: 'lecturer rep'}
            ]}
          />
          <SmartInput 
            label="Department" 
            name="department" 
            type="select" 
            value={formData.department} 
            onChange={handleChange} 
            options={['computer science','physics','mathematics','biology']}
          />
        </div>

        <SmartInput label="Password" name="password" type="password" value={formData.password} onChange={handleChange} required />

        {/* Password strength indicator */}
        {formData.password.length > 0 && (
          <div style={{ padding: '12px 16px', background: '#f9f9f9', borderRadius: '8px', border: '1px solid var(--border-color)', fontSize: '0.8rem' }}>
            <p style={{ fontWeight: 600, marginBottom: '8px', color: 'var(--text-secondary)' }}>password requirements:</p>
            {passwordChecks.map((check, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px', color: check.valid ? '#00aa00' : '#cc0000' }}>
                <span>{check.valid ? '✓' : '✗'}</span>
                <span>{check.label}</span>
              </div>
            ))}
          </div>
        )}

        <AppButton type="submit" loading={loading} style={{ width: '100%', marginTop: '20px' }}>
          create account
        </AppButton>
      </form>
      
      <div style={{ textAlign: 'center', marginTop: '30px', fontSize: '0.9rem' }}>
        already have an account? <Link to="/auth/login" style={{ color: 'var(--accent-color)', fontWeight: 600 }}>log in.</Link>
      </div>
    </div>
  );
}
