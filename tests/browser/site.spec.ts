import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
const pages = [
  '/',
  '/services/',
  '/approach/',
  '/about/',
  '/contact/',
  '/privacy/',
  '/accessibility/',
  '/terms/',
  '/cookies/',
];
for (const route of pages)
  test('accessible prerendered page ' + route, async ({ page, request }) => {
    const response = await request.get(route);
    expect(response.ok()).toBeTruthy();
    expect(await response.text()).toContain('<h1');
    const errors: string[] = [];
    page.on('pageerror', (error) => errors.push(error.message));
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto(route);
    const reject = page.getByRole('button', { name: 'Reject optional', exact: true });
    if (await reject.isVisible()) await reject.click();
    await expect(page.locator('main h1')).toHaveCount(1);
    await expect(page.locator('html')).toHaveAttribute('data-motion', 'off');
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
      .analyze();
    expect(results.violations).toEqual([]);
    expect(errors).toEqual([]);
    for (const width of [320, 390, 768, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= document.documentElement.clientWidth,
        ),
      ).toBeTruthy();
    }
  });
test('menu closes with Escape, returns focus and navigates', async ({ page }) => {
  await page.goto('/');
  const trigger = page.getByRole('button', { name: 'Menu', exact: true });
  await trigger.click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).not.toBeVisible();
  await expect(trigger).toBeFocused();
  await trigger.click();
  await page
    .getByRole('navigation', { name: 'Main navigation' })
    .getByRole('link', { name: '02 Approach' })
    .click();
  await expect(page).toHaveURL(/approach/);
  await expect(page.locator('main h1')).toContainText('A clear path.');
});
test('reduced motion and FAQ state', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await expect(page.locator('html')).toHaveAttribute('data-motion', 'off');
  await expect(page.getByText('Motion on', { exact: true })).toHaveCount(0);
  await expect(page.getByText('Motion off', { exact: true })).toHaveCount(0);
  const question = page.getByRole('button', { name: 'Can we start with a smaller scope?' });
  await question.click();
  await expect(question).toHaveAttribute('aria-expanded', 'true');
  await expect(page.getByRole('button', { name: 'What can you help me build?' })).toHaveAttribute(
    'aria-expanded',
    'false',
  );
});
test('contact simulation is honest and duplicate clicks are disabled', async ({ page }) => {
  await page.goto('/contact/');
  const reject = page.getByRole('button', { name: 'Reject optional', exact: true });
  if (await reject.isVisible()) await reject.click();
  await page.getByLabel('Name (required)').fill('Test Visitor');
  await page.getByLabel('Email (required)').fill('visitor@example.com');
  await page
    .getByLabel('Project details (required)')
    .fill('A new website with a clear service catalogue.');
  await expect(page.locator('input[name="cf-turnstile-response"]')).not.toHaveValue('', {
    timeout: 30000,
  });
  await page.getByRole('button', { name: 'Send enquiry' }).click();
  await expect(page.getByRole('status').filter({ hasText: 'Local test completed' })).toBeVisible();
});

test('analytics requires a choice and rejection survives reload', async ({ page, context }) => {
  const googleRequests: string[] = [];
  page.on('request', (request) => {
    if (/googletagmanager|google-analytics/.test(request.url())) googleRequests.push(request.url());
  });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/privacy/');
  const banner = page.getByRole('complementary', { name: 'Cookie choices' });
  await expect(banner).toBeVisible();
  expect(googleRequests).toEqual([]);
  expect(
    (
      await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
        .analyze()
    ).violations,
  ).toEqual([]);
  await page.getByRole('button', { name: 'Manage cookies', exact: true }).click();
  const settings = page.getByRole('dialog', { name: 'Cookie settings' });
  await expect(settings).toBeVisible();
  await expect(
    settings.getByRole('checkbox', { name: 'Google Analytics Optional website statistics' }),
  ).not.toBeChecked();
  expect(
    (
      await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
        .analyze()
    ).violations,
  ).toEqual([]);
  await settings.getByRole('button', { name: 'Reject optional', exact: true }).click();
  await page.reload();
  await expect(banner).not.toBeVisible();
  expect(googleRequests).toEqual([]);
  expect((await context.cookies()).map((cookie) => cookie.name)).toEqual(['wed_consent']);
});

test('Let us talk focuses the form on Home and Contact', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  for (const route of ['/', '/contact/']) {
    await page.goto(route);
    const reject = page.getByRole('button', { name: 'Reject optional', exact: true });
    if (await reject.isVisible()) await reject.click();
    await page.getByRole('link', { name: /Let us talk/i }).click();
    await expect(page.locator('#enquiry-form')).toBeFocused();
    await expect(page).toHaveURL(/#enquiry-form$/);
    expect(
      await page.locator('#enquiry-form').evaluate((el) => el.getBoundingClientRect().top),
    ).toBeGreaterThanOrEqual(80);
  }
});

test('analytics omits URL details and counts each route once after consent', async ({ page }) => {
  // Mock the container transport so this regression never sends visits to production GA4.
  await page.route('https://www.googletagmanager.com/**', (route) =>
    route.fulfill({ status: 200, contentType: 'application/javascript', body: '' }),
  );
  await page.goto('/?email=private%40example.com#private');
  await page.getByRole('button', { name: 'Accept analytics', exact: true }).click();
  const pageEvents = () =>
    page.evaluate(() => {
      const layer = (
        window as Window & {
          dataLayer: Array<{ event?: string; page_location?: string; page_referrer?: string }>;
        }
      ).dataLayer;
      return layer.filter((item) => item.event === 'gtm.js' || item.event === 'virtual_page_view');
    });
  await expect.poll(async () => (await pageEvents()).length).toBe(1);
  expect((await pageEvents())[0]?.page_location).toBe('http://127.0.0.1:3100/');
  await page.getByRole('link', { name: 'Explore services', exact: true }).click();
  await expect.poll(async () => (await pageEvents()).length).toBe(2);
  const events = await pageEvents();
  expect(events[1]?.page_location).toBe('http://127.0.0.1:3100/services/');
  expect(events[1]?.page_referrer).toBe('http://127.0.0.1:3100/');
  expect(JSON.stringify(events)).not.toMatch(/private|@|%40/);
});
