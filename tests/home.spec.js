import { test, expect } from '@playwright/test';

test('renders a professional personal showcase', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: /ori delevski/i })).toBeVisible();
  await expect(page.getByText(/selected public repos/i)).toBeVisible();
  await expect(page.getByRole('button', { name: /agents/i })).toBeVisible();
  await expect(page.getByTestId('repo-card')).toHaveCount(12);
});

test('filters repos by category', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: /agents/i }).click();
  await expect(page.getByTestId('repo-card')).toHaveCount(5);
  await expect(page.getByRole('heading', { name: 'whatsapp-public-logan' })).toBeVisible();
});
