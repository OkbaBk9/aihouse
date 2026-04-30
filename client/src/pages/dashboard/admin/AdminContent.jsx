import React, { useState, useEffect } from 'react';
import AppButton from '../../../components/core/AppButton';
import SmartInput from '../../../components/core/SmartInput';
import { Trash2, Edit2, Plus } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';

export default function AdminContent() {
  const { user } = useAuth();
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ title: '', content: '', category: 'general', target_audience: 'all' });

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/announcements');
      const data = await res.json();
      setAnnouncements(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch('http://localhost:5000/api/announcements', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, author_id: user.id })
      });
      setFormData({ title: '', content: '', category: 'general', target_audience: 'all' });
      fetchAnnouncements();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/announcements/${id}`, { method: 'DELETE' });
      fetchAnnouncements();
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <div className="container" style={{ padding: '40px 0' }}>Loading content...</div>;

  return (
    <div className="container" style={{ padding: '40px 0' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '8px' }}>content management</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '40px' }}>manage landing page announcements and blog posts.</p>

      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '24px', marginBottom: '40px' }}>
        <h2 style={{ fontSize: '1.2rem', marginBottom: '20px' }}><Plus size={18} style={{ verticalAlign: 'middle', marginRight: '5px' }} /> publish new announcement</h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <SmartInput label="Title" name="title" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} required />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <SmartInput label="Category" type="select" options={['general', 'event', 'workshop', 'achievement', 'partnership', 'urgent']} value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} />
            <SmartInput label="Target Audience" type="select" options={['all', 'students', 'staff', 'organizers', 'rectorate']} value={formData.target_audience} onChange={e => setFormData({...formData, target_audience: e.target.value})} />
          </div>
          <SmartInput label="Content" type="textarea" value={formData.content} onChange={e => setFormData({...formData, content: e.target.value})} required />
          <AppButton type="submit" style={{ width: '200px' }}>Publish</AppButton>
        </form>
      </div>

      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '12px', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-color)', background: '#F0F0F0' }}>
              <th style={{ padding: '16px', fontWeight: 600, fontSize: '0.9rem' }}>Title</th>
              <th style={{ padding: '16px', fontWeight: 600, fontSize: '0.9rem' }}>Category</th>
              <th style={{ padding: '16px', fontWeight: 600, fontSize: '0.9rem' }}>Date</th>
              <th style={{ padding: '16px', fontWeight: 600, fontSize: '0.9rem', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {announcements.map(a => (
              <tr key={a._id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '16px', fontWeight: 500 }}>{a.title}</td>
                <td style={{ padding: '16px', color: 'var(--text-secondary)' }}>{a.category}</td>
                <td style={{ padding: '16px', color: 'var(--text-secondary)' }}>{new Date(a.published_at).toLocaleDateString()}</td>
                <td style={{ padding: '16px', textAlign: 'right' }}>
                  <AppButton variant="secondary" onClick={() => handleDelete(a._id)} style={{ padding: '6px 12px', fontSize: '0.8rem', color: 'red' }}>
                    <Trash2 size={14} style={{ verticalAlign: 'middle' }} /> Delete
                  </AppButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
