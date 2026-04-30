import React, { useState } from 'react';
import SmartInput from '../../components/core/SmartInput';
import AppButton from '../../components/core/AppButton';

export function Privacy() {
  return (
    <div className="container" style={{ maxWidth: '800px', padding: '40px 20px' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>privacy policy.</h1>
      <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
        <p style={{ marginBottom: '20px' }}>At AI House (University of Blida 1), we are committed to protecting your privacy. This policy outlines our practices regarding data collection and usage.</p>
        <h2 style={{ fontSize: '1.2rem', margin: '30px 0 10px', color: 'var(--text-primary)' }}>data collection</h2>
        <p style={{ marginBottom: '20px' }}>We only collect information necessary to manage workshops and track AI representation within the university, including name, email, and departmental affiliation.</p>
        <h2 style={{ fontSize: '1.2rem', margin: '30px 0 10px', color: 'var(--text-primary)' }}>data usage</h2>
        <p>Your data is used strictly for internal academic organization and is not shared with external third parties.</p>
      </div>
    </div>
  );
}

export function Contact() {
  const [loading, setLoading] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); alert('Message sent!'); }, 800);
  };

  return (
    <div className="container" style={{ maxWidth: '600px', padding: '40px 20px' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>contact us.</h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '10px' }}>have questions about the ai house? reach out to the organizing committee.</p>
        <p style={{ fontWeight: 600, marginBottom: '30px' }}>E-mail: maison_ia@univ-blida.dz</p>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
        <SmartInput label="Your Name" name="name" required />
        <SmartInput label="Email Address" type="email" name="email" required />
        <SmartInput label="Message" type="textarea" name="message" required />
        <AppButton type="submit" loading={loading} style={{ marginTop: '20px', alignSelf: 'flex-start' }}>send message</AppButton>
      </form>
    </div>
  );
}
