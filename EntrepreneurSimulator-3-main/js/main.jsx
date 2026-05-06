import React, { useState, useEffect, createContext } from 'react';
import Navbar from './components/Navbar.jsx';
import Home from './pages/Home.jsx';
import Loader from './components/Loader.jsx';
import { LanguageProvider } from './contexts/LanguageContext.jsx';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulare loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <LanguageProvider>
      <div className="app-container">
        <Navbar />
        <Home />
      </div>
    </LanguageProvider>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
