import styles from './Version3.module.css';

export default function Version3() {
  const events = [
    { title: 'Neural Networks Fundamentals', status: 'Upcoming', date: '15 Oct, 2026', location: 'Hall A', speaker: 'Dr. Yassine' },
    { title: 'AI in Healthcare Panel', status: 'Completed', date: '22 Sep, 2026', location: 'Main Auditorium', speaker: 'Prof. Amine' },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.maxW}>
        <header className={styles.header}>
          <div className={styles.logo}>AI House</div>
          <div className={styles.date}>Vol. 1 &mdash; 2026</div>
        </header>

        <main>
          <h1 className={styles.pageTitle}>Bulletin of Departmental AI Activities</h1>
          
          <div className={styles.cardGrid}>
            {events.map((evt, i) => (
              <div key={i} className={styles.card}>
                <div>
                  <div className={styles.cardStatus}>{evt.status}</div>
                </div>
                
                <div>
                  <h2 className={styles.cardTitle}>{evt.title}</h2>
                </div>

                <div className={styles.cardFooter}>
                  <div className={styles.cardMeta}>
                     <div className={styles.metaItem}>
                       <span className={styles.metaLabel}>Date</span>
                       <span>{evt.date}</span>
                     </div>
                     <div className={styles.metaItem}>
                       <span className={styles.metaLabel}>Venue</span>
                       <span>{evt.location}</span>
                     </div>
                     <div className={styles.metaItem}>
                       <span className={styles.metaLabel}>Speaker</span>
                       <span>{evt.speaker}</span>
                     </div>
                  </div>
                  <button className={styles.btn}>
                    Read More &rarr;
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
