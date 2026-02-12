import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext.jsx';
import { testQuestions } from '../testData.js';

function TestsPage() {
  const [selectedTest, setSelectedTest] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const { t } = useLanguage();

  const tests = testQuestions;

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
                  {test.questionCount} {test.questionCount === 1 ? 'întrebare' : 'întrebări'}
                </span>
                <span style={{ 
                  padding: '0.5rem 1rem', 
                  background: 'rgba(255,215,0,0.2)', 
                  borderRadius: '5px',
                  color: 'var(--accent-yellow)',
                  fontSize: '0.9rem'
                }}>
                  {test.duration}
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
  const isTestCompleted = currentQuestion >= test.questionsList.length;

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
            {percentage >= 70 ? 'Pass' : percentage >= 50 ? 'Warning' : 'Fail'}
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
            Ai răspuns corect la {score} din {test.questionsList.length} întrebări
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

  const question = test.questionsList[currentQuestion];

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
          width: `${((currentQuestion + 1) / test.questionsList.length) * 100}%`,
          transition: 'width 0.3s ease'
        }}></div>
        </div>
        <p style={{ color: 'var(--text-secondary)', textAlign: 'center' }}>
          Întrebarea {currentQuestion + 1} din {test.questionsList.length}
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
