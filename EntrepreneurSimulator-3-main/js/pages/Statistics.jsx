import React, { useState, useEffect } from 'react';

function Statistics() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalGames: 0,
    totalEnrollments: 0,
    averageScore: 0
  });

  // Load data from API
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/stats/platform');
        const data = await response.json();
        if (data.success) {
          setStats(prevStats => ({
            ...prevStats,
            totalUsers: data.stats.totalUsers,
            totalGames: data.stats.totalGames,
            totalEnrollments: data.stats.totalEnrollments,
            averageScore: data.stats.averageScore
          }));
        }
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();
  }, []);

  const chartData = [
    { month: 'Ian', value: 2400 },
    { month: 'Feb', value: 3210 },
    { month: 'Mar', value: 2290 },
    { month: 'Apr', value: 2000 },
    { month: 'Mai', value: 2181 },
    { month: 'Iun', value: 2500 },
    { month: 'Iul', value: 3100 },
    { month: 'Aug', value: 2890 },
  ];

  const maxValue = Math.max(...chartData.map(d => d.value));

  return (
    <div style={{ minHeight: '100vh', padding: '2rem', paddingTop: '100px' }}>
      <h1 className="section-title animate-slideInUp">Statistici Platform</h1>
      <p className="section-subtitle animate-slideInUp">
        Vezi performanța și evoluția noastră în timp
      </p>

      {/* Key Metrics */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '2rem',
        maxWidth: '1200px',
        margin: '3rem auto'
      }}>
        <StatCard label="Utilizatori Înregistrați" value={stats.totalUsers.toLocaleString()} />
        <StatCard label="Jocuri Jucate" value={stats.totalGames} />
        <StatCard label="Înscrieri la Cursuri" value={stats.totalEnrollments.toLocaleString()} />
        <StatCard label="Scor Mediu Jocuri" value={`${stats.averageScore}%`} />
      </div>

      {/* Chart */}
      <div className="card" style={{ maxWidth: '900px', margin: '3rem auto', padding: '2rem' }}>
        <h2 style={{ 
          fontSize: '1.5rem', 
          marginBottom: '2rem',
          color: 'var(--accent-cyan)'
        }}>
          Evoluția Înregistrărilor
        </h2>
        
        <div style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-around',
          height: '300px',
          gap: '1rem'
        }}>
          {chartData.map((data, idx) => (
            <div 
              key={idx}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.5rem',
                flex: 1
              }}
            >
              <div
                className="animate-slideInUp"
                style={{
                  width: '100%',
                  height: `${(data.value / maxValue) * 250}px`,
                  background: `linear-gradient(135deg, var(--accent-cyan), var(--accent-yellow))`,
                  borderRadius: '8px 8px 0 0',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.opacity = '0.8';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.opacity = '1';
                }}
              ></div>
              <label style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                {data.month}
              </label>
              <span style={{ fontSize: '0.85rem', color: 'var(--accent-yellow)', fontWeight: 'bold' }}>
                {data.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Performance Metrics */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '2rem',
        maxWidth: '1200px',
        margin: '3rem auto'
      }}>
        <PerformanceCard 
          title="Satisfacție Utilizatori"
          percentage={92}
          color="#10b981"
        />
        <PerformanceCard 
          title="Rata Retenție"
          percentage={88}
          color="#f59e0b"
        />
        <PerformanceCard 
          title="Rezolvare Probleme"
          percentage={95}
          color="#00f0ff"
        />
      </div>

      {/* Simulation Statistics */}
      <div className="card" style={{ maxWidth: '1200px', margin: '3rem auto', padding: '2rem' }}>
        <h2 style={{ 
          fontSize: '1.5rem', 
          marginBottom: '1.5rem',
          color: 'var(--accent-cyan)'
        }}>
          Statistici Jocuri
        </h2>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem',
          marginBottom: '2rem'
        }}>
          <div style={{ padding: '1rem', background: 'rgba(0, 240, 255, 0.1)', borderRadius: '8px', borderLeft: '4px solid #00f0ff' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#00f0ff' }}>{stats.totalGames}</div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Jocuri Completate</div>
          </div>
          <div style={{ padding: '1rem', background: 'rgba(255, 215, 0, 0.1)', borderRadius: '8px', borderLeft: '4px solid #ffd700' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#ffd700' }}>{stats.averageScore}%</div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Scor Mediu</div>
          </div>
          <div style={{ padding: '1rem', background: 'rgba(16, 185, 130, 0.1)', borderRadius: '8px', borderLeft: '4px solid #10b981' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#10b981' }}>{stats.totalEnrollments}</div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Înscrieri Cursuri</div>
          </div>
        </div>
      </div>

      <div className="card" style={{ maxWidth: '900px', margin: '3rem auto', padding: '2rem' }}>
        <h2 style={{ 
          fontSize: '1.5rem', 
          marginBottom: '1.5rem',
          color: 'var(--accent-yellow)'
        }}>
          Realizări Recente
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <Achievement title="1000+ Utilizatori Activi" date="August 2026" />
          <Achievement title="50 Cursuri Lansate" date="Iulie 2026" />
          <Achievement title="Rating 4.8/5 din 10,000 Review-uri" date="Iunie 2026" />
          <Achievement title="Disponibil în 15 Țări" date="Aprilie 2026" />
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="card" style={{ textAlign: 'center', padding: '2rem' }}>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>{label}</p>
      <p style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--accent-yellow)' }}>
        {value}
      </p>
    </div>
  );
}

function PerformanceCard({ title, percentage, color }) {
  return (
    <div className="card" style={{ padding: '2rem' }}>
      <h3 style={{ marginBottom: '1.5rem', color: color }}>{title}</h3>
      <div style={{
        width: '100%',
        height: '20px',
        background: 'var(--primary-gray)',
        borderRadius: '10px',
        overflow: 'hidden',
        marginBottom: '1rem'
      }}>
        <div style={{
          width: `${percentage}%`,
          height: '100%',
          background: color,
          transition: 'width 0.5s ease'
        }}></div>
      </div>
      <p style={{ textAlign: 'right', color: 'var(--accent-yellow)', fontWeight: 'bold' }}>
        {percentage}%
      </p>
    </div>
  );
}

function Achievement({ title, date }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '1.5rem',
      padding: '1rem',
      background: 'rgba(255, 215, 0, 0.05)',
      borderRadius: '10px',
      borderLeft: '3px solid var(--accent-yellow)'
    }}>
      <div style={{ flex: 1 }}>
        <p style={{ fontWeight: 'bold', marginBottom: '0.3rem' }}>{title}</p>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{date}</p>
      </div>
    </div>
  );
}

export default Statistics;
