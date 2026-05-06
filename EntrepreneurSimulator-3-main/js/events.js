// === EVENT SYSTEM ===
// Sistem de evenimente random pentru joc

class EventSystem {
  constructor() {
    this.events = this.initializeEvents();
    this.eventHistory = [];
  }

  initializeEvents() {
    return [
      {
        id: 1,
        name: "Oportunitate de Parteneriat",
        description: "O companie mare dorește să colaboreze cu tine. Asta ar putea catapulta afacerea ta.",
        probability: 0.3,
        impact: { budget: 20000, reputation: 15, customers: 2000 },
        consequence: "Parteneriatul s-a încheiat cu succes!"
      },
      {
        id: 2,
        name: "Criză de Aprovizionare",
        description: "Furnizorii tăi au probleme. Va trebui să găsești alți furnizori urgent.",
        probability: 0.4,
        impact: { budget: -10000, reputation: -5, customers: -500 },
        consequence: "Ai găsit furnizori noi, dar mai scump."
      },
      {
        id: 3,
        name: "Scandal Media",
        description: "Produsul tău a generat controverse pe rețelele sociale.",
        probability: 0.2,
        impact: { budget: 0, reputation: -20, customers: -1000 },
        consequence: "Reputația ta a scăzut drastic."
      },
      {
        id: 4,
        name: "Inovație de Piață",
        description: "Ai descoperit o nouă modalitate de a-ți vinde produsele online.",
        probability: 0.35,
        impact: { budget: 5000, reputation: 10, customers: 1500 },
        consequence: "Noul model de business funcționează!"
      },
      {
        id: 5,
        name: "Coeficient Talent",
        description: "Un specialist de talie mondială dorește să se alăture echipei.",
        probability: 0.25,
        impact: { budget: -20000, reputation: 30, customers: 0 },
        consequence: "Specialistul a revolucionat compania ta!"
      },
      {
        id: 6,
        name: "Schimbare Legislativă",
        description: "Guvernul a adoptat o nouă lege care afectează industria ta.",
        probability: 0.15,
        impact: { budget: -15000, reputation: 0, customers: -800 },
        consequence: "Trebuie să te conformezi noilor reglementări."
      },
      {
        id: 7,
        name: "Expansiune Geografică",
        description: "O piață nouă s-a deschis pentru produsele tale.",
        probability: 0.3,
        impact: { budget: 25000, reputation: 20, customers: 3000 },
        consequence: "Ți-ai expandat afacerea cu succes!"
      },
      {
        id: 8,
        name: "Defecțiune Tehnică",
        description: "Sistemul tău de e-commerce s-a prăbușit pentru o zi întreagă.",
        probability: 0.2,
        impact: { budget: -8000, reputation: -10, customers: -2000 },
        consequence: "Sistemi sunt acum reparați, dar a costat mult."
      },
      {
        id: 9,
        name: "Feedback Pozitiv",
        description: "Clienții tăi sunt extrem de satisfăcuți și recomandă afacerea ta.",
        probability: 0.45,
        impact: { budget: 10000, reputation: 25, customers: 1000 },
        consequence: "Reputația ta crește exponențial prin recomandări!"
      },
      {
        id: 10,
        name: "Criză de Lichiditate",
        description: "Clienții tăi întârzie plata facturilor, pui în dificultate cash flow-ul.",
        probability: 0.35,
        impact: { budget: -30000, reputation: -5, customers: 0 },
        consequence: "A trebuit să lichidezi stocuri pentru a obține lichiditate."
      }
    ];
  }

  // Generează un eveniment random
  generateRandomEvent() {
    const randomEvent = this.events[Math.floor(Math.random() * this.events.length)];
    
    // Verifică probabilitatea
    if (Math.random() > randomEvent.probability) {
      return null;
    }

    this.eventHistory.push({
      event: randomEvent,
      timestamp: new Date()
    });

    return randomEvent;
  }

  // Generează multiple evenimente pentru o perioadă
  generateMonthlyEvents() {
    const monthEvents = [];
    
    // Până la 2 evenimente pe lună
    for (let i = 0; i < 2; i++) {
      const event = this.generateRandomEvent();
      if (event) {
        monthEvents.push(event);
      }
    }

    return monthEvents;
  }

  // Aplică impactul unui eveniment
  applyEventImpact(gameState, event) {
    if (!event || !event.impact) return gameState;

    return {
      ...gameState,
      budget: gameState.budget + (event.impact.budget || 0),
      reputation: Math.max(0, Math.min(100, gameState.reputation + (event.impact.reputation || 0))),
      customers: Math.max(0, gameState.customers + (event.impact.customers || 0))
    };
  }

  // Obține istoric evenimente
  getEventHistory() {
    return this.eventHistory;
  }

  // Reseteaza istoria
  resetHistory() {
    this.eventHistory = [];
  }
}

// Export pentru utilizare în React
window.EventSystem = EventSystem;
