import React, { useState } from 'react';
import EventCard from '../components/core/EventCard';
import SmartInput from '../components/core/SmartInput';
import { Search } from 'lucide-react';

export default function Activities() {
  const [search, setSearch] = useState('');
  
  const mockEvents = [
    { title: 'intro to python for biologists', audience: 'general public', department: 'biology dept', status: 'upcoming', date: 'oct 15, 2026', time: '10:00 am', location: 'webinar', speaker: 'dr. yassine' },
    { title: 'data science for economics', audience: 'department representatives', department: 'economics dept', status: 'proposed', date: 'nov 02, 2026', time: '14:00 pm', location: 'hall b', speaker: 'prof. nadia' },
    { title: 'automation in mechanical eng', audience: 'students', department: 'mechanical eng', status: 'completed', date: 'sep 10, 2026', time: '09:00 am', location: 'main auditorium', speaker: 'dr. karim' },
  ];

  const filtered = mockEvents.filter(e => 
    e.title.toLowerCase().includes(search.toLowerCase()) || 
    e.department.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container">
      <div style={{ marginBottom: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '20px' }}>
        <div>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>the training hub</h1>
          <p style={{ color: 'var(--text-secondary)' }}>explore and register for ai activities across the university.</p>
        </div>
        
        <div style={{ minWidth: '300px' }}>
          <SmartInput 
            placeholder="search by topic or department..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
        {filtered.map((evt, i) => (
          <EventCard key={i} event={evt} />
        ))}
      </div>
    </div>
  );
}
