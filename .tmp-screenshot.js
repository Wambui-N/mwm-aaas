const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ channel: 'chromium', args: ['--no-sandbox'] });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const errors = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(msg.text());
  });
  page.on('pageerror', (err) => errors.push(String(err)));

  await page.goto('http://localhost:3000/', { waitUntil: 'load', timeout: 30000 });
  await page.waitForTimeout(3000);
  await page.screenshot({ path: 'C:/Users/wambu/AppData/Local/Temp/claude/c--Users-wambu-OneDrive-Documents-Websites-mwm-aaas/c64e6cd1-0cbf-43fa-a20b-ed9c70f1a466/scratchpad/hero.png' });

  console.log('TITLE:', await page.title());
  console.log('BODY_SNIPPET:', (await page.textContent('body') || '').slice(0, 300));
  console.log('ERRORS:', JSON.stringify(errors, null, 2));
  await browser.close();
})().catch((e) => {
  console.error('SCRIPT_FAILED', e);
  process.exit(1);
});
