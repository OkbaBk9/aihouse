import React from 'react';
import { ImageIcon } from 'lucide-react';

// ─── Reusable image placeholder ───────────────────────────────────────────────
// ─── Reusable image placeholder (NOW SUPPORTS REAL IMAGES) ────────────────────
function ImgPlaceholder({ height = 200, label = 'image', src }) {
  if (src) {
    return (
      <div style={{ width: '100%', height, overflow: 'hidden', marginBottom: '20px', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
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
      marginBottom: '20px',
      flexShrink: 0,
    }}>
      <ImageIcon size={32} strokeWidth={1.5} />
      <span style={{ fontSize: '0.75rem', fontWeight: 500, letterSpacing: '0.5px', textAlign: 'center', padding: '0 16px' }}>
        {label}
      </span>
    </div>
  );
}

// ─── DISCOVER ─────────────────────────────────────────────────────────────────
export function Discover() {
  return (
    <div className="container fade-in-up" style={{ padding: '80px 0', maxWidth: '900px' }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '20px' }}>discover the ecosystem.</h1>
      
      <ImgPlaceholder height={350} label="University of Blida 1 Campus" src="/images/library.png" />

      <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '50px' }}>
        the house of ai at the university of blida 1 is a strategic initiative driving the <strong>university 4.0</strong> paradigm shift.
        our ecosystem is built to train the trainers, ensuring every department has dedicated ai representatives capable of elevating the technological literacy of their respective fields.
      </p>

      {/* Organizing Committee */}
      <div className="fade-in-up-d1">
        <h2 style={{ fontSize: '2rem', margin: '0 0 20px 0' }}>organizing committee</h2>
        <div style={{ padding: '20px', background: 'var(--accent-color)', color: '#fff', borderRadius: '12px', marginBottom: '30px' }}>
          <strong style={{ color: '#fff' }}>chairman:</strong> pr. benomar cheknane — university of blida 1
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '15px', marginBottom: '40px' }}>
          {['prof. m. lagha','prof. m. fareh','dr. f. boumahdi','dr. h. ykhlef','dr. m. mezzi'].map((m, i) => (
            <div key={i} className="card-hover" style={{ padding: '15px', background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '8px', fontWeight: 500 }}>{m}</div>
          ))}
        </div>
      </div>

      {/* University Houses & Incubators */}
      <div className="fade-in-up-d2" style={{ borderTop: '1px solid var(--border-color)', paddingTop: '40px', marginBottom: '40px' }}>
        <h2 style={{ fontSize: '2rem', margin: '0 0 20px 0' }}>university houses & incubators</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
          {[
            { title: 'دار الذكاء الاصطناعي — house of ai', desc: 'the central hub for artificial intelligence integration across the university, led by pr. cheknane.', contact: 'maison_ia@univ-blida.dz' },
            { title: 'cde blida — career development center', desc: 'supporting students in career orientation, professional development, and soft skills training within the university campus.' },
            { title: 'cati blida — incubator', desc: 'the technology incubation center supports innovation, startups, and entrepreneurship projects from students and faculty members.' },
            { title: 'ceil — language center', desc: 'مركز التعليم المكثف للغات — intensive language teaching center offering multilingual courses and certifications for university students.' },
            { title: 'المكتبة المركزية — central library', desc: 'the central library of blida 1 provides access to academic resources, digital databases, and research materials for all departments.' },
            { title: 'المزرعة الجامعية — university farm', desc: 'the university farm of the mitidja focuses on agricultural production and development projects for the region.' },
          ].map((item, i) => (
            <div key={i} className="card-hover" style={{ padding: '24px', background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '12px' }}>
              <h3 style={{ fontSize: '1.3rem', margin: '0 0 8px' }}>{item.title}</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{item.desc}</p>
              {item.contact && <p style={{ fontSize: '0.85rem', marginTop: '10px', fontWeight: 600 }}>{item.contact}</p>}
            </div>
          ))}
        </div>
      </div>

      {/* External Links */}
      <div className="fade-in-up-d3" style={{ borderTop: '1px solid var(--border-color)', paddingTop: '40px' }}>
        <h2 style={{ fontSize: '2rem', margin: '0 0 20px 0' }}>important links</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {[
            { name: 'وزارة التعليم العالي و البحث العلمي — ministry of higher education', url: 'https://www.mesrs.dz/' },
            { name: 'official university website', url: 'https://www.univ-blida.dz/' },
            { name: 'university 4.0 week event site', url: 'https://sites.google.com/univ-blida.dz/university-4-0-week/home' },
            { name: 'مركز البحث في الإعلام العلمي و التقني — cerist', url: 'http://www.cerist.dz' },
            { name: 'شبكة الأبحاث الجزائرية — arn', url: 'http://www.arn.dz/' },
          ].map((link, i) => (
            <a key={i} href={link.url} target="_blank" rel="noopener noreferrer" style={{ padding: '14px', background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '8px', display: 'block', fontWeight: 500 }}>
              {link.name} ↗
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── BLOGS ────────────────────────────────────────────────────────────────────
export function Blogs() {
  const blogs = [
    { title: 'prompt engineering: mastering ai dialogue', author: 'ai house seminar', desc: 'learn how to transform ai into your personal intelligent assistant. mastering the art of prompt engineering enables you to extract the most precise results from smart models for your academic projects and research.', img: '/images/pystepworkshop.png' },
    { title: 'notebookLm for study efficiency', author: 'university 4.0 workshop', desc: 'discover how to organize your references and lessons intelligently using notebookLm, doubling your productivity. the goal is to empower you with future tools so you become leaders in your fields.', img: '/images/crowd.png' },
    { title: 'insight from mr. karim hemmina', author: 'phd student, cs department', desc: 'a deep dive into the practical applications of deep learning on large datasets within the university clusters. emphasizing the importance of clean data processing before model training.', img: '/images/event.png' },
    { title: 'the it community scientific club', author: 'contact.itc.blida@gmail.com', desc: 'the scientific club in the cs department is continuously pushing boundaries — from weekly algorithmic challenges to guest lectures fostering an environment of excellence in algorithms and data structures.', img: '/images/library.png' },
    { title: 'cde blida: career development center', author: 'university of blida 1', desc: 'how the career development center supports professional orientation, entrepreneurship, and soft skills development for students entering the workforce.', img: '/images/conference.png' },
    { title: 'cati blida: technology incubation', author: 'university of blida 1', desc: 'the cati incubator transforms student innovative ideas into real-world startups. explore programs in deep tech, agritech, and ai-driven solutions.', img: '/images/seminar.png' },
    { title: 'applied chemistry masters exhibition', author: 'faculty of sciences', desc: 'the first exhibition for applied chemistry masters students showcasing innovation and practical research outcomes at blida 1.', img: '/images/event.png' },
  ];

  return (
    <div className="container fade-in-up" style={{ padding: '80px 0', maxWidth: '900px' }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '20px' }}>blogs & insights.</h1>
      <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', marginBottom: '50px' }}>insights and tutorials curated by our faculty, researchers, and community.</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
        {blogs.map((b, i) => (
          <div key={i} className="card-hover" style={{ border: '1px solid var(--border-color)', borderRadius: '16px', overflow: 'hidden' }}>
            <ImgPlaceholder height={220} label={b.title} src={b.img} />
            <div style={{ padding: '0 30px 30px' }}>
              <h2 style={{ fontSize: '1.6rem', marginBottom: '8px' }}>{b.title}</h2>
              <span style={{ fontSize: '0.85rem', color: 'var(--accent-color)', fontWeight: 600 }}>{b.author}</span>
              <p style={{ marginTop: '16px', lineHeight: '1.8', color: 'var(--text-secondary)' }}>{b.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── NEWS ─────────────────────────────────────────────────────────────────────
export function News() {
  const items = [
    { title: 'جامعة البليدة1 تعزز ريادتها — study day on pedagogical ai & e-learning', desc: 'the university organizes a study day on the integration of artificial intelligence in pedagogy and electronic formation.', img: '/images/seminar.png' },
    { title: 'اجتماع تنسيقي لجامعات الوسط — coordination meeting for central region universities', desc: 'strategic alignment meeting with participation from university of blida 1 to coordinate higher education policies.', img: '/images/crowd.png' },
    { title: "مدير جامعة البليدة 1 يحضر — rector attends president's innovation award", desc: "the rector of blida 1 attends the ceremony for the president of the republic's award for the innovative researcher.", img: '/images/award.png' },
    { title: 'المعرض الأوّل لطلبة ماستر الكيمياء — applied chemistry masters exhibition', desc: 'the first exhibition showcasing innovation from applied chemistry masters students.', img: '/images/event.png' },
    { title: 'جامعة البليدة 1 تواكب — expenditure rationalization & governance reforms', desc: "blida 1 aligns with national reforms for expenditure rationalization and governance enhancement.", img: '/images/conference.png' },
    { title: 'الإحتفال بيوم العلم — science day celebration', desc: 'the university celebrates science day with academic events, lectures, and student activities.', img: '/images/library.png' },
    { title: 'أبواب مفتوحة على علم الغابات — open doors on forestry science', desc: 'an open day showcasing the forestry science programs and research at the university.', img: '/images/crowd.png' },
    { title: 'جامعة البليدة1 تؤكد انخراطها في مسار الجامعة 4.0 — commitment to university 4.0', desc: 'blida 1 confirms its commitment to the university 4.0 transition during a national strategic meeting.', img: '/images/pystepworkshop.png' },
  ];

  return (
    <div className="container fade-in-up" style={{ padding: '80px 0', maxWidth: '900px' }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '20px' }}>university news.</h1>
      <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', marginBottom: '50px' }}>announcements, events, and campus updates from جامعة البليدة 1.</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>

        {/* Featured Event */}
        <div className="card-hover" style={{ border: '2px solid var(--accent-color)', borderRadius: '16px', overflow: 'hidden' }}>
          <ImgPlaceholder height={280} label="ai expo 2026" src="/images/ai expo poster.png" />
          <div style={{ padding: '0 30px 30px' }}>
            <span style={{ display: 'inline-block', padding: '6px 12px', background: 'var(--accent-color)', color: '#fff', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold', marginBottom: '15px' }}>featured — ai expo 2026</span>
            <h2 style={{ fontSize: '2rem', marginBottom: '15px' }}>university 4.0 week & ia expo</h2>
            <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '20px' }}>
              the house of ai invites all students and researchers to participate in the university 4.0 events. training seminars cover prompt engineering and notebookLm. the ia expo features student ai projects at the grand conference hall on april 16 at 9am, sponsored by rami.
            </p>
            <div style={{ background: '#f5f5f5', padding: '20px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
              <h4 style={{ margin: '0 0 10px' }}>speakers & organizers:</h4>
              <ul style={{ margin: 0, paddingLeft: '20px', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                <li><strong>dr. imane cherfa</strong> — teacher, cs department</li>
                <li><strong>mr. karim hemmina</strong> — phd student, cs department</li>
                <li><strong>it community</strong> — scientific club, cs department</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Regular news items */}
        {items.map((n, i) => (
          <div key={i} className="card-hover" style={{ border: '1px solid var(--border-color)', borderRadius: '12px', overflow: 'hidden' }}>
            <ImgPlaceholder height={160} label={n.title} src={n.img} />
            <div style={{ padding: '0 24px 24px' }}>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '10px' }}>{n.title}</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.7' }}>{n.desc}</p>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
}
