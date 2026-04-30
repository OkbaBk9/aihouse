import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import styles from './MainLayout.module.css';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

export default function MainLayout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const { user } = useAuth();

  const links = [
    { name: 'the vision', path: '/' },
    { name: 'training hub', path: '/activities' },
    { name: 'human network', path: '/network' },
    { name: 'heatmap', path: '/heatmap' },
  ];

  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <div className={`container ${styles.headerInner}`}>
          <Link to="/" className={styles.logo}>
            ai house<span className={styles.logoAccent}>.</span>
          </Link>
          
          <nav className={`${styles.nav} ${menuOpen ? styles.navOpen : ''}`}>
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
            {user ? (
               <Link to="/dashboard" onClick={() => setMenuOpen(false)} className={styles.navLink} style={{ color: 'var(--accent-color)', fontWeight: 600 }}>dashboard</Link>
            ) : (
               <Link to="/auth/login" onClick={() => setMenuOpen(false)} className={styles.navLink} style={{ color: 'var(--accent-color)', fontWeight: 600 }}>log in</Link>
            )}
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
        <div className="container">
          <div className={styles.footerInner}>
            <p>&copy; {new Date().getFullYear()} University of Blida 1. AI House Digital Ecosystem.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
