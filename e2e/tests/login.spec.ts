import { test, expect } from '@playwright/test';

const home_url = 'http://localhost:5173'

test('has title', async ({ page }) => {
  await page.goto(home_url);

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/client/);
});

test('login link displays login page', async ({ page }) => {
  await page.goto(home_url);

  await page.getByRole('link', { name: 'Login' }).click();

  await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
});

// test('get started link', async ({ page }) => {
//   await page.goto('https://playwright.dev/');

//   // Click the get started link.
//   await page.getByRole('link', { name: 'Get started' }).click();

//   // Expects page to have a heading with the name of Installation.
//   await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
// });
