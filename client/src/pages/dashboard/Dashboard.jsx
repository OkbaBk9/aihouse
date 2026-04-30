import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import { BookOpen, Users, BarChart3, FileText, Shield, Settings } from 'lucide-react';

export default function Dashboard() {
  const { user } = useAuth();

  const cards = [
    { title: 'profile', desc: 'manage your identity, avatar, and ai focus.', to: '/dashboard/profile', icon: <Settings size={22} />, roles: ['admin','organizer','student','rectorate','lecturer_rep','participant'] },
    { title: 'formation & training', desc: 'browse and manage ai workshops.', to: '/dashboard/formation', icon: <BookOpen size={22} />, roles: ['admin','organizer','student','rectorate','lecturer_rep','participant'] },
    { title: 'human network', desc: 'meet the ai representatives.', to: '/dashboard/network', icon: <Users size={22} />, roles: ['admin','organizer','student','rectorate','lecturer_rep','participant'] },
    { title: 'analytics & heatmap', desc: 'detailed radar and metrics.', to: '/dashboard/heatmap', icon: <BarChart3 size={22} />, roles: ['admin','organizer','rectorate'] },
    { title: 'workshop management', desc: 'create and manage your workshops.', to: '/dashboard/workshops', icon: <FileText size={22} />, roles: ['admin','organizer','lecturer_rep'] },
    { title: 'my courses', desc: 'access enrolled workshops and materials.', to: '/dashboard/courses', icon: <BookOpen size={22} color="#00aa00" />, roles: ['student','participant'] },
    { title: 'admin validation', desc: 'approve representatives and events.', to: '/dashboard/admin/users', icon: <Shield size={22} color="var(--accent-color)" />, roles: ['admin','rectorate'] },
    { title: 'rectorate overview', desc: 'university-level reports and governance.', to: '/dashboard/rectorate', icon: <BarChart3 size={22} color="#ff8c00" />, roles: ['rectorate','admin'] },
    { title: 'content management', desc: 'manage announcements, blogs, and landing.', to: '/dashboard/admin/content', icon: <FileText size={22} color="#0055ff" />, roles: ['admin'] },
  ];

  const visible = cards.filter(c => c.roles.includes(user?.role));

  return (
    <div className="container fade-in-up" style={{ padding: '40px 0' }}>
      <div style={{ marginBottom: '30px' }}>
        <h1 style={{ fontSize: '2.5rem', margin: 0 }}>welcome, {user?.name?.toLowerCase()}.</h1>
        <p style={{ color: 'var(--text-secondary)' }}>role: <strong>{user?.role}</strong></p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
        {visible.map((card, i) => (
          <Link key={i} to={card.to} className="card-hover" style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', padding: '24px', background: 'var(--bg-card)', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
            <div style={{ marginTop: '2px' }}>{card.icon}</div>
            <div>
              <h2 style={{ fontSize: '1.15rem', marginBottom: '6px' }}>{card.title}</h2>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{card.desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
