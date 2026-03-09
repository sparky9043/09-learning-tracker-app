import { test, expect } from '@playwright/test';

const home_url = 'http://localhost:5173';

test.describe('Get LOGIN Page', () => {
  test.beforeEach(async ({ page }) =>  {
    await page.goto(home_url);
  });

  test('has title', async ({ page }) => {
    // await page.goto(home_url);
  
    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/client/);
  });
  
  test('login link displays login page', async ({ page }) => {
    // await page.goto(home_url);
  
    await page.getByRole('link', { name: 'Login' }).click();
  
    await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
  });
  
  // Login using username and password
  test('login with username and password', async ({ page }) => {
    await page.getByRole('link', { name: 'Login' }).click();
  
    await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
    
    await page.goto(`${home_url}/login`);
  
    await page.getByLabel('Username').fill('default');
    await page.getByLabel('Password').fill('password123');
  
    await page.getByRole('button', { name: 'Login' }).click();
  
    await expect(page.getByRole('heading', { name: /Welcome/ })).toBeVisible();
  });
});