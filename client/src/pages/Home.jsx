import React from 'react';
import AppButton from '../components/core/AppButton';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <div style={{ padding: '60px 0', maxWidth: '800px' }}>
        <h1 style={{ fontSize: '3.5rem', marginBottom: '24px', lineHeight: '1.2' }}>
          the vision of ai literacy.
        </h1>
        <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', marginBottom: '40px', lineHeight: '1.8' }}>
          the ai house at the university of blida 1 serves as the central hub for advancing artificial intelligence integration across all disciplines. our mission is to empower faculties, train representatives, and build a robust, interconnected digital ecosystem.
        </p>
        
        <div style={{ display: 'flex', gap: '20px' }}>
          <AppButton onClick={() => navigate('/activities')}>
            explore workshops <ArrowRight size={18} />
          </AppButton>
          <AppButton variant="secondary" onClick={() => navigate('/network')}>
            meet the human network
          </AppButton>
        </div>
      </div>
      
      <div style={{ marginTop: '60px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
        <div style={{ background: 'var(--bg-card)', padding: '30px', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
          <h2 style={{ fontSize: '1.8rem', marginBottom: '16px' }}>the training hub</h2>
          <p style={{ color: 'var(--text-secondary)' }}>a centralized database of all past and future activities including workshops, seminars, and competitions.</p>
        </div>
        <div style={{ background: 'var(--bg-card)', padding: '30px', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
          <h2 style={{ fontSize: '1.8rem', marginBottom: '16px' }}>the human network</h2>
          <p style={{ color: 'var(--text-secondary)' }}>profiles of organizers, instructors, and participants from various departments driving the ai transition.</p>
        </div>
      </div>
    </div>
  );
}
