# 🚀 Entrepreneur Simulator - EntrepreneurHub

O platformă educațională interactivă pentru adolescenți și tineri care aspir să devină antreprenori. Site-ul oferă lecții, cursuri online, teste evaluative și un simulator de afacere realist.

## 📋 Caracteristici Principale

### ✅ Implementate
- **🎨 Design Modern & Atractiv**
  - Tema de culori: Albastru Închis (#0a1628), Gri (#1a2332), Galben (#ffd700), Cyan (#00f0ff)
  - Animații impresionante și fluide
  - Design responsive (mobile, tablet, desktop)

- **🌐 Navbar Funcțional**
  - Meniu hamburger pentru mobile
  - Switch limbă (RO/EN)
  - Navigare rapidă la secțiuni

- **🏠 Pagina Home**
  - Canvas cu particule interactive
  - Secțiuni: Lecții, Cursuri, Teste, Povestiri de Succes
  - Card-uri interactive cu hover effects

- **🎮 Simulator de Joc**
  - Dashboard cu buget, reputație, angajați
  - Sistem de decizii cu impact real
  - Progres tracker
  - Game over logic (bankruptcy)

- **🧪 Sistem de Teste**
  - Multiple choice questions
  - Multi-nivel (Ușor, Mediu, Dificil, Expert)
  - Scoruri și rezultate
  - Progres tracker

- **📊 Pagina Statistici**
  - Grafice de evoluție
  - KPI-uri (utilizatori, cursuri, rate succes)
  - Realizări și badges

- **📖 Pagina About**
  - Prezentare echipă
  - Valori și misiune
  - Stack tehnologic
  - Contact

- **🌍 Sistem de Traduceri**
  - Suport complet RO/EN
  - Context API pentru state management
  - Switch dinamic de limbă

### 🚧 Pentru Dezvoltare Viitoare

- **🤖 Integrare AI**
  - OpenAI API pentru corectare răspunsuri text
  - Feedback personalizat cu NLP
  - Chat bot asistent

- **🗄️ Bază de Date**
  - Sistem de autentificare cu JWT
  - Salvare progres utilizator
  - Statistici și rapoarte

- **📱 App Mobile**
  - React Native version
  - Push notifications
  - Offline functionality

## 📁 Structura Proiectului

```
entrepreneur-simulator/
├── index.html              # Pagina principală
├── game.html               # Pagina de joc
├── stats.html              # Pagina de statistici
├── about.html              # Pagina about
├── css/
│   ├── theme.css           # Variabile CSS și tema globală
│   ├── style.css           # Stiluri principale
│   ├── animations.css      # Animații avansate
│   └── sections.css        # Stiluri pentru secțiuni specifice
├── js/
│   ├── main.jsx            # App React principal
│   ├── game.jsx            # App pentru pagina joc
│   ├── stats.jsx           # App pentru pagina statistici
│   ├── about.jsx           # App pentru pagina about
│   ├── game.js             # Logic de joc
│   ├── events.js           # Sistem de evenimente
│   ├── ui.js               # (deprecated) - UI logic
│   ├── components/
│   │   ├── Navbar.jsx      # Navbar component cu hamburger menu
│   │   ├── Loader.jsx      # Loading component
│   │   └── GameDashboard.jsx # Dashboard pentru joc
│   ├── pages/
│   │   ├── Home.jsx        # Pagina home
│   │   ├── Tests.jsx       # Pagina teste
│   │   ├── Statistics.jsx   # Pagina statistici
│   │   └── About.jsx       # Pagina about
│   └── contexts/
│       └── LanguageContext.jsx # Context pentru traduceri
└── README.md               # Această documentație
```

## 🛠️ Tech Stack

- **Frontend:**
  - React 18 (via CDN)
  - Babel Standalone (pentru transpilare JSX)
  - CSS3 cu custom properties
  - Canvas API (pentru particule)

- **Backend (planificat):**
  - Node.js + Express
  - MongoDB
  - OpenAI API
  - JWT Authentication

## 🚀 Cum să Rulez Proiectul

### Opțiunea 1: Direct în Browser
1. Deschide `index.html` în browser
2. Site-ul va funcționa instant fără necesitate de build

### Opțiunea 2: Cu Live Server
```bash
# Instalează live-server global
npm install -g live-server

# Rulează în folderul proiectului
live-server
```

### Opțiunea 3: Cu Python
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

Apoi deschide `http://localhost:8000` în browser.

## 📖 Pagini și Funcționalitate

### 1. **Home Page** (`index.html`)
- Canvas cu particule interactive
- Animații hero
- Secțiuni principale
- Link-uri la alte secțiuni

**Secțiuni:**
- Lecții (Fundamentele Businessului, Inovație, Management Financiar, Marketing)
- Cursuri Online (cu profesori, durata, nivel)
- Teste (Assessment Inițial, Cunoștințe Fundamentale, Certificare, Challenge)
- Povestiri de Succes (cazuri reale)

### 2. **Game Page** (`game.html`)
Simulator interactiv cu:
- **Dashboard:**
  - Buget (incepe cu $100,000)
  - Reputație (0-100)
  - Angajați
  - Anul și Luna

- **Sistem de Decizii:**
  - Fiecare decizie are impact pe buget, reputație și clienți
  - Progres tracker
  - Game over logic (bankruptcy)

- **Evenimente Random:**
  - Oportunități de parteneriat
  - Crize de aprovizionare
  - Lansări de campanii
  - Etc.

### 3. **Tests Page** (`stats.html` - adaptată)
- Teste multi-nivel cu multiple choice
- Scoruri și procente
- Feedback instant
- Progress tracking

### 4. **Statistics Page** (`stats.html`)
- KPI-uri: Utilizatori activi, Cursuri active, Scor mediu
- Grafice de evoluție (bar chart)
- Performance metrics (satisfacție, retenție)
- Realizări recent eTeste

### 5. **About Page** (`about.html`)
- Prezentare platformă
- Echipă (6 membri cu roluri)
- Valori și misiune
- Stack tehnologic
- Contact

## 🎨 Design System

### Culori
```css
--primary-dark: #0a1628       /* Albastru foarte închis */
--primary-gray: #1a2332       /* Gri secundar */
--accent-yellow: #ffd700      /* Galben auriu */
--accent-cyan: #00f0ff        /* Cyan neon */
--accent-purple: #8b5cf6      /* Purple accent */
--text-light: #ffffff         /* Text alb */
--text-secondary: #b0b0b0     /* Text gri */
```

### Tipologie
- **Fonturi:** Segoe UI, System fonts
- **Titluri:** Bold, 900 weight, gradient backgrounds
- **Subtitluri:** Secondary text, 1.2-1.5rem
- **Body:** 1rem, line-height 1.6

### Animații
- `fadeInUp` - Fade in cu slide up
- `slideInUp` / `slideInDown` - Slide animations
- `scaleIn` / `scaleUp` - Scale animations
- `glow` / `glowPulse` - Glow effects
- `float` - Floating animation
- `bounce` / `bounceIn` - Bounce effects

## 🔄 Sistem de Traduceri

### Cum se folosește
```javascript
import { useLanguage } from './contexts/LanguageContext.jsx';

function MyComponent() {
  const { language, toggleLanguage, t } = useLanguage();
  
  return <h1>{t('heroTitle')}</h1>; // Returnează text în limba curentă
}
```

### Adăugare noi traduceri
Edit `LanguageContext.jsx` și adaugă cheia în ambele obiecte (ro și en):
```javascript
const translations = {
  ro: {
    myKey: 'Text în română',
  },
  en: {
    myKey: 'Text in English',
  }
};
```

## 📊 Sistem de Joc

### Game Engine (`game.js`)
- Gestionează starea jocului
- Calculează impact decizii
- Salvează stare în localStorage
- Avansează luni/ani

### Event System (`events.js`)
- Generate 10 tipuri de evenimente
- Probabilități randomizate
- Impact pe budget/reputation/customers
- Event history tracking

## 🚀 Feature Roadmap

### Faza 1 (Current) ✅
- [x] Structură React
- [x] Design și styling
- [x] Simulator de joc funcțional
- [x] Sistem de teste
- [x] Traduceri RO/EN
- [x] Responsive design

### Faza 2 (Coming Soon) 🚧
- [ ] Backend API (Node/Express)
- [ ] Autentificare utilizatori
- [ ] Bază de date (MongoDB)
- [ ] Salvare progres
- [ ] Sistem de puncte și badges

### Faza 3 (Future) 🔮
- [ ] Integrare OpenAI API
- [ ] Corectare răspunsuri IA
- [ ] Chat asistent AI
- [ ] Mobile app (React Native)
- [ ] Analytics și reporturi

## 💡 Idei de Îmbunătățire

1. **Multiplayer Mode**
   - Compete cu alți jucători
   - Leaderboards
   - Team challenges

2. **Certification Program**
   - Cursuri cu certificate
   - Level progression
   - Skill badges

3. **Mentor System**
   - Video calls cu experți
   - 1-on-1 coaching
   - Feedback personalizat

4. **Marketplace**
   - Vânzare de resurse
   - Templates de business
   - Tools și software

5. **Community Features**
   - Forum de discuții
   - Networking events
   - Success stories blog

## 🤝 Contributing

Vrei să contribui? Bine ați venit!

1. Fork repository-ul
2. Creează branch pentru feature
3. Commit changes
4. Push și creează Pull Request

## 📝 License

Acest proiect este disponibil sub licența MIT.

## 📧 Contact

**EntrepreneurHub Team**
- Email: contact@entrepreneurhub.ro
- Website: www.entrepreneurhub.ro

---

**Built with ❤️ for aspiring entrepreneurs | 2026**
