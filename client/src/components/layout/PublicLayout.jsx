import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import styles from './MainLayout.module.css';
import { Menu, X } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import LanguageSwitcher from '../core/LanguageSwitcher';

export default function PublicLayout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const { t, lang } = useLanguage();

  const links = [
    { name: t('home'), path: '/' },
    { name: t('discover'), path: '/discover' },
    { name: t('blogs'), path: '/blogs' },
    { name: t('news'), path: '/news' },
  ];

  return (
    <div className={styles.layout}>

      <header className={styles.header}>
        <div className={`container ${styles.headerInner}`} style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          flexDirection: lang === 'ar' ? 'row-reverse' : 'row'
        }}>
          {/* Auth Side */}
          <div style={{ display: 'flex', gap: '15px', alignItems: 'center', minWidth: '160px' }}>
            <Link to="/auth/login" style={{ fontSize: '0.9rem', fontWeight: 600 }}>{t('login')}</Link>
            <Link to="/auth/register" style={{ 
              fontSize: '0.9rem', 
              fontWeight: 600, 
              color: 'var(--accent-color)', 
              border: '1px solid var(--accent-color)', 
              padding: '6px 16px', 
              borderRadius: '20px' 
            }}>{t('signup')}</Link>
          </div>

          {/* Center: Logo */}
          <Link to="/" className={styles.logo} style={{ 
            fontSize: '1.6rem', 
            textAlign: 'center',
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)'
          }}>
            {lang === 'en' ? 'ai house' : 'دار الذكاء'}
            <span className={styles.logoAccent}>.</span>
            <span style={{ 
              display: 'block', 
              fontSize: '0.7rem', 
              fontWeight: 400, 
              color: 'var(--text-secondary)', 
              letterSpacing: lang === 'en' ? '2px' : '0px'
            }}>{t('footer_text')}</span>
          </Link>

          {/* Nav Side */}
          <nav className={`${styles.nav} ${menuOpen ? styles.navOpen : ''}`} style={{
            display: 'flex',
            gap: '20px',
            flexDirection: lang === 'ar' ? 'row-reverse' : 'row'
          }}>
            {links.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={`${styles.navLink} ${location.pathname === link.path ? styles.active : ''}`}
                onClick={() => setMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <LanguageSwitcher />
          </nav>

          <div className={styles.mobileToggle} onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </div>
        </div>
      </header>

      <main className={styles.main}>
        <Outlet />
      </main>

      <footer className={styles.footer}>
        <div className="container" style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          flexWrap: 'wrap', 
          gap: '10px',
          flexDirection: lang === 'ar' ? 'row-reverse' : 'row'
        }}>
          <p>&copy; {new Date().getFullYear()} {t('footer_text')}</p>
          <div style={{ display: 'flex', gap: '15px', flexDirection: lang === 'ar' ? 'row-reverse' : 'row' }}>
            <Link to="/privacy">{lang === 'en' ? 'privacy policy' : 'سياسة الخصوصية'}</Link>
            <Link to="/contact">{lang === 'en' ? 'contact' : 'اتصل بنا'}</Link>
            <a href="https://web.facebook.com/universite.blida1" target="_blank" rel="noopener noreferrer">facebook</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
