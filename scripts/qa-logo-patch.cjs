const { chromium } = require('C:/chari-dungeon-release-final/node_modules/playwright');
const fs = require('node:fs');
(async () => {
  fs.mkdirSync('outputs/logo-patch-20261012', { recursive: true });
  const browser = await chromium.launch({ headless: true, channel: 'chrome' });
  for (const width of [1440, 390, 360]) {
    const page = await browser.newPage({ viewport: { width, height: 900 } });
    for (const name of ['index', 'patch-notes', 'game', 'events']) {
      await page.goto(`http://127.0.0.1:4177/${name}.html`);
      await page.locator('.brand img').first().waitFor();
      const state = await page.evaluate(() => ({
        overflow: document.documentElement.scrollWidth > innerWidth,
        logo: [...document.querySelectorAll('.brand img')].every(i => i.complete && i.naturalWidth === 2172),
        dates: [...document.querySelectorAll('.patch-nav a[aria-current]')].map(a => a.hash),
      }));
      if (state.overflow || !state.logo || (name === 'patch-notes' && state.dates[0] !== '#2026-10-12')) throw new Error(JSON.stringify({ width, name, state }));
      if (name === 'index' || name === 'patch-notes') await page.screenshot({ path: `outputs/logo-patch-20261012/${name}-${width}.png` });
    }
    await page.close();
  }
  await browser.close();
  console.log('OK: four pages at 1440/390/360px; logos, overflow and latest date checked.');
})().catch(e => { console.error(e); process.exit(1); });
