import React, { createContext, useState, useContext } from 'react';

const LanguageContext = createContext();

const translations = {
  ro: {
    // Navbar
    lessons: 'Lecții',
    courses: 'Cursuri',
    tests: 'Teste',
    statistics: 'Statistici',
    about: 'Despre',
    logout: 'Delogare',
    login: 'Logare',

    // Home
    heroTitle: 'Entrepreneur',
    heroHighlight: 'Simulator',
    heroSubtitle: 'Devino antreprenor și ia decizii importante pentru succesul firmei tale!',
    startGame: 'Începe jocul',
    continueGame: 'Rezultate',
    statistics: 'Statistici',
    about: 'Despre',
    settings: 'Setări',
    welcome_subtitle: 'Alege un scenariu și completează-ți datele pentru a începe.',

    // Game UI
    player_name: 'Nume jucător',
    player_email_label: 'Adresa de e-mail (opțional, pentru a primi rezultate)',
    quick_settings: 'Setări rapide',
    time_decision_label: 'Timp decizie (secunde)',
    game_mode_label: 'Mod joc',
    events_mode: 'Evenimente',
    periods_mode: 'Perioade (lunar)',
    choose_scenario: 'Alege scenariu',
    enter_name: 'Introdu un nume pentru a începe',
    progress_deleted: 'Progres șters.',
    time_left_label: 'Timp rămas pentru alegere',
    periodic_choices: 'Alegeri periodice',
    advance_month: 'Avansează Luna (plătește salarii)',

    bankruptcy_title: 'Ai ajuns în faliment',
    bankruptcy_text: 'Bugetul tău a trecut sub 0. Salvează rezultatele și trimite-ți un e-mail cu raportul.',
    email_for_report: 'Introdu adresa de e-mail pentru raport',
    send_report: 'Trimite Raport',
    restart_label: 'Începe din nou',

    save_progress: 'Salvează progres',
    delete_saved: 'Șterge progres salvat',
    finish_report: 'Termină joc (raport)',

    // Final modal
    final_results_title: 'Rezultate finale',
    final_budget: 'Buget final',
    final_profit: 'Profit',
    final_reputation: 'Reputație',
    final_employees: 'Angajați',
    final_rounds: 'Runde jucate',
    save_to_server: 'Salvează pe server',
    send_by_email: 'Trimite pe e-mail',
    download_json: 'Descarcă JSON',
    play_again: 'Joacă din nou',
    close: 'Închide',

    leaderboard_title: 'Top Rezultate',
    player: 'Jucător',
    budget: 'Buget',
    competitors_overview: 'Concurenți (estimare piață)',
    send_failed: 'Trimitere eșuată',
    email_error: 'Eroare la trimiterea e-mailului',
    saved_local: 'Progres salvat local.',
    report_sent: 'Rezultatele au fost trimise pe e-mail.',
    show_calculator: 'Arată Calculator',
    hide_calculator: 'Ascunde',
    save_game: 'Salvează',
    finish_game: 'Termină Joc',
  },
  en: {
    // Navbar
    lessons: 'Lessons',
    courses: 'Courses',
    tests: 'Tests',
    statistics: 'Statistics',
    about: 'About',
    logout: 'Logout',
    login: 'Login',

    // Home
    heroTitle: 'Entrepreneur',
    heroHighlight: 'Simulator',
    heroSubtitle: 'Become an entrepreneur and make important decisions for your business success!',
    startGame: 'Start Game',
    continueGame: 'Continue',
    statistics: 'Statistics',
    about: 'About',
    settings: 'Settings',
    welcome_subtitle: 'Choose a scenario and fill in your details to start.',

    // Game UI
    player_name: 'Player name',
    player_email_label: 'E-mail address (optional, to receive results)',
    quick_settings: 'Quick settings',
    time_decision_label: 'Decision time (seconds)',
    game_mode_label: 'Game mode',
    events_mode: 'Events',
    periods_mode: 'Periods (monthly)',
    choose_scenario: 'Choose scenario',
    enter_name: 'Enter a name to start',
    progress_deleted: 'Progress cleared.',
    time_left_label: 'Time left for choice',
    periodic_choices: 'Periodic choices',
    advance_month: 'Advance Month (pay salaries)',

    bankruptcy_title: 'You are bankrupt',
    bankruptcy_text: 'Your budget dropped below 0. Save results and send yourself a report by email.',
    email_for_report: 'Enter email for report',
    send_report: 'Send report',
    restart_label: 'Start again',

    save_progress: 'Save progress',
    delete_saved: 'Delete saved progress',
    finish_report: 'Finish game (report)',

    // Final modal
    final_results_title: 'Final results',
    final_budget: 'Final budget',
    final_profit: 'Profit',
    final_reputation: 'Reputation',
    final_employees: 'Employees',
    final_rounds: 'Rounds played',
    save_to_server: 'Save to server',
    send_by_email: 'Send by email',
    download_json: 'Download JSON',
    play_again: 'Play again',
    close: 'Close',

    leaderboard_title: 'Top Results',
    player: 'Player',
    budget: 'Budget',
    competitors_overview: 'Competitors (market estimate)',
    send_failed: 'Send failed',
    email_error: 'Error sending email',
    saved_local: 'Progress saved locally.',
    report_sent: 'Results have been emailed.',
    show_calculator: 'Show Calculator',
    hide_calculator: 'Hide',
    save_game: 'Save',
    finish_game: 'End Game',
  },
};

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('appLanguage') || 'ro';
  });

  const toggleLanguage = () => {
    setLanguage(prev => {
      const newLang = prev === 'ro' ? 'en' : 'ro';
      localStorage.setItem('appLanguage', newLang);
      return newLang;
    });
  };

  const t = (key) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}
