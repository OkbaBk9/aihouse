import React from 'react';
import { Radar } from 'react-chartjs-2';
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js';
import { Activity, Users, CheckCircle, BookOpen } from 'lucide-react';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

export default function Heatmap() {
  const radarData = {
    labels: ['Computer Science', 'Mathematics', 'Physics', 'Biology', 'Mechanical Eng.', 'Economics', 'Architecture', 'Aeronautics'],
    datasets: [
      {
        label: 'Workshops Completed',
        data: [12, 8, 5, 4, 2, 1, 3, 6],
        backgroundColor: 'rgba(0, 85, 255, 0.15)',
        borderColor: '#0055FF',
        borderWidth: 2,
        pointBackgroundColor: '#0055FF',
      },
      {
        label: 'Active Representatives',
        data: [4, 3, 2, 1, 1, 0, 2, 3],
        backgroundColor: 'rgba(0, 0, 0, 0.06)',
        borderColor: '#000',
        borderWidth: 2,
        pointBackgroundColor: '#000',
      }
    ]
  };

  const radarOptions = {
    responsive: true,
    plugins: { legend: { position: 'bottom' } },
    scales: {
      r: {
        beginAtZero: true,
        ticks: { stepSize: 2, font: { size: 11 } },
        pointLabels: { font: { size: 12, family: 'Outfit' } },
        grid: { color: '#E5E5E5' }
      }
    }
  };

  return (
    <div className="container fade-in-up" style={{ padding: '40px 0' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>analytics & heatmap</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '40px' }}>detailed metrics of ai adoption across the university of blida 1.</p>

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '40px' }}>
        {[
          { icon: <Activity size={24}/>, value: '32', label: 'total workshops run', color: 'var(--accent-color)' },
          { icon: <Users size={24}/>, value: '11', label: 'active ai representatives', color: 'var(--accent-color)' },
          { icon: <CheckCircle size={24}/>, value: '85%', label: 'training completion rate', color: '#00aa00' },
          { icon: <BookOpen size={24}/>, value: '8', label: 'departments engaged', color: 'var(--accent-color)' },
        ].map((kpi, i) => (
          <div key={i} className="card-hover" style={{ padding: '24px', background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '12px' }}>
            <div style={{ color: kpi.color, marginBottom: '10px' }}>{kpi.icon}</div>
            <div style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '5px' }}>{kpi.value}</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{kpi.label}</div>
          </div>
        ))}
      </div>

      {/* Radar Chart */}
      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '16px', padding: '40px' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '30px' }}>department adoption radar</h2>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <Radar data={radarData} options={radarOptions} />
        </div>
      </div>

      {/* Bar Breakdown */}
      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '16px', padding: '40px', marginTop: '30px' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '30px' }}>department scores</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {[
            { name: 'computer science', score: 95, workshops: 12, reps: 4 },
            { name: 'aeronautics', score: 75, workshops: 6, reps: 3 },
            { name: 'mathematics', score: 70, workshops: 8, reps: 3 },
            { name: 'physics', score: 55, workshops: 5, reps: 2 },
            { name: 'biology', score: 45, workshops: 4, reps: 1 },
            { name: 'architecture', score: 35, workshops: 3, reps: 2 },
            { name: 'mechanical engineering', score: 30, workshops: 2, reps: 1 },
            { name: 'economics', score: 15, workshops: 1, reps: 0 },
          ].map((dept, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <div style={{ width: '250px' }}>
                <span style={{ fontWeight: 600, fontSize: '0.9rem', display: 'block' }}>{dept.name}</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{dept.workshops} workshops | {dept.reps} reps</span>
              </div>
              <div style={{ flexGrow: 1, background: 'var(--border-color)', height: '24px', borderRadius: '12px', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${dept.score}%`, background: 'var(--accent-color)', opacity: dept.score / 100 + 0.2, transition: 'width 1s ease-out' }}></div>
              </div>
              <div style={{ width: '40px', textAlign: 'right', fontWeight: 600, color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{dept.score}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
