/**
 * EntrepreneurHub Backend Server
 * Express.js + Firebase Firestore + Email Integration
 */

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const nodemailer = require('nodemailer');
const admin = require('firebase-admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

dotenv.config();

const app = express();

// === MIDDLEWARE ===
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// === ENV VARIABLES ===
const PORT = process.env.PORT || 8000;
const JWT_SECRET = process.env.JWT_SECRET || 'dev_jwt_secret_change_me';

// === FIREBASE SETUP ===
let db;

try {
  const serviceAccount = require('./firebase-key.json');

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });

  db = admin.firestore();
  console.log('✅ Connected to Firebase Firestore');

} catch (error) {
  console.error('❌ Firebase initialization failed:', error.message);
  console.log('⚠️ Running without Firebase');
}

// === EMAIL SETUP ===
let transporter = null;

async function getTransporter() {
  if (transporter) return transporter;

  if (process.env.EMAIL_USER && process.env.EMAIL_PASSWORD) {
    transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE || 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    return transporter;
  }

  // fallback: Ethereal (dev only)
  const testAccount = await nodemailer.createTestAccount();

  transporter = nodemailer.createTransport({
    host: testAccount.smtp.host,
    port: testAccount.smtp.port,
    secure: testAccount.smtp.secure,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });

  console.log('📧 Using Ethereal test email');
  return transporter;
}

async function sendEmail({ to, subject, text, html, from }) {
  const trans = await getTransporter();

  return trans.sendMail({
    from: from || process.env.EMAIL_USER || 'noreply@entrepreneurhub.com',
    to,
    subject,
    text,
    html,
  });
}

// === AUTH MIDDLEWARE ===
function authMiddleware(req, res, next) {
  const auth = req.headers.authorization;

  if (!auth) {
    return res.status(401).json({ success: false, message: 'Missing token' });
  }

  try {
    const token = auth.replace('Bearer ', '');
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: 'Invalid token' });
  }
}

// === ROUTES ===

// Health
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK' });
});

// === AUTH ===
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!db) return res.status(500).json({ success: false });

    const userRef = db.collection('users').doc(email);
    const existing = await userRef.get();

    if (existing.exists) {
      return res.json({ success: true, message: 'User exists' });
    }

    const passwordHash = password ? await bcrypt.hash(password, 10) : null;

    await userRef.set({
      name,
      email,
      passwordHash,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    const token = jwt.sign({ id: email, email }, JWT_SECRET, { expiresIn: '30d' });

    res.json({ success: true, token });

  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!db) return res.status(500).json({ success: false });

    const doc = await db.collection('users').doc(email).get();

    if (!doc.exists) {
      return res.status(401).json({ success: false });
    }

    const user = doc.data();

    const valid = await bcrypt.compare(password, user.passwordHash);

    if (!valid) {
      return res.status(401).json({ success: false });
    }

    const token = jwt.sign({ id: email, email }, JWT_SECRET, {
      expiresIn: '7d',
    });

    res.json({
      success: true,
      token,
      user: { email: user.email, name: user.name },
    });

  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// === GAME START ===
app.post('/api/game/start', (req, res) => {
  res.json({
    success: true,
    gameState: {
      budget: 100000,
      reputation: 50,
    },
  });
});

// === GAME SUBMIT ===
app.post('/api/game/submit', async (req, res) => {
  try {
    if (!db) return res.status(500).json({ success: false });

    const { playerName, playerEmail, state, userId } = req.body;

    const ref = db.collection('gameResults').doc();

    await ref.set({
      user: userId,
      playerName,
      playerEmail,
      state,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    if (playerEmail) {
      await sendEmail({
        to: playerEmail,
        subject: 'Game Results',
        html: `<pre>${JSON.stringify(state, null, 2)}</pre>`,
      });
    }

    res.json({ success: true, savedId: ref.id });

  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// === SAVE GAME ===
app.post('/api/game/save', authMiddleware, async (req, res) => {
  try {
    const ref = db.collection('gameResults').doc();

    await ref.set({
      user: req.user.id,
      state: req.body.state,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    res.json({ success: true, id: ref.id });

  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// === HISTORY ===
app.get('/api/game/history', authMiddleware, async (req, res) => {
  try {
    const snapshot = await db
      .collection('gameResults')
      .where('user', '==', req.user.id)
      .orderBy('createdAt', 'desc')
      .get();

    const results = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));

    res.json({ success: true, results });

  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// === COURSES ===
app.get('/api/courses', (req, res) => {
  res.json({
    success: true,
    courses: [
      { id: 1, title: 'Startup 101' },
      { id: 2, title: 'Scaling Business' },
    ],
  });
});

// === ENROLL ===
app.post('/api/courses/enroll', async (req, res) => {
  try {
    const ref = db.collection('enrollments').doc();

    await ref.set({
      ...req.body,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    await sendEmail({
      to: 'admin@example.com',
      subject: 'New Enrollment',
      html: JSON.stringify(req.body),
    });

    res.json({ success: true, id: ref.id });

  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// === START SERVER ===
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

module.exports = app;