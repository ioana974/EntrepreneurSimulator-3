const fs = require('fs');

// Read the original JSON file
const rawData = fs.readFileSync('./EntrepreneurSimulator-3-main/firebase-key.json', 'utf8');
let cred = JSON.parse(rawData);

// Fix the private key - replace \n with actual newlines
if (cred.private_key && typeof cred.private_key === 'string') {
  cred.private_key = cred.private_key.replace(/\\n/g, '\n');
}

// Write back the fixed JSON
fs.writeFileSync('./EntrepreneurSimulator-3-main/firebase-key.json', JSON.stringify(cred, null, 2));
console.log('Firebase key file fixed successfully');