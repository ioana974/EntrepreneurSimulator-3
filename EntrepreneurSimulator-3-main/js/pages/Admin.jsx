import React, { useState, useEffect } from 'react';

function Admin() {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEnrollments = async () => {
      try {
        const response = await fetch('/api/admin/enrollments');
        const data = await response.json();
        if (data.success) {
          setEnrollments(data.enrollments);
        }
      } catch (error) {
        console.error('Error fetching enrollments:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEnrollments();
  }, []);

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div>Se încarcă...</div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', padding: '2rem', paddingTop: '100px' }}>
      <h1 className="section-title animate-slideInUp">Panou Admin - Înscrieri Cursuri</h1>
      
      <div className="card" style={{ maxWidth: '1200px', margin: '3rem auto', padding: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: 'var(--accent-cyan)' }}>
          Înscrieri Recente ({enrollments.length})
        </h2>
        
        {enrollments.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)' }}>
            Nicio înscriere încă.
          </div>
        ) : (
          <div style={{ maxHeight: '600px', overflowY: 'auto' }}>
            {enrollments.map((enrollment, idx) => (
              <div key={enrollment.id} style={{
                padding: '1rem',
                borderBottom: '1px solid var(--border-color)',
                marginBottom: '0.5rem'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontWeight: 'bold', color: 'var(--accent-cyan)' }}>
                      {enrollment.firstName} {enrollment.lastName}
                    </div>
                    <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                      Curs: {enrollment.courseName}
                    </div>
                    <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                      Localitate: {enrollment.city}, {enrollment.county}
                    </div>
                    <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                      An naștere: {enrollment.birthYear}
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '0.9rem', color: 'var(--accent-yellow)' }}>
                      {enrollment.createdAt ? new Date(enrollment.createdAt.seconds * 1000).toLocaleDateString('ro-RO') : 'N/A'}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Admin;