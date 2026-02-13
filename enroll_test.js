const http = require('http');
const payload = JSON.stringify({
  courseName: 'Startup 101',
  firstName: 'Test',
  lastName: 'User',
  birthYear: 1990,
  city: 'Cluj',
  county: 'Cluj'
});

const options = {
  hostname: 'localhost',
  port: 5000,
  path: '/api/courses/enroll',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(payload)
  }
};

const req = http.request(options, res => {
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', () => {
    console.log('STATUS', res.statusCode);
    console.log('BODY', body);
  });
});
req.on('error', e => console.error('Request error', e));
req.write(payload);
req.end();
