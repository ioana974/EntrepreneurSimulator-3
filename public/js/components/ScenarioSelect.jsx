import React from 'react';

export default function ScenarioSelect({ scenarios, selectedId, onSelect }) {
  return (
    <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}>
      {scenarios.map(s => (
        <div key={s.id} className={`card ${selectedId === s.id ? 'selected' : ''}`} style={{ padding: '1rem', cursor: 'pointer', border: selectedId === s.id ? '2px solid var(--accent-cyan)' : undefined }} onClick={() => onSelect(s)}>
          <h3 style={{ marginTop: 0 }}>{s.name}</h3>
          <p style={{ color: 'var(--text-secondary)' }}>{s.description}</p>
          <ul style={{ marginTop: '0.5rem', paddingLeft: '1.2rem' }}>
            <li>Buget: ${s.startBudget.toLocaleString()}</li>
            <li>Angajați: {s.startEmployees}</li>
            <li>Tip: {s.type}</li>
          </ul>
        </div>
      ))}
    </div>
  );
}