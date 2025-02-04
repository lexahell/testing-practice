import { test, expect } from '@playwright/test';

test.describe('Authorization Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/testing-practice');
  });

  test('should successfully authorize and logout', async ({ page }) => {
    await page.getByRole('button', { name: 'Авторизоваться' }).click();

    await expect(page.locator('[data-testid="modal-overlay"]')).toBeVisible();

    await page.locator('[data-testid="login-email"]').fill('tester@gmail.com');

    await page.locator('[data-testid="login-password"]').fill('12345678');

    await page.locator('[data-testid="login-submit"]').click();

    await expect(page.locator('[data-testid="modal-overlay"]')).toBeHidden();

    await expect(page.locator('text=Вы авторизованы')).toBeVisible();

    await page.getByRole('button', { name: 'Выйти' }).click();

    await expect(
      page.getByRole('button', { name: 'Авторизоваться' })
    ).toBeVisible();
  });

  test('should show error on invalid login', async ({ page }) => {
    await page.getByRole('button', { name: 'Авторизоваться' }).click();

    await expect(page.locator('[data-testid="modal-overlay"]')).toBeVisible();

    await page.locator('[data-testid="login-email"]').fill('invalid@gmail.com');

    await page
      .locator('[data-testid="login-password"]')
      .fill('invalidpassword');

    await page.locator('[data-testid="login-submit"]').click();

    await expect(page.locator('[data-testid="login-error"]')).toBeVisible();
  });
});
