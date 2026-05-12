import React from 'react';
import Navbar from './components/Navbar.jsx';
import Statistics from './pages/Statistics.jsx';
import { LanguageProvider } from './contexts/LanguageContext.jsx';

function StatsApp() {
  return (
    <LanguageProvider>
      <div className="app-container">
        <Navbar />
        <Statistics />
      </div>
    </LanguageProvider>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<StatsApp />);
