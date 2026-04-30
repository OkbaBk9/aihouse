import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Brain } from 'lucide-react';

export default function LanguageSwitcher() {
  const { lang, toggleLanguage } = useLanguage();

  return (
    <button 
      onClick={toggleLanguage}
      style={{
        background: 'none',
        border: 'none',
        padding: 0,
        margin: 0,
        cursor: 'pointer',
        fontSize: '0.95rem',
        fontWeight: 600,
        textTransform: 'lowercase',
        color: 'var(--accent-color)', // Blue
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
        transition: 'opacity 0.2s ease',
      }}
      onMouseEnter={(e) => e.currentTarget.style.opacity = '0.8'}
      onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
    >
      {lang === 'en' ? 'ar' : 'en'}
    </button>
  );
}
