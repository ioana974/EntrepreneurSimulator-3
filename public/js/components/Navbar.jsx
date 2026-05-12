import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext.jsx';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { language, toggleLanguage, t } = useLanguage();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="logo-container" onClick={() => window.location.href = 'index.html'} style={{ cursor: 'pointer' }}>
        <div className="logo">E</div>
        <span className="navbar-title">EntrepreneurHub</span>
      </div>

      <div className="nav-menu" id="nav-menu">
        <a href="index.html?view=lessons" onClick={closeMenu}>{t('lessons')}</a>
        <a href="index.html?view=courses" onClick={closeMenu}>{t('courses')}</a>
        <a href="index.html?view=tests" onClick={closeMenu}>{t('tests')}</a>
        <a href="index.html?view=stats" onClick={closeMenu}>{t('statistics')}</a>
        <a href="index.html?view=about" onClick={closeMenu}>{t('about')}</a>
      </div>

      <div className="nav-controls">
        <button className="language-switch" onClick={toggleLanguage}>
          {language === 'ro' ? 'EN' : 'RO'}
        </button>
        <button 
          className={`hamburger ${menuOpen ? 'active' : ''}`}
          onClick={toggleMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${menuOpen ? 'active' : ''}`} id="mobile-menu">
        <a href="index.html" onClick={closeMenu}>{t('home')}</a>
        <a href="index.html?view=lessons" onClick={closeMenu}>{t('lessons')}</a>
        <a href="index.html?view=courses" onClick={closeMenu}>{t('courses')}</a>
        <a href="index.html?view=tests" onClick={closeMenu}>{t('tests')}</a>
        <a href="index.html?view=stats" onClick={closeMenu}>{t('statistics')}</a>
        <a href="index.html?view=about" onClick={closeMenu}>{t('about')}</a>
      </div>
    </nav>
  );
}

export default Navbar;
