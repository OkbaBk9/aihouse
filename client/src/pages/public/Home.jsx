import React, { useState, useEffect } from 'react';
import { ArrowRight, Globe, Users, GraduationCap, Building2, Plane, ImageIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import AppButton from '../../components/core/AppButton';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';

// ─── HERO CAROUSEL COMPONENT ──────────────────────────────────────────────────
// ─── HERO CAROUSEL COMPONENT ──────────────────────────────────────────────────
function HeroCarousel() {
  const images = [
    {
      url: '/images/library.png',
      label: 'Main Library & Campus, University of Blida 1'
    },
    {
      url: '/images/crowd.png',
      label: 'Student Engagement & Community'
    },
    {
      url: '/images/ai expo poster.png',
      label: 'AI Expo 2026 Official Poster'
    },
    {
      url: '/images/pystepworkshop.png',
      label: 'PyStep AI Workshop Series'
    }
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [images.length]);

  const next = () => setCurrent((prev) => (prev + 1) % images.length);
  const prev = () => setCurrent((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: '450px',
      borderRadius: '24px',
      overflow: 'hidden',
      boxShadow: 'var(--shadow-sm)',
      border: '1px solid var(--border-color)',
      background: '#f8f9fa'
    }}>
      {images.map((img, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            opacity: i === current ? 1 : 0,
            transition: 'opacity 1s ease-in-out',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <img
            src={img.url}
            alt={img.label}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
            onError={(e) => {
              e.target.style.display = 'none';
              if (e.target.nextSibling) e.target.nextSibling.style.display = 'flex';
            }}
          />
          <div style={{
            display: 'none',
            width: '100%',
            height: '100%',
            background: 'linear-gradient(135deg, #001a66 0%, #0033cc 100%)',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            flexDirection: 'column',
            gap: '12px'
          }}>
            <ImageIcon size={48} strokeWidth={1} />
            <span style={{ fontSize: '0.9rem', opacity: 0.7 }}>{img.label}</span>
          </div>
          
          {/* Label Overlay */}
          <div style={{
            position: 'absolute',
            bottom: '20px',
            left: '20px',
            right: '20px',
            padding: '12px 20px',
            background: 'rgba(0,0,0,0.5)',
            backdropFilter: 'blur(10px)',
            borderRadius: '12px',
            color: '#fff',
            fontSize: '0.85rem',
            fontWeight: 500,
            textAlign: 'center'
          }}>
            {img.label}
          </div>
        </div>
      ))}

      {/* Controls */}
      <button onClick={prev} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.2)', border: 'none', color: '#fff', padding: '10px', borderRadius: '50%', cursor: 'pointer', backdropFilter: 'blur(5px)', zIndex: 10 }}><ChevronLeft size={24} /></button>
      <button onClick={next} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.2)', border: 'none', color: '#fff', padding: '10px', borderRadius: '50%', cursor: 'pointer', backdropFilter: 'blur(5px)', zIndex: 10 }}><ChevronRight size={24} /></button>

      {/* Dots */}
      <div style={{ position: 'absolute', bottom: '10px', width: '100%', display: 'flex', justifyContent: 'center', gap: '8px', zIndex: 10 }}>
        {images.map((_, i) => (
          <div key={i} onClick={() => setCurrent(i)} style={{ width: '8px', height: '8px', borderRadius: '50%', background: i === current ? '#fff' : 'rgba(255,255,255,0.5)', cursor: 'pointer', transition: '0.3s' }} />
        ))}
      </div>
    </div>
  );
}

// ─── REUSABLE IMAGE PLACEHOLDER (NOW SUPPORTS REAL IMAGES) ────────────────────
function ImgPlaceholder({ height = 180, label = 'image', src }) {
  if (src) {
    return (
      <div style={{ width: '100%', height, overflow: 'hidden', marginBottom: '16px', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
        <img 
          src={src} 
          alt={label} 
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.parentElement.style.display = 'flex';
          }}
        />
      </div>
    );
  }

  return (
    <div style={{
      width: '100%',
      height,
      background: 'linear-gradient(135deg, #f0f4ff 0%, #e8eeff 100%)',
      border: '1.5px dashed #b0bfff',
      borderRadius: '10px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      color: '#8899cc',
      marginBottom: '16px',
      flexShrink: 0,
    }}>
      <ImageIcon size={28} strokeWidth={1.5} />
      <span style={{ fontSize: '0.75rem', fontWeight: 500, letterSpacing: '0.5px' }}>{label}</span>
    </div>
  );
}

export default function Home() {
  const navigate = useNavigate();
  const { t, lang } = useLanguage();

  const newsArr = [
    { tag: 'ai expo 2026 — april 16', title: 'university 4.0 week & ia expo', desc: 'the ai house invites students and researchers to participate in seminars on prompt engineering, notebookLm, and the student ai projects expo at the grand conference hall, sponsored by rami.', img: '/images/conference.png' },
    { tag: 'pedagogical ai', title: 'study day on pedagogical ai & e-learning', desc: 'blida 1 enhances its leadership by organizing a study day on artificial intelligence in pedagogy and e-learning.', img: '/images/seminar.png' },
    { tag: 'national coordination', title: 'coordination meeting for central region universities', desc: 'a strategic coordination meeting with participation of university of blida 1 to align policies across the central region.', img: '/images/crowd.png' },
    { tag: 'innovation award', title: "rector attends president's award for innovative researcher", desc: "the rector of the university of blida 1 attends the president of the republic's award ceremony for the innovative researcher.", img: '/images/award.png' },
  ];

  const blogsArr = [
    { title: 'prompt engineering workshop', desc: 'master the art of dialogue with smart models. extract precise results for your projects through university 4.0 training.', img: '/images/pystepworkshop.png' },
    { title: 'the it community scientific club', desc: 'the club in the cs department is driving student engagement in algorithmic challenges. contact: contact.itc.blida@gmail.com', img: '/images/library.png' },
    { title: 'applied chemistry masters exhibition', desc: 'the first exhibition for applied chemistry masters students showcasing innovation at blida 1.', img: '/images/event.png' },
    { title: 'notebookLm for study efficiency', desc: 'discover how to organize your references and lessons intelligently to multiply your academic productivity.', img: '/images/crowd.png' },
  ];

  return (
    <div className="container">
      {/* Hero Section - Split Layout */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', 
        gap: '40px', 
        alignItems: 'center',
        padding: '60px 0 80px' 
      }}>
        <div className="fade-in-up">
          <h1 style={{ fontSize: lang === 'ar' ? '4rem' : '3.5rem', marginBottom: '24px', lineHeight: '1.1', textTransform: 'lowercase' }}>
            {t('hero_title')}
          </h1>
          <p style={{ fontSize: '1.15rem', color: 'var(--text-secondary)', marginBottom: '40px', lineHeight: '1.8' }}>
            {t('hero_subtitle')}
          </p>
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
            <AppButton onClick={() => navigate('/auth/register')}>
              {t('join_btn')} <ArrowRight size={18} style={{ transform: lang === 'ar' ? 'rotate(180deg)' : 'none' }} />
            </AppButton>
            <AppButton variant="secondary" onClick={() => navigate('/discover')}>
              {t('discover_btn')}
            </AppButton>
          </div>
        </div>

        <div className="fade-in-up-d2">
          <HeroCarousel />
        </div>
      </div>

      {/* Members */}
      <div className="fade-in-up-d3" style={{ padding: '60px 0', borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '10px' }}>{t('reps_title')}</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '40px' }}>{lang === 'ar' ? 'تحت رئاسة البروفيسور بن عمر شننان، تقود اللجنة التنظيمية استراتيجية الذكاء الاصطناعي.' : 'under the chairmanship of pr. benomar cheknane, the organizing committee leads the ai strategy.'}</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
          {[
            { name: 'prof. m. lagha', role: 'ai house member' },
            { name: 'prof. m. fareh', role: 'ai house member' },
            { name: 'dr. f. boumahdi', role: 'ai house member' },
            { name: 'dr. h. ykhlef', role: 'ai house member' },
            { name: 'dr. m. mezzi', role: 'ai house member' },
            { name: 'dr. imane cherfa', role: 'speaker, cs dept' },
            { name: 'mr. karim hemmina', role: 'phd student, cs dept' },
          ].map((m, i) => (
            <div key={i} className="card-hover" style={{ padding: '24px', background: 'var(--bg-card)', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--accent-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: '1.1rem', marginBottom: '14px' }}>
                {m.name.split('.').pop().trim().charAt(0).toUpperCase()}
              </div>
              <h3 style={{ fontSize: '1.1rem', margin: '0 0 6px' }}>{m.name}</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{m.role}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Grid News / Blogs */}
      <div className="fade-in-up-d4" style={{ padding: '60px 0', borderTop: '1px solid var(--border-color)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '40px' }}>

        {/* NEWS */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '30px' }}>
            <h2 style={{ fontSize: '2rem', margin: 0 }}>{t('news_title')}</h2>
            <AppButton variant="secondary" onClick={() => navigate('/news')}>{lang === 'en' ? 'view all' : 'عرض الكل'}</AppButton>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {newsArr.map((n, i) => (
              <div key={i} className="card-hover" style={{ border: '1px solid var(--border-color)', borderRadius: '12px', cursor: 'pointer', overflow: 'hidden' }} onClick={() => navigate('/news')}>
                <ImgPlaceholder height={140} label={n.title} src={n.img} />
                <div style={{ padding: '0 20px 20px' }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--accent-color)', fontWeight: 600 }}>{n.tag}</span>
                  <h4 style={{ fontSize: '1.1rem', margin: '8px 0' }}>{n.title}</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{n.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* BLOGS */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '30px' }}>
            <h2 style={{ fontSize: '2rem', margin: 0 }}>{t('blogs_title')}</h2>
            <AppButton variant="secondary" onClick={() => navigate('/blogs')}>{lang === 'en' ? 'view all' : 'عرض الكل'}</AppButton>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {blogsArr.map((b, i) => (
              <div key={i} className="card-hover" style={{ border: '1px solid var(--border-color)', borderRadius: '12px', cursor: 'pointer', overflow: 'hidden' }} onClick={() => navigate('/blogs')}>
                <ImgPlaceholder height={140} label={b.title} src={b.img} />
                <div style={{ padding: '0 20px 20px' }}>
                  <h4 style={{ fontSize: '1.1rem', margin: '0 0 8px' }}>{b.title}</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
