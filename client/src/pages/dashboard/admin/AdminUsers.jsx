import React, { useState, useEffect } from 'react';
import AppButton from '../../../components/core/AppButton';
import { CheckCircle, Clock } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';

export default function AdminConsole() {
  const { user } = useAuth();
  const [reps, setReps] = useState([]);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [repsRes, actRes] = await Promise.all([
        fetch('http://localhost:5000/api/representatives'),
        fetch('http://localhost:5000/api/activities')
      ]);
      const repsData = await repsRes.json();
      const actData = await actRes.json();
      
      setReps(repsData);
      setActivities(actData.filter(a => a.status === 'proposed'));
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const handleValidateRep = async (id, status) => {
    await fetch(`http://localhost:5000/api/representatives/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ validation_status: status, validated_by: user.id })
    });
    fetchData();
  };

  const handleValidateActivity = async (id, status) => {
    await fetch(`http://localhost:5000/api/activities/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });
    fetchData();
  };

  if (loading) return <div className="container" style={{ padding: '40px 0' }}>Loading admin data...</div>;

  return (
    <div className="container" style={{ padding: '40px 0' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '8px' }}>validation console</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '40px' }}>administer train-the-trainer statuses and proposed activities.</p>

      <h2 style={{ fontSize: '1.5rem', marginBottom: '20px' }}>proposed workshops</h2>
      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '12px', overflow: 'hidden', marginBottom: '40px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-color)', background: '#F0F0F0' }}>
              <th style={{ padding: '16px', fontWeight: 600, fontSize: '0.9rem' }}>Title</th>
              <th style={{ padding: '16px', fontWeight: 600, fontSize: '0.9rem' }}>Department</th>
              <th style={{ padding: '16px', fontWeight: 600, fontSize: '0.9rem' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {activities.length === 0 ? (
              <tr><td colSpan="3" style={{ padding: '16px', textAlign: 'center' }}>No pending workshops.</td></tr>
            ) : activities.map(a => (
              <tr key={a._id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '16px', fontWeight: 500 }}>{a.title}</td>
                <td style={{ padding: '16px', color: 'var(--text-secondary)' }}>{a.department}</td>
                <td style={{ padding: '16px', display: 'flex', gap: '10px' }}>
                  <AppButton variant="primary" style={{ padding: '6px 12px', fontSize: '0.8rem' }} onClick={() => handleValidateActivity(a._id, 'approved')}>Approve</AppButton>
                  <AppButton variant="secondary" style={{ padding: '6px 12px', fontSize: '0.8rem', color: 'red' }} onClick={() => handleValidateActivity(a._id, 'cancelled')}>Reject</AppButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={{ fontSize: '1.5rem', marginBottom: '20px' }}>department representatives</h2>
      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '12px', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-color)', background: '#F0F0F0' }}>
              <th style={{ padding: '16px', fontWeight: 600, fontSize: '0.9rem' }}>User</th>
              <th style={{ padding: '16px', fontWeight: 600, fontSize: '0.9rem' }}>Department & Spec</th>
              <th style={{ padding: '16px', fontWeight: 600, fontSize: '0.9rem' }}>Status</th>
              <th style={{ padding: '16px', fontWeight: 600, fontSize: '0.9rem' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reps.map(u => (
              <tr key={u._id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '16px', fontWeight: 500 }}>{u.user_id?.name || 'Unknown'}</td>
                <td style={{ padding: '16px', color: 'var(--text-secondary)' }}>
                  {u.department} <br /> <span style={{ fontSize: '0.8rem' }}>{u.specialization}</span>
                </td>
                <td style={{ padding: '16px' }}>
                  <span style={{ 
                    display: 'inline-flex', alignItems: 'center', gap: '5px',
                    color: u.validation_status === 'validated' ? '#00aa00' : '#ff8c00',
                    fontSize: '0.85rem', fontWeight: 600
                  }}>
                    {u.validation_status === 'validated' ? <CheckCircle size={14} /> : <Clock size={14} />}
                    {u.validation_status}
                  </span>
                </td>
                <td style={{ padding: '16px' }}>
                  {u.validation_status === 'pending' || u.validation_status === 'in_progress' ? (
                    <AppButton variant="primary" style={{ padding: '6px 12px', fontSize: '0.8rem' }} onClick={() => handleValidateRep(u._id, 'validated')}>validate</AppButton>
                  ) : (
                    <AppButton variant="secondary" style={{ padding: '6px 12px', fontSize: '0.8rem' }} onClick={() => handleValidateRep(u._id, 'pending')}>revoke</AppButton>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
