# EntrepreneurSimulator

A comprehensive entrepreneurship simulation game built with React, Node.js, and Firebase.

## Features

- Interactive business simulation scenarios
- User authentication and progress tracking
- Email notifications for results
- Admin dashboard for viewing submissions
- Firebase Firestore for data storage
- Responsive design

## Quick Start

### Prerequisites

- Node.js 16+
- Firebase project
- Gmail account (for email notifications)

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd EntrepreneurSimulator-3-main
```

2. Install dependencies:
```bash
npm install
```

3. Set up Firebase:
   - Create a Firebase project at https://console.firebase.google.com/
   - Enable Firestore Database
   - Go to Project Settings > Service Accounts
   - Generate a new private key and download the JSON file
   - Rename it to `firebase-key.json` and place in the root directory

4. Configure environment variables:
```bash
cp .env.example .env
```

Edit `.env` with your values:
- `JWT_SECRET`: Generate a random string for authentication
- `EMAIL_USER`: Your Gmail address
- `EMAIL_PASSWORD`: Gmail App Password (see below)
- `ADMIN_EMAIL`: Where to receive result notifications

### Gmail App Password Setup

1. Go to https://myaccount.google.com/apppasswords
2. Select "Mail" and "Windows Computer"
3. Copy the 16-character password
4. Use it as `EMAIL_PASSWORD` in your `.env`

### Running Locally

```bash
# Start the server
npm start

# Or for development
node server.js
```

The app will be available at http://localhost:5000

### Building for Production

```bash
# Build the React frontend
npm run build

# Start production server
NODE_ENV=production node server.js
```

## Deployment to Render

1. Push your code to GitHub (make sure `firebase-key.json` is in `.gitignore`)

2. Create a new Web Service on Render:
   - Connect your GitHub repository
   - Set build command: `npm install`
   - Set start command: `node server.js`

3. Add environment variables in Render dashboard:
   - Copy all values from your `.env` file
   - Add the Firebase service account key content as `FIREBASE_KEY_JSON`

4. Deploy!

## API Endpoints

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/game/submit` - Submit game results
- `GET /api/game/history` - Get user's game history
- `POST /api/game/save` - Save game progress

## Database Schema

### Users Collection
```json
{
  "name": "string",
  "email": "string",
  "passwordHash": "string",
  "createdAt": "timestamp"
}
```

### GameResults Collection
```json
{
  "user": "string",
  "playerName": "string",
  "playerEmail": "string",
  "scenarioId": "string",
  "state": "object",
  "submittedAt": "timestamp"
}
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License