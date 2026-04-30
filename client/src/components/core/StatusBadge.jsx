import React from 'react';
import styles from './StatusBadge.module.css';

export default function StatusBadge({ status }) {
  const normStatus = status?.toLowerCase() || 'upcoming';
  
  let statusClass = styles.upcoming;
  if (normStatus === 'completed' || normStatus === 'past') statusClass = styles.completed;
  if (normStatus === 'proposed') statusClass = styles.proposed;
  if (normStatus === 'approved') statusClass = styles.approved;

  return (
    <span className={`${styles.badge} ${statusClass}`}>
      {status}
    </span>
  );
}
