import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import Navbar from './components/Navbar.jsx';
import GameDashboard from './components/GameDashboard.jsx';
import { LanguageProvider } from './contexts/LanguageContext.jsx';

function GameApp() {
  return (
    <LanguageProvider>
      <div className="app-container">
        <Navbar />
        <GameDashboard />
      </div>
    </LanguageProvider>
  );
}

// Export a mount function the page can call after loading the bundle
export function renderGameApp() {
  const container = document.getElementById('root');
  if (!container) return;
  const root = ReactDOM.createRoot(container);
  root.render(<GameApp />);
}

// Expose to window for non-module environments and for game.html placeholder to call
if (typeof window !== 'undefined') {
  window.renderGameApp = renderGameApp;
  // Auto-render on load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderGameApp);
  } else {
    renderGameApp();
  }
}
