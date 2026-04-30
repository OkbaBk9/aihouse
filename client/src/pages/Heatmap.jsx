import React from 'react';

export default function Heatmap() {
  const departments = [
    { name: 'computer science', score: 95 },
    { name: 'mathematics', score: 80 },
    { name: 'physics', score: 65 },
    { name: 'biology', score: 50 },
    { name: 'mechanical engineering', score: 40 },
    { name: 'economics', score: 25 },
  ];

  return (
    <div className="container">
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>training heatmap</h1>
        <p style={{ color: 'var(--text-secondary)' }}>visualizing ai activity and literacy across the university departments.</p>
      </div>

      <div style={{ 
        background: 'var(--bg-card)', 
        border: '1px solid var(--border-color)', 
        borderRadius: '16px', 
        padding: '40px',
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {departments.map((dept, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <div style={{ width: '200px', fontWeight: 600, fontSize: '0.9rem' }}>{dept.name}</div>
              <div style={{ flexGrow: 1, background: 'var(--border-color)', height: '24px', borderRadius: '12px', overflow: 'hidden' }}>
                <div style={{ 
                  height: '100%', 
                  width: `${dept.score}%`, 
                  background: 'var(--accent-color)', 
                  opacity: dept.score / 100 + 0.2, // Visual differentiation based on score
                  transition: 'width 1s ease-out'
                }}></div>
              </div>
              <div style={{ width: '40px', textAlign: 'right', fontWeight: 600, color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                {dept.score}
              </div>
            </div>
          ))}
        </div>
        
        <div style={{ marginTop: '30px', textAlign: 'center', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
          * scores based on active ai representatives, completed workshops, and participant volume.
        </div>
      </div>
    </div>
  );
}
