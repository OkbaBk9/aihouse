import React from 'react';
import styles from './SmartInput.module.css';

export default function SmartInput({ label, name, type = 'text', placeholder, value, onChange, error, required, options = [], disabled = false }) {
  return (
    <div className={styles.container}>
      {label && <label htmlFor={name} className={styles.label}>{label} {required && '*'}</label>}
      {type === 'textarea' ? (
        <textarea
          id={name}
          name={name}
          className={`${styles.input} ${styles.textarea} ${error ? styles.errorInput : ''}`}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          disabled={disabled}
          rows={4}
        />
      ) : type === 'select' ? (
         <select
          id={name}
          name={name}
          className={`${styles.input} ${error ? styles.errorInput : ''}`}
          value={value}
          onChange={onChange}
          required={required}
          disabled={disabled}
         >
           {placeholder && <option value="" disabled>{placeholder}</option>}
           {options.map((opt, i) => (
             <option key={i} value={opt.value || opt}>{opt.label || opt}</option>
           ))}
         </select>
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          className={`${styles.input} ${error ? styles.errorInput : ''}`}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          disabled={disabled}
        />
      )}
      {error && <span className={styles.errorText}>{error}</span>}
    </div>
  );
}
