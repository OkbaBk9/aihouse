import styles from './Version5.module.css';

export default function Version5() {
  const events = [
    { title: 'Neural Networks Fundamentals', status: 'Upcoming', date: 'Oct 15, 2026', location: 'Hall A', speaker: 'Dr. Yassine' },
    { title: 'AI in Healthcare Panel', status: 'Completed', date: 'Sep 22, 2026', location: 'Main Auditorium', speaker: 'Prof. Amine' },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.maxW}>
        <header className={styles.header}>
          <div className={styles.logo}>AI_HOUSE<span className={styles.logoAccent}>_</span></div>
        </header>

        <main>
          <h1 className={styles.pageTitle}>System Activities</h1>
          
          <div className={styles.cardGrid}>
            {events.map((evt, i) => (
              <div key={i} className={styles.card}>
                <div className={styles.cardStatus}>[{evt.status}]</div>
                <h2 className={styles.cardTitle}>{evt.title}</h2>
                
                <div className={styles.cardBody}>
                  <table className={styles.dataTable}>
                    <tbody>
                      <tr>
                        <td>Date</td>
                        <td>{evt.date}</td>
                      </tr>
                      <tr>
                        <td>Location</td>
                        <td>{evt.location}</td>
                      </tr>
                      <tr>
                        <td>Target</td>
                        <td>{evt.speaker}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div>
                  <button className={styles.btn}>Execute &gt;</button>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
