import { test, expect } from '@playwright/test';

test.describe('Example E2E Tests', () => {
  test('homepage loads successfully', async ({ page }) => {
    await page.goto('/');

    // 验证页面标题
    await expect(page).toHaveTitle(/Monorep/i);
  });

  test('navigation works', async ({ page }) => {
    await page.goto('/');

    // 示例：点击导航链接
    // await page.click('a[href="/about"]');
    // await expect(page).toHaveURL('/about');
  });
});
