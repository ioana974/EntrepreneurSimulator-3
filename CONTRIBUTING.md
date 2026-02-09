# 🤝 Contributing to EntrepreneurHub

Mulțumim pentru interes în a contribui la **EntrepreneurHub**! Această documento explică cum poți ajuta.

## 📋 Cod de Conduită

- Fii respectuos și incluziv
- Nu tolera comportament discriminator
- Critici constructive și feedback pozitiv
- Respect pentru diversitate și opinii diferite

## 🚀 Getting Started

### 1. Fork Repository
Fă click pe "Fork" în colțul din dreapta sus al repository-ului.

### 2. Clone Your Fork
```bash
git clone https://github.com/YOUR-USERNAME/entrepreneur-simulator.git
cd entrepreneur-simulator
```

### 3. Create Branch
```bash
git checkout -b feature/your-feature-name
# sau
git checkout -b fix/your-bug-name
```

**Naming Convention:**
- Features: `feature/feature-description`
- Bugfixes: `fix/bug-description`
- Documentation: `docs/documentation-update`
- Styling: `style/styling-changes`

### 4. Install Dependencies
```bash
npm install
```

### 5. Make Your Changes
Editează fișierele necesare pe branch-ul tău.

### 6. Test Your Changes
```bash
npm test
npm run build
```

### 7. Commit Changes
```bash
git add .
git commit -m "Add feature: Description of what you changed"
```

**Commit Message Format:**
- `Add:` pentru feature-uri noi
- `Fix:` pentru bug fixes
- `Update:` pentru actualizări
- `Refactor:` pentru restructurări
- `Docs:` pentru documentație
- `Style:` pentru formatting
- `Test:` pentru teste

### 8. Push to Your Fork
```bash
git push origin feature/your-feature-name
```

### 9. Create Pull Request
1. Mergi la repository-ul original
2. Click "New Pull Request"
3. Selectează branch-ul tău
4. Completează template-ul PR
5. Submit!

## 📝 Pull Request Template

```markdown
## Description
Descriere scurtă a schimbărilor tale.

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Performance improvement

## Related Issue
Closes #(issue number)

## How to Test
Pași pentru a testa schimbările:
1. ...
2. ...

## Screenshots (dacă e relevant)
[Atașează screenshots]

## Checklist
- [ ] Codul funcționează
- [ ] Am testat pe mobile și desktop
- [ ] Am actualizat documentația
- [ ] Nu am warnings/errors în console
```

## 📂 Structura Folderelor

```
js/
├── components/          # React components reutilizabile
│   ├── Navbar.jsx
│   ├── Loader.jsx
│   └── GameDashboard.jsx
├── pages/              # Page components
│   ├── Home.jsx
│   ├── Tests.jsx
│   ├── Statistics.jsx
│   └── About.jsx
├── contexts/           # React contexts
│   └── LanguageContext.jsx
├── main.jsx            # Entry point React app
├── game.js             # Game logic
└── events.js           # Event system

css/
├── theme.css           # Variabile și tema
├── style.css           # Stiluri principale
├── animations.css      # Animații
└── sections.css        # Secțiuni specifice
```

## 🎨 Coding Standards

### JavaScript/React
```javascript
// ✅ Good
const MyComponent = () => {
  return (
    <div className="container">
      <h1>Title</h1>
    </div>
  );
};

// ❌ Bad
const myComponent=()=>{return <div><h1>Title</h1></div>}

// Use const, not var
const variable = 'value'; // ✅
var variable = 'value';  // ❌

// Use arrow functions
const handleClick = () => {};  // ✅
function handleClick() {}      // ❌ (for components)
```

### CSS
```css
/* ✅ Good */
.button {
  padding: 1rem 2rem;
  background: var(--accent-cyan);
  border-radius: 8px;
  transition: all 0.3s ease;
}

.button:hover {
  background: var(--accent-yellow);
}

/* ❌ Bad */
.button {
  padding: 16px 32px;
  background: #00f0ff;
}
```

### Naming Convention
- **Components:** PascalCase (`MyComponent.jsx`)
- **Functions/Variables:** camelCase (`myVariable`, `handleClick`)
- **Constants:** UPPER_SNAKE_CASE (`API_BASE_URL`)
- **CSS Classes:** kebab-case (`.my-class`)

## 🧪 Testing

### Tipuri de Teste
1. **Unit Tests** - Teste individuale pentru funcții
2. **Integration Tests** - Teste pentru componente + logică
3. **E2E Tests** - Teste for complete user flows

### Rulare Teste
```bash
npm test                    # Rulează toate testele
npm test -- --watch        # Watch mode
npm test -- --coverage     # Raport coverage
```

## 📚 Documentation

- Comentează cod complex
- Update README.md dacă adaugi feature
- Documentează funcții publice
- Adaugă JSDoc comments

```javascript
/**
 * Calculează impactul unei decizii de joc
 * @param {string} decision - Tip decizie
 * @returns {object} Impact object cu buget, reputație etc
 */
function calculateDecisionImpact(decision) {
  // ...
}
```

## 🐛 Bug Reports

### Template Bug Report
```markdown
## Description
Descriere clar a bug-ului

## Steps to Reproduce
1. ...
2. ...
3. ...

## Expected Behavior
Ce ar trebui să se întâmple

## Actual Behavior
Ce se întâmplă de fapt

## Browser & OS
- Browser: Chrome 120
- OS: Windows 11

## Screenshots
[Atașează screenshot]
```

## ✨ Feature Requests

### Template Feature Request
```markdown
## Description
Descriere feature-ului

## Motivation
De ce e necesar?

## Example Usage
Cum ar fi folosit?

## Acceptance Criteria
- [ ] Criteriu 1
- [ ] Criteriu 2

## Related
Alte feature-uri conexe
```

## 📊 Review Process

### Reviewer Checklist
- [ ] Cod funcționează
- [ ] Urmează style guide-ul
- [ ] Are comentarii adecvate
- [ ] Nu introduce breaking changes
- [ ] Tests sunt adecvate
- [ ] Performance impact e minim

### Approval Process
1. ✅ Minimum 1 approval
2. ✅ Toate checks trebuie să treacă
3. ✅ No requested changes
4. ✅ Ready to merge!

## 🎯 Priority Issues

Căută issues etichetate cu:
- `good-first-issue` - Pentru contribuitori noi
- `help-wanted` - Ajutor necesar
- `bug` - Bug fixes
- `enhancement` - Noi feature-uri

## 💬 Communication

### Canale de Contact
- **GitHub Issues** - Pentru bug reports și feature requests
- **GitHub Discussions** - Pentru discuții generale
- **Email** - contact@entrepreneurhub.ro
- **Discord** - [Join our server]

## 📜 License

Prin contribuire, accepți că munca ta va fi sub MIT License.

## 🎓 Learning Resources

- [React Documentation](https://react.dev)
- [JavaScript Fundamentals](https://javascript.info)
- [CSS Modern Features](https://web.dev)
- [Git Tutorial](https://git-scm.com/book)

## 🏆 Contributors Hall of Fame

Contribuitori remarcabili vor fi menționați în README.md! 🌟

## ❓ Need Help?

- Citește [SETUP.md](SETUP.md) pentru setup guide
- Citește [README.md](README.md) pentru overview
- Citește [FEATURES.md](FEATURES.md) pentru roadmap
- Deschide GitHub Discussion

---

**Happy Contributing! 🎉**

Mulțumim pentru ajutorul tău!
