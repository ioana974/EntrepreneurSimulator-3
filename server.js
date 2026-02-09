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
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/entrepreneur-simulator';
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const JWT_SECRET = process.env.JWT_SECRET || 'dev_jwt_secret_change_me';

// === MONGODB ===
const mongoose = require('mongoose');
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Models
const User = require('./models/User');
const GameResult = require('./models/GameResult');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// === EMAIL SETUP ===
let transporter = null;

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

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Could not send start notification:', error);
    } else {
      console.log('Start notification sent:', info.response);
    }
  });

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

      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          console.error('Error sending admin results:', err);
          return res.status(500).json({ success: false, message: 'Could not send results' });
        }
        const preview = nodemailer.getTestMessageUrl(info);
        if (preview) console.log('Admin results preview URL:', preview);
        return res.json({ success: true, message: 'Results sent to admin (no player email provided)', preview, savedId: saved._id });
      });
    } else {
      const playerMailOptions = {
        from: process.env.EMAIL_USER || 'noreply@entrepreneurhub.com',
        to: playerEmail,
        subject: `Rezultate joc - ${playerName || 'Jucător'}`,
        html: `<h3>Salut ${playerName || ''},</h3><p>Iată un sumar al jocului tău:</p><pre>${JSON.stringify(state, null, 2)}</pre>`
      };

      const adminMailOptions = Object.assign({}, playerMailOptions, { to: process.env.ADMIN_EMAIL || 'turdaioanaelena@gmail.com', subject: `(ADMIN) Rezultate joc - ${playerName || 'Jucător'}` });

      transporter.sendMail(playerMailOptions, (err1, info1) => {
        const previewPlayer = nodemailer.getTestMessageUrl(info1);
        if (previewPlayer) console.log('Player results preview URL:', previewPlayer);
        if (err1) console.error('Error sending results to player:', err1);
        transporter.sendMail(adminMailOptions, (err2, info2) => {
          const previewAdmin = nodemailer.getTestMessageUrl(info2);
          if (previewAdmin) console.log('Admin results preview URL:', previewAdmin);
          if (err1 && err2) {
            return res.status(500).json({ success: false, message: 'Both emails failed' });
          }
          return res.json({ success: true, message: 'Results emailed', info: { player: info1, admin: info2, preview: { player: previewPlayer, admin: previewAdmin } }, savedId: saved._id });
        });
      });
    }
  } catch (err) {
    console.error('Submit error:', err);
    return res.status(500).json({ success: false, error: err.message });
  }
});

// Simple endpoint to send a test email to the configured admin email
app.get('/api/test-email', (req, res) => {
  const to = process.env.ADMIN_EMAIL || 'turdaioanaelena@gmail.com';
  const mailOptions = {
    from: process.env.EMAIL_USER || 'noreply@entrepreneurhub.com',
    to,
    subject: 'Test email - EntrepreneurHub',
    html: `<p>Acesta este un email de test trimis la ${new Date().toLocaleString()}</p>`
  };
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error('Test email failed:', err);
      return res.status(500).json({ success: false, error: err.message || err });
    }
    const preview = nodemailer.getTestMessageUrl(info);
    if (preview) console.log('Test email preview URL:', preview);
    return res.json({ success: true, info, preview });
  });
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
      instructor: 'Andrei Popescu',
      duration: '4 săptămâni',
      level: 'Începător'
    },
    {
      id: 2,
      title: 'Scaling Your Business',
      instructor: 'Maria Ionescu',
      duration: '6 săptămâni',
      level: 'Intermediar'
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

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Email send error:', error);
      return res.status(500).json({ success: false, message: 'Email could not be sent', error: error.message || error });
    }
    console.log('Email sent:', info);
    res.json({ success: true, message: 'Enrolled successfully and email sent', info: { messageId: info.messageId, response: info.response } });
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
