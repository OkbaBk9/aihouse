import { Calendar, MapPin, User, ChevronRight } from 'lucide-react';
import styles from './Version1.module.css';

export default function Version1() {
  const events = [
    { title: 'Neural Networks Fundamentals', status: 'Upcoming', date: 'Oct 15, 2026', location: 'Hall A', speaker: 'Dr. Yassine' },
    { title: 'AI in Healthcare Panel', status: 'Completed', date: 'Sep 22, 2026', location: 'Main Auditorium', speaker: 'Prof. Amine' },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.maxW}>
        <header className={styles.header}>
          <div className={styles.logo}>AI HOUSE</div>
        </header>

        <main>
          <h1 className={styles.pageTitle}>Departmental AI Activities</h1>
          
          <div className={styles.cardGrid}>
            {events.map((evt, i) => (
              <div key={i} className={styles.card}>
                <div className={styles.cardHeader}>
                  <div className={styles.cardStatus}>{evt.status}</div>
                  <h2 className={styles.cardTitle}>{evt.title}</h2>
                </div>
                
                <div className={styles.cardBody}>
                  <table className={styles.dataTable}>
                    <tbody>
                      <tr>
                        <td><Calendar size={16} /> Date</td>
                        <td>{evt.date}</td>
                      </tr>
                      <tr>
                        <td><MapPin size={16} /> Location</td>
                        <td>{evt.location}</td>
                      </tr>
                      <tr>
                        <td><User size={16} /> Speaker</td>
                        <td>{evt.speaker}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className={styles.cardFooter}>
                  <button className={styles.btn}>
                    View Details <ChevronRight size={16} style={{display: 'inline', verticalAlign: 'middle'}}/>
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
