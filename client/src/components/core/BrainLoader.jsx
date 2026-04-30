import React from 'react';
import { Brain } from 'lucide-react';

export default function BrainLoader() {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(255, 255, 255, 0.98)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 10000,
    }}>
      <div style={{ 
        color: 'var(--accent-color)',
        animation: 'spinY 1.5s infinite ease-in-out'
      }}>
        <Brain size={80} />
      </div>
      
      <p style={{
        marginTop: '20px',
        color: 'var(--accent-color)',
        fontWeight: 600,
        fontSize: '0.9rem',
        letterSpacing: '1px'
      }}>
        L O A D I N G . . .
      </p>

      <style>{`
        @keyframes spinY {
          from { transform: rotateY(0deg); }
          to { transform: rotateY(360deg); }
        }
      `}</style>
    </div>
  );
}
