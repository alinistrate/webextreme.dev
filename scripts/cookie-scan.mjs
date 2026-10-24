import fs from 'node:fs/promises';
import { chromium } from '@playwright/test';

const base = process.env.AUDIT_BASE_URL || 'http://127.0.0.1:3100';
const browser = await chromium.launch();
const report = { base, scannedAt: new Date().toISOString(), scenarios: [] };
const isGoogle = (url) => /google-analytics\.com|googletagmanager\.com/.test(url);
async function snapshot(context, page, label, requests) {
  const cookies = (await context.cookies()).map(
    ({ name, domain, path, expires, secure, httpOnly, sameSite }) => ({
      name,
      domain,
      path,
      expires,
      secure,
      httpOnly,
      sameSite,
    }),
  );
  const storage = await page.evaluate(() => ({
    localStorageKeys: Object.keys(localStorage),
    sessionStorageKeys: Object.keys(sessionStorage),
  }));
  return {
    label,
    cookies,
    ...storage,
    googleRequests: requests.filter(isGoogle).map((url) => {
      const parsed = new URL(url);
      return {
        host: parsed.host,
        path: parsed.pathname,
        event: parsed.searchParams.get('en'),
        measurementId: parsed.searchParams.get('tid'),
      };
    }),
  };
}
try {
  for (const choice of ['no-choice', 'reject', 'accept-then-withdraw']) {
    const context = await browser.newContext({ reducedMotion: 'reduce' });
    const page = await context.newPage();
    const requests = [];
    page.on('request', (request) => requests.push(request.url()));
    await page.goto(base + '/privacy/');
    await page.getByRole('complementary', { name: 'Cookie choices' }).waitFor();
    if (choice === 'reject') {
      await page.getByRole('button', { name: 'Reject optional', exact: true }).click();
      await page.reload();
    }
    if (choice === 'accept-then-withdraw') {
      const tagRequest = page.waitForRequest((request) =>
        /googletagmanager\.com\/gtm\.js/.test(request.url()),
      );
      await page.getByRole('button', { name: 'Accept analytics', exact: true }).click();
      await tagRequest;
      await page.waitForLoadState('networkidle');
      report.scenarios.push(await snapshot(context, page, 'accepted', requests));
      requests.length = 0;
      await page.getByRole('button', { name: 'Cookie settings', exact: true }).click();
      const reload = page.waitForEvent('domcontentloaded');
      await page
        .getByRole('dialog', { name: 'Cookie settings' })
        .getByRole('button', { name: 'Reject optional', exact: true })
        .click();
      await reload;
      await page.waitForLoadState('networkidle');
      report.scenarios.push(await snapshot(context, page, 'withdrawn', requests));
    } else {
      await page.waitForLoadState('networkidle');
      report.scenarios.push(await snapshot(context, page, choice, requests));
    }
    await context.close();
  }
  await fs.mkdir('reports', { recursive: true });
  await fs.writeFile('reports/cookie-scan.json', JSON.stringify(report, null, 2));
  console.log(JSON.stringify(report, null, 2));
  const invalid = report.scenarios.filter(
    (scenario) =>
      ['no-choice', 'reject'].includes(scenario.label) &&
      (scenario.googleRequests.length ||
        scenario.cookies.some((cookie) => /^_ga|^_gid|^_gat/.test(cookie.name))),
  );
  if (invalid.length) throw new Error('Optional tracking occurred before consent.');
  const withdrawn = report.scenarios.find((scenario) => scenario.label === 'withdrawn');
  if (withdrawn.cookies.some((cookie) => /^_ga|^_gid|^_gat/.test(cookie.name)))
    throw new Error('Analytics cookies remained after withdrawal.');
} finally {
  await browser.close();
}
