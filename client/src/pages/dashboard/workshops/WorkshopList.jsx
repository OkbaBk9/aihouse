import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AppButton from '../../../components/core/AppButton';
import StatusBadge from '../../../components/core/StatusBadge';
import { useAuth } from '../../../context/AuthContext';

export default function WorkshopList() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [workshops, setWorkshops] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.id) {
      fetch(`/api/activities?organizer_id=${user.id}`)
        .then(res => res.json())
        .then(data => {
          setWorkshops(data);
          setLoading(false);
        })
        .catch(err => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [user]);

  return (
    <div className="container" style={{ padding: '40px 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <div>
          <h1 style={{ fontSize: '2rem', margin: 0 }}>your workshops</h1>
          <p style={{ color: 'var(--text-secondary)' }}>manage your proposed and completed events.</p>
        </div>
        <AppButton onClick={() => navigate('/dashboard/workshops/new')}>+ add new</AppButton>
      </div>

      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '12px', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-color)', background: '#F0F0F0' }}>
              <th style={{ padding: '16px', fontWeight: 600, fontSize: '0.9rem' }}>Title</th>
              <th style={{ padding: '16px', fontWeight: 600, fontSize: '0.9rem' }}>Date</th>
              <th style={{ padding: '16px', fontWeight: 600, fontSize: '0.9rem' }}>Status</th>
              <th style={{ padding: '16px', fontWeight: 600, fontSize: '0.9rem' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="4" style={{ padding: '16px', textAlign: 'center' }}>Loading...</td></tr>
            ) : workshops.length === 0 ? (
              <tr><td colSpan="4" style={{ padding: '16px', textAlign: 'center' }}>No workshops found.</td></tr>
            ) : workshops.map((w, i) => (
              <tr key={i} style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '16px', fontWeight: 500 }}>{w.title}</td>
                <td style={{ padding: '16px', color: 'var(--text-secondary)' }}>{new Date(w.scheduled_date).toLocaleDateString()}</td>
                <td style={{ padding: '16px' }}><StatusBadge status={w.status} /></td>
                <td style={{ padding: '16px' }}>
                  <Link to="#" style={{ color: 'var(--accent-color)', fontSize: '0.9rem', fontWeight: 500 }}>Edit</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
