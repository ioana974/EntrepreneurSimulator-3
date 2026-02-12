# EntrepreneurHub - Setup & Installation Guide

Un ghid complet pentru a configura și rula proiectul **Entrepreneur Simulator** pe calculatorul tău.

## Cerințe Preliminare

Înainte de a începe, asigură-te că ai instalate:

### Necesare:
- **Node.js** (versiunea 14+) - [Download](https://nodejs.org/)
- **npm** (vine cu Node.js)
- **Git** (pentru control de versie) - [Download](https://git-scm.com/)

### Opționale:
- **MongoDB** - [Download](https://www.mongodb.com/try/download/community)
- **Visual Studio Code** - [Download](https://code.visualstudio.com/)
- **Postman** - [Download](https://www.postman.com/) (pentru testare API)

## Verificare Instalare

Verifică versiunile prin terminal:

```bash
node --version      # ar trebui să arate v14.0.0 sau mai mare
npm --version       # ar trebui să arate 6.0.0 sau mai mare
git --version       # ar trebui să arate git version
```

## Instalare Proiect

### Pasul 1: Clone Repository
```bash
cd Documents
git clone https://github.com/yourusername/entrepreneur-simulator.git
cd entrepreneur-simulator
```

### Pasul 2: Instalare Dependențe
```bash
npm install
```

Așteptă ca npm să instaleze toate pachetele necesare (poate dura 2-3 minute).

## Configurare

### Pasul 1: Crează Fișierul .env
```bash
# Copiază template-ul
cp .env.example .env

# Editează .env cu valorile tale (folosind editor preferință)
# Lasă valorile default dacă nu ai setup complet
```

### Pasul 2: Setup MongoDB (Opțional)

#### Dacă ai MongoDB instalat local:
```bash
# Windows
net start MongoDB

# macOS
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

Verifică conexiune:
```bash
# Deschide mongosh în alt terminal
mongosh
```

## Rulare Proiect

### Opțiunea 1: Frontend Doar (Recomandată pentru început)

Deschide fișierul `index.html` direct în browser:

```bash
# macOS/Linux
open index.html

# Windows - Deschide File Explorer și dublu-click pe index.html
```

Sau folosește Live Server:

```bash
npm install -g live-server
live-server
```

### Opțiunea 2: Full Stack (Frontend + Backend)

**Terminal 1 - Rulează Backend:**
```bash
npm run dev
# Server va porni pe http://localhost:5000
```

**Terminal 2 - Rulează Frontend:**
```bash
live-server
# Frontend va fi pe http://localhost:8080
```

## Structura Foldere (După Setup)

```
entrepreneur-simulator/
├── node_modules/          # Dependențe (auto-creat)
├── index.html             # Pagina principală
├── game.html              # Pagina joc
├── stats.html             # Pagina statistici
├── about.html             # Pagina about
├── css/                   # Stiluri
├── js/                    # JavaScript & React
├── .env                   # Variabile de mediu (creat din .env.example)
├── .env.example           # Template variabile
├── package.json           # Dependențe proiect
├── server.js              # Server Node.js
├── README.md              # Documentație principală
├── SETUP.md               # Acest ghid
└── .gitignore            # Fișiere ignorate de Git
```

## Testare API (cu Postman)

### Verificare Server
1. Pornește backend: `npm run dev`
2. Deschide Postman
3. Fă o cerere GET la `http://localhost:5000/api/health`
4. Ar trebui să primești răspuns: `{ "status": "OK", ... }`

### Teste Disponibile
```bash
# GET - Verificare server
GET http://localhost:5000/api/health

# GET - Statistici platformă
GET http://localhost:5000/api/stats/platform

# POST - Start Game
POST http://localhost:5000/api/game/start
Body: {}

# GET - Cursuri disponibile
GET http://localhost:5000/api/courses

# POST - Înscrie-te la curs
POST http://localhost:5000/api/courses/enroll
Body: { "courseId": 1, "userId": "user123" }
```

## Troubleshooting

### Problema: "npm command not found"
**Soluție:** Node.js nu este instalat. [Descarcă și instalează Node.js](https://nodejs.org/)

### Problema: Port 5000 deja în folosință
**Soluție:** Schimbă PORT-ul în .env sau omoară procesul:
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# macOS/Linux
lsof -i :5000
kill -9 <PID>
```

### Problema: Module not found
**Soluție:** Reinstalează dependențe
```bash
rm -rf node_modules package-lock.json
npm install
```

### Problema: MongoDB connection error
**Soluție:** 
1. Asigură-te că MongoDB rulează
2. Verifică MONGODB_URI în .env
3. Comentează db connection din server.js temporar

## Resurse Utile

- **React Docs:** https://react.dev
- **Node.js Docs:** https://nodejs.org/docs
- **Express.js:** https://expressjs.com
- **MongoDB:** https://docs.mongodb.com
- **OpenAI API:** https://platform.openai.com/docs

## API Keys Necesare (Pentru Faza 2)

### OpenAI API
1. Mergi pe https://platform.openai.com
2. Crează cont și primești $5 free credits
3. Creează API key
4. Copiază în .env: `OPENAI_API_KEY=sk-xxx`

### MongoDB Atlas (Cloud Database)
1. Mergi pe https://www.mongodb.com/cloud/atlas
2. Crează account gratuit
3. Crează cluster
4. Copiază connection string în .env

## Deployment (Viitor)

### Deploy Frontend (Netlify)
```bash
npm run build
# Urcă folder-ul din output pe Netlify
```

### Deploy Backend (Heroku)
```bash
git push heroku main
```

## Comenzi Utile

```bash
# Development
npm run dev           # Rulează cu nodemon (auto-restart)

# Production
npm start             # Rulează normal

# Testing
npm test              # Rulează teste (când sunt adăugate)

# Build
npm run build         # Build webpack (când e configurat)

# Clean
rm -rf node_modules   # Șterge node_modules
```

## Contribuire

Vrei să adaugi feature-uri noi? Grozav!

1. Creează branch: `git checkout -b feature/feature-name`
2. Fă commit: `git commit -m 'Add feature'`
3. Push: `git push origin feature/feature-name`
4. Crează Pull Request

## Raportare Bug-uri

Găsești un bug? Raportează pe GitHub Issues cu:
- Descriere detaliată
- Pași pentru reproduire
- Screenshots dacă e relevant
- Browser/OS info

## FAQ

**Q: Pot rula doar frontend fără backend?**
A: Da! Frontend-ul funcționează independent. Backend-ul este opțional pentru acum.

**Q: Ce dacă nu am MongoDB?**
A: Comentează linia de conexiune în server.js. Datele vor fi simulate.

**Q: Cum adaug traduceri noi?**
A: Edit `js/contexts/LanguageContext.jsx` și adaugă cheia în ambele limbi.

**Q: Pot folosi asta comercial?**
A: Licența MIT permite uz comercial cu atribuire.

## Support

Ai întrebări? Contactează:
- Email: contact@entrepreneurhub.ro
- GitHub Issues: [Repository Issues]

---

**Happy Coding!**

Made with passion by EntrepreneurHub Team
