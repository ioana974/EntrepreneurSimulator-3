import React, { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext.jsx';

function Home() {
  const canvasRef = useRef(null);
  const { t } = useLanguage();
  const particlesRef = useRef([]);
  const [selectedLesson, setSelectedLesson] = useState(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Particle class
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = (Math.random() - 0.5) * 1.5;
        this.speedY = (Math.random() - 0.5) * 1.5;
        this.color = `rgba(0,240,255,${Math.random() * 0.7 + 0.3})`;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
      }

      draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Initialize particles
    for (let i = 0; i < 120; i++) {
      particlesRef.current.push(new Particle());
    }

    // Animation loop
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particlesRef.current.forEach(p => {
        p.update();
        p.draw();
      });
      requestAnimationFrame(animate);
    }

    animate();

    // Mouse interaction
    const handleMouseMove = (e) => {
      particlesRef.current.forEach(p => {
        let dx = e.x - p.x;
        let dy = e.y - p.y;
        let dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 150) {
          p.x -= dx * 0.02;
          p.y -= dy * 0.02;
        }
      });
    };

    canvas.addEventListener('mousemove', handleMouseMove);

    // Handle resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="hero" id="home">
      <canvas id="background-canvas" ref={canvasRef}></canvas>
      
      <div className="content animate-fadeInUp">
        <h1 className="title">
          {t('heroTitle')} <span className="highlight">{t('heroHighlight')}</span>
        </h1>
        <p className="subtitle">{t('heroSubtitle')}</p>

        <div className="menu">
          <a href="#lessons" className="menu-item stagger-item">{t('startGame')}</a>
          <a href="#courses" className="menu-item stagger-item">{t('courses')}</a>
          <a href="#tests" className="menu-item stagger-item">{t('tests')}</a>
          <a href="#about" className="menu-item stagger-item">{t('about')}</a>
        </div>
      </div>

      {/* Stats & Analytics Section */}
      <section id="stats-overview" className="stats-section">
        <h2 className="section-title animate-slideInUp">Potențialul Antreprenorial</h2>
        <p className="section-subtitle animate-slideInUp">Descoperă impactul și oportunitățile din ecosistemul startup-urilor</p>
        
        <div className="stats-grid">
          <StatCard 
            number="2,500+" 
            label="Antreprenori Instruiți"
            icon="👥"
            color="#00f0ff"
          />
          <StatCard 
            number="500M+" 
            label="Valoare Generată"
            icon="💰"
            color="#ffd700"
          />
          <StatCard 
            number="89%" 
            label="Rata de Succes"
            icon="🎯"
            color="#10b981"
          />
          <StatCard 
            number="45+" 
            label="Țări Acoperite"
            icon="🌍"
            color="#a78bfa"
          />
        </div>

        <div className="charts-container">
          <ChartComponent />
          <GrowthVisualization />
        </div>
      </section>

      {/* Lessons Section */}
      <section id="lessons" className="lesson-section">
        <h2 className="section-title animate-slideInUp">{t('lessons')}</h2>
        <p className="section-subtitle animate-slideInUp">{t('lessonsDesc')}</p>
        <div className="lessons-grid">
          <LessonCard 
            icon="📚" 
            title="Fundamentele Businessului"
            desc="Învață conceptele de bază ale antreprenoriatului modern"
            content={{
              title: "Fundamentele Businessului – Curs Avansa",
              sections: [
                {
                  heading: "1. Echipa Necesară",
                  text: "Un business profesional necesită minim: Contabil autorizat, Consultant juridic (drept comercial/muncă), Consultant fiscal, CFO/Manager financiar.",
                  subsections: [
                    { title: "Contabil autorizat", desc: "P&L, bilanț, TVA, raportări anuale. Certificare CECCAR sau CDA." },
                    { title: "Jurist comercial", desc: "Contracte, finanțări, investiții. Specialitate în corporate law." },
                    { title: "Consultant fiscal", desc: "Optimizare legală, deduceri, amortizare, regimuri de TVA." }
                  ]
                },
                {
                  heading: "2. Legislative și Resurse",
                  text: "Resurse oficiale: ANAF.ro, mfinante.gov.ro, legislatie.just.ro",
                  subsections: []
                },
                {
                  heading: "3. KPI și Metrici Cheie",
                  text: "Urmărire: Marjă brută %, EBITDA, ROI, Rata de retenție a clienților, CAC (Customer Acquisition Cost), LTV (Lifetime Value)",
                  subsections: []
                }
              ]
            }}
          />
          <LessonCard 
            icon="💡" 
            title="Inovație și Creativitate"
            desc="Descoperă cum să-ți dezvolți ideile în produse de succes"
            content={{
              title: "Inovație și Creativitate – Strategie Avansată",
              sections: [
                {
                  heading: "1. Metodologie Design Thinking",
                  text: "Empatie → Definire → Ideație → Prototip → Test. Iterații rapide cu feedback utilizator real.",
                  subsections: [
                    { title: "MVP (Minimum Viable Product)", desc: "Lansează versiune redusă, colectează feedback, iterează." },
                    { title: "User Testing", desc: "Sesiuni cu 5-10 utilizatori reali; observă pauzele/fricțiuni." }
                  ]
                },
                {
                  heading: "2. Protecție Proprietate Intelectuală",
                  text: "Brevete (OSIM), mărci (EUIPO), drepturi de autor. Consultanță juridică esențială.",
                  subsections: []
                },
                {
                  heading: "3. Trend-uri Inovație 2024+",
                  text: "AI-powered products, Sustainability, Automation, Web3 / Blockchain (cu prudenție)",
                  subsections: []
                }
              ]
            }}
          />
          <LessonCard 
            icon="💰" 
            title="Managementul Financiar"
            desc="Stăpânește gestiunea bugetului și finanțelor businessului"
            content={{
              title: "Managementul Financiar – Model Profesional",
              sections: [
                {
                  heading: "1. Situații Financiare Fundamentale",
                  text: "P&L (Profit & Loss): Venituri - COGS - OpEx = EBITDA - Amortizare - Dobândă = Profit net",
                  subsections: [
                    { title: "Balanță", desc: "Activ = Pasiv + Patrimoniu. Analiza lichidității și solvabilității." },
                    { title: "Flux de numerar (Cashflow)", desc: "Când intră/ies banii, esențial pentru supraviețuire (cash is king)." }
                  ]
                },
                {
                  heading: "2. TVA și Obligații Fiscale",
                  text: "TVA 19% (standard RO): Colectează pe vânzări, deducă pe achiziții. Decalarări lunare/trimestriale.",
                  subsections: [
                    { title: "Regimuri de TVA", desc: "Standard, Scutit (servicii), Revers charge (import). Consultă ANAF." },
                    { title: "Impozit pe profit", desc: "16% (microîntreprindere) / 10% (standard). Calcul: Profit brut - deduceri legale." }
                  ]
                },
                {
                  heading: "3. Finanțare și Credit",
                  text: "Opțiuni: Bootstrapping, Friends/Family, Credit bancar (dobândă variabilă), Investment de capital (Equity).",
                  subsections: [
                    { title: "Term Sheet", desc: "Evaluare, Dilution, Vesting (opțiuni angajați), Liquidation preferences." }
                  ]
                },
                {
                  heading: "4. Proiecții și Valuation",
                  text: "DCF (Discounted Cashflow), Comparable Companies, precedent transactions. VAN = Σ (CF / (1+r)^t)",
                  subsections: []
                }
              ]
            }}
          />
          <LessonCard 
            icon="🎯" 
            title="Strategia de Marketing"
            desc="Creează campanii eficiente și atrage clienți"
            content={{
              title: "Strategia de Marketing – Abordare Data-Driven",
              sections: [
                {
                  heading: "1. Piață și Segmentare",
                  text: "TAM (Total Addressable Market), SAM (Serviceable), SOM (Serviceable Obtainable). Analiză concurenți cu SWOT.",
                  subsections: [
                    { title: "Positioning", desc: "Mesaj clar, diferențiare, Value Proposition." },
                    { title: "Segmentare clienți", desc: "Personas detaliați; ICP (Ideal Customer Profile)." }
                  ]
                },
                {
                  heading: "2. Channel Marketing & CAC/LTV",
                  text: "CAC (Cost Acquisition) vs LTV (Lifetime Value). Ratio țintă: LTV/CAC ≥ 3. Canale: Organic, Paid, Partnerships.",
                  subsections: [
                    { title: "Digital channels", desc: "SEO, SEM, Social (Meta, LinkedIn), Content, Email marketing." },
                    { title: "B2B vs B2C", desc: "Sales cycle, messaging, partnership models diferit." }
                  ]
                },
                {
                  heading: "3. Analytics & KPI-uri",
                  text: "Conversion rate, MRR (Monthly Recurring Revenue), Churn rate, NPS (Net Promoter Score), Attribution model.",
                  subsections: []
                }
              ]
            }}
          />
        </div>
      </section>

      {/* Courses Section */}
      <section id="courses" className="courses-section">
        <h2 className="section-title animate-slideInUp">{t('courses')}</h2>
        <p className="section-subtitle animate-slideInUp">{t('coursesDesc')}</p>
        <div className="courses-grid">
          <CourseCard 
            title="Startup 101"
            instructor="Andrei Popescu"
            duration="4 săptămâni"
            level="Începător"
          />
          <CourseCard 
            title="Scaling Your Business"
            instructor="Maria Ionescu"
            duration="6 săptămâni"
            level="Intermediar"
          />
          <CourseCard 
            title="Advanced Leadership"
            instructor="John Smith"
            duration="8 săptămâni"
            level="Avansat"
          />
          <CourseCard 
            title="Digital Marketing Pro"
            instructor="Elena Gheorghiu"
            duration="5 săptămâni"
            level="Intermediar"
          />
        </div>
      </section>

      {/* Tests Section */}
      <section id="tests" className="tests-section">
        <h2 className="section-title animate-slideInUp">{t('tests')}</h2>
        <p className="section-subtitle animate-slideInUp">{t('testsDesc')}</p>
        <div className="tests-grid">
          <TestCard 
            name="Assessment Inițial"
            questions="25 întrebări"
            time="30 minute"
            level="Ușor"
          />
          <TestCard 
            name="Cunoștințe Fundamentale"
            questions="50 întrebări"
            time="60 minute"
            level="Mediu"
          />
          <TestCard 
            name="Certificare Profesională"
            questions="100 întrebări + Caz Practic"
            time="120 minute"
            level="Dificil"
          />
          <TestCard 
            name="Challenge Leadership"
            questions="Scenarii și Decizii"
            time="90 minute"
            level="Expert"
          />
        </div>
      </section>

      {/* Success Stories Section */}
      <section id="stories" className="stories-section">
        <h2 className="section-title animate-slideInUp">{t('successStories')}</h2>
        <p className="section-subtitle animate-slideInUp">{t('successDesc')}</p>
        <div className="stories-grid">
          <StoryCard 
            name="Andrei Popescu"
            company="TechStart Romania"
            story="De la idee la unicorn în 3 ani. Cum am construit o companie cu valoare de 1 miliard de dolari."
          />
          <StoryCard 
            name="Maria Ionescu"
            company="FashionHub"
            story="Transformarea unei mici afaceri locale într-o platformă internațională de e-commerce."
          />
          <StoryCard 
            name="Victor Stanescu"
            company="GreenTech Solutions"
            story="Inovația în tehnologiile verzi: cum am câștigat granturi internaționale."
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2026 EntrepreneurHub. Toate drepturile rezervate. | Built with passion for entrepreneurs.</p>
      </footer>
    </div>
  );
}

function LessonCard({ icon, title, desc, content }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="card stagger-item" style={{ animationDelay: '0.1s', cursor: 'pointer' }} onClick={() => setExpanded(!expanded)}>
      <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{icon}</div>
      <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem', color: 'var(--accent-cyan)' }}>
        {title}
      </h3>
      <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '1rem' }}>{desc}</p>
      
      <button className="btn btn-secondary" style={{ marginTop: '0.5rem', width: '100%' }}>
        {expanded ? '▼ Ascunde detalii' : '▶ Arată detalii avansate'}
      </button>

      {expanded && content && (
        <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-color)' }}>
          <h4 style={{ color: 'var(--accent-yellow)', fontSize: '1.1rem', marginBottom: '1rem' }}>{content.title}</h4>
          {content.sections.map((section, idx) => (
            <div key={idx} style={{ marginBottom: '1.2rem', paddingBottom: '1rem', borderBottom: idx < content.sections.length - 1 ? '1px solid rgba(255,255,255,0.1)' : 'none' }}>
              <h5 style={{ color: 'var(--accent-cyan)', fontSize: '1rem', marginBottom: '0.5rem' }}>{section.heading}</h5>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', fontSize: '0.95rem' }}>{section.text}</p>
              {section.subsections && section.subsections.length > 0 && (
                <ul style={{ marginTop: '0.8rem', paddingLeft: '1.2rem' }}>
                  {section.subsections.map((sub, subIdx) => (
                    <li key={subIdx} style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem', fontSize: '0.9rem', lineHeight: '1.5' }}>
                      <strong style={{ color: '#00f0ff' }}>{sub.title}:</strong> {sub.desc}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontStyle: 'italic', marginTop: '1rem' }}>
            💡 Material orientativ. Pentru aplicare, consultați un expert contabil și avocat specializat.
          </p>
        </div>
      )}
    </div>
  );
}

function CourseCard({ title, instructor, duration, level }) {
  const levelColors = {
    'Începător': '#10b981',
    'Intermediar': '#f59e0b',
    'Avansat': '#ef4444',
  };

  return (
    <div className="card stagger-item" style={{ animationDelay: '0.1s' }}>
      <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem', color: 'var(--accent-yellow)' }}>
        {title}
      </h3>
      <p style={{ marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>
        👨‍🏫 <strong>{instructor}</strong>
      </p>
      <p style={{ marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>
        ⏱️ {duration}
      </p>
      <div style={{ 
        display: 'inline-block',
        padding: '0.5rem 1rem',
        borderRadius: '20px',
        background: levelColors[level],
        color: 'white',
        fontSize: '0.9rem',
        fontWeight: 'bold'
      }}>
        {level}
      </div>
      <button className="btn btn-primary" style={{ marginTop: '1rem', width: '100%' }}>
        Înscrie-te
      </button>
    </div>
  );
}

function TestCard({ name, questions, time, level }) {
  const levelColors = {
    'Ușor': '#10b981',
    'Mediu': '#f59e0b',
    'Dificil': '#ef4444',
    'Expert': '#8b5cf6',
  };

  return (
    <div className="card stagger-item" style={{ animationDelay: '0.1s' }}>
      <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem', color: 'var(--accent-cyan)' }}>
        {name}
      </h3>
      <p style={{ marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>
        📋 {questions}
      </p>
      <p style={{ marginBottom: '1rem', color: 'var(--text-secondary)' }}>
        ⏱️ {time}
      </p>
      <div style={{ 
        display: 'inline-block',
        padding: '0.5rem 1rem',
        borderRadius: '20px',
        background: levelColors[level],
        color: 'white',
        fontSize: '0.9rem',
        fontWeight: 'bold',
        marginBottom: '1rem'
      }}>
        {level}
      </div>
      <button className="btn btn-primary" style={{ width: '100%' }}>
        Ia Testul
      </button>
    </div>
  );
}

function StoryCard({ name, company, story }) {
  return (
    <div className="card stagger-item" style={{ animationDelay: '0.1s' }}>
      <h3 style={{ fontSize: '1.2rem', marginBottom: '0.3rem', color: 'var(--accent-yellow)' }}>
        {name}
      </h3>
      <p style={{ fontSize: '0.9rem', color: 'var(--accent-cyan)', marginBottom: '1rem' }}>
        {company}
      </p>
      <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
        "{story}"
      </p>
    </div>
  );
}

function StatCard({ number, label, icon, color }) {
  return (
    <div className="stat-card" style={{ borderTopColor: color }}>
      <div className="stat-icon" style={{ color }}>
        {icon}
      </div>
      <div className="stat-number" style={{ color }}>
        {number}
      </div>
      <div className="stat-label">
        {label}
      </div>
    </div>
  );
}

function ChartComponent() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    // Clear canvas
    ctx.fillStyle = '#0a0e27';
    ctx.fillRect(0, 0, width, height);

    // Draw grid
    ctx.strokeStyle = 'rgba(0,240,255,0.1)';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 5; i++) {
      const y = (height / 5) * i;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Sample data - Growth trend
    const data = [20, 35, 28, 45, 62, 58, 75, 88, 92];
    const points = [];

    const xStep = width / (data.length - 1);
    const yScale = (height - 40) / 100;

    // Calculate points
    for (let i = 0; i < data.length; i++) {
      points.push({
        x: i * xStep + 30,
        y: height - 30 - (data[i] * yScale)
      });
    }

    // Draw gradient area
    const gradient = ctx.createLinearGradient(0, height - 30, 0, 0);
    gradient.addColorStop(0, 'rgba(0,240,255,0.1)');
    gradient.addColorStop(1, 'rgba(0,240,255,0.3)');

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.moveTo(points[0].x, height - 30);
    points.forEach((p, i) => {
      if (i === 0) ctx.lineTo(p.x, p.y);
      else ctx.lineTo(p.x, p.y);
    });
    ctx.lineTo(points[points.length - 1].x, height - 30);
    ctx.closePath();
    ctx.fill();

    // Draw line
    ctx.strokeStyle = '#00f0ff';
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.beginPath();
    points.forEach((p, i) => {
      if (i === 0) ctx.moveTo(p.x, p.y);
      else ctx.lineTo(p.x, p.y);
    });
    ctx.stroke();

    // Draw points
    points.forEach((p) => {
      ctx.fillStyle = '#00f0ff';
      ctx.beginPath();
      ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#ffd700';
      ctx.beginPath();
      ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
      ctx.fill();
    });

    // Draw axes
    ctx.strokeStyle = 'rgba(255,255,255,0.2)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(20, 10);
    ctx.lineTo(20, height - 30);
    ctx.lineTo(width, height - 30);
    ctx.stroke();

    // Labels
    ctx.fillStyle = 'rgba(255,255,255,0.6)';
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Creștere Anuală (%)', width / 2, height - 5);

  }, []);

  return (
    <div className="chart-wrapper">
      <h3 style={{ color: 'var(--accent-cyan)', marginBottom: '1rem' }}>Tendință de Creștere</h3>
      <canvas ref={canvasRef} width={500} height={250} style={{ width: '100%', height: 'auto' }}></canvas>
    </div>
  );
}

function GrowthVisualization() {
  return (
    <div className="growth-wrapper">
      <h3 style={{ color: 'var(--accent-yellow)', marginBottom: '1rem' }}>Domenii de Oportunitate</h3>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {[
          { label: 'Tehnologie & AI', value: 85, color: '#00f0ff' },
          { label: 'SustainabilityTech', value: 72, color: '#10b981' },
          { label: 'E-commerce & Logistics', value: 68, color: '#ffd700' },
          { label: 'FinTech', value: 78, color: '#a78bfa' },
          { label: 'HealthTech', value: 81, color: '#ef4444' }
        ].map((item, idx) => (
          <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ minWidth: '150px', fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
              {item.label}
            </div>
            <div style={{ flex: 1, height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
              <div 
                style={{ 
                  height: '100%', 
                  width: `${item.value}%`, 
                  background: `linear-gradient(90deg, ${item.color}, rgba(255,255,255,0.2))`,
                  borderRadius: '4px',
                  transition: 'width 1.5s ease-out'
                }}
              ></div>
            </div>
            <div style={{ minWidth: '40px', textAlign: 'right', color: item.color, fontWeight: 'bold' }}>
              {item.value}%
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
