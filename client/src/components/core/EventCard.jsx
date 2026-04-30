import React, { useState } from 'react';
import { Calendar, MapPin, Users, Download, CheckCircle } from 'lucide-react';
import StatusBadge from './StatusBadge';
import AppButton from './AppButton';
import styles from './EventCard.module.css';
import { useAuth } from '../../context/AuthContext';

export default function EventCard({ event }) {
  const isPast = event.status.toLowerCase() === 'completed' || event.status.toLowerCase() === 'past';
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [enrolled, setEnrolled] = useState(event.isEnrolled || false);

  const handleRegister = async () => {
    if (!user || !event._id) return;
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/enrollments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: user.id,
          activity_id: event._id,
          status: 'registered'
        })
      });
      if (res.ok) {
        setEnrolled(true);
      }
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <StatusBadge status={event.status} />
        {event.audience && <span className={styles.audience}>{event.audience}</span>}
      </div>
      
      <h3 className={styles.title}>{event.title}</h3>
      <p className={styles.department}>{event.department}</p>
      
      <div className={styles.details}>
        <div className={styles.detailRow}>
          <Calendar size={16} /> <span>{event.date} • {event.time}</span>
        </div>
        <div className={styles.detailRow}>
          <MapPin size={16} /> <span>{event.location}</span>
        </div>
        <div className={styles.detailRow}>
          <Users size={16} /> <span>{event.speaker}</span>
        </div>
      </div>

      <div className={styles.footer}>
        {isPast ? (
          <AppButton variant="secondary" className={styles.fullWidth}>
            <Download size={16} /> resource.pdf
          </AppButton>
        ) : enrolled ? (
          <AppButton variant="secondary" className={styles.fullWidth} style={{ color: '#00aa00' }}>
            <CheckCircle size={16} /> registered
          </AppButton>
        ) : (
          <AppButton variant="primary" className={styles.fullWidth} onClick={handleRegister} loading={loading}>
            register now
          </AppButton>
        )}
      </div>
    </div>
  );
}
