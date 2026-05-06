// Test Questions Data - To be embedded in index.html
// Format: q_ro, q_en, options_ro[], options_en[], correct (index)

const testQuestionsData = {
  initial: [
    // Lesson 1 - Business Fundamentals
    {q_ro: 'Ce este separația patrimonială în SRL?', q_en: 'What is asset separation in LLC?', options_ro: ['Divorțul între asociați', 'Protecție patrimoniu personal', 'Separarea conturilor'], options_en: ['Partner divorce', 'Personal asset protection', 'Account separation'], correct: 1},
    {q_ro: 'Care este forma juridică recomandată pentru startup?', q_en: 'Which legal form is recommended for startups?', options_ro: ['PFA', 'SRL', 'SA'], options_en: ['SEL', 'LLC', 'Corp'], correct: 1},
    {q_ro: 'Ce este TVA Colectat?', q_en: 'What is Collected VAT?', options_ro: ['Taxa plătită furnizorilor', 'Taxa adăugată la vânzări', 'Taxa pe profit'], options_en: ['Tax paid to suppliers', 'Tax added to sales', 'Tax on profit'], correct: 1},
    {q_ro: 'Care regim fiscal are rate de 1-3%?', q_en: 'Which tax regime has 1-3% rates?', options_ro: ['Microîntreprindere', 'Impozit profit', 'SRL'], options_en: ['Micro-business', 'Profit tax', 'LLC'], correct: 0},
    {q_ro: 'Ce sunt codurile CAEN?', q_en: 'What are NACE codes?', options_ro: ['Coduri secrete', 'Clasificare activități economice', 'Coduri bancari'], options_en: ['Secret codes', 'Classification of activities', 'Bank codes'], correct: 1},
    // Lesson 2 - Innovation
    {q_ro: 'Unde se înregistrează marcele în România?', q_en: 'Where are trademarks registered in Romania?', options_ro: ['La OSIM', 'La Notariat', 'La Primărie'], options_en: ['At OSIM', 'At Notary', 'At City Hall'], correct: 0},
    {q_ro: 'Ce este un MVP?', q_en: 'What is an MVP?', options_ro: ['Produs perfect', 'Produs minim viabil', 'Manager de vânzări'], options_en: ['Perfect product', 'Minimum viable product', 'Sales manager'], correct: 1},
    {q_ro: 'Care sunt faza Design Thinking?', q_en: 'What are Design Thinking phases?', options_ro: ['3 faze', '5 faze', '10 faze'], options_en: ['3 phases', '5 phases', '10 phases'], correct: 1},
    {q_ro: 'Ce sunt clase NISA la mărci?', q_en: 'What are NISA classes for trademarks?', options_ro: ['Clase sociale', 'Categorii de produse/servicii', 'Nivele dificultate'], options_en: ['Social classes', 'Product/service categories', 'Difficulty levels'], correct: 1},
    {q_ro: 'Care e importanța prototipării rapide?', q_en: 'Why is rapid prototyping important?', options_ro: ['Costuri mici', 'Testare rapidă cu feedback', 'Marketing'], options_en: ['Low costs', 'Quick testing with feedback', 'Marketing'], correct: 1},
    // Lesson 3 - Financial Management
    {q_ro: 'Ce este Ciclul de Conversie (CCC)?', q_en: 'What is Cash Conversion Cycle?', options_ro: ['DIO+DSO-DPO', 'DIO×DSO/DPO', 'DSO-DIO'], options_en: ['DIO+DSO-DPO', 'DIO×DSO/DPO', 'DSO-DIO'], correct: 0},
    {q_ro: 'Ce este Burn Rate?', q_en: 'What is Burn Rate?', options_ro: ['Rata creșterii', 'Cheltuieli minus venituri', 'Profit'], options_en: ['Growth rate', 'Expenses minus revenue', 'Profit'], correct: 1},
    {q_ro: 'Care e formula pentru Marja Brută?', q_en: 'What is Gross Margin formula?', options_ro: ['(Revenue-COGS)/Revenue', 'Revenue/COGS', 'COGS/Revenue'], options_en: ['(Rev-COGS)/Rev', 'Rev/COGS', 'COGS/Rev'], correct: 0},
    {q_ro: 'Ce este EBITDA?', q_en: 'What is EBITDA?', options_ro: ['Venit din dobânzi', 'Profit operațional', 'Cost vânzări'], options_en: ['Interest income', 'Operating profit', 'Cost of sales'], correct: 1},
    {q_ro: 'Dacă ai 300K în bancă și burn 30K/lună, care e runway-ul?', q_en: 'If you have 300K in bank and burn 30K/month, what is runway?', options_ro: ['5 luni', '10 luni', '15 luni'], options_en: ['5 months', '10 months', '15 months'], correct: 1},
    // Lesson 4 - Marketing
    {q_ro: 'Ce este LTV?', q_en: 'What is LTV?', options_ro: ['Cost achiziție client', 'Valoare client pe viață', 'Venit mediu'], options_en: ['Customer acquisition cost', 'Customer lifetime value', 'Average revenue'], correct: 1},
    {q_ro: 'Ce este CAC?', q_en: 'What is CAC?', options_ro: ['Cost of All Commodities', 'Costul achiziției client', 'Customer Annual Charge'], options_en: ['Cost of All Commodities', 'Customer acquisition cost', 'Customer Annual Charge'], correct: 1},
    {q_ro: 'Care e raportul ideal LTV/CAC?', q_en: 'What is ideal LTV/CAC ratio?', options_ro: ['1:1', '3:1', '10:1'], options_en: ['1:1', '3:1', '10:1'], correct: 1},
    {q_ro: 'Ce este funnel de conversie?', q_en: 'What is conversion funnel?', options_ro: ['Aparat laborator', 'Etape Awareness→Conversion', 'Reducere preț'], options_en: ['Lab device', 'Stages Awareness→Conversion', 'Price discount'], correct: 1},
    {q_ro: 'Ce prescriție GDPR trebuie respectată?', q_en: 'What GDPR requirement must be followed?', options_ro: ['Nicio restricție', 'Informed Consent + Privacy Policy', 'Doar pentru EU'], options_en: ['No restriction', 'Informed Consent + Privacy Policy', 'Only for EU'], correct: 1},
    // General
    {q_ro: 'Ce este un plan de afaceri?', q_en: 'What is a business plan?', options_ro: ['Hartă birou', 'Document cu strategie și finanțe', 'Contract bancă'], options_en: ['Office map', 'Strategy & finance document', 'Bank contract'], correct: 1},
    {q_ro: 'Care caracteristici au antreprenorii de succes?', q_en: 'What traits do successful entrepreneurs have?', options_ro: ['Bogați', 'Gândire disruptivă, persistență', 'Norocos'], options_en: ['Rich', 'Disruptive thinking, persistence', 'Lucky'], correct: 1},
    {q_ro: 'Ce este pivoting?', q_en: 'What is pivoting?', options_ro: ['Mișcare dans', 'Schimbare strategie pe date reale', 'Rotire stoc'], options_en: ['Dance move', 'Strategy change on real data', 'Stock rotation'], correct: 1},
    {q_ro: 'Ce este networking-ul?', q_en: 'What is networking?', options_ro: ['Internet', 'Relații cu oameni relevanți', 'Sistem calcul'], options_en: ['Internet', 'Relations with relevant people', 'Computer system'], correct: 1},
    {q_ro: 'De ce este importantă etapa MVP?', q_en: 'Why is MVP stage important?', options_ro: ['Costă puțin', 'Validează rapid ideea pe piață', 'E obligatorie'], options_en: ['Low cost', 'Quickly validates idea on market', 'Mandatory'], correct: 1}
  ],
  fundamentals: [
    // Add 35 questions - includes all 25 above + 10 more advanced
    {q_ro: 'Ce se întâmplă dacă TVA Deductibil > TVA Colectat?', q_en: 'What if Deductible VAT > Collected VAT?', options_ro: ['Plătești diferența', 'Ai TVA de recuperat', 'Nicio problemă'], options_en: ['Pay difference', 'Have VAT to recover', 'No problem'], correct: 1},
    {q_ro: 'Ce este REVISAL?', q_en: 'What is REVISAL?', options_ro: ['Software contabilitate', 'Registru Evidență Salariați', 'Bază date globală'], options_en: ['Accounting software', 'Employees Registry', 'Global database'], correct: 1},
    {q_ro: 'Care diferență SRL vs PFA la risc?', q_en: 'What is LLC vs SEL risk difference?', options_ro: ['Nu sunt diferite', 'SRL are protecție patrimonială', 'PFA are protecție'], options_en: ['No difference', 'LLC has asset protection', 'SEL has protection'], correct: 1},
    {q_ro: 'Cum se calculează DIO (Days Inventory)?', q_en: 'How to calculate DIO?', options_ro: ['Zile până vânzare', 'Zile după vânzare', 'Zile plată furnizor'], options_en: ['Days to sell', 'Days after sale', 'Days to pay supplier'], correct: 0},
    {q_ro: 'Ce este Runway-ul?', q_en: 'What is Runway?', options_ro: ['Pistă avion', 'Luni de funcționare cu cash', 'Perioadă proiecție'], options_en: ['Airport runway', 'Months operating on cash', 'Projection period'], correct: 1},
    // Continue pattern... duplicating first 25 with variations for 35 total
    {q_ro: 'Ce sunt cheltuielile deductibile?', q_en: 'What are deductible expenses?', options_ro: ['Cheltuieli personale', 'Salarii, chirii, materii prime', 'Doar utils'], options_en: ['Personal expenses', 'Salaries, rent, raw materials', 'Only utilities'], correct: 1},
    {q_ro: 'Unde se depun documente constituire SRL?', q_en: 'Where to file LLC documents?', options_ro: ['Primărie', 'Notariat și ONRC', 'Banca'], options_en: ['City Hall', 'Notary and Commerce Registry', 'Bank'], correct: 1},
    {q_ro: 'Ce e răspundere solidară?', q_en: 'What is joint liability?', options_ro: ['Răspundere împreună', 'Răspundere separată', 'Fără răspundere'], options_en: ['Joint liability', 'Separate liability', 'No liability'], correct: 0},
    {q_ro: 'Care e cost normal SRL?', q_en: 'What is typical LLC setup cost?', options_ro: ['100 lei', '1000-2000 lei', '10000 lei'], options_en: ['100 lei', '1000-2000 lei', '10000 lei'], correct: 1},
    {q_ro: 'De ce e important actul constitutiv?', q_en: 'Why is Articles of Association important?', options_ro: ['Legislație', 'Protecție și structură governance', 'Marketing'], options_en: ['Legislation', 'Protection and governance structure', 'Marketing'], correct: 1},
    {q_ro: 'Ce se întâmplă dacă Gross Margin scade?', q_en: 'What if Gross Margin drops?', options_ro: ['E bun', 'Problemă cu costuri directe', 'Nu contează'], options_en: ['Good', 'Problem with direct costs', 'Doesnt matter'], correct: 1},
    {q_ro: 'Quando cand trebuie sa actionezi dacă Runway < 6 luni?', q_en: 'When to act if Runway < 6 months?', options_ro: ['Niciodată', 'Urgent: Cost Cutting sau finanțare', 'După 3 luni'], options_en: ['Never', 'Urgent: Cost cutting or funding', 'After 3 months'], correct: 1},
    {q_ro: 'Ce e Sensitivity Analysis?', q_en: 'What is Sensitivity Analysis?', options_ro: ['Psihologie', 'Model What-If pentru impact', 'Marketing'], options_en: ['Psychology', 'What-If model for impact', 'Marketing'], correct: 1},
    {q_ro: 'Cum se calculează Net Margin?', q_en: 'How to calculate Net Margin?', options_ro: ['Net Profit/Revenue', 'Gross Margin minus tax', 'Revenue/Cost'], options_en: ['Net Profit/Revenue', 'Gross minus tax', 'Revenue/Cost'], correct: 0},
    {q_ro: 'Ce sunt Dividendele?', q_en: 'What are Dividends?', options_ro: ['Salariu angajați', 'Profit distribuit acționarilor', 'Taxă'], options_en: ['Employee salary', 'Profit distributed to shareholders', 'Tax'], correct: 1},
    {q_ro: 'Ce e Factoring?', q_en: 'What is Factoring?', options_ro: ['Gestionare butik', 'Vânzare facturi cu discount', 'Serviciu contabil'], options_en: ['Boutique management', 'Invoice sale with discount', 'Accounting service'], correct: 1},
    {q_ro: 'Care e importanța protecției IP?', q_en: 'Why is IP protection important?', options_ro: ['Cosmetic', 'Protejează valoare companie', 'Doar pentru mari'], options_en: ['Cosmetic', 'Protects company value', 'Only for big'], correct: 1},
    {q_ro: 'Ce sunt clase NISA?', q_en: 'What are NISA classes?', options_ro: ['Clase școlare', 'Categorii prod/servicii mărci', 'Nivele preț'], options_en: ['School grades', 'Product/service categories for marks', 'Price levels'], correct: 1},
    {q_ro: 'Ce e Cost of Sales (COGS)?', q_en: 'What is Cost of Goods Sold?', options_ro: ['Costuri indirecte', 'Costuri directe produse vândute', 'Salarii'], options_en: ['Indirect costs', 'Direct costs of goods sold', 'Salaries'], correct: 1},
    {q_ro: 'De ce sunt importanți stakeholder-ii?', q_en: 'Why are stakeholders important?', options_ro: ['Nu sunt', 'Influențează strategie și decizii', 'Doar investitori'], options_en: ['Not important', 'Influence strategy and decisions', 'Only investors'], correct: 1}
  ],
  professional: [
    // Add 50 total questions - includes first 20 from Above expanded
    // Just duplicate the pattern for first 30, then add 20 more complex ones
    {q_ro: 'Calculează CCC pentru business cu DIO=45, DSO=30, DPO=20?', q_en: 'Calculate CCC with DIO=45, DSO=30, DPO=20?', options_ro: ['25 zile', '55 zile', '95 zile'], options_en: ['25 days', '55 days', '95 days'], correct: 1},
    {q_ro: 'Ce e diferența Profit contabil vs fiscal?', q_en: 'Accounting vs Tax Profit difference?', options_ro: ['Nu e diferență', 'Contabil pe IFRS, Fiscal pe legi ANAF', 'Sunt opuse'], options_en: ['No difference', 'Accounting on IFRS, Tax on ANAF law', 'Opposite'], correct: 1},
    {q_ro: 'Cum influențează Elasticity of Demand pricing?', q_en: 'How does Elasticity affect pricing?', options_ro: ['Deloc', 'Elastic=preț scade, marjă scade', 'Mereu pozitiv'], options_en: ['Not at all', 'Elastic=price down, margin down', 'Always positive'], correct: 1},
    {q_ro: 'Ce sunt Provizioane pentru Creanțe?', q_en: 'What are Allowances for Receivables?', options_ro: ['Taxe directe', 'Riscuri pentru creanțe neîncasate', 'Reduceri'], options_en: ['Direct taxes', 'Risks for uncollected receivables', 'Discounts'], correct: 1},
    {q_ro: 'Explicità raportul EBITDA/Revenue ideal?', q_en: 'What is ideal EBITDA/Revenue ratio?', options_ro: ['10%', '30-40%', '90%'], options_en: ['10%', '30-40%', '90%'], correct: 1},
    {q_ro: 'Ce sunt Patent claims?', q_en: 'What are Patent claims?', options_ro: ['Prospecte', 'Definiții invenție protejate', 'Drepturi proprietar'], options_en: ['Brochures', 'Invention definitions protected', 'Owner rights'], correct: 1},
    {q_ro: 'Cum se calculează Revenue Multiple?', q_en: 'How to calculate Revenue Multiple?', options_ro: ['Valuation/Revenue', 'Revenue/Valuation', 'Revenue×2'], options_en: ['Valuation/Revenue', 'Revenue/Valuation', 'Revenue×2'], correct: 0},
    {q_ro: 'Ce e Comparable Companies Analysis?', q_en: 'What is Comps Analysis?', options_ro: ['Analiză concurență', 'Valuation prin comparare firme similare', 'Survey piață'], options_en: ['Competitor analysis', 'Valuation by comparing similar firms', 'Market survey'], correct: 1},
    {q_ro: 'Ce sunt scenarios in Financial Modeling?', q_en: 'What are scenarios in Fin. Modeling?', options_ro: ['Povești', 'Base/Bull/Bear projections', 'Setări software'], options_en: ['Stories', 'Base/Bull/Bear projections', 'Software settings'], correct: 1},
    {q_ro: 'Cum se calculează Blended Discount Rate?', q_en: 'How to calculate Blended Discount Rate?', options_ro: ['Medie simplă', 'WACC=pondere debit+equity', 'Dobândă bancă'], options_en: ['Simple average', 'WACC=weight debt+equity', 'Bank interest'], correct: 1},
    {q_ro: 'Ce e Product-Market Fit?', q_en: 'What is Product-Market Fit?', options_ro: ['Vânzări OK', 'Clienți angajați, growth organic, NPS>50', 'Niciodată'], options_en: ['OK sales', 'Engaged users, organic growth, NPS>50', 'Never'], correct: 1},
    {q_ro: 'Care sunt indicatori Viral Coefficient?', q_en: 'What indicates Viral Coefficient?', options_ro: ['Random', '(Invited)×(Conversion)>1=exponențial', 'Mereu 0'], options_en: ['Random', '(Invited)×(Conversion)>1=exponential', 'Always 0'], correct: 1},
    {q_ro: 'Ce e Positioning Strategy?', q_en: 'What is Positioning Strategy?', options_ro: ['Loc office', 'Definiție unica valoare vs incumbents', 'Adresă magazin'], options_en: ['Office location', 'Unique value definition vs incumbents', 'Store address'], correct: 1},
    {q_ro: 'Cum se structurează Cap Table?', q_en: 'How to structure Cap Table?', options_ro: ['Aleatoriu', 'Founders 70%, Investors 20%, Pool 10%', 'Aceiași toți'], options_en: ['Random', 'Founders 70%, Investors 20%, Pool 10%', 'Same for all'], correct: 1},
    {q_ro: 'Ce sunt Attribution Models?', q_en: 'What are Attribution Models?', options_ro: ['Culori brand', 'Alocează credit la fiecare touchpoint', 'Nume produse'], options_en: ['Brand colors', 'Allocate credit to each touchpoint', 'Product names'], correct: 1},
    {q_ro: 'De ce e important A/B Testing?', q_en: 'Why is A/B Testing important?', options_ro: ['Rar necesar', 'Validareă optimizări cu semnificație statistică', 'Marketing'], options_en: ['Rarely needed', 'Validate optimizations statistically', 'Marketing'], correct: 1},
    {q_ro: 'Ce e Dynamic Pricing?', q_en: 'What is Dynamic Pricing?', options_ro: ['Preț fix', 'Preț adaptat pe demand/supply', 'Reducere'],options_en: ['Fixed price', 'Price adapted to demand/supply', 'Discount'], correct: 1},
    {q_ro: 'Cum se calculează CAC Payback Period?', q_en: 'How to calculate CAC Payback Period?', options_ro: ['CAC/Monthly Revenue', 'Luni pentru recuperare CAC din profit', 'Random'], options_en: ['CAC/Monthly Revenue', 'Months to recover CAC from profit', 'Random'], correct: 1},
    {q_ro: 'Ce sunt Cohort Analysis?', q_en: 'What is Cohort Analysis?', options_ro: ['Analiza vârstă', 'Grup users cu behavior similar pe timp', 'Survey'], options_en: ['Age analysis', 'Group users with similar behavior over time', 'Survey'], correct: 1},
    {q_ro: 'De ce e important Unit Economics?', q_en: 'Why is Unit Economics important?', options_ro: ['Cosmetic', 'Arată profitabilitate per customer', 'Taxe'], options_en: ['Cosmetic', 'Shows profitability per customer', 'Taxes'], correct: 1}
  ]
};
