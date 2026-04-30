import { Calendar, MapPin, User, ArrowRight } from 'lucide-react';
import styles from './Version2.module.css';

export default function Version2() {
  const events = [
    { title: 'Neural Networks Fundamentals', status: 'Upcoming', date: 'Oct 15, 2026', location: 'Hall A', speaker: 'Dr. Yassine' },
    { title: 'AI in Healthcare Panel', status: 'Completed', date: 'Sep 22, 2026', location: 'Main Auditorium', speaker: 'Prof. Amine' },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.maxW}>
        <header className={styles.header}>
          <div className={styles.logo}>AI House</div>
        </header>

        <main>
          <h1 className={styles.pageTitle}>Departmental AI Activities.</h1>
          
          <div className={styles.cardGrid}>
            {events.map((evt, i) => (
              <div key={i} className={styles.card}>
                <div className={styles.cardStatus}>{evt.status}</div>
                <h2 className={styles.cardTitle}>{evt.title}</h2>
                
                <div className={styles.cardBody}>
                  <div className={styles.dataRow}>
                    <Calendar size={18} color="#D4A574" /> 
                    <span><strong>Date:</strong> {evt.date}</span>
                  </div>
                  <div className={styles.dataRow}>
                    <MapPin size={18} color="#D4A574" /> 
                    <span><strong>Location:</strong> {evt.location}</span>
                  </div>
                  <div className={styles.dataRow}>
                    <User size={18} color="#D4A574" /> 
                    <span><strong>Speaker:</strong> {evt.speaker}</span>
                  </div>
                </div>

                <div className={styles.cardFooter}>
                  <button className={styles.btn}>
                    View Details <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
