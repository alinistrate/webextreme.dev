import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
import { chromium } from '@playwright/test';

// A real consented test visit sends page views, never a contact/lead event.
const base = process.env.AUDIT_BASE_URL || 'http://127.0.0.1:3100';
const browser = await chromium.launch();
const report = { base, checkedAt: new Date().toISOString(), assets: [], consent: [] };
try {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  const measurement = [];
  page.on('response', (response) => {
    const url = new URL(response.url());
    if (/google-analytics\.com$/.test(url.hostname) && /collect/.test(url.pathname))
      measurement.push({
        status: response.status(),
        measurementId: url.searchParams.get('tid'),
        event: url.searchParams.get('en'),
      });
  });
  const trackers = [];
  page.on('request', (request) => {
    if (/googletagmanager\.com|google-analytics\.com/.test(new URL(request.url()).hostname))
      trackers.push(request.url());
  });
  await page.goto(base + '/');
  await page.getByRole('button', { name: 'Reject optional', exact: true }).waitFor();
  await page.waitForTimeout(1200);
  assert.equal(trackers.length, 0, 'No Google requests before a choice');
  assert.equal((await context.cookies()).filter((c) => /^_ga/.test(c.name)).length, 0);
  report.consent.push({ state: 'before choice', googleRequests: 0, analyticsCookies: [] });
  const icons = await page
    .locator('link[rel="icon"]')
    .evaluateAll((nodes) =>
      nodes.map((n) => ({ href: n.getAttribute('href'), type: n.getAttribute('type') })),
    );
  for (const icon of icons) {
    const response = await context.request.get(new URL(icon.href, base).href, {
      headers: { 'User-Agent': 'Googlebot-Image/1.0' },
    });
    assert.equal(response.status(), 200);
    const bytes = await response.body();
    const size =
      icon.type === 'image/png' ? [bytes.readUInt32BE(16), bytes.readUInt32BE(20)] : null;
    report.assets.push({
      ...icon,
      status: response.status(),
      size,
      robots: response.headers()['x-robots-tag'] || null,
    });
  }
  assert(report.assets.some((a) => a.href === '/favicon.ico'));
  assert(report.assets.some((a) => a.size?.[0] === 96 && a.size?.[1] === 96));
  assert.equal(
    await page.locator('meta[name="msvalidate.01"]').getAttribute('content'),
    'BB3C21665F862E3AB6CD10E41D29D1AB',
  );
  for (const route of ['/robots.txt', '/sitemap.xml', '/cookies/', '/privacy/'])
    assert.equal((await context.request.get(base + route)).status(), 200);
  await page.getByRole('button', { name: 'Reject optional', exact: true }).click();
  await page.reload();
  await page.waitForTimeout(1200);
  assert.equal(trackers.length, 0, 'Reject survives reload without tracking');
  report.consent.push({ state: 'rejected and reloaded', googleRequests: 0 });
  await page.getByRole('button', { name: 'Cookie settings', exact: true }).click();
  await page.getByRole('checkbox', { name: /Google Analytics/ }).check();
  await page.getByRole('button', { name: 'Save preferences', exact: true }).click();
  await page.waitForFunction(() => document.cookie.includes('_ga='), { timeout: 20000 });
  for (let attempt = 0; attempt < 12 && !measurement.length; attempt++)
    await page.waitForTimeout(1000);
  assert(
    measurement.some(
      (m) => m.status >= 200 && m.status < 300 && m.measurementId === 'G-S462Q33299',
    ),
    'GA4 must acknowledge a request to the configured property',
  );
  report.consent.push({
    state: 'accepted',
    analyticsCookies: (await context.cookies())
      .filter((c) => /^_ga/.test(c.name))
      .map((c) => c.name),
    acknowledgedMeasurement: measurement,
  });
  await page.getByRole('button', { name: 'Cookie settings', exact: true }).click();
  await Promise.all([
    page.waitForEvent('load'),
    page.getByRole('dialog').getByRole('button', { name: 'Reject optional', exact: true }).click(),
  ]);
  const countAfterReload = trackers.length;
  await page.waitForTimeout(1500);
  assert.equal(trackers.length, countAfterReload, 'No tracking after withdrawal and reload');
  assert.equal((await context.cookies()).filter((c) => /^_ga/.test(c.name)).length, 0);
  report.consent.push({ state: 'withdrawn', analyticsCookies: [], newGoogleRequests: 0 });
  report.passed = true;
} finally {
  await browser.close();
  await fs.mkdir('reports', { recursive: true });
  await fs.writeFile('reports/discovery-consent-audit.json', JSON.stringify(report, null, 2));
  console.log(JSON.stringify(report, null, 2));
}
