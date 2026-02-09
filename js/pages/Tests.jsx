import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext.jsx';

function TestsPage() {
  const [selectedTest, setSelectedTest] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const { t } = useLanguage();

  const tests = [
    {
      id: 1,
      name: "Assessment Inițial",
      description: "Test introductiv pentru a evalua nivelul tău actual de cunoștințe",
      duration: "30 minute",
      questions: "25 întrebări",
      level: "Ușor",
      questions: [
        {
          q: "Ce este entrepreneurshipul?",
          options: [
            "Procesul de creere a unei noi afaceri",
            "Investiția în bursă",
            "Lucrul la o companie",
            "Tranzacții financiare"
          ],
          correct: 0
        },
        {
          q: "Care sunt trei caracteristici principale ale unui antreprenor?",
          options: [
            "Fearless, Impatient, Lazy",
            "Risk-taker, Innovative, Persistent",
            "Rich, Connected, Lucky",
            "Young, Educated, Famous"
          ],
          correct: 1
        },
        {
          q: "Ce este un MVP (Minimum Viable Product)?",
          options: [
            "Maximum Value Product",
            "Cel mai simplu produs ce poate fi oferit pentru a testa piața",
            "Multi-Vendor Platform",
            "Manager Value Position"
          ],
          correct: 1
        }
      ]
    },
    {
      id: 2,
      name: "Cunoștințe Fundamentale",
      description: "Test intermediar cu probleme mai complexe",
      duration: "60 minute",
      questions: "50 întrebări",
      level: "Mediu",
      questions: [
        {
          q: "Cum ar trebui să abordezi identificarea pieței țintă?",
          options: [
            "Presupune că toată lumea va cumpăra produsul tău",
            "Studiază demografica, comportamentul consumatorului și nevoile",
            "Copiază concurența",
            "Fă reclame la întâmplare"
          ],
          correct: 1
        },
        {
          q: "Ce este pivoting în context de startup?",
          options: [
            "O mișcare de dans",
            "Schimbarea strategiei atunci când datele indică că direcția actuală nu funcționează",
            "O îndoire în structura organizației",
            "Rotirea stocului"
          ],
          correct: 1
        }
      ]
    }
  ];

  if (!selectedTest) {
    return (
      <div style={{ minHeight: '100vh', padding: '2rem', paddingTop: '100px' }}>
        <h1 className="section-title animate-slideInUp">Teste și Evaluări</h1>
        <p className="section-subtitle animate-slideInUp">
          Testează-ți cunoștințele și progresul cu evaluări interactive
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          {tests.map((test) => (
            <div 
              key={test.id} 
              className="card animate-slideInUp"
              style={{
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onClick={() => setSelectedTest(test.id)}
            >
              <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem', color: 'var(--accent-cyan)' }}>
                {test.name}
              </h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem', lineHeight: '1.6' }}>
                {test.description}
              </p>
              <div style={{ marginBottom: '1rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <span style={{ 
                  padding: '0.5rem 1rem', 
                  background: 'rgba(0,240,255,0.2)', 
                  borderRadius: '5px',
                  color: 'var(--accent-cyan)',
                  fontSize: '0.9rem'
                }}>
                  📋 {test.questions}
                </span>
                <span style={{ 
                  padding: '0.5rem 1rem', 
                  background: 'rgba(255,215,0,0.2)', 
                  borderRadius: '5px',
                  color: 'var(--accent-yellow)',
                  fontSize: '0.9rem'
                }}>
                  ⏱️ {test.duration}
                </span>
              </div>
              <button className="btn btn-primary" style={{ width: '100%' }}>
                Ia Testul
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const test = tests.find(t => t.id === selectedTest);
  const isTestCompleted = currentQuestion >= test.questions.length;

  if (isTestCompleted) {
    const percentage = Math.round((score / test.questions.length) * 100);
    return (
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        padding: '2rem',
        paddingTop: '100px'
      }}>
        <div style={{ textAlign: 'center', maxWidth: '600px' }}>
          <h1 className="section-title animate-scaleUp">Test Completat!</h1>
          <div style={{
            fontSize: '5rem',
            marginBottom: '1rem'
          }}>
            {percentage >= 70 ? '✅' : percentage >= 50 ? '⚠️' : '❌'}
          </div>
          <p style={{
            fontSize: '2rem',
            fontWeight: 'bold',
            color: 'var(--accent-yellow)',
            marginBottom: '1rem'
          }}>
            {percentage}%
          </p>
          <p style={{
            fontSize: '1.2rem',
            color: 'var(--text-secondary)',
            marginBottom: '2rem'
          }}>
            Ai răspuns corect la {score} din {test.questions.length} întrebări
          </p>
          <button 
            className="btn btn-primary"
            style={{ marginRight: '1rem' }}
            onClick={() => {
              setSelectedTest(null);
              setCurrentQuestion(0);
              setScore(0);
            }}
          >
            Înapoi la Teste
          </button>
          <button 
            className="btn btn-secondary"
            onClick={() => {
              setCurrentQuestion(0);
              setScore(0);
            }}
          >
            Încearcă Din Nou
          </button>
        </div>
      </div>
    );
  }

  const question = test.questions[currentQuestion];

  return (
    <div style={{ minHeight: '100vh', padding: '2rem', paddingTop: '100px' }}>
      {/* Progress */}
      <div style={{ maxWidth: '800px', margin: '0 auto 2rem' }}>
        <div style={{
          background: 'var(--primary-gray)',
          borderRadius: '10px',
          overflow: 'hidden',
          height: '8px',
          marginBottom: '1rem'
        }}>
          <div style={{
            background: 'linear-gradient(90deg, var(--accent-cyan), var(--accent-yellow))',
            height: '100%',
            width: `${((currentQuestion + 1) / test.questions.length) * 100}%`,
            transition: 'width 0.3s ease'
          }}></div>
        </div>
        <p style={{ color: 'var(--text-secondary)', textAlign: 'center' }}>
          Întrebarea {currentQuestion + 1} din {test.questions.length}
        </p>
      </div>

      {/* Question Card */}
      <div className="card animate-slideInUp" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h2 style={{
          fontSize: '1.5rem',
          marginBottom: '2rem',
          color: 'var(--accent-cyan)'
        }}>
          {question.q}
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {question.options.map((option, idx) => (
            <button
              key={idx}
              className="btn btn-secondary"
              style={{
                justifyContent: 'flex-start',
                padding: '1rem 1.5rem',
                fontSize: '1rem',
                width: '100%'
              }}
              onClick={() => {
                if (idx === question.correct) {
                  setScore(score + 1);
                }
                setCurrentQuestion(currentQuestion + 1);
              }}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TestsPage;
