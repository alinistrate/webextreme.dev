import fs from 'node:fs/promises';
import { chromium } from '@playwright/test';
import lighthouse from 'lighthouse';
import desktopConfig from 'lighthouse/core/config/desktop-config.js';

const base = process.env.AUDIT_BASE_URL || 'http://127.0.0.1:3100';
const routes = process.argv.slice(2);
const targets = routes.length ? routes : ['/', '/services/', '/approach/', '/about/', '/contact/'];
await fs.mkdir('reports', { recursive: true });
const browser = await chromium.launch({ args: ['--remote-debugging-port=9227'] });
const summary = [];
try {
  for (const route of targets) {
    for (const device of ['mobile', 'desktop']) {
      const report = await lighthouse(
        base + route,
        {
          port: 9227,
          output: 'json',
          logLevel: 'error',
          onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
        },
        device === 'desktop' ? desktopConfig : undefined,
      );
      const name = route === '/' ? 'home' : route.replaceAll('/', '');
      await fs.writeFile('reports/lighthouse-' + name + '-' + device + '.json', report.report);
      const row = {
        route,
        device,
        scores: Object.fromEntries(
          Object.entries(report.lhr.categories).map(([key, value]) => [
            key,
            Math.round(value.score * 100),
          ]),
        ),
        lcp: report.lhr.audits['largest-contentful-paint'].numericValue,
        cls: report.lhr.audits['cumulative-layout-shift'].numericValue,
        tbt: report.lhr.audits['total-blocking-time'].numericValue,
        failed: Object.entries(report.lhr.audits)
          .filter(([, value]) => value.score !== null && value.score < 1)
          .map(([id, value]) => ({
            id,
            score: value.score,
            title: value.title,
            displayValue: value.displayValue,
          })),
      };
      summary.push(row);
      console.log(JSON.stringify(row));
      await fs.writeFile('reports/lighthouse-summary.json', JSON.stringify(summary, null, 2));
    }
  }
} finally {
  await browser.close();
}
