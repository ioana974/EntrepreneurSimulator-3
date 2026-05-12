import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext.jsx';
import ScenarioSelect from './ScenarioSelect.jsx';

function GameDashboard() {
  // --- Game state ---
  const [gameStarted, setGameStarted] = useState(false);
  const [scenario, setScenario] = useState(null);
  const [budget, setBudget] = useState(0);
  const [reputation, setReputation] = useState(50);
  const [employees, setEmployees] = useState([]);
  const [year, setYear] = useState(1);
  const [month, setMonth] = useState(1);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [competitors, setCompetitors] = useState([]);
  const [playerName, setPlayerName] = useState('');
  const [playerEmail, setPlayerEmail] = useState('');
  const [savedExists, setSavedExists] = useState(false);
  const [resultsSent, setResultsSent] = useState(false);
  const [customScenarioOptions, setCustomScenarioOptions] = useState({
    name: 'Propria mea afacere',
    type: 'service',
    budget: 120000,
    currency: 'RON',
    employees: 6,
    goal: 'profit',
    competition: 'medie'
  });
  const [generatedQuestions, setGeneratedQuestions] = useState(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState(null);

  // Calculator & UI state
  const [showCalculator, setShowCalculator] = useState(false);
  const [calcDisplay, setCalcDisplay] = useState('0');

  // Game finality
  const [gameEnded, setGameEnded] = useState(false);
  const [finalStats, setFinalStats] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);
  const [autoStart, setAutoStart] = useState(false);

  const { t } = useLanguage();
  const STORAGE_KEY = 'entrepreneur_sim_game_v2';

  // --- Scenarios ---
  const scenarios = [
    {
      id: 'sneakers',
      name: 'Fabrică de Adidași',
      description: 'Producție masivă, costuri fixe mari, competiție puternică în preț.',
      type: 'manufacturing',
      startBudget: 180000,
      startEmployees: 20,
      salaryPerEmployee: 1200,
      monthlyRevenue: 15000
    },
    {
      id: 'import-export',
      name: 'Firmă Import-Export',
      description: 'Logistică și relații internaționale; volatilitate dar marje bune.',
      type: 'logistics',
      startBudget: 150000,
      startEmployees: 8,
      salaryPerEmployee: 1000,
      monthlyRevenue: 12000
    },
    {
      id: 'tech',
      name: 'Startup Tech',
      description: 'Câștig din inovație, investiții în R&D și scalare rapidă.',
      type: 'software',
      startBudget: 130000,
      startEmployees: 6,
      salaryPerEmployee: 2200,
      monthlyRevenue: 10000
    }
  ];

  const customSalaryForType = (type) => {
    switch (type) {
      case 'manufacturing': return 1500;
      case 'logistics': return 1100;
      case 'software': return 2200;
      case 'service': return 900;
      case 'retail': return 1000;
      default: return 1000;
    }
  };

  const customRevenueForType = (type) => {
    switch (type) {
      case 'manufacturing': return 15000;
      case 'logistics': return 13000;
      case 'software': return 11000;
      case 'service': return 10000;
      case 'retail': return 9500;
      default: return 10000;
    }
  };

  const customScenario = {
    id: 'custom',
    name: 'Creează propria ta afacere',
    description: 'Definește buget, angajați, monedă și obiective pentru un scenariu personalizat.',
    type: 'custom',
    startBudget: customScenarioOptions.budget,
    startEmployees: customScenarioOptions.employees,
    salaryPerEmployee: customSalaryForType(customScenarioOptions.type),
    monthlyRevenue: customRevenueForType(customScenarioOptions.type),
    customOptions: { ...customScenarioOptions }
  };

  const allScenarios = [...scenarios, customScenario];

  // --- Generate employees with details ---
  const generateEmployees = (scenario) => {
    const firstNames = ['Ion', 'Maria', 'Ana', 'Mihai', 'Elena', 'Alexandru', 'Andrei', 'Dana', 'Cristian', 'Laura'];
    const lastNames = ['Popescu', 'Ionescu', 'Novac', 'Popa', 'Dinu', 'Mihai', 'Stan', 'Stoica', 'Georgiu', 'Vasile'];
    const employees = [];
    for (let i = 0; i < scenario.startEmployees; i++) {
      const age = Math.floor(Math.random() * 30) + 25;
      const seniority = Math.floor(Math.random() * 15) + 1;
      employees.push({
        id: i,
        name: firstNames[Math.floor(Math.random() * firstNames.length)] + ' ' + lastNames[Math.floor(Math.random() * lastNames.length)],
        age,
        seniority,
        salary: scenario.salaryPerEmployee,
        position: ['Developer', 'Manager', 'Specialist', 'Operator', 'Coordinator'][Math.floor(Math.random() * 5)],
        performance: Math.floor(Math.random() * 40) + 60
      });
    }
    return employees;
  };

  const getCustomScenarioQuestions = () => {
    if (scenario?.type !== 'custom') return [];
    if (generatedQuestions && generatedQuestions.length > 0) {
      return generatedQuestions;
    }

    const goalText = {
      profit: 'profit rapid',
      'creștere': 'creștere rapidă',
      stabilitate: 'stabilitate și cashflow',
      piață: 'intrare pe piață nouă'
    }[scenario.customOptions.goal] || 'un obiectiv clar';

    return [
      {
        id: 'custom-1',
        title: `Start strategic pentru ${scenario.customOptions.name}`,
        description: `Ai ales un business ${scenario.customOptions.type} cu buget ${scenario.customOptions.budget.toLocaleString()} și ${scenario.customOptions.employees} angajați. Primele decizii sunt critice.`,
        technicalDetails: `Scop: ${goalText}. Concurență: ${scenario.customOptions.competition}.`,
        choices: [
          { text: 'Investește în clarificarea ofertei și valoarea unică', budgetChange: -3000, reputationChange: 5 },
          { text: 'Optimizează costurile inițiale și amână angajările', budgetChange: 0, reputationChange: -2 },
          { text: 'Lansează rapid cu o versiune minim viabilă', budgetChange: -5000, reputationChange: 4 }
        ]
      },
      {
        id: 'custom-2',
        title: 'Planul de marketing adaptat businessului tău',
        description: `Dezvoltă abordarea potrivită pentru ${scenario.customOptions.type} și concurență ${scenario.customOptions.competition}.`,
        technicalDetails: `Folosește un buget inteligent pentru a-ți crește vizibilitatea fără a epuiza numerarul.`,
        choices: [
          { text: 'Concentrează-te pe clienți locali', budgetChange: -4000, reputationChange: 6 },
          { text: 'Tintește expansiunea națională', budgetChange: -8000, reputationChange: 10 },
          { text: 'Folosește rețele și recomandări gratuite', budgetChange: 0, reputationChange: 1 }
        ]
      }
    ];
  };

  const generateCustomQuestionsAI = async (options) => {
    setAiLoading(true);
    setAiError(null);
    try {
      const response = await fetch('/api/ai/generate-questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ customOptions: options })
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        setAiError(data.message || 'AI generation failed');
        return [];
      }
      if (Array.isArray(data.questions) && data.questions.length > 0) {
        setGeneratedQuestions(data.questions);
        return data.questions;
      }
      setAiError('AI nu a returnat întrebări valide');
      return [];
    } catch (error) {
      console.error('AI error:', error);
      setAiError(error.message || 'AI unavailable');
      return [];
    } finally {
      setAiLoading(false);
    }
  };

  useEffect(() => {
    if (scenario?.id === 'custom') {
      setGeneratedQuestions(null);
      setAiError(null);
    }
  }, [scenario?.id, JSON.stringify(customScenarioOptions)]);

  // --- Generate dynamic questions with employee names ---
  const getComplexQuestions = () => {
    const lowestPerfEmployee = employees.length > 0 ? employees.reduce((min, emp) => emp.performance < min.performance ? emp : min) : null;
    const newestEmployee = employees.length > 0 ? employees[employees.length - 1] : null;
    const topPerformanceEmployee = employees.length > 0 ? employees.reduce((max, emp) => emp.performance > max.performance ? emp : max) : null;
    const candidateName1 = 'Alexandru (senior)';
    const candidateName2 = 'Ștefan (junior)';

    const customQuestions = getCustomScenarioQuestions();
    const allQuestions = [
      ...customQuestions,
      {
        id: 1,
        title: 'Alegerea Formei Juridice (SRL vs PFA)',
        description: 'Din Lecția 1: Trebuie să decizi cum să-ți structurezi firma. Voi alege SRL cu separație patrimonială.',
        technicalDetails: 'Lecția 1 - Ontologia Formelor Juridice: SRL oferă protecție patrimonială (răspunzi doar în limita capitalului social), PFA nu are separație de patrimoniu.',
        choices: [
          { text: 'Deschid SRL (cost -2K, protecție patrimonială, reputație +5)', budgetChange: -2000, reputationChange: 5 },
          { text: 'Deschid PFA (cost -500, mai flexibil dar risc patrimonial)', budgetChange: -500, reputationChange: -3 },
          { text: 'Deschid SRL cu sediu virtual (cost -1K, compromis bun)', budgetChange: -1000, reputationChange: 2 }
        ]
      },
      {
        id: 2,
        title: 'Decizie angajare - Lecția 4: Resurse Umane',
        description: 'Ai 2 candidați. Din Lecția 4: Gestionarea HR critică pentru cost vs. calitate.',
        technicalDetails: 'Din Lecția 4: Contractele individuale de muncă (CIM) sunt obligatorii. Investigează REVISAL înregistrări și costuri SSM/PSI.',
        choices: [
          { text: `Angajează ${candidateName1} (mai scump +30%/lună dar senior)`, budgetChange: -2500, employeeAdd: 1, reputationChange: 5 },
          { text: `Angajează ${candidateName2} (mai ieftin, junior, risc calitate)`, budgetChange: -900, employeeAdd: 1, reputationChange: -1 },
          { text: 'Nu angajezi pe nimeni (resparcă bugetul, dar riscul scade reputația)', budgetChange: 0, reputationChange: -5 }
        ]
      },
      {
        id: 3,
        title: 'Concediament necesar',
        description: 'Bugetul scade, trebuie să scapi de un salariat. Alege pe cine.',
        technicalDetails: 'Severance obligations and labor law compliance are important when terminating.',
        choices: [
          { text: lowestPerfEmployee ? `Concediază ${lowestPerfEmployee.name} (performanță slabă: ${lowestPerfEmployee.performance}%)` : 'Concediază angajatul cu performanță slabă', budgetChange: 2000, employeeRemove: 'lowest', reputationChange: -8 },
          { text: newestEmployee ? `Concediază ${newestEmployee.name} (cel mai nou)` : 'Concediază cel mai nou angajat', budgetChange: 1500, employeeRemove: 'newest', reputationChange: -10 }
        ]
      },
      {
        id: 4,
        title: 'Investiție în mașini noi',
        description: 'O tehnologie nouă poate spori productivitate cu 30% dar necesită investiție mare.',
        technicalDetails: 'CapEx decision: include depreciation schedule and expected throughput increase.',
        choices: [
          { text: 'Investă complet (10K)', budgetChange: -10000, reputationChange: 8 },
          { text: 'Investă parțial (5K)', budgetChange: -5000, reputationChange: 4 },
          { text: 'Amână (nu investești)', budgetChange: 0, reputationChange: -3 }
        ]
      },
      {
        id: 5,
        title: 'Marketing: Reclamă vs Influenceri',
        description: 'Ai 8K pentru marketing. Cum le cheltuiești?',
        technicalDetails: 'Consider CAC, conversion funnels and RAAS for channel ROI.',
        choices: [
          { text: 'Reclamă TV (costisitoare, mare reach)', budgetChange: -8000, reputationChange: 10 },
          { text: 'Influenceri social (mai ieftin, țintă tânăr)', budgetChange: -4000, reputationChange: 6 },
          { text: 'Skip marketing (economisești)', budgetChange: 0, reputationChange: -5 }
        ]
      },
      {
        id: 6,
        title: 'Calitatea vs Viteza',
        description: 'Client vrea produs în 2 săptămâni dar calitate scade. Faci sau nu?',
        technicalDetails: 'Assess defect rate increase vs revenue impact for rushed deliveries.',
        choices: [
          { text: 'Acceptă contract (2 săpt, calitate scade)', budgetChange: 6000, reputationChange: -8 },
          { text: 'Negocia 4 săptămâni (mai puțin stress)', budgetChange: 3000, reputationChange: 2 },
          { text: 'Refuză contract', budgetChange: 0, reputationChange: -3 }
        ]
      },
      {
        id: 7,
        title: 'Audit de costuri',
        description: 'Un consultant sugerează că poți economisi 6K/lună prin optimizare. Angajezi? (2K cost)',
        technicalDetails: 'Process optimization: look for quick wins in OEE and reduce waste.',
        choices: [
          { text: 'Angajează consultantul (2K, economisești pe termen lung)', budgetChange: -2000, reputationChange: 3 },
          { text: 'Încerc singur (risc)', budgetChange: 0, reputationChange: -1 },
          { text: 'Ignor sugestia', budgetChange: 0, reputationChange: -5 }
        ]
      },
      {
        id: 8,
        title: 'Salariu angajat top',
        description: topPerformanceEmployee ? `${topPerformanceEmployee.name} cere 20% mărire. Acordi sau merge la competitor?` : 'Cel mai bun angajat cere mărire.',
        technicalDetails: topPerformanceEmployee ? `Salary negotiation: current salary ${topPerformanceEmployee.salary}$, requested +20% - impacts payroll by ${Math.round((topPerformanceEmployee.salary || 0) * 0.2)}$/month.` : '',
        choices: [
          { text: 'Acord mărire (menții talentul)', budgetChange: -Math.round((topPerformanceEmployee?.salary || 0) * 0.2), reputationChange: 8, targetEmployeeId: topPerformanceEmployee?.id, salaryRaisePercent: 20 },
          { text: 'Negocia 10% (compromis)', budgetChange: -Math.round((topPerformanceEmployee?.salary || 0) * 0.1), reputationChange: 4, targetEmployeeId: topPerformanceEmployee?.id, salaryRaisePercent: 10 },
          { text: 'Refuz (risc pierdere)', budgetChange: 0, reputationChange: -10 }
        ]
      },
      {
        id: 9,
        title: 'Echipament vechi vs nou',
        description: 'Mașina de producție se defectează. Repară (3K) sau cumpără nouă (12K)?',
        technicalDetails: 'Consider MTBF and MTTR when deciding between capex and repair.',
        choices: [
          { text: 'Reparare de urgență (3K)', budgetChange: -3000, reputationChange: 2 },
          { text: 'Cumpără nouă mașină (12K, eficiență +40%)', budgetChange: -12000, reputationChange: 8 },
          { text: 'Încearcă reparație DIY (1K, risc)', budgetChange: -1000, reputationChange: -8 }
        ]
      },
      {
        id: 10,
        title: 'Rebranding',
        description: 'Reputație e slabă. Investiție în rebranding pentru a te repoziționeza?',
        technicalDetails: 'Brand repositioning: align value proposition, messaging and UX.',
        choices: [
          { text: 'Full rebranding (7K)', budgetChange: -7000, reputationChange: 15 },
          { text: 'Mini-rebranding (3K)', budgetChange: -3000, reputationChange: 6 },
          { text: 'Fără rebranding', budgetChange: 0, reputationChange: 0 }
        ]
      },
      {
        id: 11,
        title: 'Parteneriat strategic',
        description: 'Firmă mare vrea parteneriat 50/50. Bună sau risc?',
        technicalDetails: 'Term sheet considerations: dilution, veto rights, earn-outs.',
        choices: [
          { text: 'Acceptă parteneriat', budgetChange: -1000, reputationChange: 8 },
          { text: 'Negocia termeni mai favorabili', budgetChange: -500, reputationChange: 5 },
          { text: 'Refuză, rămâi independent', budgetChange: 0, reputationChange: -2 }
        ]
      },
      {
        id: 12,
        title: 'Expansiune geografică',
        description: 'Oportunitate pe piață nouă. Investiție 15K, risc dar upside potențial mare.',
        technicalDetails: 'Market expansion: consider logistics, regulatory compliance, and projected CAC/LTV.',
        choices: [
          { text: 'Intri pe piață nouă (15K, risc)', budgetChange: -15000, reputationChange: 10 },
          { text: 'Pilot mici (5K, test)', budgetChange: -5000, reputationChange: 4 },
          { text: 'Rămâi local', budgetChange: 0, reputationChange: -3 }
        ]
      },
      // Extra complex scenarios to reach 21
      {
        id: 13,
        title: 'Exit pe profit disponibile',
        description: 'Un investitor oferă să cumpere pachetul majoritar — ieși pe profit acum sau continui.',
        technicalDetails: 'Exit option: evaluate EBITDA multiple, one-time liquidity vs long-term growth.',
        choices: [
          { text: 'Acceptă oferta de exit (primești +40K)', budgetChange: 40000, reputationChange: 0 },
          { text: 'Refuză și continui dezvoltarea', budgetChange: 0, reputationChange: 5 }
        ]
      },
      {
        id: 14,
        title: 'Automatizare proces',
        description: 'O linie de producție poate fi automatizată cu 18K, reduce costuri de muncă și crește productivitatea.',
        technicalDetails: 'CapEx vs OpEx tradeoff; ROI estimat 2 ani la reducere 30% costuri de muncă.',
        choices: [
          { text: 'Automatizează complet (18K)', budgetChange: -18000, reputationChange: 8 },
          { text: 'Pilot (6K)', budgetChange: -6000, reputationChange: 3 },
          { text: 'Nu acum', budgetChange: 0, reputationChange: -2 }
        ]
      },
      {
        id: 15,
        title: 'Partener strategic tehnic',
        description: 'O firmă de tehnologie îți oferă integrare, dar cere redevență lunară.',
        technicalDetails: 'Integration requires API contracts, SLA and uptime guarantees.',
        choices: [
          { text: 'Accept integrator (plată inițială -5K, +5K revenue/mo)', budgetChange: -5000, reputationChange: 5 },
          { text: 'Negocia termenii', budgetChange: -1000, reputationChange: 2 },
          { text: 'Refuz', budgetChange: 0, reputationChange: -3 }
        ]
      }
      ,
      {
        id: 16,
        title: 'TVA - Mecanismul Colectării (Lecția 1)',
        description: 'Ai vânzări B2B cu TVA colectat. Din Lecția 1: TVA nu e banii tăi, ești doar colector pentru stat.',
        technicalDetails: 'Din Lecția 1: TVA Deductibil vs. TVA Colectat. Dacă Colectat > Deductibil, plătești diferența. Doar cu documente justificative!',
        choices: [
          { text: 'Plătești TVA imediat din casierie (corect)', budgetChange: -3000, reputationChange: 2 },
          { text: 'Amâni plata TVA (risc: penalități ANAF)', budgetChange: 0, reputationChange: -8 },
          { text: 'Optimizezi lanțul de aprovizionare (deductibil mai mare)', budgetChange: -1500, reputationChange: 3 }
        ]
      },
      {
        id: 17,
        title: 'Impozit pe Profit vs Microîntreprindere (Lecția 1)',
        description: 'Din Lecția 1: Alegerea regimului fiscal critică. Microîntreprindere 1% pe venit vs. Impozit 16% pe profit.',
        technicalDetails: 'Din Lecția 1: Microîntreprindere ideal pentru servicii (marje mari, cheltuieli mici). Impozit pe Profit ideal pentru retail/producție (marje mici, volum mare).',
        choices: [
          { text: 'Alegi regim Microîntreprindere 1% (1K setup)', budgetChange: -1000, reputationChange: 2 },
          { text: 'Alegi Impozit pe Profit 16% (se calculează pe Venituri-Cheltuieli)', budgetChange: -500, reputationChange: 0 },
          { text: 'Consulți un contabil (cost -800, dar reputație +4)', budgetChange: -800, reputationChange: 4 }
        ]
      },
      {
        id: 18,
        title: 'Impozit pe profit și optimizare fiscală',
        description: 'Consultantul fiscal propune optimizări care reduc impozitul pe profit pe termen lung.',
        technicalDetails: 'Consider tax incentives, accelerated depreciation, and transfer pricing risk when applicable.',
        choices: [
          { text: 'Aplici scheme legale de optimizare (cost inițial 2K)', budgetChange: -2000, reputationChange: 1 },
          { text: 'Rămâi conservator (fără optimizare)', budgetChange: 0, reputationChange: 0 },
          { text: 'Investigezi mai mult înainte (cost -500, timp -1 lună)', budgetChange: -500, reputationChange: 2 }
        ]
      },
      {
        id: 19,
        title: 'Plan financiar pe 3 ani',
        description: 'Contabilii cer să pregătești un forecast pe 3 ani pentru a atrage investiții.',
        technicalDetails: 'Build P&L forecast, cashflow statement and balance sheet projections; include sensitivity scenarios for interest and tax rate changes.',
        choices: [
          { text: 'Pregătești forecast conservator (cost 1K)', budgetChange: -1000, reputationChange: 2 },
          { text: 'Pregătești forecast agresiv (cost 2K)', budgetChange: -2000, reputationChange: 4 },
          { text: 'Nu pregătești (riscul scăderii încredere)', budgetChange: 0, reputationChange: -6 }
        ]
      },
      {
        id: 20,
        title: 'Amortizare și deductibilitate',
        description: 'Achiziție de echipament care poate fi amortizat fiscal. Cum tratezi amortizarea?',
        technicalDetails: 'Choose useful life / amortization method; accelerated amortisation improves immediate tax position but affects accounting profit.',
        choices: [
          { text: 'Amortizezi accelerat (beneficiu fiscal inițial)', budgetChange: -8000, reputationChange: 1 },
          { text: 'Amortizare liniară (impact neutru)', budgetChange: -8000, reputationChange: 0 },
          { text: 'Cauți grant / subvenție pentru echipament (cost -1.5K pentru paper)', budgetChange: -1500, reputationChange: 3 }
        ]
      },
      {
        id: 21,
        title: 'Risc systemic: Creștere dobânzi și inflatie',
        description: 'Economia tinde spre creșterea dobânzilor; ce strategii adopți pe termen lung?',
        technicalDetails: 'Hedging interest exposure, renegotiating fixed rate loans, or shifting to shorter term liabilities.',
        choices: [
          { text: 'Refinanțezi pe termen scurt (cost inițial)', budgetChange: -3000, reputationChange: 0 },
          { text: 'Păstrezi structura actuală', budgetChange: 0, reputationChange: 0 },
          { text: 'Creezi rezervă de cash (conservator)', budgetChange: 0, reputationChange: -2 }
        ]
      }
    ];
    return scenario?.type === 'custom' ? allQuestions.slice(0, 21) : allQuestions;
  };

  // --- Initialize ---
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setSavedExists(true);
    }

    // Auto-start if flag is set
    if (localStorage.getItem('autoStartGame') === 'true') {
      localStorage.removeItem('autoStartGame');
      setAutoStart(true);
      setPlayerName('Antreprenor');
      setScenario(scenarios[0]);
    }
  }, []);

  // --- Handle auto-start ---
  useEffect(() => {
    if (autoStart && playerName && scenario && !gameStarted) {
      const doAutoStart = async () => {
        // Generate user ID and save to localStorage (no backend needed)
        const userId = 'user_' + Date.now();
        localStorage.setItem('entrepreneur_userId', userId);
        localStorage.setItem('entrepreneur_playerName', playerName);
        localStorage.setItem('entrepreneur_playerEmail', playerEmail || '');

        setBudget(scenario.startBudget);
        setEmployees(generateEmployees(scenario));
        setReputation(50);
        setYear(1);
        setMonth(1);
        setCurrentQuestion(0);
        setGameStarted(true);
        setCompetitors(generateCompetitors(scenario));
      };
      doAutoStart();
    }
  }, [autoStart, playerName, scenario, gameStarted]);

  // --- Save progress ---
  function saveLocalProgress(override = {}) {
    const state = {
      scenarioId: override.scenarioId ?? scenario?.id,
      budget: override.budget ?? budget,
      reputation: override.reputation ?? reputation,
      employees: override.employees ?? employees,
      year: override.year ?? year,
      month: override.month ?? month,
      currentQuestion: override.currentQuestion ?? currentQuestion,
      playerName: override.playerName ?? playerName,
      playerEmail: override.playerEmail ?? playerEmail
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    setSavedExists(true);
  }

  // --- Competitors ---
  function generateCompetitors(scn) {
    const names = scn.type === 'manufacturing' ? ['FastSole', 'RunMax', 'ShoeCraft'] : scn.type === 'logistics' ? ['GlobeTrans', 'SeaFreight', 'AirLineX'] : ['ScaleUp', 'CloudShift', 'DevLabs'];
    const base = scn.startBudget || 100000;
    const budgets = names.map((n, i) => Math.max(20000, Math.floor(base * (0.5 + Math.random()))));
    const raw = names.map(n => Math.random());
    const sum = raw.reduce((a, b) => a + b, 0);
    const market = raw.map(r => r / sum);
    return names.map((n, i) => ({ name: n, budget: budgets[i], marketShare: market[i] }));
  }

  // --- Start Game ---
  const startGame = async (selectedScenario) => {
    if (!playerName) {
      alert(t('enter_name'));
      return;
    }

    // Generate user ID and save to localStorage (no backend needed)
    const userId = 'user_' + Date.now();
    localStorage.setItem('entrepreneur_userId', userId);
    localStorage.setItem('entrepreneur_playerName', playerName);
    localStorage.setItem('entrepreneur_playerEmail', playerEmail || '');

    const actualScenario = selectedScenario.id === 'custom'
      ? { ...customScenario, name: customScenarioOptions.name || 'Propria mea afacere' }
      : selectedScenario;

    if (selectedScenario.id === 'custom') {
      await generateCustomQuestionsAI(customScenarioOptions);
    }

    setScenario(actualScenario);
    setBudget(actualScenario.startBudget);
    setEmployees(generateEmployees(actualScenario));
    setReputation(50);
    setYear(1);
    setMonth(1);
    setCurrentQuestion(0);
    setGameStarted(true);
    setCompetitors(generateCompetitors(actualScenario));
  };

  // --- Apply choice & advance ---
  const applyChoice = (choice) => {
    const newBudget = Math.round(budget + (choice.budgetChange || 0));
    const newReputation = Math.max(0, Math.min(100, reputation + (choice.reputationChange || 0)));
    
    let newEmployees = [...employees];
    if (choice.employeeAdd) {
      const newEmp = {
        id: Math.max(...(newEmployees.length > 0 ? newEmployees.map(e => e.id) : [-1])) + 1,
        name: 'Angajat ' + (newEmployees.length + 1),
        age: Math.floor(Math.random() * 30) + 25,
        seniority: 0,
        salary: scenario.salaryPerEmployee,
        position: 'Nou',
        performance: 70
      };
      newEmployees.push(newEmp);
    }
    
    if (choice.employeeRemove === 'lowest') {
      if (newEmployees.length > 0) {
        const lowestId = newEmployees.reduce((min, emp) => emp.performance < min.performance ? emp : min).id;
        newEmployees = newEmployees.filter(e => e.id !== lowestId);
      }
    }
    if (choice.employeeRemove === 'newest') {
      if (newEmployees.length > 0) {
        const newest = newEmployees[newEmployees.length - 1];
        newEmployees = newEmployees.filter(e => e.id !== newest.id);
      }
    }

    // Apply targeted salary raise if present
    if (choice.targetEmployeeId != null && choice.salaryRaisePercent) {
      newEmployees = newEmployees.map(e => {
        if (e.id === choice.targetEmployeeId) {
          const raise = Math.round(e.salary * (choice.salaryRaisePercent / 100));
          return { ...e, salary: e.salary + raise };
        }
        return e;
      });
    }

    // If choice requests immediate end (exit on profit), finalize immediately
    if (choice.endGameImmediate) {
      // persist the state with the budget change applied
      setBudget(newBudget);
      setReputation(newReputation);
      setEmployees(newEmployees);
      finalizeGame({ budget: newBudget, reputation: newReputation, employees: newEmployees });
      return;
    }

    setBudget(newBudget);
    setReputation(newReputation);
    setEmployees(newEmployees);

    const nextQ = currentQuestion + 1;
    const complexQuestions = getComplexQuestions();
    const totalQuestions = complexQuestions.length;
    if (nextQ >= totalQuestions) {
      finalizeGame({ budget: newBudget, reputation: newReputation, employees: newEmployees });
    } else {
      setCurrentQuestion(nextQ);
      saveLocalProgress({ budget: newBudget, reputation: newReputation, employees: newEmployees, currentQuestion: nextQ });
    }
  };

  // --- Finalize ---
  const finalizeGame = (override = {}) => {
    const finalBudget = override.budget ?? budget;
    const finalReputation = override.reputation ?? reputation;
    const finalEmployees = override.employees ?? employees;
    const roundsPlayed = currentQuestion + 1;
    const finalProfit = finalBudget - (scenario?.startBudget || 0);
    const success = finalProfit >= 0;
    const final = {
      budget: finalBudget,
      reputation: finalReputation,
      employees: finalEmployees.length,
      year,
      month,
      roundsPlayed,
      profit: finalProfit,
      success,
      scenarioId: scenario?.id
    };
    
    // Calculate simulation score
    const profitScore = Math.max(0, (finalProfit / (scenario?.startBudget || 1)) * 100);
    const reputationScore = finalReputation;
    const employeeRetentionScore = (finalEmployees.length / (scenario?.startEmployees || 1)) * 50;
    const simulationScore = Math.round((profitScore + reputationScore + employeeRetentionScore) / 3);
    
    // Track simulation score in localStorage
    const userId = localStorage.getItem('entrepreneur_userId');
    let simScores = JSON.parse(localStorage.getItem('simulationScores') || '[]');
    simScores.push({
      userId: userId,
      score: simulationScore,
      profit: finalProfit,
      reputation: finalReputation,
      employees: finalEmployees.length,
      scenario: scenario?.id,
      date: new Date().toISOString()
    });
    localStorage.setItem('simulationScores', JSON.stringify(simScores));
    
    setFinalStats(final);
    setGameEnded(true);
    setGameStarted(false);

    localStorage.setItem(STORAGE_KEY + '_final', JSON.stringify(final));

    fetch('/api/game/leaderboard').then(r => r.json()).then(data => {
      if (data && data.success) setLeaderboard(data.leaderboard || []);
    }).catch(err => console.warn('Could not load leaderboard', err));
  };

  // --- Calculator ---
  const calcInput = (value) => {
    setCalcDisplay(prev => prev === '0' ? value : prev + value);
  };

  const calcClear = () => {
    setCalcDisplay('0');
  };

  const calcEquals = () => {
    try {
      const result = eval(calcDisplay);
      setCalcDisplay(String(result));
    } catch (e) {
      setCalcDisplay('Eroare');
    }
  };

  // --- Resume ---
  const resumeSaved = () => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return;
    const s = JSON.parse(saved);
    const sc = scenarios.find(x => x.id === s.scenarioId) || scenarios[0];
    setScenario(sc);
    setBudget(s.budget);
    setReputation(s.reputation);
    setEmployees(s.employees || []);
    setYear(s.year || 1);
    setMonth(s.month || 1);
    setCurrentQuestion(s.currentQuestion || 0);
    setPlayerName(s.playerName || '');
    setPlayerEmail(s.playerEmail || '');
    setGameStarted(true);
  };

  // --- Submit results ---
  const submitResults = async (targetEmail) => {
    try {
      const userId = localStorage.getItem('entrepreneur_userId') || 'user_' + Date.now();
      if (!localStorage.getItem('entrepreneur_userId')) {
        localStorage.setItem('entrepreneur_userId', userId);
      }
      
      const payload = {
        playerName,
        playerEmail: targetEmail,
        scenarioId: scenario?.id,
        scenarioName: scenario?.name || scenario?.title || scenario?.id,
        state: { budget, reputation, employees: employees.length, year, month },
        userId,
        submissionDate: new Date().toISOString()
      };

      // Save game results to localStorage (no backend needed)
      let gameResults = JSON.parse(localStorage.getItem('gameResults') || '[]');
      gameResults.push(payload);
      localStorage.setItem('gameResults', JSON.stringify(gameResults));

      setResultsSent(true);
      alert(t('report_sent'));
    } catch (err) {
      console.error(err);
      alert(t('email_error'));
    }
  };

  // --- Download ---
  const downloadFinalResults = () => {
    if (!finalStats) return;
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(finalStats, null, 2));
    const a = document.createElement('a');
    a.href = dataStr;
    a.download = `simulator_results_${(new Date()).toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  // --- Restart ---
  const restartSimulation = () => {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(STORAGE_KEY + '_final');
    setSavedExists(false);
    setGameEnded(false);
    setFinalStats(null);
    setGameStarted(false);
    setScenario(null);
    setBudget(0);
    setReputation(50);
    setEmployees([]);
    setYear(1);
    setMonth(1);
    setCurrentQuestion(0);
    setCompetitors([]);
  };

  // --- Current question ---
  const complexQuestions = getComplexQuestions();
  const totalRounds = complexQuestions.length;
  const currentQ = complexQuestions[currentQuestion % complexQuestions.length];
  const gameProgress = Math.round(((currentQuestion + 1) / totalRounds) * 100);
  const payrollMonthly = employees.reduce((s, e) => s + (e.salary || 0), 0);
  const startPayroll = scenario ? (scenario.startEmployees * (scenario.salaryPerEmployee || 0)) : 0;
  const payrollDelta = payrollMonthly - startPayroll;
  // --- 3-year profit projection (simple model using reputation as growth proxy) ---
  const repFactor = Math.max(-0.2, Math.min(0.2, (reputation - 50) / 100));
  const projYear1 = Math.round(budget);
  const projYear2 = Math.round(projYear1 * (1 + repFactor));
  const projYear3 = Math.round(projYear2 * (1 + repFactor));
  const projProfit1 = projYear1 - (scenario?.startBudget || 0);
  const projProfit2 = projYear2 - (scenario?.startBudget || 0);
  const projProfit3 = projYear3 - (scenario?.startBudget || 0);

  // --- START SCREEN ---
  if (!gameStarted) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
        <div style={{ maxWidth: 900, width: '100%' }}>
          <h1 className="title">{t('heroTitle')} <span className="highlight">{t('heroHighlight')}</span></h1>
          <p className="subtitle">{t('welcome_subtitle')}</p>

          <div style={{ margin: '1.5rem 0' }}>
            <label style={{ display: 'block', marginBottom: '.5rem', color: 'var(--accent-cyan)', fontWeight: '600' }}>{t('player_name')}</label>
            <input 
              value={playerName} 
              onChange={e => setPlayerName(e.target.value)} 
              placeholder={t('player_name')} 
              style={{
                width: '100%',
                padding: '0.8rem 1rem',
                backgroundColor: 'var(--primary-gray)',
                color: 'var(--text-primary)',
                border: '2px solid var(--accent-cyan)',
                borderRadius: '6px',
                fontSize: '1rem',
                fontFamily: 'inherit',
                transition: 'all 0.3s ease',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = 'var(--accent-yellow)';
                e.target.style.boxShadow = '0 0 15px rgba(255, 215, 0, 0.4)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'var(--accent-cyan)';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>

          <div style={{ margin: '1.5rem 0' }}>
            <label style={{ display: 'block', marginBottom: '.5rem', color: 'var(--accent-cyan)', fontWeight: '600' }}>{t('player_email_label')}</label>
            <input 
              value={playerEmail} 
              onChange={e => setPlayerEmail(e.target.value)} 
              placeholder="email@exemplu.com" 
              style={{
                width: '100%',
                padding: '0.8rem 1rem',
                backgroundColor: 'var(--primary-gray)',
                color: 'var(--text-primary)',
                border: '2px solid var(--accent-cyan)',
                borderRadius: '6px',
                fontSize: '1rem',
                fontFamily: 'inherit',
                transition: 'all 0.3s ease',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = 'var(--accent-yellow)';
                e.target.style.boxShadow = '0 0 15px rgba(255, 215, 0, 0.4)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'var(--accent-cyan)';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>

          <div style={{ margin: '1.5rem 0' }}>
            <h3 style={{ marginTop: 0 }}>{t('choose_scenario')}</h3>
            <ScenarioSelect scenarios={allScenarios} selectedId={scenario?.id} onSelect={(s) => setScenario(s)} />
          </div>

          {scenario?.id === 'custom' && (
            <div className="card" style={{ padding: '1rem', marginBottom: '1.5rem', border: '2px dashed var(--accent-yellow)', background: 'rgba(255, 223, 93, 0.08)' }}>
              <h3 style={{ marginTop: 0 }}>Creează propriul tău business</h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>Alege structura și obiectivul; asistentul AI va adapta întrebările și provocările.</p>

              <label style={{ display: 'block', marginBottom: '.5rem', fontWeight: '600' }}>Nume business</label>
              <input
                value={customScenarioOptions.name}
                onChange={e => setCustomScenarioOptions({ ...customScenarioOptions, name: e.target.value })}
                placeholder="Afacerea mea"
                style={{ width: '100%', padding: '.8rem 1rem', marginBottom: '1rem', borderRadius: '6px', border: '1px solid var(--accent-cyan)', background: 'var(--primary-gray)', color: 'var(--text-primary)' }}
              />

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '.5rem', fontWeight: '600' }}>Tip Afacere</label>
                  <select
                    value={customScenarioOptions.type}
                    onChange={e => setCustomScenarioOptions({ ...customScenarioOptions, type: e.target.value })}
                    style={{ width: '100%', padding: '.8rem 1rem', borderRadius: '6px', border: '1px solid var(--accent-cyan)', background: 'var(--primary-gray)', color: 'var(--text-primary)' }}
                  >
                    <option value="service">Servicii</option>
                    <option value="retail">Retail</option>
                    <option value="manufacturing">Producție</option>
                    <option value="logistics">Transport / Logistică</option>
                    <option value="software">Startup Tech</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '.5rem', fontWeight: '600' }}>Obiectiv principal</label>
                  <select
                    value={customScenarioOptions.goal}
                    onChange={e => setCustomScenarioOptions({ ...customScenarioOptions, goal: e.target.value })}
                    style={{ width: '100%', padding: '.8rem 1rem', borderRadius: '6px', border: '1px solid var(--accent-cyan)', background: 'var(--primary-gray)', color: 'var(--text-primary)' }}
                  >
                    <option value="profit">Profit rapid</option>
                    <option value="creștere">Creștere rapidă</option>
                    <option value="stabilitate">Stabilitate și cashflow</option>
                    <option value="piață">Intrare pe piață nouă</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '.5rem', fontWeight: '600' }}>Buget inițial</label>
                  <input
                    type="number"
                    min="10000"
                    max="500000"
                    value={customScenarioOptions.budget}
                    onChange={e => setCustomScenarioOptions({ ...customScenarioOptions, budget: Number(e.target.value) })}
                    style={{ width: '100%', padding: '.8rem 1rem', borderRadius: '6px', border: '1px solid var(--accent-cyan)', background: 'var(--primary-gray)', color: 'var(--text-primary)' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '.5rem', fontWeight: '600' }}>Angajați inițiali</label>
                  <input
                    type="number"
                    min="1"
                    max="35"
                    value={customScenarioOptions.employees}
                    onChange={e => setCustomScenarioOptions({ ...customScenarioOptions, employees: Number(e.target.value) })}
                    style={{ width: '100%', padding: '.8rem 1rem', borderRadius: '6px', border: '1px solid var(--accent-cyan)', background: 'var(--primary-gray)', color: 'var(--text-primary)' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem', marginTop: '1rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '.5rem', fontWeight: '600' }}>Monedă</label>
                  <select
                    value={customScenarioOptions.currency}
                    onChange={e => setCustomScenarioOptions({ ...customScenarioOptions, currency: e.target.value })}
                    style={{ width: '100%', padding: '.8rem 1rem', borderRadius: '6px', border: '1px solid var(--accent-cyan)', background: 'var(--primary-gray)', color: 'var(--text-primary)' }}
                  >
                    <option value="RON">RON</option>
                    <option value="EUR">EUR</option>
                    <option value="GBP">GBP</option>
                    <option value="USD">USD</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '.5rem', fontWeight: '600' }}>Nivel concurență</label>
                  <select
                    value={customScenarioOptions.competition}
                    onChange={e => setCustomScenarioOptions({ ...customScenarioOptions, competition: e.target.value })}
                    style={{ width: '100%', padding: '.8rem 1rem', borderRadius: '6px', border: '1px solid var(--accent-cyan)', background: 'var(--primary-gray)', color: 'var(--text-primary)' }}
                  >
                    <option value="mica">Mică</option>
                    <option value="medie">Medie</option>
                    <option value="mare">Mare</option>
                  </select>
                </div>
              </div>

              <div style={{ marginTop: '1rem', padding: '1rem', borderRadius: '8px', background: 'rgba(0,255,255,0.08)', border: '1px solid rgba(0,255,255,0.15)' }}>
                <p style={{ margin: 0, color: 'var(--text-secondary)' }}><strong>Rezumat:</strong> Buget: <strong>{customScenarioOptions.budget.toLocaleString()} {customScenarioOptions.currency}</strong>, angajați: <strong>{customScenarioOptions.employees}</strong>, tip: <strong>{customScenarioOptions.type}</strong>, concurență: <strong>{customScenarioOptions.competition}</strong>.</p>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginTop: '1rem' }}>
                <button
                  className="btn btn-secondary"
                  type="button"
                  onClick={() => generateCustomQuestionsAI(customScenarioOptions)}
                  disabled={aiLoading}
                  style={{ padding: '0.8rem 1rem', borderRadius: '6px', minWidth: '220px' }}
                >
                  {aiLoading ? 'Așteaptă, generează...' : 'Regenerare întrebări AI'}
                </button>
                {generatedQuestions && generatedQuestions.length > 0 && (
                  <span style={{ alignSelf: 'center', color: 'var(--text-secondary)' }}>
                    Întrebări AI generate: {generatedQuestions.length}
                  </span>
                )}
              </div>

              {aiLoading && <p style={{ marginTop: '1rem', color: 'var(--text-secondary)' }}>Generare întrebări AI în curs…</p>}
              {aiError && <p style={{ marginTop: '1rem', color: '#ff6666' }}>AI: {aiError}</p>}
            </div>
          )}

          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '1rem', marginTop: '2rem' }}>
            <button className="btn btn-primary" onClick={() => startGame(scenario || allScenarios[0])}>{t('startGame')}</button>
            {savedExists && <button className="btn btn-secondary" onClick={resumeSaved}>{t('continueGame')}</button>}
            <button className="btn btn-secondary" onClick={() => { localStorage.removeItem(STORAGE_KEY); setSavedExists(false); alert(t('progress_deleted')); }}>{t('delete_saved')}</button>
          </div>
        </div>
      </div>
    );
  }

  // --- IN-GAME UI (NEW LAYOUT) ---
  return (
    <>
    <div style={{ minHeight: '100vh', display: 'grid', gridTemplateColumns: '400px 1fr', gap: '1rem', padding: '2rem', paddingTop: '100px', backgroundColor: 'var(--bg-dark)' }}>
      
      {/* LEFT SIDE: EMPLOYEES (FULL HEIGHT QUADRANT) */}
      <div className="card" style={{ padding: '1rem', display: 'flex', flexDirection: 'column', height: 'calc(100vh - 150px)' }}>
        <h3 style={{ marginTop: 0, marginBottom: '1rem' }}>👥 Angajați ({employees.length}/{scenario?.startEmployees})</h3>
        <div style={{ flex: 1, overflowY: 'auto', paddingRight: '0.5rem' }}>
          {employees.map((emp, i) => (
            <div key={emp.id} style={{ padding: '.8rem', borderBottom: '1px solid var(--border-color)', fontSize: '0.85rem', marginBottom: '.5rem', background: 'rgba(0,240,255,0.05)', borderRadius: '4px' }}>
              <div style={{ fontWeight: 'bold', color: 'var(--accent-cyan)' }}>{emp.name}</div>
              <div style={{ color: 'var(--text-secondary)', marginTop: '.3rem', fontSize: '0.8rem' }}>
                <div>{emp.position}</div>
                <div>📅 Vârstă: {emp.age} | Vechime: {emp.seniority} ani</div>
                <div>💰 Salariu: ${emp.salary}/lună</div>
              </div>
              <div style={{ marginTop: '.4rem', background: 'rgba(0,240,255,0.1)', padding: '.3rem .5rem', borderRadius: '3px' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--accent-cyan)' }}>
                  Performanță: <strong>{emp.performance}%</strong>
                  <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', marginTop: '.2rem' }}>
                    <div style={{ width: `${emp.performance}%`, height: '100%', background: emp.performance > 80 ? '#10b981' : emp.performance > 60 ? '#ffd700' : '#ff6b6b', borderRadius: '2px' }}></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {employees.length === 0 && (
            <div style={{ padding: '2rem 1rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
              Niciun angajat. Angajează unii în scenariile de mai jos!
            </div>
          )}
        </div>
      </div>

      {/* RIGHT SIDE: DASHBOARD + QUESTIONS */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', overflow: 'hidden' }}>
        
        {/* TOP: KPIs */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '.8rem' }}>
          <div className="card" style={{ padding: '1rem', textAlign: 'center', borderTop: '3px solid #ffd700' }}>
            <div style={{ fontSize: '1.3rem', fontWeight: 'bold', color: '#ffd700' }}>${budget.toLocaleString()}</div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Buget</div>
          </div>
          <div className="card" style={{ padding: '1rem', textAlign: 'center', borderTop: '3px solid #00f0ff' }}>
            <div style={{ fontSize: '1.3rem', fontWeight: 'bold', color: '#00f0ff' }}>{reputation}/100</div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Reputație</div>
          </div>
          <div className="card" style={{ padding: '1rem', textAlign: 'center', borderTop: '3px solid #10b981' }}>
            <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#10b981' }}>{`An ${year} / L${month}`}</div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Perioadă</div>
          </div>
        </div>

        {/* MIDDLE: PAYROLL + PROJECTIONS */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '.8rem' }}>
          <div className="card" style={{ padding: '1rem', borderTop: '3px solid #ff8c00' }}>
            <div style={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#ff8c00', marginBottom: '.5rem' }}>💼 Cost salarial/lună</div>
            <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#ff8c00' }}>${payrollMonthly.toLocaleString()}</div>
            <div style={{ marginTop: '0.4rem', color: payrollDelta > 0 ? '#ff6b6b' : '#10b981', fontWeight: '600', fontSize: '0.9rem' }}>Δ {payrollDelta >= 0 ? '+' : ''}{payrollDelta}$</div>
          </div>
          <div className="card" style={{ padding: '1rem', borderTop: '3px solid #e11d48' }}>
            <div style={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#e11d48', marginBottom: '.5rem' }}>📊 Proiecție 3 ani</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              An 1: <strong style={{ color: projProfit1 >= 0 ? '#10b981' : '#ff6b6b' }}>{projProfit1 >= 0 ? '+' : ''}${projProfit1.toLocaleString()}</strong>
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              An 2: <strong style={{ color: projProfit2 >= 0 ? '#10b981' : '#ff6b6b' }}>{projProfit2 >= 0 ? '+' : ''}${projProfit2.toLocaleString()}</strong>
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              An 3: <strong style={{ color: projProfit3 >= 0 ? '#10b981' : '#ff6b6b' }}>{projProfit3 >= 0 ? '+' : ''}${projProfit3.toLocaleString()}</strong>
            </div>
          </div>
        </div>

        {/* BOTTOM: DECISION COUNTER + QUESTION SECTION */}
        <div style={{ flex: 1, overflowY: 'auto', paddingRight: '0.5rem' }}>
          <div className="card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            {/* Progress */}
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '.5rem' }}>
                <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Decizie {currentQuestion + 1}/{totalRounds}</span>
                <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{gameProgress}%</span>
              </div>
              <div style={{ background: 'var(--primary-gray)', borderRadius: '10px', overflow: 'hidden', height: '6px', border: '1px solid var(--accent-cyan)' }}>
                <div style={{ background: 'linear-gradient(90deg, var(--accent-cyan), var(--accent-yellow))', height: '100%', width: `${gameProgress}%`, transition: 'width 0.3s ease' }}></div>
              </div>
            </div>

            {/* Question */}
            <div style={{ marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.4rem', marginBottom: '.5rem' }}>{currentQ.title}</h2>
              <p style={{ color: 'var(--text-secondary)', marginBottom: 0, fontSize: '0.95rem' }}>{currentQ.description}</p>
              {currentQ.technicalDetails && (
                <div style={{ marginTop: '.6rem', padding: '.6rem', background: 'rgba(16,185,129,0.04)', borderRadius: 6, border: '1px solid rgba(16,185,129,0.12)', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                  <strong>ℹ️ {currentQ.technicalDetails.split(' - ')[0]}:</strong> {currentQ.technicalDetails.split(' - ')[1]}
                </div>
              )}
            </div>

            {/* Choices */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '.6rem', marginBottom: '1rem' }}>
              {currentQ.choices.map((choice, i) => (
                <button
                  key={i}
                  className="btn btn-secondary"
                  style={{ padding: '.7rem', justifyContent: 'flex-start', textAlign: 'left', fontSize: '0.9rem' }}
                  onClick={() => applyChoice(choice)}
                >
                  <span>{choice.text}</span>
                  {choice.budgetChange !== 0 && (
                    <span style={{ marginLeft: 'auto', color: choice.budgetChange < 0 ? '#ff6b6b' : '#10b981', fontWeight: 'bold', fontSize: '0.85rem' }}>
                      {choice.budgetChange > 0 ? '+' : ''}{choice.budgetChange}$
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Buttons */}
            <div style={{ display: 'flex', gap: '.5rem', marginTop: 'auto' }}>
              <button className="btn btn-secondary" onClick={() => { saveLocalProgress(); alert(t('saved_local')); }} style={{ flex: 1 }}>💾 Salvează</button>
              <button className="btn btn-secondary" onClick={() => setShowCalculator(!showCalculator)} style={{ flex: 1 }}>🧮 Calculator</button>
              <button className="btn btn-primary" onClick={() => { finalizeGame(); }} style={{ flex: 1 }}>🏁 Finalizează</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* CALCULATOR MODAL */}
    {showCalculator && (
      <div style={{ position: 'fixed', bottom: '30px', right: '30px', zIndex: 8000 }}>
        <div className="card" style={{ padding: '1.2rem', display: 'flex', flexDirection: 'column', gap: '.6rem', backgroundColor: 'var(--primary-gray)', borderTop: '3px solid #ffd700', minWidth: '280px' }}>
          <div style={{ textAlign: 'right', fontWeight: 'bold', marginBottom: '.5rem' }}>🧮 Calculator</div>
          <div style={{ background: 'var(--bg-dark)', color: '#ffd700', padding: '1rem', borderRadius: '6px', textAlign: 'right', fontSize: '1.8rem', fontFamily: 'monospace', fontWeight: 'bold', minHeight: '50px', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', wordBreak: 'break-all' }}>
            {calcDisplay}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.4rem' }}>
            {['7', '8', '9', '4', '5', '6', '1', '2', '3', '0', '.', '+'].map((btn, i) => (
              <button
                key={i}
                className="btn btn-secondary"
                style={{ padding: '0.6rem', fontSize: '1rem', fontWeight: 'bold', backgroundColor: 'var(--bg-dark)', color: '#00f0ff', border: '2px solid var(--accent-cyan)', borderRadius: '6px' }}
                onClick={() => calcInput(btn)}
              >
                {btn}
              </button>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.4rem' }}>
            {[{ text: '-', color: '#ff6b6b' }, { text: '*', color: '#ff6b6b' }, { text: '/', color: '#ff6b6b' }, { text: '=', color: '#10b981' }].map((op, i) => (
              <button
                key={i}
                style={{ padding: '0.6rem', fontSize: '1rem', fontWeight: 'bold', backgroundColor: op.color, color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', transition: 'opacity 0.2s' }}
                onClick={() => {
                  if (op.text === '=') calcEquals();
                  else calcInput(op.text);
                }}
                onMouseOver={(e) => e.target.style.opacity = '0.8'}
                onMouseOut={(e) => e.target.style.opacity = '1'}
              >
                {op.text}
              </button>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.4rem' }}>
            <button className="btn btn-secondary" style={{ padding: '0.6rem', fontSize: '0.9rem', fontWeight: 'bold', backgroundColor: '#8b5cf6' }} onClick={calcClear}>
              C (Clear)
            </button>
            <button className="btn btn-secondary" style={{ padding: '0.6rem', fontSize: '0.9rem', fontWeight: 'bold', backgroundColor: '#666' }} onClick={() => setShowCalculator(false)}>
              ✕ Închide
            </button>
          </div>
        </div>
      </div>
    )}

      {/* FINAL MODAL */}
      {gameEnded && finalStats && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999 }}>
          <div style={{ background: 'var(--bg-light)', padding: '2rem', borderRadius: 8, width: '90%', maxWidth: 600, maxHeight: '80vh', overflowY: 'auto', boxShadow: '0 10px 40px rgba(0,0,0,0.3)' }}>
            <h2>📊 Rezultate finale</h2>
            <div style={{ background: 'var(--primary-gray)', padding: '1rem', borderRadius: '8px', marginBottom: '1rem' }}>
              <p><strong>Buget final:</strong> ${finalStats.budget.toLocaleString()}</p>
              <p style={{ color: finalStats.profit >= 0 ? '#10b981' : '#ff6b6b' }}>
                <strong>Profit/Pierdere:</strong> ${finalStats.profit > 0 ? '+' : ''}{finalStats.profit.toLocaleString()}
              </p>
              <p><strong>Reputație:</strong> {finalStats.reputation}/100</p>
              <p><strong>Angajați la final:</strong> {finalStats.employees}</p>
              <p><strong>Decizii luate:</strong> {finalStats.roundsPlayed}/{totalRounds}</p>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
              <button className="btn btn-primary" onClick={() => submitResults(playerEmail)}>Trimite email</button>
              <button className="btn btn-secondary" onClick={downloadFinalResults}>Download JSON</button>
              <button className="btn btn-secondary" onClick={restartSimulation}>Din nou</button>
              <button className="btn btn-secondary" onClick={() => setGameEnded(false)}>Închide</button>
            </div>

            {leaderboard && leaderboard.length > 0 && (
              <div>
                <h3>Top 5 Leaderboard</h3>
                {leaderboard.slice(0, 5).map((l, i) => (
                  <div key={i} style={{ padding: '0.6rem', borderBottom: '1px solid var(--border-color)' }}>
                    <strong>#{i+1}</strong> {l.playerName || 'Anonim'} - ${l.state?.budget?.toLocaleString() || 'N/A'}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* BANKRUPTCY SCREEN */}
      {budget < 0 && (
        <div style={{ position: 'fixed', bottom: '20px', right: '20px', background: '#ff4444', color: 'white', padding: '1rem', borderRadius: '8px', maxWidth: '300px', boxShadow: '0 4px 12px rgba(0,0,0,0.3)' }}>
          <h3 style={{ marginTop: 0 }}>💥 FALIMENT!</h3>
          <p>Bugetul tău a scăzut sub zero.</p>
          <button className="btn btn-primary" onClick={() => submitResults(playerEmail)} style={{ width: '100%' }}>Trimite raport</button>
        </div>
      )}
    </>
  );
}

export default GameDashboard;
