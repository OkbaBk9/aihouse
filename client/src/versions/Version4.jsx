import { Calendar, MapPin, User } from 'lucide-react';
import styles from './Version4.module.css';

export default function Version4() {
  const events = [
    { title: 'neural networks fundamentals', status: 'upcoming', date: 'oct 15, 2026', location: 'hall a', speaker: 'dr. yassine' },
    { title: 'ai in healthcare panel', status: 'completed', date: 'sep 22, 2026', location: 'main auditorium', speaker: 'prof. amine' },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.maxW}>
        <header className={styles.header}>
          <div className={styles.logo}>ai house.</div>
        </header>

        <main>
          <h1 className={styles.pageTitle}>departmental ai activities</h1>
          
          <div className={styles.cardGrid}>
            {events.map((evt, i) => (
              <div key={i} className={styles.card}>
                <div className={styles.cardStatus}>{evt.status}</div>
                <h2 className={styles.cardTitle}>{evt.title}</h2>
                
                <div className={styles.cardBody}>
                  <div className={styles.dataRow}>
                    <Calendar size={16} color="#A0A0A0" /> {evt.date}
                  </div>
                  <div className={styles.dataRow}>
                    <MapPin size={16} color="#A0A0A0" /> {evt.location}
                  </div>
                  <div className={styles.dataRow}>
                    <User size={16} color="#A0A0A0" /> {evt.speaker}
                  </div>
                </div>

                <div className={styles.cardFooter}>
                  <button className={styles.btn}>view details</button>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
