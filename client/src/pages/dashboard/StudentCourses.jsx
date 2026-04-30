import React, { useState, useEffect } from 'react';
import { BookOpen, FileText, CheckCircle, Clock } from 'lucide-react';
import AppButton from '../../components/core/AppButton';
import { useAuth } from '../../context/AuthContext';

export default function StudentCourses() {
  const { user } = useAuth();
  const [enrolled, setEnrolled] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.id) {
      fetch(`http://localhost:5000/api/enrollments?user_id=${user.id}`)
        .then(res => res.json())
        .then(data => {
          setEnrolled(data);
          setLoading(false);
        })
        .catch(err => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [user]);

  if (loading) return <div className="container" style={{ padding: '40px 0' }}>Loading your courses...</div>;

  return (
    <div className="container fade-in-up" style={{ padding: '40px 0' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>my courses</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '40px' }}>your enrolled workshops, materials, and progress.</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {enrolled.length === 0 ? (
          <p>You haven't enrolled in any courses yet.</p>
        ) : enrolled.map((enrollment, i) => {
          const course = enrollment.activity_id;
          if (!course) return null;
          const isCompleted = enrollment.status === 'completed';
          const progress = isCompleted ? 100 : enrollment.status === 'attended' ? 80 : 20;
          
          return (
            <div key={i} className="card-hover" style={{
              padding: '24px', background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '12px',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px'
            }}>
              <div style={{ flex: 1, minWidth: '250px' }}>
                <h3 style={{ fontSize: '1.2rem', margin: '0 0 8px' }}>{course.title}</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: '0 0 8px' }}>
                  <BookOpen size={14} style={{ verticalAlign: 'middle' }} /> {course.location} — {new Date(course.scheduled_date).toLocaleDateString()}
                </p>
                {/* Progress bar */}
                <div style={{ background: 'var(--border-color)', height: '8px', borderRadius: '4px', overflow: 'hidden', maxWidth: '300px' }}>
                  <div style={{ height: '100%', width: `${progress}%`, background: progress === 100 ? '#00aa00' : 'var(--accent-color)', transition: 'width 1s ease-out' }}></div>
                </div>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{progress}% complete</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{
                  display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '0.85rem', fontWeight: 600,
                  color: isCompleted ? '#00aa00' : progress > 20 ? 'var(--accent-color)' : '#ff8c00'
                }}>
                  {isCompleted ? <CheckCircle size={14} /> : <Clock size={14} />}
                  {enrollment.status}
                </span>
                {isCompleted && (
                  <AppButton variant="secondary" style={{ padding: '6px 14px', fontSize: '0.8rem' }}>
                    <FileText size={14} /> materials
                  </AppButton>
                )}
                {!isCompleted && (
                  <AppButton style={{ padding: '6px 14px', fontSize: '0.8rem' }}>continue</AppButton>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
