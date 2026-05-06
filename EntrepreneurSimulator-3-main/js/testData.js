// Test Data - Comprehensive test questions
// Based on 4 lessons + general entrepreneurship
// 60% from lessons + 40% general knowledge

export const testQuestions = [
  {
    id: 1,
    name: "Assessment Inițial",
    description: "Test introductiv pentru a evalua nivelul tău actual de cunoștințe",
    duration: "30 minute",
    questions: "25 întrebări",
    level: "Ușor",
    timeLimit: 30 * 60, // seconds
    questionCount: 25,
    questionsList: [
      // LESSON 1: Business Fundamentals (5 q)
      {
        q: "Ce este separația patrimonială în contextul SRL?",
        options: [
          "Divorțul între asociați",
          "Protecția patrimoniului personal - răspunzi doar în limita capitalului social",
          "Divergența dintre patrimoniul firmei și al partenerilor",
          "Separarea conturilor bancare"
        ],
        correct: 1,
        lessonNumber: 1
      },
      {
        q: "Conform Legii 31/1990, ce este SRL-ul?",
        options: [
          "O entitate care răspunde cu întregul patrimoniu personal",
          "O Societate cu Răspundere Limitată care oferă protecție patrimonială",
          "Un parteneriat fără personalitate juridică",
          "O formă de PFA avansată"
        ],
        correct: 1,
        lessonNumber: 1
      },
      {
        q: "La ce se referă TVA Colectat în mecanismul TVA?",
        options: [
          "Taxa plătită furnizorilor",
          "Taxa adăugată de tine la prețul de vânzare către clienți",
          "Taxa reținută de stat",
          "Reducerea de preț pentru clienți"
        ],
        correct: 1,
        lessonNumber: 1
      },
      {
        q: "Care este principala caracteristică a regimului de Microîntreprindere?",
        options: [
          "Se aplică pe Profit (Revenue - Expenses) cu rate 16%",
          "Se aplică pe Venituri cu rate de 1-3%",
          "Se aplică doar pentru medici și avocați",
          "Se aplică pe orice cheltuială"
        ],
        correct: 1,
        lessonNumber: 1
      },
      {
        q: "Ce sunt codurile CAEN și care este rolul lor?",
        options: [
          "Coduri secrete pentru plăți",
          "Clasificarea Activităților din Economia Națională - definesc obiectul de activitate",
          "Codul de acces online banking",
          "Certificatele de Autorizare Economică Națională"
        ],
        correct: 1,
        lessonNumber: 1
      },

      // LESSON 2: Innovation & Creativity (5 q)
      {
        q: "Unde se înregistrează marcele comerciale în România?",
        options: [
          "La Notariat",
          "La OSIM (Oficiul de Stat pentru Invențiuni și Mărci)",
          "La Primăria locală",
          "La Acestate"
        ],
        correct: 1,
        lessonNumber: 2
      },
      {
        q: "Ce sunt clasele NISA în contextul marcilor înregistrate?",
        options: [
          "Clase sociale de populație",
          "Categorii de produse/servicii în care se înregistrează marca",
          "Nivele de dificultate pe scara NISA",
          "Clasificări ale furnizorilor"
        ],
        correct: 1,
        lessonNumber: 2
      },
      {
        q: "Cine sunt actorii principali în Design Thinking?",
        options: [
          "Numai designerii",
          "PM, Designer, CTO, QA și stakeholders implicați în inovație",
          "Doar cofondatorii",
          "Consultanții externi"
        ],
        correct: 1,
        lessonNumber: 2
      },
      {
        q: "Ce este un MVP (Minimum Viable Product)?",
        options: [
          "Maximum Value Product",
          "Cel mai simplu produs ce poate fi oferit pentru a testa piața și valida ipoteza",
          "Multi-Vendor Platform",
          "Manager Value Position"
        ],
        correct: 1,
        lessonNumber: 2
      },
      {
        q: "Cât timp ia de obicei ciclul lifecycle-ului unui produs din ideație la lansare?",
        options: [
          "6 luni întotdeauna",
          "Variază: 3-12 luni în funcție de complexitate, piață și resurse",
          "Minim 2 ani",
          "Máxim 1 lună"
        ],
        correct: 1,
        lessonNumber: 2
      },

      // LESSON 3: Financial Management (5 q)
      {
        q: "Care este formula Ciclului de Conversie a Numerarului (CCC)?",
        options: [
          "CCC = DIO + DSO + DPO",
          "CCC = DIO + DSO - DPO",
          "CCC = (DIO × DSO) / DPO",
          "CCC = DPO - DIO - DSO"
        ],
        correct: 1,
        lessonNumber: 3
      },
      {
        q: "Ce este Burn Rate în contextul unei companii?",
        options: [
          "Rata de creștere",
          "Suma lunară pe care o consumă compania (cheltuieli minus venituri)",
          "Poluarea termică a biroului",
          "Rata de dobândă la credite"
        ],
        correct: 1,
        lessonNumber: 3
      },
      {
        q: "Cum se calculează Marja Brută (Gross Margin)?",
        options: [
          "(Revenue + COGS) / Revenue × 100%",
          "(Revenue - COGS) / Revenue × 100%",
          "Revenue / COGS × 100%",
          "COGS - Revenue × 100%"
        ],
        correct: 1,
        lessonNumber: 3
      },
      {
        q: "Ce este EBITDA și de ce este important pentru investitori?",
        options: [
          "Venit din dobânzi",
          "Earnings Before Interest, Taxes, Depreciation - metrica de profitabilitate operațională",
          "Evidența Bunurilor Taxate și a Datoriilor Angajate",
          "Estimarea Bugetului În Timp Real"
        ],
        correct: 1,
        lessonNumber: 3
      },
      {
        q: "Dacă ai 300.000 lei în bancă și burn rate este 30.000 lei/lună, care este runaway-ul tău?",
        options: [
          "10 zile",
          "10 săptămâni",
          "10 luni",
          "10 ani"
        ],
        correct: 2,
        lessonNumber: 3
      },

      // LESSON 4: Marketing Strategy (5 q)
      {
        q: "Ce mușchii LTV (Customer Lifetime Value)?",
        options: [
          "Costul pentru a achiziționa un client",
          "Valoarea totală pe care o generează un client pe parcursul relației cu firma",
          "Limita de Transfer al Vehiculelor",
          "Listing Time Value per unitate"
        ],
        correct: 1,
        lessonNumber: 4
      },
      {
        q: "Ce este CAC (Customer Acquisition Cost)?",
        options: [
          "Cost of All Commodities",
          "Costul total pentru a convinge o persoană să devină client",
          "Customer Annual Charge",
          "Contractual Arrangement Clarification"
        ],
        correct: 1,
        lessonNumber: 4
      },
      {
        q: "Care este raportul ideal LTV/CAC pentru un business sustenabil?",
        options: [
          "1:1",
          "2:1",
          "3:1 sau mai mare",
          "10:1"
        ],
        correct: 2,
        lessonNumber: 4
      },
      {
        q: "Ce este un funnel de conversie?",
        options: [
          "Un aparat fizic de laborator",
          "O serie de etape prin care trece utilizatorul de la Awareness la Conversion",
          "O formă de publicitate ilegală",
          "O reducere de preț"
        ],
        correct: 1,
        lessonNumber: 4
      },
      {
        q: "Ce prescriție trebuie să respecti în 2026 conform GDPR la colectarea datelor clientului?",
        options: [
          "Nicio restricție",
          "Informed Consent, Privacy Policy, și dreptul la ștergere (RTBF - Right to be Forgotten)",
          "Doar pentru clienți premium",
          "Doar pentru companiile mari"
        ],
        correct: 1,
        lessonNumber: 4
      },

      // GENERAL ENTREPRENEURSHIP (10 q)
      {
        q: "Ce este un plan de afaceri?",
        options: [
          "O hartă frumoasă a biroului",
          "Un document care descrie vision, misiune, strategie, finanțe și operații",
          "Un contract cu banca",
          "O listă de prețuri"
        ],
        correct: 1
      },
      {
        q: "Care sunt trei caracteristici principale ale unui antreprenor de succes?",
        options: [
          "Bogădău, șmecher, norocos",
          "Gândire disruptivă, persistență, adaptabilitate",
          "Licența universitară, bani, vânzări",
          "Corporate job, experiență MBA, capital înscris"
        ],
        correct: 1
      },
      {
        q: "Ce este o Unitate de Activitate Economică (UAE)?",
        options: [
          "O țară din Orientul Mijlociu",
          "Un sistem de raportare fiscală pentru sedii secundare",
          "Un tip de bază de date",
          "O formă de agroturism"
        ],
        correct: 1
      },
      {
        q: "Cum se numește procesul de adaptare a afacerii când datele indică o direcție greșită?",
        options: [
          "Rebranding",
          "Pivoting",
          "Recycling",
          "Regresia"
        ],
        correct: 1
      },
      {
        q: "Ce este network-ul în context de afaceri?",
        options: [
          "Rețeaua de internet",
          "Rețeaua de contacte și relații pe care o construiești cu oameni relevanti",
          "O platformă de social media",
          "Un sistem de calcul"
        ],
        correct: 1
      }
    ]
  },

  {
    id: 2,
    name: "Cunoștințe Fundamentale",
    description: "Test intermediar cu probleme mai complexe bazate pe lecții",
    duration: "45 minute",
    questions: "35 întrebări",
    level: "Mediu",
    timeLimit: 45 * 60,
    questionCount: 35,
    // 21 from lessons (60%) + 14 general (40%)
    questionsList: [
      // LESSON 1: Business Fundamentals - Advanced (7 q)
      {
        q: "PFA-ul și SRL-ul au aceeași protecție patrimonială?",
        options: [
          "Da, sunt identici",
          "Nu - SRL oferă separație patrimonială, PFA nu",
          "Doar PFA are protecție",
          "Depinde de venit"
        ],
        correct: 1,
        lessonNumber: 1
      },
      {
        q: "Ce se întâmplă dacă TVA Deductibil > TVA Colectat?",
        options: [
          "Plătești diferența la ANAF",
          "Ai TVA de recuperat și poți cere rambursare de la ANAF",
          "Pierzi banii",
          "Nici o problemă"
        ],
        correct: 1,
        lessonNumber: 1
      },
      {
        q: "Ce este REVISAL și cum se leagă de angajări?",
        options: [
          "Un software de contabilitate",
          "Registrul de Evidență al Salariaților - mandatory pentru înregistrarea angajaților",
          "O autorizație fiscală",
          "Un document de transfer"
        ],
        correct: 1,
        lessonNumber: 1
      },
      {
        q: "Care este diferența dintre Impozitul pe Profit 16% și Microîntreprinderea?",
        options: [
          "Nicio diferență",
          "Impozit pe Profit se aplică pe (Revenue-Expenses), Microîntreprindere pe Revenue",
          "Sunt același lucru",
          "Microîntreprinderea se aplică pe costuri"
        ],
        correct: 1,
        lessonNumber: 1
      },
      {
        q: "Ce tip de cheltuieli sunt considerate deductibile fiscal?",
        options: [
          "Toate cheltuielile",
          "Salarii, chirii, materii prime, utilități, servicii profesionale cu documente justificative",
          "Numai plătitudes",
          "Cheltuielile personale ale administratorului"
        ],
        correct: 1,
        lessonNumber: 1
      },
      {
        q: "Unde se depun obligatoriu documentele de constituire a SRL-ului?",
        options: [
          "La primărie",
          "La notariat și ONRC (Registrul Comerțului)",
          "La banca",
          "La prefectură"
        ],
        correct: 1,
        lessonNumber: 1
      },
      {
        q: "Ce se întâmplă într-o situație de fraudă fiscală în SRL?",
        options: [
          "Nimic, ești mereu protejat",
          "Se poate atrage răspunderea solidară a administratorului pe patrimoniul personal",
          "Doar firmieza răspunde",
          "Statul suportă pierderile"
        ],
        correct: 1,
        lessonNumber: 1
      },

      // LESSON 2: Innovation - Advanced (7 q)
      {
        q: "Ce tipu de proprietate intelectuală protejează un brand (nume + logo)?",
        options: [
          "Patent",
          "Marca Înregistrată (Trademark)",
          "Drepturi de Autor",
          "Secret de afaceri"
        ],
        correct: 1,
        lessonNumber: 2
      },
      {
        q: "Care sunt cele 5 faze ale Design Thinking conform lecției?",
        options: [
          "Empathize, Define, Ideate, Prototype, Test",
          "Plan, Design, Build, Launch, Monitor",
          "Research, Analysis, Development, Testing, Deployment",
          "Strategy, Branding, Marketing, Sales, Support"
        ],
        correct: 0,
        lessonNumber: 2
      },
      {
        q: "Ce este calitatea ISO și de ce e importantă pentru o startup?",
        options: [
          "O mărime de cizmă",
          "Standard de calitate care dovedește compliance și calitate, important pentru contracte B2B",
          "O taxa de vam",
          "Un tip de licență"
        ],
        correct: 1,
        lessonNumber: 2
      },
      {
        q: "Ce este prototiparea rapidă și care este scopul ei în inovație?",
        options: [
          "A crea produsul final imediat",
          "A testa ipotezele rapid și iterativ fără costuri massive",
          "A face comoră publicitare",
          "A creăillusuri pentru investitori"
        ],
        correct: 1,
        lessonNumber: 2
      },
      {
        q: "Dacă vrei să-ți protejezi formula secretă (de ex: Coca-Cola), ce instrument de IP folosești?",
        options: [
          "Trademark",
          "Patent",
          "Secret de Afaceri (Trade Secret)",
          "Copyright"
        ],
        correct: 2,
        lessonNumber: 2
      },
      {
        q: "Ce este Agile și cum se diferențiază de metodele tradiționale de dezvoltare?",
        options: [
          "Sunt același lucru",
          "Agile permite iterații rapide cu feedback constant vs. Waterfall care este linear",
          "Agile este doar pentru IT",
          "Agile nu funcționează pentru startup-uri"
        ],
        correct: 1,
        lessonNumber: 2
      },
      {
        q: "La what punct se transformă o idee într-o inovație comercializabilă?",
        options: [
          "Imediat după brainstorm",
          "După validare pe piață (MVP test) și iterații bazate pe feedback",
          "După 5 ani de cercetare",
          "Niciodată, ideile rămân idei"
        ],
        correct: 1,
        lessonNumber: 2
      },

      // LESSON 3: Financial Management - Advanced (7 q)
      {
        q: "Ce sunt DIO, DSO și DPO în CCC?",
        options: [
          "Trei departamente ale companiei",
          "Days Inventory Outstanding, Days Sales Outstanding, Days Payable Outstanding",
          "Trei indicatori de marketing",
          "Trei tipuri de taxa"
        ],
        correct: 1,
        lessonNumber: 3
      },
      {
        q: "Compania A are Gross Margin 70%, Compania B 30%. Cine vinde produse mai scumpe și prelucrează?",
        options: [
          "Compania A sigur",
          "Compania B sigur",
          "Ar putea fi ambele - Gross Margin depinde de model, nu doar de preț",
          "Nu se poate spune din acești parametri"
        ],
        correct: 2,
        lessonNumber: 3
      },
      {
        q: "Dacă Net Margin al companiei este -5%, ce înseamnă?",
        options: [
          "Primești 5% profit",
          "Pierzi 5 cenți pentru fiecare leu de vânzări după toate costurile și taxele",
          "Ai cash pozitiv",
          "Afacerea este profitabilă"
        ],
        correct: 1,
        lessonNumber: 3
      },
      {
        q: "Ce este Analiza de Senzitivitate și de ce este critic pentru un antreprenor?",
        options: [
          "O metodă de înțelegere comportamentului clienților",
          "Un model 'What If' pentru a testa impact variabilelor pe profitabilitate/runway",
          "O analiză psihologică",
          "Un tip de sondaj de piață"
        ],
        correct: 1,
        lessonNumber: 3
      },
      {
        q: "Dacă Runway este 4 luni, ce actionări de urgență trebuie efectuate?",
        options: [
          "Merger/acquisition",
          "Cost Cutting, creștere venituri, sau nouă finanțare (investitori/credit)",
          "Reducere personal",
          "Mutare în altă țară"
        ],
        correct: 1,
        lessonNumber: 3
      },
      {
        q: "Ce sunt Dividendele și care este taxa pe ele în 2026?",
        options: [
          "O formă de angajare",
          "Profiturile distribuite acționarilor, taxate la 16% în 2026",
          "O reducere de preț",
          "Niciun cost"
        ],
        correct: 1,
        lessonNumber: 3
      },
      {
        q: "Ce este Factoring și când ai recurge la el?",
        options: [
          "O formă de publicitate",
          "Vânderea facturilor neîncasate cu discount pentru cash imediat, folosit când ai urgent lichiditate",
          "O metodă contabilă",
          "Un tip de asigurare"
        ],
        correct: 1,
        lessonNumber: 3
      },

      // LESSON 4: Marketing - Advanced (7 q)
      {
        q: "Ce formula se folosește pentru calculul LTV?",
        options: [
          "LTV = Revenue / Clienți",
          "LTV = Venit mediu per tranzacție × Frecvență de cumpărare × Durata relației",
          "LTV = Profit / Clienți",
          "LTV = Marketing Budget / Clienți"
        ],
        correct: 1,
        lessonNumber: 4
      },
      {
        q: "Pentru un SaaS (subscription) cu bună retenție, care ar fi LTV/CAC ideal?",
        options: [
          "1:1",
          "2:1",
          "10:1 or higher",
          "Nu contează raportul"
        ],
        correct: 2,
        lessonNumber: 4
      },
      {
        q: "Prin ce canale poți achiziționa clienți și cum aleg cea mai eficientă?",
        options: [
          "Help numai Facebook",
          "Multiple canale (SEO, PPC, Social, Email, PR) - aleg pe baza ROI și CAC",
          "Numai prin vânzări directe",
          "Aleator"
        ],
        correct: 1,
        lessonNumber: 4
      },
      {
        q: "Ce este Rate de Conversie și de ce influențează direct profitabilitatea?",
        options: [
          "Rata de schimb valutar",
          "% din vizitatori care se transformă în clienți - afectează direct revenue și burn rate",
          "Rata de inflație",
          "Taxa de transport"
        ],
        correct: 1,
        lessonNumber: 4
      },
      {
        q: "Ce este Retargeting în context de marketing digital?",
        options: [
          "Îmbrăcamintea pentru angajații marketing",
          "Afișare de reclame către persoanele care au vizitat site-ul dar nu au cumpărat",
          "O strategie de vânzări",
          "Un tip de newsletter"
        ],
        correct: 1,
        lessonNumber: 4
      },
      {
        q: "Ce prescripții GDPR trebuie implementate pe un e-commerce site?",
        options: [
          "Nu trebuie nicio implementare",
          "Privacy Policy, Cookies consent, DPIA (Data Protection Impact Assessment), și intrumente de ștergere date",
          "Doar e-mail marketing",
          "Doar pentru clienți din EU"
        ],
        correct: 1,
        lessonNumber: 4
      },
      {
        q: "Ce este Attribution Modeling în marketing analytics?",
        options: [
          "Modelul pentru culori de brand",
          "Metodă de atribuire a contribuției fiecărui canal/touch-point la o conversie",
          "Un tip de design grafic",
          "Un sistem de rank-uri"
        ],
        correct: 1,
        lessonNumber: 4
      },

      // GENERAL - Advanced (14 q)
      {
        q: "Ce este o Strategie Go-to-Market și de ce e critică?",
        options: [
          "O rută touristică",
          "Planul de lansare și penetrare piață - diferența între succes și faliment",
          "O metodă de transport",
          "O limbă de programare"
        ],
        correct: 1
      },
      {
        q: "Ce diferență e între B2B și B2C și cum influențează pricing-ul?",
        options: [
          "Nicio diferență",
          "B2B = Business to Business (vânzări între firme), B2C = Business to Consumer; B2B are ciclu mai lung, preț mai mare",
          "Sunt acelasi lucru",
          "Doar acronimele diferă"
        ],
        correct: 1
      },
      {
        q: "Ce este Pitch Deck și la ce serveşte?",
        options: [
          "O punte în stil pitch",
          "Prezentare de 10-15 slide-uri care descrie afacerea pentru investitori",
          "Un tip de instrument muzical",
          "O sală de prezentări"
        ],
        correct: 1
      },
      {
        q: "Ce este Due Diligence și cum se folosește în procese de investiție?",
        options: [
          "O dată importantă",
          "Proces de investigație profundă a unei companii de către investitori înainte de investire",
          "O procedură de marcare",
          "Un tip de audit"
        ],
        correct: 1
      },
      {
        q: "Ce este Equity și share de ownership în context de startup-uri?",
        options: [
          "Egalitate de género",
          "Fracția din companie deținută de fiecare investor/fondator (ex: 30% equity = 30% din valoare)",
          "Un tip de acțiuni pe bursă",
          "O formă de salariu"
        ],
        correct: 1
      },
      {
        q: "Ce sunt Angel Investors și VC (Venture Capital) și care sunt diferențele?",
        options: [
          "Sunt aceiași",
          "Angel = indivizi cu capital propriu, VC = fonduri care investesc capital alor (mai mari, mai formali)",
          "Numai IT investimenti",
          "Ambii investesc identic"
        ],
        correct: 1
      },
      {
        q: "Ce este Valuation și cum se calculează pentru o startup fără profit?",
        options: [
          "Prețul echipamentelor",
          "Estimarea valorii companiei pe baza unei - bazată pe piață, traction, team, multiplicatori (revenue × koeficient)",
          "Suma banilor în bancă",
          "Cheltuielile totale"
        ],
        correct: 1
      },
      {
        q: "Ce este Bootstrapping în context startup?",
        options: [
          "O înălțime de cizme",
          "Finanțarea afacerii din propriul capital fără investitori externi",
          "O metodă de markeing",
          "Un tip de logistică"
        ],
        correct: 1
      },
      {
        q: "Ce e importanța unui fondator CTO (Chief Technology Officer) pentru startup tech?",
        options: [
          "Doar manageri sunt importanți",
          "CTO construiește produsul technical și stabilește archiectura - critic pentru scalabilitate",
          "CTO doar conduce biroul",
          "Pentru startup-uri nu e necesar"
        ],
        correct: 1
      },
      {
        q: "Ce este Product-Market Fit și cum o recunoști?",
        options: [
          "Poți vinde la orice preț",
          "Cliente sunt extrem de angajate, growth organic prin recomandări, retenție mare, NPS > 50",
          "Cândcând vânzi ceva",
          "Niciodată nu se ajunge la asta"
        ],
        correct: 1
      },
      {
        q: "Ce e Unicorn Startup și cum arata drumul la 1 miliard valuation?",
        options: [
          "O mitologie",
          "Startup cu valoare $1B+, obținut printr-o combinație de product excelent, market-fit, team, și scaling",
          "O firmă cu 1 miliard angajați",
          "Un bank că a reușit în SUA"
        ],
        correct: 1
      },
      {
        q: "Ce e NPS (Net Promoter Score) și cum să-l calculezi?",
        options: [
          "O monedă",
          "% Promoters (9-10) - % Detractors (0-6) din 100 clienți surveyed; măsoară loialitate",
          "Un tip de stoc",
          "O metodă de asigurare"
        ],
        correct: 1
      }
    ]
  },

  {
    id: 3,
    name: "Certificare Profesională",
    description: "Test avansat pentru a evalua stăpânirea completă a conceptelor de entrepreneuriat",
    duration: "60 minute",
    questions: "50 întrebări",
    level: "Dificil",
    timeLimit: 60 * 60,
    questionCount: 50,
    // 30 from lessons (60%) + 20 general (40%)
    questionsList: [
      // LESSON 1: Deep Dive (10 q)
      {
        q: "Conform OUG 44/2008, ce drepturi și obligații are o PFA care are datorii?",
        options: [
          "Nicio obligație",
          "Răspunde cu întregul patrimoniu personal fără limitare; creditorii pot executa silit bunuri personale",
          "Doar datoria firmei",
          "Doar datoria stabilă"
        ],
        correct: 1,
        lessonNumber: 1
      },
      {
        q: "Descrie mecanismul complet al TVA: TVA Deductibil, TVA Colectat, decontul și impact fiscal.",
        options: [
          "TVA este numai pe vânzări",
          "TVA Deductibil (din achiziții) - TVA Colectat (din vânzări) = Decontul; dacă pozitiv plătești, dacă negativ ceri rambursare",
          "TVA nu se calculează comparat",
          "TVA se plătește mereu"
        ],
        correct: 1,
        lessonNumber: 1
      },
      {
        q: "Ce sunt clasele NISA și cum influențează înregistrarea unei mărci comerciale?",
        options: [
          "Nu au vreo importanță",
          "Categorii de produse/servicii - trebuie alegi clasele corecte pentru protecție completă",
          "O taxă suplimentară",
          "Un certificat doar"
        ],
        correct: 1,
        lessonNumber: 1
      },
      {
        q: "Care sunt cele 3 regimuri fiscale principale și câd e convabil fiecare?",
        options: [
          "Sunt la la fel",
          "Microîntreprindere (alto margin servicii), Impozit pe Profit (volummargin mic), Normă de venit (profesii liberale)",
          "Numai 1 regim",
          "Depinde de bancă"
        ],
        correct: 1,
        lessonNumber: 1
      },
      {
        q: "Ce este Administrația Firmei și ce responsabilități are o responsabilitatea penală?",
        options: [
          "Numai manage bani",
          "Conducerea legală și operațională a SRL; răspunde penal pentru gestiune necorespunzătoare, fraudă, dezangajări",
          "Numai plătește salarii",
          "Nicio responsabilitate"
        ],
        correct: 1,
        lessonNumber: 1
      },
      {
        q: "Explicityaları diferența dintre Actul Constitutiv și Regulamentul Intern al unei SRL.",
        options: [
          "Sunt acelasi document",
          "Actul Constitutiv = Constituția firmei (obligatoriu, ONRC), Regulament Intern = gestionare internă detaliată",
          "Nicio diferență",
          "E opțional amândouă"
        ],
        correct: 1,
        lessonNumber: 1
      },
      {
        q: "Ce sunt cheltuielile deductibile, cât le obligatorii documente justificative și cum impactează profitul taxabil?",
        options: [
          "Toate sunt deductibile",
          "Cheltuielile directe ale afacerii cu facturi/bon; reduc Venituri și scad Profit taxabil proporțional",
          "Numai cheltuielile mari",
          "Nu au impactul"
        ],
        correct: 1,
        lessonNumber: 1
      },
      {
        q: "Como funcționează sistemul de raportare RO e-Factura și ce amenzi atrag nerespectarea?",
        options: [
          "Nu este obligatoriu",
          "B2B: Facturi în XML în max 5 zile; amenzi până la 10.000 lei dacă nu se respectă",
          "Numai pentru mari companii",
          "Niciun risc"
        ],
        correct: 1,
        lessonNumber: 1
      },
      {
        q: "Explictyaří rolul REVISAL în managementul resurselor umane și obligațiile angajatorului.",
        options: [
          "Nu are importanță",
          "Registrul oficial de Evidență al Salariaților; mandatory pentru înregistrare orice angajat cu contracte CIM",
          "Doar o foaie de paper",
          "O bază de date opțională"
        ],
        correct: 1,
        lessonNumber: 1
      },
      {
        q: "Ce sunt Hotărâri ale AGA (Adunarea Generală a Asociaților) și cum afectează governance-ul?",
        options: [
          "Nu contează",
          "Decizii legale ale asociaților despre dividende, vânzări majore, schimburi actului; necesită înregistrare ONRC",
          "Numai sfaturi",
          "Opționale"
        ],
        correct: 1,
        lessonNumber: 1
      },

      // LESSON 2: Deep Dive (10q)
      {
        q: "Care sunt cele 4 tipuri principale de proprietate intelectuală și cum le protezi?",
        options: [
          "Sunt toate aceiași",
          "Trademark (OSIM), Patent (OSIM), Copyright (automatic), Trade Secrets (confidență + legi)",
          "Numai markele",
          "Nu se pot proteja"
        ],
        correct: 1,
        lessonNumber: 2
      },
      {
        q: "Descrie procesul complet de Design Thinking și cum l-ai aplica pentru o ideă de produs.",
        options: [
          "Nu are etape",
          "1. Empathize 2. Define 3. Ideate 4. Prototype 5. Test - iterativ pe baza feed-backului",
          "Doar ideea este importantă",
          "Nu funcționez"
        ],
        correct: 1,
        lessonNumber: 2
      },
      {
        q: "Ce este Prototipare Rapidă și care sunt avantajele ei vs. dezvoltab clasică?",
        options: [
          "Identic cu dezvoltarea tradițională",
          "Construire ușor + test rapid + iterații; reduce risc și costuri vs. luna de dev clasic",
          "Doar pt. jocurile",
          "Lentă"
        ],
        correct: 1,
        lessonNumber: 2
      },
      {
        q: "Cum se calculează ROI al unei investiții în IP și cum justifici costul?",
        options: [
          "Nu se calculează",
          "ROI = (Benefit din protecție - Cost IP) / Cost IP × 100%; justifici prin valoare piață și risc litigiu evitabil",
          "Mereu negativ",
          "Nicio valoare"
        ],
        correct: 1,
        lessonNumber: 2
      },
      {
        q: "Ce este iterarea produsului și cum feedback-ul clientului conduce la inovație?",
        options: [
          "Feedback nu contează",
          "Proces de îmbunătățire continuă bazat pe utilizare reală; feedback direct generează feature-uri prioritare",
          "Schimbă complet produsul",
          "Lasă produsul neschimbat"
        ],
        correct: 1,
        lessonNumber: 2
      },
      {
        q: "Explicită de ce certificarea ISO/calitate este critic pentru B2B vs. B2C.",
        options: [
          "Nu e diferență",
          "B2B necesită standarde formale (ISO); B2C preferă testimoniale - ISO = acces piață B2B",
          "Numai pentru B2C",
          "Niciodată necesară"
        ],
        correct: 1,
        lessonNumber: 2
      },
      {
        q: "Ce è valoarea unui MVP vs. un produs complet și cât timp ia validare pe piață?",
        options: [
          "MVP nu are valoare",
          "MVP = test ipotezelor rapid cu cost minim (4-8 săptămâni); produs complet = 6-12 luni și risc mai mare",
          "MVP durează anu Inguraru",
          "Nu se validează"
        ],
        correct: 1,
        lessonNumber: 2
      },
      {
        q: "Cum se diferențiază Agile de Waterfall și care modelul convine best pentru startup-uri?",
        options: [
          "Sunt identici",
          "Agile = iterativ cu sprints și feedback constant; Waterfall = linear; Agile = ideal startup pt. Flexibilitate",
          "Waterfall e mai bun",
          "Nicio diferență"
        ],
        correct: 1,
        lessonNumber: 2
      },
      {
        q: "Ce este Competitive Landscape Analysis și cum folosești datele pentru poziționare IP?",
        options: [
          "Nu e necesar",
          "Mapare a competitor-ilor pe IP, pricini, features; folosești pt. găsi gap-uri pentru protecție unică",
          "Copiat competitori",
          "Niciun folos"
        ],
        correct: 1,
        lessonNumber: 2
      },
      {
        q: "Cum influențează IP protection valuation-ul la rodada de finanțare?",
        options: [
          "Deloc",
          "IP protejat (brevete, mărci) = o parte din valoare (25-40%); investitorii cer patent clarity",
          "Scade valoarea",
          "E irelevant"
        ],
        correct: 1,
        lessonNumber: 2
      },

      // LESSON 3: Deep Dive (10 q)
      {
        q: "Calculează și explicează CCC pentru un business de retail vs. SaaS.",
        options: [
          "Sunt la fel",
          "Retail: CCC > 30 zile (stoc + vânzări); SaaS: CCC negativă (abonament anual) = profit crescut fără CapEx",
          "Nu diferă",
          "Ambele pozitive"
        ],
        correct: 1,
        lessonNumber: 3
      },
      {
        q: "Ce se întâmplă dacă o companie are Burn Rate > Venituri și Runway < 3 luni?",
        options: [
          "Nicio problemă",
          "Criză urgentă - trebuie Cost Cutting severă, noua finanțare, sau exit; fără acțiune = bankruptcy în 3 luni",
          "Pot astepta",
          "Normale"
        ],
        correct: 1,
        lessonNumber: 3
      },
      {
        q: "Explicita piramida profitabilității și dă exemplu pentru o companie care are Gross Margin 60% dar Net Margin -10%.",
        options: [
          "E imposibil",
          "Operating expenses (salarii, rent, marketing) mănnânesc profitul brut; overhead = 70% din revenue",
          "Nu se întâmplă",
          "E bun"
        ],
        correct: 1,
        lessonNumber: 3
      },
      {
        q: "Ce este Sensitivity Analysis și dă 3 scenarii 'What If' pentru o e-commerce.",
        options: [
          "Nu e necesar",
          "1) +10% CAC vs revenue 2) -20% conversion rate 3) Dobândă +2% pe credit; calculezi impact pe CCC/Runway",
          "Doar 1 scenariu",
          "Nicio valoare"
        ],
        correct: 1,
        lessonNumber: 3
      },
      {
        q: "Cum calculează și optimizează un founder Runway-ul unui startup tech cu $500K în cash și $50K burn/lună.",
        options: [
          "10 zile",
          "Runway = 10 luni; optimizări: 1) reduce burn 10-20% 2) crește revenue 3) finanțare seriei A în luni 8",
          "Nelimitat",
          "3 luni"
        ],
        correct: 1,
        lessonNumber: 3
      },
      {
        q: "Ce e diferența între Profit contabil vs. Profit fiscal și de ce contează pentru planificare?",
        options: [
          "Sunt la fel",
          "Contabil = pe IFRS (business real); Fiscal = pe legi ANAF (cu ajustări); Diferența = TVA, amortizări, provizioane",
          "Nu e diferență reale",
          "Niciod"
        ],
        correct: 1,
        lessonNumber: 3
      },
      {
        q: "Cum se folosește Forecast financial (P&L, Cashflow, Balance Sheet) în pitch-uri către investitori?",
        options: [
          "Nu se arată",
          "Demonstru sustainability și ROI; investitori cer de obicei 3-5 ani de proiecții cu scenarii (base/bull/bear)",
          "Doar overview",
          "Confidențial"
        ],
        correct: 1,
        lessonNumber: 3
      },
      {
        q: "Ce este Elasticity of Demand și cât impactează pricing strategy pe marjă?",
        options: [
          "Nu contează",
          "O % schimbare în preț = X% schimbare în cantitate vândute; dacă elastic, marjă scade cu preț; inelastic = marjă creşte",
          "Niciun impact",
          "Mereu pozitiv"
        ],
        correct: 1,
        lessonNumber: 3
      },
      {
        q: "Explicită Risk Management în context financiar: ce riscuri critice ai ca antreprenor?",
        options: [
          "Fără riscuri",
          "Cash flow (insufficient runway), concentration (1 client = 50% revenue), rate exchange, market shift, competition",
          "Numai piață",
          "Nicie"
        ],
        correct: 1,
        lessonNumber: 3
      },
      {
        q: "Ce e valoarea unui business și cum se calculează Enterprise Value (EV)?",
        options: [
          "Doar revenue",
          "EV = (Market Cap) + (Debt) - (Cash); apare la exit sau M&A; compară cu EBITDA (EV/EBITDA multiple)",
          "Numai profit",
          "Mereu 0"
        ],
        correct: 1,
        lessonNumber: 3
      },

      // LESSON 4: Deep Dive (10 q)
      {
        q: "Calculează LTV și CAC pentru un SaaS care vinde $100/lună cu 40% retention/an și CAC de $500.",
        options: [
          "LTV = CAC",
          "LTV = $100 × 12 × 3.33 años = $4000 (assuming 40% yearly retention); LTV/CAC = 8:1 = Healthy",
          "LTV = $100",
          "Negativ"
        ],
        correct: 1,
        lessonNumber: 4
      },
      {
        q: "Ce sunt marketing channel și cum aleg mix-ul optimal pentru un D2C startup?",
        options: [
          "Numai 1 canal",
          "PPC, SEO, Social, Email, Affiliates; alegi pe baza CAC vs revenue per canal - Test + Double-down winners",
          "Incerci iama toate",
          "Aleator"
        ],
        correct: 1,
        lessonNumber: 4
      },
      {
        q: "Explicita Conversion Funnel (Awareness → Interest → Decision → Purchase) și cât scad conversiile la fiecare nivel?",
        options: [
          "Nu e importantă",
          "Awareness 10% → Interest 2% → Decision 0.5% → Purchase 0.1% din traffic; optimizez weakest step",
          "Toate la 100%",
          "Nu scade"
        ],
        correct: 1,
        lessonNumber: 4
      },
      {
        q: "Ce e Retargeting și care e ROI comparat cu cold audiences?",
        options: [
          "Nu merită",
          "Ads către anteriori visitors = ROAS 3-5x mai bun vs. cold; scad CAC și cresc LTV",
          "Aceleași resultat",
          "Negativ"
        ],
        correct: 1,
        lessonNumber: 4
      },
      {
        q: "Cum se implementează GDPR compliance pe un e-commerce și ce penalități se aplică dacă nu?",
        options: [
          "Nu e necesar",
          "Privacy Policy + Cookie consent + DPA + DPIA; penalități GDPR = până la €20M sau 4% global revenue pentru breach",
          "Numai Privacy Policy",
          "Nu sunt penalități"
        ],
        correct: 1,
        lessonNumber: 4
      },
      {
        q: "Ce e Attribution Modeling și care model (First-Touch, Last-Touch, Multi-Touch) e cel mai accurat?",
        options: [
          "Nu avem model",
          "Atribuire credit la touchpoint; Multi-Touch (40/20/40 rule) = cel mai accurat; Last-Touch = biased",
          "Numai Last-Touch",
          "Niciun model"
        ],
        correct: 1,
        lessonNumber: 4
      },
      {
        q: "Cum calculează NPS (Net Promoter Score) și care e interpretarea valorilor -100 la +100?",
        options: [
          "Nu se calculează",
          "% Promoters (9-10) - % Detractors (0-6) × 100; >50 = excellent, 0-50 = good, <0 = crísis",
          "Numai pozitiv",
          "Nu contează"
        ],
        correct: 1,
        lessonNumber: 4
      },
      {
        q: "Ce sunt Segments și Personas în strategie de marketing și cum sunt diferite?",
        options: [
          "Sunt la fel",
          "Segment = grup de clienți cu trăituri similare; Persona = fir fictional detaliat cu comportament, pain points, goals",
          "Nicio diferență",
          "Nu e necesar"
        ],
        correct: 1,
        lessonNumber: 4
      },
      {
        q: "Explicita Customer Journey Map și cum o folosești pentru a identifica friction points în conversie.",
        options: [
          "Nu e util",
          "Mapez touchpoint-uri (discovery, website, checkout, delivery) și identificație blocajul cu conversie slowest",
          "Numai overview",
          "Nu conteaza"
        ],
        correct: 1,
        lessonNumber: 4
      },
      {
        q: "Ce e A/B Testing (Split Testing) și cum determini sample size/duration pentru semnificație statistică?",
        options: [
          "Curând guessing",
          "Test 2 versiuni; determini cu calculator statistic bazat pe traffic/conversion/lift; min 2 săptămâni pentru validare",
          "1 zi e suficientă",
          "Nu e necesar"
        ],
        correct: 1,
        lessonNumber: 4
      },

      // GENERAL - Advanced (20 q)
      {
        q: "Ce este Business Model Canvas și cum simplificare planificarea vs. 50-page business plan?",
        options: [
          "Nu e util",
          "One-page overview: 9 blocuri (Value Prop, Channels, Revenue Streams, etc.); rapid iteration vs. static planning",
          "Numai design grafic",
          "Nu se folosește"
        ],
        correct: 1
      },
      {
        q: "Explicitar impactul Timing pe Market (too early = fail, perfect = unicorn).",
        options: [
          "Timing nu contează",
          "Too early = capital burnout; perfect = product + market + team synchrony = exponential growth; too late = incumbents dominație",
          "Orice moment e bun",
          "Nu se observă impact"
        ],
        correct: 1
      },
      {
        q: "Ce e Due Diligence și care sunt 3 arii critice pe care investitorii o investigheaza?",
        options: [
          "Nu e important",
          "1) Financials (burn, runway, unit economics) 2) Legal/IP (ownership, disputes) 3) Tech/Product (scalability, bugs)",
          "Doar finance",
          "Nicio investigare"
        ],
        correct: 1
      },
      {
        q: "How se diferențiază Dilution equity cand admiti investitori vs. bootstrap-ing fără investitori.",
        options: [
          "Nu e diferență",
          "Investors = dilution (51% devient 45% dacă vii 20% la series A); bootstrap = ownership complet dar slower growth",
          "Investitori nu dilueaza",
          "Niciod dilution"
        ],
        correct: 1
      },
      {
        q: "Ce e Pitch Deck și cât de critică e argumentul/storytelling vs. data?",
        options: [
          "Numai datele contează",
          "10-15 slide-uri cu story (problem-solution-market-team) + data (traction, financials); 70% story, 30% data = persuasive",
          "Numai slides frumoase",
          "Nu se prezintă"
        ],
        correct: 1
      },
      {
        q: "Ce e Cap Table și cum se structurează equity distribution între founders/investors?",
        options: [
          "Nu are structură",
          "Capitalization Table: % per person; typical founders 70%, investors 20%, employee pool 10%; negociază la fiecare rond",
          "Aceiași pentru toți",
          "Nu se planifică"
        ],
        correct: 1
      },
      {
        q: "How definești Product-Market Fit și care sunt indicatorii că l-ai atins?",
        options: [
          "Cândci vânzi ceva",
          "Organică growth (75%+ referrals), Retention > 50%, NPS > 50, Growth > 10%/lună; Users \"want\" produsul, nu doar au nevoie",
          "Numai vânzări",
          "Nu se atinge"
        ],
        correct: 1
      },
      {
        q: "What e Viral Coefficient și cum caiculezi pentru a determin if growth e exponențial.",
        options: [
          "Nu e măsurabil",
          "VC = (Invited) × (Conversion); dacă > 1 = exponențial; dacă < 1 = linear, trebuie paid acquisition",
          "Mereu exponential",
          "Niciod calcul"
        ],
        correct: 1
      },
      {
        q: "Explicita Positioning Strategy: cum definiți categoria și cumpeti vs. incumbents?",
        options: [
          "Competitor copii",
          "1) Define unique value 2) Choose category (new vs. existing + attack) 3) Messaging consistent; RedBull = energia, nu ionici",
          "Niciun positioning",
          "Aceeași ca toți"
        ],
        correct: 1
      },
      {
        q: "Ce sunt Strategic Partnerships și cum accelereza growth 10x vs. organic?",
        options: [
          "Niciun beneficiu",
          "Partnerships cu complementary services (cross-sell, co-marketing, integration) = instant reach × 10; mutually beneficial",
          "Numai competitori",
          "Niciod accelerare"
        ],
        correct: 1
      },
      {
        q: "What e Acquisition funnel și cum diferă de customer retention funnel?",
        options: [
          "Sunt la fel",
          "Acquisition = lead generation → conversion; retention = onboarding → engagement → upsell → referral; inverse economics.",
          "Niciod diferență",
          "Adesea aceiași"
        ],
        correct: 1
      },
      {
        q: "Cum se măsoară Success la un Startup: care metrici sunt (Key Performance Indicators)?",
        options: [
          "Numai profit",
          "Stage-dependent: Early = Traction (MAU, DAU, Retention); Growth = CAC/LTV, Churn; Mature = Revenue, EBITDA",
          "Random metrics",
          "Toate la odată"
        ],
        correct: 1
      },
      {
        q: "Ce e Cognitive Bias și cum afectează decizia antreprenorilor (ex: optimism bias)?",
        options: [
          "Nu e real",
          "Subconscious shortcuts; Overconfidence, Sunk Cost, Anchoring = lead to bad ivestments; awareness = antidot",
          "Toți oamenii sunt raționali",
          "Nu influențează"
        ],
        correct: 1
      },
      {
        q: "How ar trebui să structurezi o capitală de înțelegere (mentorship) vs. investitori formali?",
        options: [
          "Niciun mentor nu e necesar",
          "Mentori = feedback + network (gratis/equity); investitori = capital + board seat + accountability; amândoi sunt esențiali",
          "Numai investitori",
          "Nicio combinație"
        ],
        correct: 1
      },
      {
        q: "Ce e Exit Strategy și care sunt 3 opțiuni principale pt. founder?",
        options: [
          "Nu se planifică",
          "1) IPO (public company) 2) Acquisition (M&A by larger corp) 3) Dividend recapture (hold, cash flow); la inception fiecare e plan",
          "Numai IPO",
          "Nicio planificare"
        ],
        correct: 1
      },
      {
        q: "How ar trebui să gestionezi faliment și fracasuri: pivoting vs. shut-down?",
        options: [
          "Fracasu e disfunctional",
          "Pivoting = schimbare strategie pe datale reale; shutdown = accept loses early; să nu aryzi capital pe wrong market",
          "Niciod pivot",
          "Mereu continui"
        ],
        correct: 1
      }
    ]
  }
];
