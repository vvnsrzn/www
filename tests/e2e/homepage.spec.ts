import { test, expect } from "@playwright/test";

test("Homepage loads at root and body is visible with the right heading1", async ({
  page,
}) => {
  await page.goto("/");
  const h1 = page.locator("h1");
  await expect(h1).toBeVisible();
  await expect(h1).toContainText("Vivian SARAZIN");
});
