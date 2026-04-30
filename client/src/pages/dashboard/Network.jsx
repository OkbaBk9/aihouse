import React, { useState, useEffect } from 'react';
import { User, BookOpen, CheckCircle, Clock } from 'lucide-react';

export default function Network() {
  const [reps, setReps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/representatives')
      .then(res => res.json())
      .then(data => {
        const mappedReps = data.map(r => ({
          name: r.user_id?.name?.toLowerCase(),
          title: r.specialization?.toLowerCase() || 'representative',
          dept: r.department?.replace('_', ' '),
          focus: r.ai_focus?.replace('_', ' '),
          validation: r.validation_status === 'validated' ? 'completed' : 'pending'
        }));
        setReps(mappedReps);
        setLoading(false);
      })
      .catch(err => {
        console.error('Fetch error:', err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="container" style={{ padding: '40px 0' }}>
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>the human network</h1>
        <p style={{ color: 'var(--text-secondary)' }}>manage and view the faculty members leading the ai transition within their departments.</p>
      </div>

      {loading ? (
        <p>loading network from database...</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
          {reps.length > 0 ? reps.map((rep, i) => (
            <div key={i} style={{ 
              background: 'var(--bg-card)', 
              border: '1px solid var(--border-color)', 
              borderRadius: '16px', 
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ 
                  width: '60px', height: '60px', 
                  borderRadius: '50%', 
                  background: 'var(--border-color)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--text-secondary)'
                }}>
                  <User size={30} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.2rem', margin: 0 }}>{rep.name}</h3>
                  <span style={{ fontSize: '0.85rem', color: 'var(--accent-color)', fontWeight: 600 }}>{rep.title}</span>
                </div>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <BookOpen size={16} /> department: {rep.dept}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>ai focus:</span> {rep.focus}
                </div>
                
                <div style={{ 
                  marginTop: '10px', 
                  paddingTop: '10px', 
                  borderTop: '1px solid var(--border-color)',
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '8px',
                  color: rep.validation === 'completed' ? '#00aa00' : '#ff8c00',
                  fontWeight: 600,
                  fontSize: '0.8rem',
                  textTransform: 'lowercase'
                }}>
                  {rep.validation === 'completed' ? <CheckCircle size={16} /> : <Clock size={16} />}
                  train the trainer: {rep.validation}
                </div>
              </div>
            </div>
          )) : <p>no representatives found in the database.</p>}
        </div>
      )}
    </div>
  );
}
