import React from 'react';
import Navbar from './components/Navbar.jsx';
import About from './pages/About.jsx';
import { LanguageProvider } from './contexts/LanguageContext.jsx';

function AboutApp() {
  return (
    <LanguageProvider>
      <div className="app-container">
        <Navbar />
        <About />
      </div>
    </LanguageProvider>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<AboutApp />);
