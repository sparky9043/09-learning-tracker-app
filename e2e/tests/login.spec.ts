import { test, expect } from '@playwright/test';
import test_helper from './test_helper';

const home_url = 'http://localhost:5173';

// Get the Homepage and Login and then logout
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
  
    await page.getByLabel('Username').fill(test_helper.defaultUsername.name);
    await page.getByLabel('Password').fill(test_helper.defaultUsername.password);
  
    await page.getByRole('button', { name: 'Login' }).click();
  
    await expect(page.getByRole('heading', { name: /Welcome/ })).toBeVisible();
  });

  test('login failed', async ({ page }) => {
    await page.getByRole('link', { name: 'Login' }).click();
  
    await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();

    await page.getByLabel('Username').fill('badusername')
    await page.getByLabel('Password').fill('badpassword123')

    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page.getByText(/failed/)).toBeVisible();
  });
  
  test('logout', async ({ page }) => {
    await page.getByRole('link', { name: 'Login' }).click();
  
    await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
    
    await page.goto(`${home_url}/login`);
  
    await page.getByLabel('Username').fill(test_helper.defaultUsername.name);
    await page.getByLabel('Password').fill(test_helper.defaultUsername.password);
  
    await page.getByRole('button', { name: 'Login' }).click();
  
    await expect(page.getByRole('heading', { name: /Welcome/ })).toBeVisible();

    await (page.getByRole('button', { name: 'Log Out'})).click();

    await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
  })
});

// After Logging In
test.describe('Dashboard Actions', () =>  {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${home_url}/login`)
    await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
    
    await page.getByLabel('Username').fill('default')
    await page.getByLabel('Password').fill('password123')
    
    await (page.getByRole('button', { name: 'Login' })).click();

    await (expect(page.getByRole('button', { name: 'add entry' }))).toBeVisible();
  });

  test('clicking add entry button shows modal', async ({ page }) => {
    await (page.getByRole('button', { name: 'add entry' })).click();

    await expect(page.getByRole('button', { name: 'create entry' })).toBeVisible();
  });

  test('creating entry shows added entry', async ({ page }) => {
    await (page.getByRole('button', { name: 'add entry' })).click();

    await expect(page.getByRole('button', { name: 'create entry' })).toBeVisible();
    
    await page.getByLabel('topic').fill(test_helper.testEntry.topic);
    await page.getByLabel('note').fill(test_helper.testEntry.note);
    await page.getByLabel('difficulty').fill(test_helper.testEntry.difficulty);
    await page.getByLabel(/minutes spent/).fill(test_helper.testEntry.time_spent);

    await (page.getByRole('button', { name: 'create entry' })).click();

    await expect(page.getByText(/E2E Testing with Playwright/)).toBeVisible();
  });

  // Run this test RIGHT AFTER the previous one
  test('clicking delete entry removes entry from dashboard', async ({ page }) => {
    await page.reload();

    await expect(page.getByText(/E2E Testing with Playwright/)).toBeVisible();

    await (page.getByRole('button', { name: /delete entry/ }).first()).click();

    // Check to see if something exists. If count === 0, then it's gone
    await expect(page.getByText(/E2E Testing with Playwright/)).toHaveCount(0);
  });
});