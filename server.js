/**
 * EntrepreneurHub Backend Server
 * Express.js + MongoDB + OpenAI Integration
 */

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const nodemailer = require('nodemailer');
// const mongoose = require('mongoose');
// const { OpenAI } = require('openai');

dotenv.config();

const app = express();

// === MIDDLEWARE ===
app.use(cors());
app.use(express.json());
app.use(express.static('.')); // Serve static files

// === ENVIRONMENT VARIABLES ===
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || '';
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const JWT_SECRET = process.env.JWT_SECRET || 'dev_jwt_secret_change_me';

// === MONGODB ===
const mongoose = require('mongoose');
let dbAvailable = false;
if (MONGODB_URI) {
  mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(() => {
    dbAvailable = true;
    console.log('Connected to MongoDB');
  }).catch(err => console.error('MongoDB connection error:', err));
} else {
  console.log('MONGODB_URI not set — running in file-store mode (no MongoDB).');
}

// Models
const User = require('./models/User');
const GameResult = require('./models/GameResult');
const CourseEnrollment = require('./models/CourseEnrollment');
const Visit = require('./models/Visit');
const fileStore = require('./utils/fileStore');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// === EMAIL SETUP ===
let transporter = null;

// Helper to ensure transporter is initialized (creates Ethereal test account if needed)
async function getTransporter() {
  if (transporter) return transporter;
  if (process.env.EMAIL_USER && process.env.EMAIL_PASSWORD && process.env.EMAIL_PASSWORD !== 'REPLACE_WITH_APP_PASSWORD') {
    transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE || 'gmail',
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
        from: from || process.env.EMAIL_FROM || process.env.EMAIL_USER || 'noreply@entrepreneurhub.com',
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

// === PLACEHOLDER - MONGODB CONNECTION ===
// mongoose.connect(MONGODB_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// }).then(() => {
//   console.log('Connected to MongoDB');
// }).catch(err => {
//   console.error('MongoDB connection error:', err);
// });

// === PLACEHOLDER - OPENAI SETUP ===
// const openai = new OpenAI({
//   apiKey: OPENAI_API_KEY
// });

// === ROUTES ===

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'EntrepreneurHub Server is running' });
});

// === AUTH ROUTES ===
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email) return res.status(400).json({ success: false, message: 'Name and email required' });

    let user = await User.findOne({ email });
    if (user) return res.json({ success: true, message: 'User exists', userId: user._id });

    const passwordHash = password ? await bcrypt.hash(password, 10) : undefined;
    user = await User.create({ name, email, passwordHash });
    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: '30d' });
    return res.json({ success: true, userId: user._id, token });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, error: err.message });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ success: false, message: 'Email and password required' });

    const user = await User.findOne({ email });
    if (!user || !user.passwordHash) return res.status(401).json({ success: false, message: 'Invalid credentials' });

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(401).json({ success: false, message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
    return res.json({ success: true, token, user: { id: user._id, name: user.name, email: user.email } });
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
    const saved = await GameResult.create({ user: userId || undefined, playerName, playerEmail, scenarioId, state });

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
        return res.json({ success: true, message: 'Results sent to admin (no player email provided)', preview, savedId: saved._id });
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
          return res.json({ success: true, message: 'Results emailed', info: { player: info1, admin: info2, preview: { player: previewPlayer, admin: previewAdmin } }, savedId: saved._id });
        }).catch(err2 => {
          console.error('Error sending admin results:', err2);
          // if player was sent but admin failed, still respond success for player
          return res.json({ success: true, message: 'Player emailed; admin failed', info: { player: info1, adminError: err2 && err2.message }, savedId: saved._id });
        });
      }).catch(err1 => {
        console.error('Error sending results to player:', err1);
        // try to send admin anyway
        sendEmail(adminMailOptions).then(info2 => {
          let previewAdmin = null;
          try { previewAdmin = nodemailer.getTestMessageUrl(info2); } catch(e) { previewAdmin = null; }
          return res.json({ success: true, message: 'Admin emailed; player failed', info: { admin: info2, preview: { admin: previewAdmin } }, savedId: saved._id });
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
app.get('/api/test-email', (req, res) => {
  const to = process.env.ADMIN_EMAIL || 'turdaioanaelena@gmail.com';
  const mailOptions = {
    from: process.env.EMAIL_USER || 'noreply@entrepreneurhub.com',
    to,
    subject: 'Test email - EntrepreneurHub',
    html: `<p>Acesta este un email de test trimis la ${new Date().toLocaleString()}</p>`
  };
  getTransporter().then(trans => {
    trans.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error('Test email failed:', err);
        return res.status(500).json({ success: false, error: err.message || err });
      }
      const preview = nodemailer.getTestMessageUrl(info);
      if (preview) console.log('Test email preview URL:', preview);
      return res.json({ success: true, info, preview });
    });
  }).catch(err => {
    console.error('Failed to get transporter for test email:', err);
    return res.status(500).json({ success: false, error: 'Email transporter error' });
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
    const saved = await GameResult.create({ user: req.user.id, playerName: state.playerName || undefined, playerEmail: state.playerEmail || undefined, scenarioId, state });
    return res.json({ success: true, savedId: saved._id });
  } catch (err) {
    console.error('Save error:', err);
    return res.status(500).json({ success: false, error: err.message });
  }
});

// Get game history for a user
app.get('/api/game/history', authMiddleware, async (req, res) => {
  try {
    const list = await GameResult.find({ user: req.user.id }).sort({ createdAt: -1 }).limit(50);
    return res.json({ success: true, results: list });
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
    from: process.env.EMAIL_USER || 'noreply@entrepreneurhub.com',
    to: 'turdaioanaelena@gmail.com',
    subject: emailSubject,
    text: emailText,
    html: emailHtml
  };
  // Persist enrollment to DB (if available)
  CourseEnrollment.create({
    userId: req.body.userId || undefined,
    courseId: req.body.courseId,
    courseName: courseName,
    firstName,
    lastName,
    birthYear,
    city,
    county
  }).then(saved => {
    // send email (async)
    sendEmail(mailOptions).then(info => {
      let preview = null;
      try { preview = nodemailer.getTestMessageUrl(info); } catch(e) { preview = null; }
      return res.json({ success: true, message: 'Enrolled successfully, email sent', info: { preview }, savedId: saved._id });
    }).catch(err => {
      console.error('Email send error during enroll:', err);
      return res.json({ success: true, message: 'Enrolled saved but email failed', error: err && err.message, savedId: saved._id });
    });
  }).catch(err => {
    console.error('Failed to save enrollment:', err);
    // Attempt file-based fallback when DB save fails
    try {
      fileStore.saveEnrollment({ userId: req.body.userId, courseId: req.body.courseId, courseName, firstName, lastName, birthYear, city, county }).then(fsSaved => {
        // still try to send email
        sendEmail(mailOptions).then(info => {
          let preview = null;
          try { preview = nodemailer.getTestMessageUrl(info); } catch(e) { preview = null; }
          return res.json({ success: true, message: 'Email sent; enrollment saved to local store (DB error)', info: { preview }, savedLocalId: fsSaved._id });
        }).catch(err2 => {
          console.error('Email send failed after DB error:', err2);
          return res.json({ success: true, message: 'Enrollment saved to local store but email failed', savedLocalId: fsSaved._id, emailError: err2 && err2.message });
        });
      }).catch(fsErr => {
        console.error('Local file save also failed:', fsErr);
        // try send email anyway
        sendEmail(mailOptions).then(info => {
          let preview = null;
          try { preview = nodemailer.getTestMessageUrl(info); } catch(e) { preview = null; }
          return res.json({ success: true, message: 'Email sent but enrollment not saved (DB+FS error)', info: { preview } });
        }).catch(err3 => {
          console.error('Both DB/FS save and email failed:', err, fsErr, err3);
          return res.status(500).json({ success: false, message: 'Enrollment failed', errors: [err && err.message, fsErr && fsErr.message, err3 && err3.message] });
        });
      });
    } catch (fsCatchErr) {
      console.error('Unexpected error in enrollment fallback:', fsCatchErr);
      return res.status(500).json({ success: false, message: 'Enrollment failed', error: fsCatchErr && fsCatchErr.message });
    }
  });
});

// Track a visit (client should POST { userId })
app.post('/api/track/visit', async (req, res) => {
  try {
    const { userId } = req.body || {};
    if (!userId) return res.status(400).json({ success: false, message: 'userId required' });
    const visit = await Visit.create({ userId, userAgent: req.get('User-Agent'), ip: req.ip });
    return res.json({ success: true, visitId: visit._id });
  } catch (err) {
    console.error('Track visit error:', err);
    // fallback to file-based store when DB unavailable
    try {
      const fsVisit = await fileStore.saveVisit({ userId: req.body.userId, userAgent: req.get('User-Agent'), ip: req.ip });
      return res.json({ success: true, visitId: fsVisit._id, fallback: 'file' });
    } catch (fsErr) {
      console.error('Track visit file fallback error:', fsErr);
      return res.status(500).json({ success: false, error: err.message });
    }
  }
});

// Aggregate stats endpoint
app.get('/api/stats/aggregate', async (req, res) => {
  try {
    // Try DB first, fall back to file-based store when DB unavailable
    let uniqueVisitors = 0;
    try {
      const arr = await Visit.distinct('userId');
      uniqueVisitors = Array.isArray(arr) ? arr.length : 0;
    } catch (dbErr) {
      console.error('Visit.distinct failed, using file fallback:', dbErr && dbErr.message);
      uniqueVisitors = await fileStore.getUniqueVisitorsCount();
    }

    let enrollments = [];
    try {
      enrollments = await CourseEnrollment.find({}).select('courseId');
    } catch (dbErr) {
      console.error('CourseEnrollment.find failed, using file fallback:', dbErr && dbErr.message);
      enrollments = await fileStore.getEnrollments();
    }

    const courseCounts = {};
    enrollments.forEach(e => {
      const id = (typeof e.courseId === 'number') ? e.courseId : (e.courseId || e.courseName || 'unknown');
      courseCounts[id] = (courseCounts[id] || 0) + 1;
    });

    return res.json({ success: true, stats: { uniqueVisitors, courseCounts } });
  } catch (err) {
    console.error('Aggregate stats error:', err);
    return res.status(500).json({ success: false, error: err.message });
  }
});

// Admin endpoint to list enrollments (DB or file fallback)
app.get('/api/admin/enrollments', async (req, res) => {
  try {
    const adminKey = req.query.adminKey || req.headers['x-admin-key'];
    const envKey = process.env.ADMIN_KEY;

    // If ADMIN_KEY set, require it. If not set, allow only localhost requests.
    const isLocal = req.ip === '::1' || req.ip === '127.0.0.1' || req.ip === '::ffff:127.0.0.1';
    if (envKey) {
      if (!adminKey || adminKey !== envKey) return res.status(401).json({ success: false, message: 'Missing or invalid adminKey' });
    } else if (!isLocal) {
      return res.status(401).json({ success: false, message: 'Admin access restricted. Set ADMIN_KEY or call from localhost.' });
    }

    try {
      const enrollments = await CourseEnrollment.find({}).sort({ createdAt: -1 }).limit(1000);
      return res.json({ success: true, source: 'db', enrollments });
    } catch (dbErr) {
      console.error('Admin enrollments DB read failed, using file fallback:', dbErr && dbErr.message);
      const enrollments = await fileStore.getEnrollments();
      return res.json({ success: true, source: 'file', enrollments });
    }
  } catch (err) {
    console.error('Admin enrollments error:', err);
    return res.status(500).json({ success: false, error: err.message });
  }
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
