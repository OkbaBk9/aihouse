import React from 'react';
import { Loader2 } from 'lucide-react';
import styles from './AppButton.module.css';

export default function AppButton({ children, variant = 'primary', onClick, className = '', type = 'button', loading = false, disabled = false }) {
  const baseClass = `${styles.btn} ${styles[variant]} ${className} ${disabled || loading ? styles.disabled : ''}`;
  
  return (
    <button type={type} className={baseClass} onClick={onClick} disabled={disabled || loading}>
      {loading ? <Loader2 size={18} className={styles.spin} /> : null}
      {children}
    </button>
  );
}
