import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SmartInput from '../../../components/core/SmartInput';
import AppButton from '../../../components/core/AppButton';
import { useAuth } from '../../../context/AuthContext';

export default function CreateWorkshop() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    department: user?.department || 'computer_science',
    event_date: '',
    event_time: '',
    location: '',
    description: '',
    max_participants: 30
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const scheduled_date = new Date(`${formData.event_date}T${formData.event_time}`);

    try {
      const res = await fetch('/api/activities', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          department: formData.department,
          organizer_id: user.id,
          scheduled_date,
          location: formData.location,
          max_participants: formData.max_participants
        })
      });

      if (!res.ok) throw new Error('Failed to create workshop');
      
      navigate('/dashboard/workshops');
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ maxWidth: '600px', padding: '40px 0' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '8px' }}>create new workshop</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '30px' }}>the activity will be pushed to the admin queue for validation.</p>
      
      {error && <p style={{ color: 'red', marginBottom: '15px' }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <SmartInput label="Workshop Title" name="title" value={formData.title} onChange={handleChange} required />
        <SmartInput 
          label="Department" 
          name="department" 
          type="select" 
          value={formData.department} 
          onChange={handleChange} 
          options={['computer_science', 'physics', 'mathematics', 'biology']} 
        />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <SmartInput label="Event Date" name="event_date" type="date" value={formData.event_date} onChange={handleChange} required />
          <SmartInput label="Event Time" name="event_time" type="time" value={formData.event_time} onChange={handleChange} required />
        </div>
        <SmartInput label="Location (or Webinar Link)" name="location" value={formData.location} onChange={handleChange} required />
        <SmartInput label="Max Participants" name="max_participants" type="number" value={formData.max_participants} onChange={handleChange} required />
        <SmartInput label="Detailed Description" name="description" type="textarea" value={formData.description} onChange={handleChange} required />
        
        <div style={{ display: 'flex', gap: '15px', marginTop: '20px' }}>
          <AppButton type="submit" loading={loading}>submit proposal</AppButton>
          <AppButton type="button" variant="secondary" onClick={() => navigate('/dashboard/workshops')} disabled={loading}>cancel</AppButton>
        </div>
      </form>
    </div>
  );
}
