/**
 * EntrepreneurHub Backend Server
 * Express.js + MongoDB + OpenAI Integration
 */

const express = require('express');
const path = require('path');
const cors = require('cors');
const dotenv = require('dotenv');
const nodemailer = require('nodemailer');
const OpenAI = require('openai');
const admin = require('firebase-admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

dotenv.config({ path: path.join(__dirname, '..', '.env') });

const app = express();

// === MIDDLEWARE ===
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public'))); // Serve static files

// === ENVIRONMENT VARIABLES ===
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/entrepreneur-simulator';
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const JWT_SECRET = process.env.JWT_SECRET || 'dev_jwt_secret_change_me';
const USING_SENDGRID = Boolean(process.env.SENDGRID_API_KEY);
const SMTP_SERVICE = process.env.EMAIL_SERVICE && !process.env.EMAIL_SERVICE.includes('@') ? process.env.EMAIL_SERVICE : 'gmail';
const EMAIL_FROM = process.env.EMAIL_FROM || process.env.EMAIL_USER || 'noreply@entrepreneurhub.com';
const openai = OPENAI_API_KEY ? new OpenAI({ apiKey: OPENAI_API_KEY }) : null;

// === FIREBASE SETUP ===
let db;

try {
  const serviceAccount = process.env.FIREBASE_CREDENTIALS
    ? JSON.parse(process.env.FIREBASE_CREDENTIALS)
    : require(path.join(__dirname, '..', 'config', 'firebase-key.json')); 

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });

  db = admin.firestore();
  console.log('✅ Connected to Firebase Firestore');

} catch (error) {
  console.error('❌ Firebase initialization failed:', error.message);
  console.log('⚠️ Running without Firebase');
}

console.log('Email configuration:', {
  sendgrid: USING_SENDGRID,
  smtp: Boolean(process.env.EMAIL_USER && process.env.EMAIL_PASSWORD),
  smtpService: SMTP_SERVICE,
  rawEmailService: process.env.EMAIL_SERVICE || null,
  emailFrom: EMAIL_FROM,
  adminEmail: process.env.ADMIN_EMAIL || null
});

// === EMAIL SETUP ===
let transporter = null;

// Helper to ensure transporter is initialized (creates Ethereal test account if needed)
async function getTransporter() {
  if (transporter) return transporter;
  if (process.env.EMAIL_USER && process.env.EMAIL_PASSWORD && process.env.EMAIL_PASSWORD !== 'REPLACE_WITH_APP_PASSWORD') {
    transporter = nodemailer.createTransport({
      service: SMTP_SERVICE,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
      }
    });
    try {
      await transporter.verify();
      console.log('Email transporter ready (real SMTP)');
    } catch (err) {
      console.error('Email transporter verify failed:', err);
    }
    return transporter;
  }

  // create Ethereal test account
  const testAccount = await nodemailer.createTestAccount();
  transporter = nodemailer.createTransport({
    host: testAccount.smtp.host,
    port: testAccount.smtp.port,
    secure: testAccount.smtp.secure,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass
    }
  });
  console.log('Using Ethereal test account for emails. View messages at https://ethereal.email (use credentials below)');
  console.log('Ethereal user:', testAccount.user);
  console.log('Ethereal pass:', testAccount.pass);
  return transporter;
}

// Generic sendEmail helper: prefers SendGrid (API) if SENDGRID_API_KEY set, otherwise uses nodemailer transporter
async function sendEmail({ to, from, subject, text, html }) {
  if (process.env.SENDGRID_API_KEY) {
    try {
      const sgMail = require('@sendgrid/mail');
      sgMail.setApiKey(process.env.SENDGRID_API_KEY);
      const msg = {
        to,
        from: from || EMAIL_FROM,
        subject,
        text,
        html
      };
      return await sgMail.send(msg);
    } catch (err) {
      // If SendGrid package is not installed or sending fails, log and fall back to nodemailer
      console.error('SendGrid send failed or module missing — falling back to nodemailer:', err && err.message ? err.message : err);
    }
  }

  const trans = await getTransporter();
  return new Promise((resolve, reject) => {
    trans.sendMail({ from: from || process.env.EMAIL_USER || 'noreply@entrepreneurhub.com', to, subject, text, html }, (err, info) => {
      if (err) return reject(err);
      return resolve(info);
    });
  });
}

async function sendEmailWithTimeout(emailOptions, timeoutMs = 60000) { // Increased to 60 seconds for debugging
  return Promise.race([
    sendEmail(emailOptions),
    new Promise((_, reject) => setTimeout(() => reject(new Error('Email provider connection timed out')), timeoutMs))
  ]);
}

// If real credentials are provided, use them. Otherwise create an Ethereal test account.
if (process.env.EMAIL_USER && process.env.EMAIL_PASSWORD && process.env.EMAIL_PASSWORD !== 'REPLACE_WITH_APP_PASSWORD') {
  transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE || 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
  });

  transporter.verify((error, success) => {
    if (error) {
      console.log('Email transporter error:', error);
    } else {
      console.log('Email transporter ready (real SMTP)');
    }
  });
} else {
  // Use Ethereal for development/testing when no credentials are set
  nodemailer.createTestAccount().then(testAccount => {
    transporter = nodemailer.createTransport({
      host: testAccount.smtp.host,
      port: testAccount.smtp.port,
      secure: testAccount.smtp.secure,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass
      }
    });

    console.log('No real SMTP credentials found. Using Ethereal test account for emails.');
    console.log('Ethereal user:', testAccount.user);
    console.log('Ethereal pass:', testAccount.pass);
    console.log('Use https://ethereal.email to view messages when running locally.');
  }).catch(err => {
    console.error('Failed to create Ethereal test account:', err);
  });
}

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'EntrepreneurHub Server is running' });
});

// AI question generation for custom business scenarios
app.post('/api/ai/generate-questions', async (req, res) => {
  if (!openai) {
    return res.status(500).json({ success: false, message: 'OpenAI API key is not configured' });
  }

  const customOptions = req.body.customOptions || {};
  const {
    name = 'Afacere personalizată',
    type = 'service',
    budget = 100000,
    employees = 5,
    goal = 'profit',
    competition = 'medie'
  } = customOptions;

  const prompt = `Ești un generator de întrebări pentru un simulator de afaceri educațional.
Generează 21 întrebări de tip scenariu pentru opțiunea "Creează propria ta afacere".

Date business:
- Nume: ${name}
- Tip: ${type}
- Buget inițial: ${budget} RON
- Angajați: ${employees}
- Obiectiv: ${goal}
- Concurență: ${competition}

Folosește baza teoretică din lecțiile site-ului (Business Fundamentals, Innovation & Creativity, Financial Management, Marketing Strategy).
Probele trebuie să reflecte concepte precum forma juridică, TVA, microîntreprindere, MVP, marketing digital, burn rate, cashflow, LTV/CAC și strategii competitive.

Răspunde strict cu un JSON valid de forma:
{
  "questions": [
    {
      "id": "custom-1",
      "title": "...",
      "description": "...",
      "technicalDetails": "...",
      "choices": [
         { "text": "...", "budgetChange": -3000, "reputationChange": 5 },
         ...
      ]
    }
  ]
}

Folosește limba română pentru titluri, descrieri și detalii. Nu adăuga text suplimentar în afara JSON-ului.`;

  try {
    const response = await openai.responses.create({
      model: 'gpt-4.1-mini',
      input: prompt,
      temperature: 0.7,
      max_output_tokens: 900
    });

    const textOutput = (response.output || []).map(block => {
      if (typeof block === 'string') return block;
      if (Array.isArray(block.content)) return block.content.map(item => item?.text || '').join('');
      return '';
    }).join('');

    let payload = null;
    const trimmed = textOutput.trim();
    const jsonTextMatch = trimmed.match(/\{[\s\S]*\}$/);
    const jsonText = jsonTextMatch ? jsonTextMatch[0] : trimmed;

    try {
      payload = JSON.parse(jsonText);
    } catch (parseError) {
      console.error('OpenAI JSON parse error:', parseError.message, 'response text:', trimmed);
      return res.status(500).json({ success: false, message: 'Could not parse OpenAI response as JSON' });
    }

    if (!payload || !Array.isArray(payload.questions)) {
      return res.status(500).json({ success: false, message: 'OpenAI response did not contain a questions array' });
    }

    return res.json({ success: true, questions: payload.questions });
  } catch (err) {
    console.error('AI generation error:', err);
    return res.status(500).json({ success: false, message: 'AI generation failed', error: err.message || String(err) });
  }
});

// === AUTH ROUTES ===
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email) return res.status(400).json({ success: false, message: 'Name and email required' });

    if (db) {
      // Use Firebase Firestore
      const usersRef = db.collection('users');
      const userDoc = await usersRef.where('email', '==', email).limit(1).get();
      if (!userDoc.empty) {
        const user = userDoc.docs[0].data();
        return res.json({ success: true, message: 'User exists', userId: userDoc.docs[0].id });
      }

      const passwordHash = password ? await bcrypt.hash(password, 10) : undefined;
      const newUser = { name, email, passwordHash, createdAt: new Date() };
      const docRef = await usersRef.add(newUser);
      const token = jwt.sign({ id: docRef.id, email }, JWT_SECRET, { expiresIn: '30d' });
      return res.json({ success: true, userId: docRef.id, token });
    } else {
      // Fallback to in-memory or error
      return res.status(500).json({ success: false, message: 'Database not available' });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, error: err.message });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ success: false, message: 'Email and password required' });

    if (db) {
      const usersRef = db.collection('users');
      const userDoc = await usersRef.where('email', '==', email).limit(1).get();
      if (userDoc.empty) return res.status(401).json({ success: false, message: 'Invalid credentials' });

      const user = userDoc.docs[0].data();
      if (!user.passwordHash) return res.status(401).json({ success: false, message: 'Invalid credentials' });

      const ok = await bcrypt.compare(password, user.passwordHash);
      if (!ok) return res.status(401).json({ success: false, message: 'Invalid credentials' });

      const token = jwt.sign({ id: userDoc.docs[0].id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
      return res.json({ success: true, token, user: { id: userDoc.docs[0].id, name: user.name, email: user.email } });
    } else {
      return res.status(500).json({ success: false, message: 'Database not available' });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, error: err.message });
  }
});

// Middleware to protect routes
function authMiddleware(req, res, next) {
  const auth = req.headers.authorization;
  if (auth) {
    const token = auth.replace('Bearer ', '');
    try {
      const payload = jwt.verify(token, JWT_SECRET);
      req.user = payload;
      return next();
    } catch (err) {
      return res.status(401).json({ success: false, message: 'Invalid token' });
    }
  }

  // Fallback: allow x-user-id header for lightweight guest identification
  const uid = req.headers['x-user-id'] || req.body.userId || req.query.userId;
  if (uid) {
    req.user = { id: uid };
    return next();
  }

  return res.status(401).json({ success: false, message: 'Missing Authorization or userId' });
}

// === GAME ROUTES (Placeholder) ===
app.post('/api/game/start', (req, res) => {
  const { playerName, playerEmail, scenarioId } = req.body || {};

  const gameState = {
    budget: 100000,
    reputation: 50,
    employees: 5,
    year: 1,
    month: 1,
    customers: 100,
    marketShare: 1
  };

  // Notify admin that a new game started (optional)
  const emailSubject = `Joc început: ${playerName || 'Player anonim'}`;
  const emailHtml = `
    <h3>Joc nou început</h3>
    <p><strong>Jucător:</strong> ${playerName || 'Anonim'}</p>
    <p><strong>Email jucător:</strong> ${playerEmail || 'Nu a fost furnizat'}</p>
    <p><strong>Scenariu:</strong> ${scenarioId || 'nedefinit'}</p>
    <p>Data: ${new Date().toLocaleString()}</p>
  `;

  const mailOptions = {
    from: process.env.EMAIL_USER || 'noreply@entrepreneurhub.com',
    to: process.env.ADMIN_EMAIL || 'turdaioanaelena@gmail.com',
    subject: emailSubject,
    html: emailHtml
  };
  sendEmail(mailOptions).then(info => {
    console.log('Start notification sent');
  }).catch(err => console.error('Could not send start notification:', err));

  res.json({ success: true, gameState });
});

// Endpoint to submit final game results, persist them and email player + admin
app.post('/api/game/submit', async (req, res) => {
  try {
    const { playerName, playerEmail, scenarioId, state, userId } = req.body || {};

    // Persist result in DB
    let savedId;
    if (db) {
      const gameResultsRef = db.collection('gameResults');
      const newResult = {
        user: userId || undefined,
        playerName,
        playerEmail,
        scenarioId,
        state,
        submittedAt: new Date()
      };
      const docRef = await gameResultsRef.add(newResult);
      savedId = docRef.id;
    } else {
      savedId = 'no-db';
    }

    // Send emails as before
    if (!playerEmail) {
      const mailOptions = {
        from: process.env.EMAIL_USER || 'noreply@entrepreneurhub.com',
        to: process.env.ADMIN_EMAIL || 'turdaioanaelena@gmail.com',
        subject: `Rezultate - ${playerName || 'Jucător anonim'}`,
        html: `<h3>Rezultate joc</h3><pre>${JSON.stringify({ playerName, scenarioId, state }, null, 2)}</pre>`
      };

      sendEmail(mailOptions).then(info => {
        // nodemailer preview available only when using Ethereal; include if present
        let preview = null;
        try { preview = nodemailer.getTestMessageUrl(info); } catch(e) { preview = null; }
        return res.json({ success: true, message: 'Results sent to admin (no player email provided)', preview, savedId });
      }).catch(err => {
        console.error('Error sending admin results:', err);
        return res.status(500).json({ success: false, message: 'Could not send results', error: err.message || err });
      });
    } else {
      const playerMailOptions = {
        from: process.env.EMAIL_USER || 'noreply@entrepreneurhub.com',
        to: playerEmail,
        subject: `Rezultate joc - ${playerName || 'Jucător'}`,
        html: `<h3>Salut ${playerName || ''},</h3><p>Iată un sumar al jocului tău:</p><pre>${JSON.stringify(state, null, 2)}</pre>`
      };

      const adminMailOptions = Object.assign({}, playerMailOptions, { to: process.env.ADMIN_EMAIL || 'turdaioanaelena@gmail.com', subject: `(ADMIN) Rezultate joc - ${playerName || 'Jucător'}` });

      // send to player first, then admin
      sendEmail(playerMailOptions).then(info1 => {
        let previewPlayer = null;
        try { previewPlayer = nodemailer.getTestMessageUrl(info1); } catch(e) { previewPlayer = null; }
        sendEmail(adminMailOptions).then(info2 => {
          let previewAdmin = null;
          try { previewAdmin = nodemailer.getTestMessageUrl(info2); } catch(e) { previewAdmin = null; }
          return res.json({ success: true, message: 'Results emailed', info: { player: info1, admin: info2, preview: { player: previewPlayer, admin: previewAdmin } }, savedId });
        }).catch(err2 => {
          console.error('Error sending admin results:', err2);
          // if player was sent but admin failed, still respond success for player
          return res.json({ success: true, message: 'Player emailed; admin failed', info: { player: info1, adminError: err2 && err2.message }, savedId });
        });
      }).catch(err1 => {
        console.error('Error sending results to player:', err1);
        // try to send admin anyway
        sendEmail(adminMailOptions).then(info2 => {
          let previewAdmin = null;
          try { previewAdmin = nodemailer.getTestMessageUrl(info2); } catch(e) { previewAdmin = null; }
          return res.json({ success: true, message: 'Admin emailed; player failed', info: { admin: info2, preview: { admin: previewAdmin } }, savedId });
        }).catch(err2 => {
          console.error('Both emails failed:', err1, err2);
          return res.status(500).json({ success: false, message: 'Both emails failed', errors: [err1 && err1.message, err2 && err2.message] });
        });
      });
    }
  } catch (err) {
    console.error('Submit error:', err);
    return res.status(500).json({ success: false, error: err.message });
  }
});

// Note: other endpoints should use getTransporter() helper when sending emails

// Simple endpoint to send a test email to the configured admin email
app.get('/api/test-email', async (req, res) => {
  const to = process.env.ADMIN_EMAIL || 'turdaioanaelena@gmail.com';
  const mailOptions = {
    from: EMAIL_FROM,
    to,
    subject: 'Test email - EntrepreneurHub',
    html: `<p>Acesta este un email de test trimis la ${new Date().toLocaleString()}</p>`
  };

  try {
    const info = await sendEmailWithTimeout(mailOptions, 30000);
    const preview = nodemailer.getTestMessageUrl(info);
    if (preview) console.log('Test email preview URL:', preview);
    return res.json({ success: true, transport: USING_SENDGRID ? 'sendgrid' : 'smtp', info, preview });
  } catch (err) {
    console.error('Test email failed:', err);
    return res.json({ success: false, transport: USING_SENDGRID ? 'sendgrid' : 'smtp', error: err.message || err.toString() });
  }
});

app.get('/api/email-diagnostics', (req, res) => {
  res.json({
    sendgrid: USING_SENDGRID,
    smtp: Boolean(process.env.EMAIL_USER && process.env.EMAIL_PASSWORD),
    smtpService: process.env.EMAIL_SERVICE || 'gmail',
    emailFrom: EMAIL_FROM,
    adminEmail: process.env.ADMIN_EMAIL || null,
    firebaseConfigured: Boolean(db),
    nodeEnv: process.env.NODE_ENV || 'development'
  });
});

// DEBUG: send a results-like email without persisting to DB (useful when MongoDB is not available)
app.post('/api/debug/send-result', async (req, res) => {
  try {
    const { playerName, playerEmail, state } = req.body || {};
    if (!playerEmail) return res.status(400).json({ success: false, message: 'playerEmail required' });

    const playerMailOptions = {
      from: process.env.EMAIL_USER || 'noreply@entrepreneurhub.com',
      to: playerEmail,
      subject: `Rezultate joc - ${playerName || 'Jucător'}`,
      html: `<h3>Salut ${playerName || ''},</h3><p>Iată un sumar al jocului tău:</p><pre>${JSON.stringify(state || {}, null, 2)}</pre>`
    };

    const adminMailOptions = Object.assign({}, playerMailOptions, { to: process.env.ADMIN_EMAIL || 'turdaioanaelena@gmail.com', subject: `(ADMIN) Rezultate joc - ${playerName || 'Jucător'}` });

    // send to player then admin
    const info1 = await sendEmail(playerMailOptions);
    let previewPlayer = null;
    try { previewPlayer = nodemailer.getTestMessageUrl(info1); } catch(e) { previewPlayer = null; }

    const info2 = await sendEmail(adminMailOptions);
    let previewAdmin = null;
    try { previewAdmin = nodemailer.getTestMessageUrl(info2); } catch(e) { previewAdmin = null; }

    return res.json({ success: true, message: 'Debug emails sent', info: { player: info1, admin: info2, preview: { player: previewPlayer, admin: previewAdmin } } });
  } catch (err) {
    console.error('Debug send-result error:', err);
    return res.status(500).json({ success: false, error: err.message || err });
  }
});

// Save intermediate game state for a user (requires token)
app.post('/api/game/save', authMiddleware, async (req, res) => {
  try {
    const { state, scenarioId } = req.body || {};
    let savedId;
    if (db) {
      const gameResultsRef = db.collection('gameResults');
      const newResult = {
        user: req.user.id,
        playerName: state.playerName || undefined,
        playerEmail: state.playerEmail || undefined,
        scenarioId,
        state,
        submittedAt: new Date()
      };
      const docRef = await gameResultsRef.add(newResult);
      savedId = docRef.id;
    } else {
      savedId = 'no-db';
    }
    return res.json({ success: true, savedId });
  } catch (err) {
    console.error('Save error:', err);
    return res.status(500).json({ success: false, error: err.message });
  }
});

// Get game history for a user
app.get('/api/game/history', authMiddleware, async (req, res) => {
  try {
    if (db) {
      const gameResultsRef = db.collection('gameResults');
      const snapshot = await gameResultsRef.where('user', '==', req.user.id).orderBy('submittedAt', 'desc').limit(50).get();
      const results = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      return res.json({ success: true, results });
    } else {
      return res.json({ success: true, results: [] });
    }
  } catch (err) {
    console.error('History error:', err);
    return res.status(500).json({ success: false, error: err.message });
  }
});

app.post('/api/game/decision', (req, res) => {
  const { decision } = req.body;
  res.json({ success: true, message: `Decision '${decision}' processed` });
});

app.get('/api/game/state/:userId', (req, res) => {
  res.json({ success: true, gameState: {} });
});

// === TESTS ROUTES (Placeholder) ===
app.get('/api/tests', (req, res) => {
  const tests = [
    { id: 1, name: 'Assessment Inițial', questions: 25 },
    { id: 2, name: 'Cunoștințe Fundamentale', questions: 50 },
  ];
  res.json({ success: true, tests });
});

app.post('/api/tests/submit', (req, res) => {
  const { testId, answers } = req.body;
  res.json({ success: true, score: 85, feedback: 'Great job!' });
});

// === AI CORRECTION ENDPOINT (Placeholder) ===
// app.post('/api/ai/correct-answer', async (req, res) => {
//   try {
//     const { question, userAnswer, correctAnswer } = req.body;
//
//     const response = await openai.createChatCompletion({
//       model: 'gpt-3.5-turbo',
//       messages: [
//         {
//           role: 'system',
//           content: 'You are an entrepreneur education expert. Provide constructive feedback on answers.'
//         },
//         {
//           role: 'user',
//           content: `Question: ${question}\nStudent Answer: ${userAnswer}\nCorrect Answer: ${correctAnswer}\n\nProvide constructive feedback in Romanian.`
//         }
//       ],
//       temperature: 0.7,
//       max_tokens: 500
//     });
//
//     res.json({
//       success: true,
//       feedback: response.data.choices[0].message.content,
//       isCorrect: userAnswer.toLowerCase().includes(correctAnswer.toLowerCase())
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, error: error.message });
//   }
// });

// === STATISTICS ROUTES (Placeholder) ===
app.get('/api/stats/user/:userId', (req, res) => {
  res.json({
    success: true,
    stats: {
      totalScore: 8500,
      coursesCompleted: 3,
      averageScore: 85,
      totalHours: 42
    }
  });
});

app.get('/api/stats/platform', (req, res) => {
  res.json({
    success: true,
    stats: {
      totalUsers: 12543,
      activeCourses: 45,
      completedCourses: 8932,
      averageScore: 78.5,
      successRate: 82
    }
  });
});

// === COURSES ROUTES (Placeholder) ===
app.get('/api/courses', (req, res) => {
  const courses = [
    {
      id: 1,
      title: 'Startup 101',
      instructor: 'Turda Ioana Elena',
      duration: '4 săptămâni',
      level: 'Începător'
    },
    {
      id: 2,
      title: 'Scaling Your Business',
      instructor: 'Turda Ioana Elena',
      duration: '6 săptămâni',
      level: 'Intermediar'
    }
    ,
    {
      id: 3,
      title: 'Advanced Entrepreneurship',
      instructor: 'Ardusatan Gavril',
      duration: '8 săptămâni',
      level: 'Avansat'
    }
  ];
  res.json({ success: true, courses });
});

app.post('/api/courses/enroll', (req, res) => {
  console.log('--- Enroll request received ---');
  console.log('From IP:', req.ip);
  console.log('Headers:', JSON.stringify(req.headers));
  console.log('Body:', JSON.stringify(req.body));
  const { courseName, firstName, lastName, birthYear, city, county } = req.body;

  // Validate input
  if (!courseName || !firstName || !lastName || !birthYear || !city || !county) {
    return res.status(400).json({ success: false, message: 'All fields are required' });
  }

  // Email content
  const emailSubject = `Noua Inscriere Curs - ${courseName}`;
  const emailText = `
    Noua inscriere la curs: ${courseName}
    
    Detalii student:
    Prenume: ${firstName}
    Nume: ${lastName}
    Anul nasterii: ${birthYear}
    Localitatea: ${city}
    Județul: ${county}
  `;

  const emailHtml = `
    <h2>Noua Inscriere Curs</h2>
    <p><strong>Cursul:</strong> ${courseName}</p>
    <h3>Detalii Student:</h3>
    <ul>
      <li><strong>Prenume:</strong> ${firstName}</li>
      <li><strong>Nume:</strong> ${lastName}</li>
      <li><strong>Anul nasterii:</strong> ${birthYear}</li>
      <li><strong>Localitatea:</strong> ${city}</li>
      <li><strong>Județul:</strong> ${county}</li>
    </ul>
  `;

  // Send email
  const mailOptions = {
    from: EMAIL_FROM,
    to: 'turdaioanaelena@gmail.com',
    subject: emailSubject,
    text: emailText,
    html: emailHtml
  };

  console.log('Attempting to send enrollment email...');
  sendEmailWithTimeout(mailOptions, 30000)
    .then(info => {
      console.log('Email sent successfully:', info);
      res.json({ success: true, message: 'Enrolled successfully and email sent', transport: USING_SENDGRID ? 'sendgrid' : 'smtp', info: { messageId: info?.messageId, response: info?.response || info } });
    })
    .catch(err => {
      console.error('Enrollment email failed:', err);
      // Still return success for enrollment, but log the email failure
      res.json({ success: true, message: 'Enrolled successfully (email failed)', transport: USING_SENDGRID ? 'sendgrid' : 'smtp', emailError: err.message || err.toString() });
    });
});

// === ERROR HANDLING ===
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    success: false,
    error: process.env.NODE_ENV === 'production' ? 'Internal Server Error' : err.message
  });
});

// === 404 HANDLER ===
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found'
  });
});

// === START SERVER ===
app.listen(PORT, () => {
  console.log(`
╔═══════════════════════════════════════╗
║   EntrepreneurHub Server              ║
║   Listening on port ${PORT}            ║
║   ${new Date().toLocaleString()}       ║
╚═══════════════════════════════════════╝
  `);
  console.log('Environment:', process.env.NODE_ENV || 'development');
  console.log('API Base URL: http://localhost:' + PORT);
  console.log('Frontend: http://localhost:8000 (or your live server port)');
});

module.exports = app;
