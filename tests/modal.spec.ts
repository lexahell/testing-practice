import { test, expect } from '@playwright/test';

test.describe('Modal Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/testing-practice');
  });

  test('should open modal on button click', async ({ page }) => {
    await page.getByRole('button', { name: 'Авторизоваться' }).click();

    await expect(page.locator('[data-testid="modal-overlay"]')).toBeVisible();
  });

  test('should close modal on close button click', async ({ page }) => {
    await page.getByRole('button', { name: 'Авторизоваться' }).click();

    await expect(page.locator('[data-testid="modal-overlay"]')).toBeVisible();

    await page.locator('[data-testid="modal-close"]').click();

    await expect(page.locator('[data-testid="modal-overlay"]')).toBeHidden();
  });

  test('should close modal on background click', async ({ page }) => {
    await page.getByRole('button', { name: 'Авторизоваться' }).click();

    await expect(page.locator('[data-testid="modal-overlay"]')).toBeVisible();

    await page
      .locator('[data-testid="modal-overlay"]')
      .click({ position: { x: 0, y: 0 } });

    await expect(page.locator('[data-testid="modal-overlay"]')).toBeHidden();
  });
});
