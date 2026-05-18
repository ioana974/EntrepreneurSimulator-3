import React from 'react';
import { useLanguage } from '../contexts/LanguageContext.jsx';

function LessonsAdvanced() {
  const { t } = useLanguage();

  return (
    <div style={{ padding: '2rem', maxWidth: 1100, margin: '0 auto', color: 'var(--text-main)' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '.5rem' }}>Lecții Avansate pentru Antreprenori Profesioniști</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '1.2rem' }}>Material tehnic, legislativ și financiar destinat celor care pregătesc scale-up, due-diligence sau atrag capital extern.</p>

      {/* Section: Executive Summary + What you need */}
      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.4rem' }}>1. Rezumat executiv și echipa necesară</h2>
        <p style={{ lineHeight: 1.6 }}>
          Pentru proiecte la nivel profesional este esențial un set minim de competențe: contabil autorizat (expert contabil/contabil autorizat), consultant juridic specializat în drept comercial și muncă, consultant fiscal, manager financiar (CFO sau fractional CFO) și, când este cazul, un consultant în operațiuni/lean manufacturing.
        </p>

        <ul style={{ lineHeight: 1.6 }}>
          <li><strong>Contabilitate:</strong> pregătirea situațiilor financiare, P&L, balanță, registrul de TVA și raportări fiscale.</li>
          <li><strong>Jurist:</strong> contracte comerciale, acorduri de investiții, term sheets și conformitate cu legislația muncii.</li>
          <li><strong>Consultant fiscal:</strong> optimizare legală a impozitelor, deduceri, amortizare accelerată și scheme de TVA.</li>
          <li><strong>Parteneri/ Sponsori:</strong> evaluarea fit-ului strategic, due diligence, și condiții de finanțare (covenants, earn-outs).</li>
        </ul>
      </section>

      {/* Section: Legislative references */}
      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.4rem' }}>2. Articole legislative și resurse</h2>
        <p style={{ lineHeight: 1.6 }}>
          Exemple de resurse oficiale (România):
        </p>
        <ul style={{ lineHeight: 1.6 }}>
          <li>ANAF — informații TVA și obligații declarative: <a href="https://www.anaf.ro" target="_blank" rel="noreferrer">https://www.anaf.ro</a></li>
          <li>Ministerul Finanțelor — tratate fiscale și legislație: <a href="https://mfinante.gov.ro" target="_blank" rel="noreferrer">https://mfinante.gov.ro</a></li>
          <li>Codul Muncii — dispoziții privind concedieri, protecția angajaților: <a href="https://legislatie.just.ro/Public/DetaliiDocument/" target="_blank" rel="noreferrer">legislatie.just.ro</a></li>
        </ul>
        <p style={{ fontStyle: 'italic', fontSize: '.9rem', color: 'var(--text-secondary)' }}>
          Observație: trimiteți documentele către consultantul juridic pentru interpretare aplicată contextului companiei.
        </p>
      </section>

      {/* Section: Financial models + SVG chart */}
      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.4rem' }}>3. Modele financiare (P&L, Cashflow) și principii</h2>
        <p style={{ lineHeight: 1.6 }}>
          Un model P&L profesional trebuie să includă: venituri by-product/service, COGS, EBITDA, amortizare, costuri financiare și taxă pe profit. Proiecțiile trebuie să fie sensibile la variabile cheie: creștere vânzări, marjă brută, rata de retenție, costul capitalului.
        </p>

        <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
          <div style={{ flex: 1 }}>
            <svg width="100%" height="200" viewBox="0 0 600 200" preserveAspectRatio="none" style={{ background: 'linear-gradient(180deg,#ffffff, #f8fafc)', borderRadius: 6 }}>
              {/* Simple P&L sparkline bars */}
              <rect x="20" y="140" width="40" height="40" fill="#10b981" />
              <rect x="80" y="110" width="40" height="70" fill="#06b6d4" />
              <rect x="140" y="80" width="40" height="100" fill="#8b5cf6" />
              <rect x="200" y="50" width="40" height="130" fill="#ff8c00" />
              <text x="20" y="30" fill="#334155" fontSize="12">P&L — Forecast</text>
              <text x="20" y="160" fill="#0f172a" fontSize="10">An 1</text>
              <text x="80" y="140" fill="#0f172a" fontSize="10">An 2</text>
              <text x="140" y="120" fill="#0f172a" fontSize="10">An 3</text>
              <text x="200" y="100" fill="#0f172a" fontSize="10">An 4</text>
            </svg>
          </div>

          <div style={{ flex: 1 }}>
            <h4 style={{ margin: 0 }}>Formule cheie</h4>
            <ul style={{ lineHeight: 1.6 }}>
              <li><strong>Marjă brută</strong> = (Venituri - COGS) / Venituri</li>
              <li><strong>EBITDA</strong> = Venituri - COGS - Cheltuieli operaționale</li>
              <li><strong>Cashflow operațional</strong> = EBITDA - Impozit efectiv - Creștere capital de lucru</li>
              <li><strong>Valoare actualizată netă (VAN)</strong> = Σ (CFt / (1+r)^t) - Investiție</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Section: Legal & contracts */}
      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.4rem' }}>4. Contracte comerciale și termene</h2>
        <p style={{ lineHeight: 1.6 }}>
          Modele practice: term sheet (mecanisme de exit, vesting pentru fondatori), contracte de furnizare (SLA, penalități, termene de livrare). Recomandare: include clauze de forță majoră și mecanisme de soluționare a disputelor.
        </p>
        <p style={{ fontSize: '.95rem', color: 'var(--text-secondary)' }}>
          Resurse utile: <a href="https://www.legislatie.just.ro" target="_blank" rel="noreferrer">legislatie.just.ro</a>, <a href="https://www.anaf.ro" target="_blank" rel="noreferrer">ANAF</a>
        </p>
      </section>

      {/* Section: Images with attribution */}
      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.4rem' }}>5. Galerie & Exemple vizuale</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <figure style={{ margin: 0, textAlign: 'center' }}>
            <img src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=abcd" alt="financial chart" style={{ width: '100%', borderRadius: 8 }} />
            <figcaption style={{ fontSize: '.75rem', color: 'rgba(0,0,0,0.6)', marginTop: '.3rem' }}>Sursa: Unsplash / fotograf profesionist</figcaption>
          </figure>

          <figure style={{ margin: 0, textAlign: 'center' }}>
            <img src="https://images.unsplash.com/photo-1559526324-593bc073d938?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=efgh" alt="legal contract" style={{ width: '100%', borderRadius: 8 }} />
            <figcaption style={{ fontSize: '.75rem', color: 'rgba(0,0,0,0.6)', marginTop: '.3rem' }}>Sursa: Unsplash / imagine licențiată</figcaption>
          </figure>
        </div>
        <p style={{ fontSize: '.85rem', color: 'var(--text-secondary)', marginTop: '.6rem' }}>Note: Imaginile sunt preluate de pe Unsplash; verificați licența înainte de folosire comercială.</p>
      </section>

      {/* Section: Further reading */}
      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.4rem' }}>6. Lecturi avansate și linkuri</h2>
        <ol style={{ lineHeight: 1.6 }}>
          <li><a href="https://www.mckinsey.com/featured-insights" target="_blank" rel="noreferrer">McKinsey — featured insights</a> (articole despre scalare și strategii competitive)</li>
          <li><a href="https://hbr.org/" target="_blank" rel="noreferrer">Harvard Business Review</a> — articole profesionale și studii de caz</li>
          <li><a href="https://www.anaf.ro" target="_blank" rel="noreferrer">ANAF</a> — legislație fiscală națională</li>
        </ol>
      </section>

      <footer style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1rem', color: 'var(--text-secondary)' }}>
        <div style={{ fontSize: '.85rem' }}>Materialul este orientativ și nu înlocuiește consultanța profesională. Pentru aplicare, contactați un expert contabil și un avocat specializat.</div>
      </footer>
    </div>
  );
}

export default LessonsAdvanced;
