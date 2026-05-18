// === GAME ENGINE ===
// Logica de joc pentru aplicația Entrepreneur Simulator

class GameEngine {
  constructor() {
    this.budget = 100000;
    this.reputation = 50;
    this.employees = 5;
    this.year = 1;
    this.month = 1;
    this.products = [];
    this.customers = 100;
    this.marketShare = 1;
    this.gameActive = true;
    this.history = [];
  }

  // Inițializare joc
  initialize() {
    this.saveGameState();
    console.log('Game initialized successfully');
  }

  // Salvează stare joc
  saveGameState() {
    const state = {
      budget: this.budget,
      reputation: this.reputation,
      employees: this.employees,
      year: this.year,
      month: this.month,
      customers: this.customers,
      marketShare: this.marketShare,
      timestamp: new Date()
    };
    this.history.push(state);
    localStorage.setItem('gameState', JSON.stringify(state));
  }

  // Restaurează stare salvată
  loadGameState() {
    const saved = localStorage.getItem('gameState');
    if (saved) {
      const state = JSON.parse(saved);
      Object.assign(this, state);
      console.log('Game state restored');
    }
  }

  // Efectuează o decizie
  makeDecision(decision) {
    if (!this.gameActive) return false;

    const impact = this.calculateDecisionImpact(decision);
    
    this.budget += impact.budgetChange;
    this.reputation = Math.max(0, Math.min(100, this.reputation + impact.reputationChange));
    this.employees += impact.employeeChange;
    this.customers += impact.customerChange;

    // Verifică daca jocul e încheiat (faliment)
    if (this.budget <= 0) {
      this.gameActive = false;
      console.log('Game Over - Bankruptcy');
      return false;
    }

    this.advanceMonth();
    this.saveGameState();
    return true;
  }

  // Calculează impact unei decizii
  calculateDecisionImpact(decision) {
    const impacts = {
      'invest': { budgetChange: -15000, reputationChange: 10, employeeChange: 0, customerChange: 500 },
      'negotiate': { budgetChange: -8000, reputationChange: 5, employeeChange: 0, customerChange: 300 },
      'refuse': { budgetChange: 0, reputationChange: -5, employeeChange: 0, customerChange: 0 },
      'repair': { budgetChange: -5000, reputationChange: 0, employeeChange: 0, customerChange: 0 },
      'hireSpecialist': { budgetChange: -8000, reputationChange: 5, employeeChange: 0, customerChange: 0 },
      'campaign': { budgetChange: -10000, reputationChange: 15, employeeChange: 0, customerChange: 1000 },
      'smallCampaign': { budgetChange: -5000, reputationChange: 8, employeeChange: 0, customerChange: 500 },
      'hire': { budgetChange: -9000, reputationChange: 20, employeeChange: 1, customerChange: 0 },
      'certify': { budgetChange: -8000, reputationChange: 25, employeeChange: 0, customerChange: 800 },
      'default': { budgetChange: 0, reputationChange: 0, employeeChange: 0, customerChange: 0 }
    };

    return impacts[decision] || impacts['default'];
  }

  // Avansează jocul cu o lună
  advanceMonth() {
    this.month++;
    
    // Cheltuielile lunare (salarii și operaționale)
    const monthlyExpense = this.employees * 500 + 1000;
    this.budget -= monthlyExpense;

    // Venit din clienți
    const monthlyRevenue = this.customers * Math.random() * 50;
    this.budget += monthlyRevenue;

    if (this.month > 12) {
      this.month = 1;
      this.year++;
    }
  }

  // Generează eveniment random
  generateRandomEvent() {
    const events = [
      'Piață în creștere - +15% din clienți',
      'Competitor agresiv - -10% din clienți',
      'Ciocrire de buget neașteptată',
      'Partner important vine',
      'Criză în industrie'
    ];
    return events[Math.floor(Math.random() * events.length)];
  }

  // Calculează scor final
  calculateFinalScore() {
    return Math.round(
      (this.budget / 100000) * 30 +
      (this.reputation / 100) * 40 +
      (this.employees / 10) * 20 +
      (this.year - 1) * 10
    );
  }

  // Restartează jocul
  restart() {
    this.budget = 100000;
    this.reputation = 50;
    this.employees = 5;
    this.year = 1;
    this.month = 1;
    this.customers = 100;
    this.gameActive = true;
    this.history = [];
    this.initialize();
  }
}

// Export pentru utilizare în React
window.GameEngine = GameEngine;
