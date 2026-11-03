import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('Romanian pages expose localized navigation, metadata and readable static HTML', async ({
  page,
  request,
}) => {
  const response = await request.get('/ro/services/');
  const html = await response.text();
  expect(html).toContain('Găzduire web personalizată');
  expect(html).toContain('lang="ro"');
  await page.goto('/ro/services/');
  await page.getByRole('button', { name: 'Refuză opționalele', exact: true }).click();
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    'href',
    'https://webextreme.dev/ro/services/',
  );
  await expect(page.locator('link[hreflang="en"]')).toHaveAttribute(
    'href',
    'https://webextreme.dev/services/',
  );
  expect(
    (
      await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
        .analyze()
    ).violations,
  ).toEqual([]);
  for (const width of [320, 390, 540, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    expect(
      await page
        .locator('.site-header .header-symbol')
        .evaluate((el) => el.getBoundingClientRect().width),
    ).toBeGreaterThan(24);
    for (const control of await page.locator('.header-inner > a, .header-inner > button').all()) {
      const box = (await control.boundingBox())!;
      expect(box.x).toBeGreaterThanOrEqual(0);
      expect(box.x + box.width).toBeLessThanOrEqual(width);
    }
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
    ).toBeTruthy();
  }
});

test('language switching keeps the page and anchor and remembers the manual choice', async ({
  page,
  context,
}) => {
  await page.goto('/ro/services/#hosting');
  await page.getByRole('button', { name: 'Refuză opționalele', exact: true }).click();
  await page.getByRole('link', { name: 'EN: Schimbă limba în engleză', exact: true }).click();
  await expect(page).toHaveURL(/(?<!ro)\/services\/#hosting$/);
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  expect((await context.cookies()).find((c) => c.name === 'wed_locale')?.value).toBe('en');
  await page.goto('/');
  await expect(page).toHaveURL('http://127.0.0.1:3100/');
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await page.getByRole('link', { name: 'RO: Switch to Romanian', exact: true }).click();
  await expect(page).toHaveURL('http://127.0.0.1:3100/ro/');
  await expect(page.locator('html')).toHaveAttribute('lang', 'ro');
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('lang', 'ro');
});

test('Romanian hosting enquiry keeps the canonical service value and accessible form focus', async ({
  page,
}) => {
  await page.goto('/ro/services/#hosting');
  await page.getByRole('button', { name: 'Refuză opționalele', exact: true }).click();
  await page
    .locator('#hosting')
    .getByRole('link', { name: 'Discută despre acest serviciu', exact: true })
    .click();
  await expect(page).toHaveURL(/\/ro\/contact\//);
  await expect(page.getByLabel('Serviciu (opțional)')).toHaveValue('Custom Web Hosting');
  await page.getByRole('link', { name: 'Contactează-ne', exact: true }).first().click();
  await expect(page.locator('#enquiry-form')).toBeFocused();
  await expect(page).toHaveURL(/#enquiry-form$/);
});
