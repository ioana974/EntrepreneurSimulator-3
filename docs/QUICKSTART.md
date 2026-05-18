# Quick Start Guide - 5 Minute Setup

## Scopul: Să rulezi site-ul in browser în maxim 5 minute

### Varianta 1: Direct în Browser (Cea mai rapidă)
```
1. Deschide: entrepreneur-simulator/index.html
2. Gata! Site-ul rulează acum.
```

**Avantaje:**

**Dezavantaje:**


### Varianta 2: Cu Live Server (Recomandată)

#### Pasul 1: Instalare Tools
```bash
# Instalează Node.js de la: https://nodejs.org/
# Verifică instalare:
node --version
npm --version
```

#### Pasul 2: Instalare Live Server
```bash
npm install -g live-server
```

#### Pasul 3: Rulează Proiectul
```bash
# În folderul proiectului
cd entrepreneur-simulator
live-server
```

**Output:**
```
Serving "." at http://127.0.0.1:8080
Ready for changes
```

Browserul se deschide automat la http://localhost:8080

**Avantaje:**


### Varianta 3: Full Stack (Backend + Frontend)

#### Pasul 1: Instalare Node.js
[Download Node.js](https://nodejs.org/) (14+ version)

#### Pasul 2: Instalare Dependențe
```bash
cd entrepreneur-simulator
npm install
```

#### Pasul 3: Setup Environment
```bash
cp .env.example .env
# Editează .env dacă ai OpenAI API key, altfel lasă default
```

#### Pasul 4: Start Backend (Terminal 1)
```bash
npm run dev
```

Output:
```
EntrepreneurHub Server
Listening on port 5000
```

#### Pasul 5: Build Frontend Bundle (Terminal 2 - OPTIONAL for Game)
If you want the full React-based Game page to work, build the frontend bundle once before starting the static server:
```bash
# Produce js/game.bundle.js used by game.html
npm run build
# Or for active development (rebuild on change):
npm run watch:game
```

#### Pasul 6: Start Frontend (Terminal 2)
```bash
live-server
```

Output:
```
Serving at http://127.0.0.1:8080
```

Acum ai:


## Pagini Disponibile

| Pagina | URL | Descriere |
|--------|-----|-----------|
| **Home** | `index.html` | Pagina principală |
| **Game** | `game.html` | Simulator interactiv |
| **Tests** | `stats.html` (secțiune) | Teste evaluative |
| **Statistics** | `stats.html` | Statistici platformă |
| **About** | `about.html` | Despre platform |


## Teste Rapide

### 1. Test Navbar
Click pe logo -> Scroll la home
Click pe "RO" / "EN" -> Schimbă limba
Pe mobile: Click hamburger -> Menu apare

### 2. Test Home Page
Canvas cu particule se animează
Animații text sunt fluide
Butoanele au hover effect

### 3. Test Game
Buton "Ia Testul" -> Jocul se start
Alege decizie -> Impacturi se actualizează
Buget scade -> Game-over când < 0

### 4. Test Responsive
Resize browserul pe 480px -> Mobile layout
Hamburger menu apare pe mobile
Text se redimensionează automat


## Troubleshooting Rapid

**Problem: Pagina nu se încarcă**
```
Soluție: Asigură-te că ești în folderul corect
cd entrepreneur-simulator
```

**Problem: Live Server nu funcționează**
```
Soluție: Reinstalează
npm uninstall -g live-server
npm install -g live-server
```

**Problem: Port 8080 deja în folosință**
```
Soluție: Specifică alt port
live-server --port=3000
```

**Problem: Backend error**
```
Soluție: Asigură-te Node.js este instalat
node --version    # ar trebui v14+
npm install       # reinstalează dependențe
```


##  Next Steps

1. **Citește documentația:**
   - [README.md](README.md) - Overview complet
   - [SETUP.md](SETUP.md) - Setup detaliat
   - [FEATURES.md](FEATURES.md) - Roadmap

2. **Explorează codul:**
   - `js/main.jsx` - Entry point React
   - `js/pages/Home.jsx` - Pagina home
   - `js/components/Navbar.jsx` - Navbar component
   - `css/style.css` - Stiluri principale

3. **Fă modificări:**
   - Editează componente React
   - Schimbă culori în `theme.css`
   - Adaugă feature-uri noi

4. **Contribuie:**
   - [CONTRIBUTING.md](CONTRIBUTING.md) - Cum să contribui


## Idei Rapide de Testat

### 1. Schimbă Culori
Edit `css/theme.css`:
```css
```

### 2. Adaugă Animație
Edit `css/animations.css` și adaugă:
```css
@keyframes myAnimation {
  from { opacity: 0; }
  to { opacity: 1; }
}
```

### 3. Schimbă Text
Edit `js/contexts/LanguageContext.jsx`:
```javascript
ro: {
  heroTitle: 'Noua versiune'  // Schimbă titlu
}
```

### 4. Adaugă Pagină Nouă
Crează `newpage.html` și copiază structura din `index.html`.


## Deploy Rapid (Later)

### Deploy Frontend pe Netlify
```bash
npm run build
# Drag & drop folder în Netlify
```

### Deploy Backend pe Heroku
```bash
git push heroku main
```


## Support

Ai întrebări?


## Congratulations!

Ai setup-at cu succes EntrepreneurHub!

**Ce este următorul pas?**

1. Explorează pagina Home
2. Joacă simulatorul de business
3. Ia câteva teste
4. Citește about page
5. Contactează pentru bug reports


**Built with passion by EntrepreneurHub Team**

Happy exploring!
