import { test, expect } from '@playwright/test'

test('home page renders brand and navigation', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('banner')).toBeVisible()
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
})

test('contact page shows form', async ({ page }) => {
  await page.goto('/contact')
  await expect(page.getByRole('heading', { name: /let’s talk|contact/i })).toBeVisible()
  await expect(page.getByLabel(/name/i)).toBeVisible()
})
