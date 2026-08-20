import { chromium } from 'playwright';
const browser = await chromium.launch({ args: ['--no-sandbox'] });
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
const errors = [];
page.on('pageerror', e => errors.push(String(e)));
page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });

await page.goto('http://127.0.0.1:8080/', { waitUntil: 'networkidle' });
await page.waitForTimeout(800);
await page.screenshot({ path: '/workspace/screenshots/landing-desktop-full.png', fullPage: true });

await page.getByRole('button', { name: 'Next' }).click().catch(()=>{});
await page.waitForTimeout(500);
await page.screenshot({ path: '/workspace/screenshots/landing-slide2.png' });

await page.goto('http://127.0.0.1:8080/declare/arrive', { waitUntil: 'networkidle' });
await page.waitForTimeout(400);
const body = await page.innerText('body');
await page.screenshot({ path: '/workspace/screenshots/arrive.png', fullPage: true });

const checks = {
  daysOutside: body.includes('Days outside Kuwait'),
  address: body.includes('Permanent Address while outside Kuwait'),
  comingFromGone: !body.includes('Country/region you are coming from'),
  ugandaLabelGone: !/Days in Uganda|Address while in Uganda|into Uganda|to Uganda/.test(body),
  civilId: body.includes('Civil ID number'),
  passport: body.includes('Passport number'),
  phoneKw: body.includes('Phone number while in Kuwait'),
  malaria: body.includes('Malaria questionnaire'),
  typhoid: body.includes('Typhoid questionnaire'),
  personal: /Personal [Ll]ife/.test(body),
  std: body.includes('STDs and UTIs') || body.includes('unusual discharge'),
  recentContact: body.includes('Recent contact'),
  kuwaitPort: body.includes('Port of entry into Kuwait'),
};
console.log(JSON.stringify({ checks, errors, sample: body.slice(0, 400) }, null, 2));

await page.setViewportSize({ width: 390, height: 844 });
await page.goto('http://127.0.0.1:8080/', { waitUntil: 'networkidle' });
await page.waitForTimeout(500);
await page.screenshot({ path: '/workspace/screenshots/landing-mobile.png' });

await page.goto('http://127.0.0.1:8080/declare/arrive', { waitUntil: 'networkidle' });
await page.waitForTimeout(400);
await page.screenshot({ path: '/workspace/screenshots/arrive-mobile.png', fullPage: true });

await browser.close();
