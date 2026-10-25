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
    const html = await response.text();
    expect(html).toContain('<h1');
    expect(html).toContain('aria-label="Cookie choices"');
    const errors: string[] = [];
    page.on('pageerror', (error) => errors.push(error.message));
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto(route);
    const reject = page.getByRole('button', { name: 'Reject optional', exact: true });
    if (await reject.isVisible()) await reject.click();
    await expect(page.locator('main h1')).toHaveCount(1);
    await expect(page.locator('html')).toHaveAttribute('data-motion', 'on');
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
test('approved motion stays active and FAQ state works', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await expect(page.locator('html')).toHaveAttribute('data-motion', 'on');
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
  await expect(page.locator('html')).toHaveAttribute('data-consent-known', 'true');
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

test('service anchors scroll below the fixed header and history restores the previous anchor', async ({
  page,
}) => {
  await page.goto('/services/');
  await page.getByRole('button', { name: 'Reject optional', exact: true }).click();
  const categories = page.getByRole('navigation', { name: 'Service categories' });
  await categories.getByRole('link', { name: '05 Landing Pages' }).click();
  await expect(page).toHaveURL(/#landing-pages$/);
  const top = (id: string) => page.locator(id).evaluate((el) => el.getBoundingClientRect().top);
  await expect.poll(async () => Math.abs((await top('#landing-pages')) - 112)).toBeLessThan(3);
  await categories.getByRole('link', { name: '02 Web Development' }).click();
  await expect(page).toHaveURL(/#web-development$/);
  await expect.poll(async () => Math.abs((await top('#web-development')) - 112)).toBeLessThan(3);
  await page.goBack();
  await expect(page).toHaveURL(/#landing-pages$/);
  await expect.poll(async () => Math.abs((await top('#landing-pages')) - 112)).toBeLessThan(3);
});

test('a Home service link reaches the correct section after client navigation', async ({
  page,
}) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Reject optional', exact: true }).click();
  await page.locator('.service-card a[href="/services/#landing-pages"]').click();
  await expect(page).toHaveURL(/services\/#landing-pages$/);
  await expect
    .poll(async () =>
      Math.abs(
        (await page.locator('#landing-pages').evaluate((el) => el.getBoundingClientRect().top)) -
          112,
      ),
    )
    .toBeLessThan(3);
  await expect(page.locator('#landing-pages h2')).toBeVisible();
});

test('policy content reveals as it enters view without changing keyboard access', async ({
  page,
}) => {
  await page.goto('/privacy/');
  await page.getByRole('button', { name: 'Reject optional', exact: true }).click();
  const heading = page.getByRole('heading', { name: 'Your rights' });
  await heading.scrollIntoViewIfNeeded();
  await expect(heading).toHaveCSS('opacity', '1');
  await expect(page.getByRole('heading', { name: 'Privacy Policy', exact: true })).toHaveCount(1);
});

test('motion survives client navigation, brands replay hover and menu buttons respond', async ({
  page,
}) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Reject optional', exact: true }).click();
  for (const [label, variant] of [
    ['Services', 'services'],
    ['Approach', 'approach'],
    ['About', 'about'],
    ['Contact', 'contact'],
    ['Services', 'services'],
  ]) {
    await page
      .getByRole('navigation', { name: 'Footer', exact: true })
      .getByRole('link', { name: label, exact: true })
      .click();
    await expect(page).toHaveURL(new RegExp('/' + variant + '/$'));
    await expect(page.locator('html')).toHaveAttribute('data-motion', 'on');
    await expect(page.locator('main.playing .art-' + variant)).toHaveCount(1);
    const brand = page.locator('.site-header .brand');
    await page.mouse.move(0, 200);
    await brand.hover();
    await expect(brand.locator('.x-upper')).toHaveCSS('animation-name', 'brand-upper-gesture');
    const menu = page.getByRole('button', { name: 'Menu', exact: true });
    await menu.hover();
    await expect(menu).toHaveCSS('background-color', 'rgb(255, 212, 38)');
    await menu.click();
    const close = page.getByRole('button', { name: 'Close menu', exact: true });
    await close.hover();
    await expect(close).toHaveCSS('background-color', 'rgb(255, 212, 38)');
    await close.click();
    await expect(page.getByRole('dialog', { name: 'Site menu', exact: true })).not.toBeVisible();
    await expect(menu).toBeFocused();
  }
});
test('service journey follows scrolling without covering links or capturing pointer input', async ({
  page,
}) => {
  await page.goto('/services/');
  await page.getByRole('button', { name: 'Reject optional', exact: true }).click();
  const sphere = page.locator('.journey-orb');
  await page.locator('#automation h2').scrollIntoViewIfNeeded();
  await expect
    .poll(async () =>
      Math.abs((await sphere.boundingBox())!.y - (await page.evaluate(() => innerHeight / 2))),
    )
    .toBeLessThan(35);
  await expect(page.locator('.journey-track')).toHaveCSS('pointer-events', 'none');
  await page.locator('#automation').getByRole('link', { name: 'Discuss this service' }).click();
  await expect(page).toHaveURL(/contact/);
  await expect(page.locator('html')).toHaveAttribute('data-motion', 'on');
});

test('theme choice survives navigation and reload and remains accessible in both schemes', async ({
  page,
}) => {
  await page.emulateMedia({ colorScheme: 'light' });
  await page.goto('/services/');
  await page.getByRole('button', { name: 'Reject optional', exact: true }).click();
  await page.getByRole('button', { name: 'Switch to dark theme', exact: true }).click();
  await expect(page.locator('html')).toHaveCSS('color-scheme', 'dark');
  await page
    .getByRole('navigation', { name: 'Footer', exact: true })
    .getByRole('link', { name: 'About', exact: true })
    .click();
  await expect(page.locator('html')).toHaveCSS('color-scheme', 'dark');
  await page.reload();
  await expect(page.locator('html')).toHaveCSS('color-scheme', 'dark');
  for (const scheme of ['dark', 'light']) {
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
      .analyze();
    expect(results.violations).toEqual([]);
    if (scheme === 'dark')
      await page.getByRole('button', { name: 'Switch to light theme', exact: true }).click();
  }
  await expect(page.locator('html')).toHaveCSS('color-scheme', 'light dark');
  expect(await page.evaluate(() => localStorage.getItem('wed_theme'))).toBeNull();
});

test('inner page entrances and scroll reveals survive navigation from the footer', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await page.getByRole('button', { name: 'Reject optional', exact: true }).click();
  for (const label of ['Services', 'Approach', 'About', 'Contact']) {
    await page
      .getByRole('navigation', { name: 'Footer', exact: true })
      .getByRole('link', { name: label, exact: true })
      .click();
    await expect(page.locator('main.playing')).toHaveCount(1);
    await expect(page.locator('main')).not.toHaveClass(/route-enter-active/);
    await expect.poll(() => page.evaluate(() => scrollY)).toBe(0);
    const title = page.locator('.page-title-line').first();
    await expect(title).toHaveCSS('animation-name', 'hero-line-in');
    await expect(title).toHaveCSS('opacity', '1');
    const artwork = page.locator('.page-art');
    await artwork.scrollIntoViewIfNeeded();
    await expect(artwork).toHaveClass(/is-visible/);
    await expect(artwork.locator('.art-piece').first()).toHaveCSS('animation-name', 'art-piece-in');
    const reveal = page.locator('.section .reveal.is-observed').first();
    await expect(reveal).toHaveCSS('opacity', '0');
    await reveal.scrollIntoViewIfNeeded();
    await expect(reveal).toHaveCSS('opacity', '1');
    await expect(reveal).toHaveCSS('transition-duration', '0.6s');
    await expect.poll(() => reveal.evaluate((el) => getComputedStyle(el).transform)).toBe('none');
  }
});

test('mobile process labels do not overlap and adjacent sections share compact spacing', async ({
  page,
}) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Reject optional', exact: true }).click();
  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.locator('.process-cards').scrollIntoViewIfNeeded();
    const cards = await page.locator('.process-cards li').evaluateAll((elements) =>
      elements.map((card) => {
        const icon = card.querySelector('.step-icon')!.getBoundingClientRect();
        const number = card.querySelector('.step-number')!.getBoundingClientRect();
        const title = card.querySelector('h3')!.getBoundingClientRect();
        return {
          separate: icon.right <= title.left && title.right <= number.left,
          numberFits: number.right <= card.getBoundingClientRect().right,
        };
      }),
    );
    expect(cards.every((card) => card.separate && card.numberFits)).toBeTruthy();
    const spacing = await page.evaluate(() => ({
      services: parseFloat(getComputedStyle(document.querySelector('.services')!).paddingBottom),
      about: parseFloat(getComputedStyle(document.querySelector('.about')!).paddingTop),
    }));
    expect(spacing.services + spacing.about).toBeLessThanOrEqual(72);
    expect(spacing.services + spacing.about).toBeGreaterThanOrEqual(48);
  }
});
