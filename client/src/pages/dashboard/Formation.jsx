import React, { useState, useEffect } from 'react';
import EventCard from '../../components/core/EventCard';
import SmartInput from '../../components/core/SmartInput';

export default function Formation() {
  const [search, setSearch] = useState('');
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/activities')
      .then(res => res.json())
      .then(data => {
        const mappedData = data.map(evt => ({
          _id: evt._id,
          title: evt.title?.toLowerCase(),
          audience: 'university members',
          department: evt.department?.replace('_', ' '),
          status: evt.status,
          date: new Date(evt.scheduled_date).toLocaleDateString(),
          time: 'check schedule',
          location: evt.location,
          speaker: 'ai house staff'
        }));
        setEvents(mappedData);
        setLoading(false);
      })
      .catch(err => {
        console.error('Fetch error:', err);
        setLoading(false);
      });
  }, []);

  const filtered = events.filter(e => 
    e.title?.toLowerCase().includes(search.toLowerCase()) || 
    e.department?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container" style={{ padding: '40px 0' }}>
      <div style={{ marginBottom: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '20px' }}>
        <div>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>the training hub</h1>
          <p style={{ color: 'var(--text-secondary)' }}>explore and register for internal ai activities across the university.</p>
        </div>
        
        <div style={{ minWidth: '300px' }}>
          <SmartInput 
            placeholder="search by topic or department..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <p>loading activities from database...</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
          {filtered.length > 0 ? filtered.map((evt, i) => (
            <EventCard key={i} event={evt} />
          )) : <p>no activities found in the database.</p>}
        </div>
      )}
    </div>
  );
}
