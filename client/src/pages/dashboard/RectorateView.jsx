import React from 'react';
import { BarChart3, Users, BookOpen, CheckCircle, AlertTriangle } from 'lucide-react';

export default function RectorateView() {
  return (
    <div className="container fade-in-up" style={{ padding: '40px 0' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>rectorate overview</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '40px' }}>university-level governance, reports, and strategic indicators.</p>

      {/* KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '40px' }}>
        {[
          { icon: <Users size={24}/>, value: '4', label: 'faculties', sub: '4 institutes', color: 'var(--accent-color)' },
          { icon: <BookOpen size={24}/>, value: '32', label: 'workshops delivered', sub: '2026 academic year', color: 'var(--accent-color)' },
          { icon: <CheckCircle size={24}/>, value: '11', label: 'validated reps', sub: 'across departments', color: '#00aa00' },
          { icon: <AlertTriangle size={24}/>, value: '3', label: 'pending proposals', sub: 'awaiting approval', color: '#ff8c00' },
        ].map((kpi, i) => (
          <div key={i} className="card-hover" style={{ padding: '24px', background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '12px' }}>
            <div style={{ color: kpi.color, marginBottom: '10px' }}>{kpi.icon}</div>
            <div style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '3px' }}>{kpi.value}</div>
            <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>{kpi.label}</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{kpi.sub}</div>
          </div>
        ))}
      </div>

      {/* Strategic Summary */}
      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '16px', padding: '30px', marginBottom: '30px' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '20px' }}>strategic summary</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {[
            'university 4.0 commitment confirmed at national strategic meeting.',
            'ai house organizing committee active under pr. benomar cheknane.',
            'ia expo 2026 successfully held on april 16 at the grand conference hall.',
            'train-the-trainer program active across 8 departments.',
            'expenditure rationalization and governance enhancement reforms underway.',
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
              <BarChart3 size={16} style={{ marginTop: '3px', color: 'var(--accent-color)', flexShrink: 0 }} />
              <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Faculty Compliance */}
      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '16px', padding: '30px' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '20px' }}>faculty compliance status</h2>
        <div style={{ overflow: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)', background: '#F0F0F0' }}>
                <th style={{ padding: '14px', fontWeight: 600, fontSize: '0.9rem' }}>Faculty / Institute</th>
                <th style={{ padding: '14px', fontWeight: 600, fontSize: '0.9rem' }}>AI Rep Assigned</th>
                <th style={{ padding: '14px', fontWeight: 600, fontSize: '0.9rem' }}>Workshops</th>
                <th style={{ padding: '14px', fontWeight: 600, fontSize: '0.9rem' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: 'Faculty of Sciences', rep: true, workshops: 12, status: 'compliant' },
                { name: 'Faculty of Technology', rep: true, workshops: 5, status: 'compliant' },
                { name: 'Institute of Aeronautics', rep: true, workshops: 6, status: 'compliant' },
                { name: 'Faculty of Medicine', rep: false, workshops: 0, status: 'non-compliant' },
                { name: 'Faculty of Nature & Life', rep: true, workshops: 4, status: 'compliant' },
                { name: 'Institute of Architecture', rep: true, workshops: 3, status: 'in progress' },
              ].map((f, i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '14px', fontWeight: 500 }}>{f.name}</td>
                  <td style={{ padding: '14px' }}>{f.rep ? '✓' : '✗'}</td>
                  <td style={{ padding: '14px' }}>{f.workshops}</td>
                  <td style={{ padding: '14px' }}>
                    <span style={{ fontSize: '0.85rem', fontWeight: 600, color: f.status === 'compliant' ? '#00aa00' : f.status === 'non-compliant' ? '#e60000' : '#ff8c00' }}>{f.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
