# Firebase Setup Guide

Pentru a activa Firebase în aplicația EntrepreneurSimulator, urmează acești pași:

## Pasul 1: Creează un proiect Firebase

1. Du-te la [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project" sau "Adaugă proiect"
3. Introdu numele proiectului (ex: "entrepreneur-simulator")
4. Activează Google Analytics dacă vrei (opțional)
5. Click "Create project"

## Pasul 2: Activează Firestore

1. În proiectul tău Firebase, click "Firestore Database" din meniul stâng
2. Click "Create database"
3. Alege "Start in test mode" (poți schimba regulile de securitate mai târziu)
4. Alege o locație pentru database (ex: europe-west)
5. Click "Done"

## Pasul 3: Generează Service Account Key

1. În Firebase Console, click pe iconița roată dințată (Settings) → "Project settings"
2. Click tab-ul "Service accounts"
3. Click "Generate new private key"
4. Descarcă fișierul JSON (ex: `entrepreneur-simulator-firebase-adminsdk-xxxxx.json`)

## Pasul 4: Configurează variabilele de mediu

1. Deschide fișierul `.env` din folderul proiectului
2. Găsește linia `FIREBASE_SERVICE_ACCOUNT_KEY=`
3. Copiază conținutul fișierului JSON descărcat și înlocuiește placeholder-ul
4. Salvează fișierul

**Important:** Nu comite fișierul `.env` în Git! Adaugă-l în `.gitignore`.

## Pasul 5: Repornește serverul

```bash
npm start
```

Ar trebui să vezi mesajul "Connected to Firebase Firestore" în consolă.

## Funcționalități activate cu Firebase:

- ✅ Stocarea înscrierilor la cursuri
- ✅ Trimiterea automată de email-uri la înscriere
- ✅ Panoul admin pentru vizualizarea înscrierilor
- ✅ Statistici în timp real
- ✅ Stocarea rezultatelor jocurilor
- ✅ Email-uri pentru rezultatele jocurilor

## Testare:

1. Deschide site-ul în browser
2. Mergi la "Cursuri" și completează formularul de înscriere
3. Verifică că primești email
4. Mergi la "Admin" pentru a vedea înscrierile
5. Joacă un joc și verifică că rezultatele sunt salvate

## Securitate:

După ce testezi, schimbă regulile Firestore din "test mode" la reguli mai restrictive:

În Firebase Console → Firestore Database → Rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read/write for authenticated users
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

Pentru producție, implementează autentificare Firebase în frontend.