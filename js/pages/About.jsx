import React from 'react';

function About() {
  return (
    <div style={{ minHeight: '100vh', padding: '2rem', paddingTop: '100px' }}>
      <h1 className="section-title animate-slideInUp">Despre EntrepreneurHub</h1>
      
      {/* Mission Section */}
      <section style={{ maxWidth: '900px', margin: '3rem auto' }}>
        <div className="card animate-slideInUp" style={{ padding: '2rem' }}>
          <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: 'var(--accent-cyan)' }}>
            🎯 Misiunea Noastră
          </h2>
          <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--text-secondary)' }}>
            EntrepreneurHub a fost creat cu o singură misiune clară: să democratizeze educația entrepreneurială 
            și să ofere adolescenților și tinerilor o platformă interactivă unde pot învăța, experimenta și crește 
            ca antreprenori. Credem că succesul nu vine din inteligență naturală, ci din învățare continuă, 
            practică și adaptabilitate.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section style={{ maxWidth: '1200px', margin: '3rem auto' }}>
        <h2 className="section-title">✨ Caracteristici Principale</h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '2rem'
        }}>
          <Feature 
            icon="📚" 
            title="Lecții Interactive"
            desc="Conținut structurat bazat pe experiența antreprenorilor reali"
          />
          <Feature 
            icon="🎮" 
            title="Simulator Interactiv"
            desc="Lucrează cu bugete virtuale și ia decizii strategice"
          />
          <Feature 
            icon="👨‍🏫" 
            title="Cursuri Online"
            desc="Învață direct de la specialiști și mentori experimentați"
          />
          <Feature 
            icon="🧪" 
            title="Teste Multi-Nivel"
            desc="Evaluează progresul cu teste de la ușor la expert"
          />
          <Feature 
            icon="🤖" 
            title="AI Assistant"
            desc="Corectare automată de răspunsuri cu feedback personalizat"
          />
          <Feature 
            icon="🌍" 
            title="Traduceri Multilingve"
            desc="Disponibil în română și engleză pentru accesibilitate globală"
          />
        </div>
      </section>

      {/* Team Section */}
      <section style={{ maxWidth: '1200px', margin: '3rem auto' }}>
        <h2 className="section-title">👥 Echipa Noastră</h2>
        <p className="section-subtitle">Profesioniști dedicați pasionați de educație entrepreneurială</p>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '2rem'
        }}>
          <TeamMember 
            name="Ioana Popescu"
            role="Fondatoare & Product Manager"
            bio="Expert în digital marketing și transformare digitală"
          />
          <TeamMember 
            name="Andrei Ionescu"
            role="Lead Developer"
            bio="Full-stack developer cu 8 ani de experiență"
          />
          <TeamMember 
            name="Maria Gheorghiu"
            role="Content Director"
            bio="Antreprenor cu 3 startup-uri de succes"
          />
          <TeamMember 
            name="Victor Stan"
            role="UX/UI Designer"
            bio="Designer cu experiență în tech startups"
          />
          <TeamMember 
            name="Elena Cristea"
            role="Community Manager"
            bio="Specialist în engagement și community building"
          />
          <TeamMember 
            name="Costel Rusu"
            role="AI/ML Specialist"
            bio="Data scientist și expert în machine learning"
          />
        </div>
      </section>

      {/* Tech Stack Section */}
      <section style={{ maxWidth: '1200px', margin: '3rem auto' }}>
        <div className="card" style={{ padding: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: 'var(--accent-yellow)' }}>
            🔧 Stack Tehnologic
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: '1.5rem'
          }}>
            <TechBadge name="React" icon="⚛️" />
            <TechBadge name="JavaScript" icon="📜" />
            <TechBadge name="HTML/CSS" icon="🎨" />
            <TechBadge name="Node.js" icon="🟢" />
            <TechBadge name="Express" icon="🚂" />
            <TechBadge name="MongoDB" icon="🍃" />
            <TechBadge name="OpenAI API" icon="🤖" />
            <TechBadge name="Redux" icon="🔴" />
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section style={{ maxWidth: '900px', margin: '3rem auto' }}>
        <h2 className="section-title">💎 Valorile Noastre</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <Value title="Inovație" desc="Suntem mereu în căutarea de noi moduri de a îmbunătăți experiența de învățare" />
          <Value title="Accesibilitate" desc="Credem că educația de calitate trebuie să fie accesibilă pentru toți" />
          <Value title="Practică" desc="Învățarea prin practică și experiență reală este cheia succesului" />
          <Value title="Comunitate" desc="Sprijin pentru rețeaua de tineri antreprenori și schimb de experiență" />
        </div>
      </section>

      {/* Contact Section */}
      <section style={{ maxWidth: '900px', margin: '3rem auto' }}>
        <div className="card animate-slideInUp" style={{ padding: '2rem', textAlign: 'center' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--accent-cyan)' }}>
            📧 Contactează-ne
          </h2>
          <p style={{ marginBottom: '1.5rem', color: 'var(--text-secondary)' }}>
            Ai idei, sugestii sau vrei să colaborezi cu noi?
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn btn-primary">Email: contact@entrepreneurhub.ro</button>
            <button className="btn btn-secondary">Follow pe Social Media</button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ 
        textAlign: 'center', 
        padding: '2rem', 
        color: 'var(--text-secondary)',
        marginTop: '3rem',
        borderTop: '1px solid var(--border-color)'
      }}>
        <p>&copy; 2026 EntrepreneurHub. Built with ❤️ for aspiring entrepreneurs. All rights reserved.</p>
      </footer>
    </div>
  );
}

function Feature({ icon, title, desc }) {
  return (
    <div className="card stagger-item" style={{ animationDelay: '0.1s' }}>
      <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{icon}</div>
      <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: 'var(--accent-yellow)' }}>
        {title}
      </h3>
      <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>{desc}</p>
    </div>
  );
}

function TeamMember({ name, role, bio }) {
  return (
    <div className="card stagger-item" style={{ animationDelay: '0.1s', textAlign: 'center', padding: '2rem' }}>
      <div style={{
        width: '80px',
        height: '80px',
        background: 'linear-gradient(135deg, var(--accent-cyan), var(--accent-yellow))',
        borderRadius: '50%',
        margin: '0 auto 1rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '2.5rem'
      }}>
        👤
      </div>
      <h3 style={{ fontSize: '1.1rem', marginBottom: '0.3rem', color: 'var(--accent-cyan)' }}>
        {name}
      </h3>
      <p style={{ fontSize: '0.9rem', color: 'var(--accent-yellow)', marginBottom: '1rem' }}>
        {role}
      </p>
      <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', fontSize: '0.95rem' }}>
        {bio}
      </p>
    </div>
  );
}

function TechBadge({ name, icon }) {
  return (
    <div style={{
      background: 'rgba(0,240,255,0.1)',
      border: '1px solid var(--accent-cyan)',
      borderRadius: '10px',
      padding: '1rem',
      textAlign: 'center',
      transition: 'all 0.3s ease',
      cursor: 'pointer'
    }}>
      <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{icon}</div>
      <p style={{ fontWeight: 'bold', color: 'var(--accent-cyan)' }}>{name}</p>
    </div>
  );
}

function Value({ title, desc }) {
  return (
    <div className="card animate-slideInUp" style={{
      borderLeft: '4px solid var(--accent-yellow)',
      padding: '1.5rem'
    }}>
      <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: 'var(--accent-yellow)' }}>
        {title}
      </h3>
      <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>{desc}</p>
    </div>
  );
}

export default About;
