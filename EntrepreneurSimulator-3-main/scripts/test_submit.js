const fetch = require('node-fetch');

async function testSubmit(){
  const payload = {
    playerName: 'Test User',
    playerEmail: 'test@example.com',
    scenarioId: 'test-scenario',
    state: { budget: 12345, reputation: 60, employees: 5, year: 1, month: 1 }
  };

  try{
    const r = await fetch('http://localhost:5000/api/game/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const data = await r.json();
    console.log('Submit response:', data);
  }catch(err){
    console.error('Submit failed:', err.message || err);
  }
}

if(require.main === module) testSubmit();

module.exports = testSubmit;