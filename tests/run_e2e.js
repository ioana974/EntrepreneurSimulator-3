const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  try {
    // assume server running on localhost:5000
    await page.goto('http://localhost:5000/game.html');

    // Fill player name and start
    await page.fill('input[placeholder="Nume"]', 'E2E Test');
    await page.click('button:has-text("Începe jocul")');

    // Wait for in-game UI
    await page.waitForSelector('text=Decizie', { timeout: 5000 });

    // Click the first choice a few times to trigger finalize via button
    for (let i=0;i<2;i++){
      const button = await page.$('button.btn-secondary');
      if(button) await button.click();
      await page.waitForTimeout(200);
    }

    // Click Termină joc (raport)
    await page.click('button:has-text("Termină joc (raport)")');

    // Wait for final modal
    await page.waitForSelector('text=Rezultate finale', { timeout: 5000 });

    console.log('E2E: final modal shown');

    // Go to leaderboard page
    await page.goto('http://localhost:5000/leaderboard.html');
    await page.waitForSelector('.entry, p, text=Top', { timeout: 5000 });
    console.log('E2E: leaderboard loaded');

  } catch (err) {
    console.error('E2E failed', err);
    process.exitCode = 2;
  } finally {
    await browser.close();
  }
})();