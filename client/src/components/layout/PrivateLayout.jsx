import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import styles from './MainLayout.module.css';
import { Menu, X, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import LanguageSwitcher from '../core/LanguageSwitcher';

export default function PrivateLayout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();
  const { t, lang } = useLanguage();

  const links = [
    { name: lang === 'en' ? 'dashboard' : 'لوحة التحكم', path: '/dashboard' },
    { name: lang === 'en' ? 'formation' : 'التكوين', path: '/dashboard/formation' },
    { name: lang === 'en' ? 'network' : 'الشبكة', path: '/dashboard/network' },
    { name: lang === 'en' ? 'heatmap' : 'الخريطة الحرارية', path: '/dashboard/heatmap' },
  ];

  if (user?.role === 'admin') {
    links.push({ name: lang === 'en' ? 'admin' : 'الإدارة', path: '/dashboard/admin/users' });
  }

  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <div className={`container ${styles.headerInner}`} style={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          flexDirection: lang === 'ar' ? 'row-reverse' : 'row'
        }}>
          <Link to="/dashboard" className={styles.logo}>
            {lang === 'en' ? 'ai house' : 'دار الذكاء'}
            <span className={styles.logoAccent}>.</span>
          </Link>
          
          <nav className={`${styles.nav} ${menuOpen ? styles.navOpen : ''}`} style={{
            display: 'flex',
            gap: '20px',
            flexDirection: lang === 'ar' ? 'row-reverse' : 'row'
          }}>
            {links.map(link => (
              <Link 
                key={link.path} 
                to={link.path}
                className={`${styles.navLink} ${(location.pathname === link.path || (link.path !== '/dashboard' && location.pathname.startsWith(link.path))) ? styles.active : ''}`}
                onClick={() => setMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Link 
              to="/dashboard/profile" 
              onClick={() => setMenuOpen(false)} 
              className={styles.navLink} 
              style={{ color: 'var(--accent-color)', fontWeight: 600 }}
            >
              {user?.name?.toLowerCase() || (lang === 'en' ? 'profile' : 'الملف الشخصي')}
            </Link>
            <LanguageSwitcher />
            <button 
              onClick={() => {
                logout();
                window.location.href = '/';
              }}
              style={{
                background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)',
                display: 'flex', alignItems: 'center', padding: '0 8px'
              }}
              title="Logout"
            >
              <LogOut size={20} />
            </button>
          </nav>

          <div className={styles.mobileToggle} onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </div>
        </div>
      </header>
      
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}
