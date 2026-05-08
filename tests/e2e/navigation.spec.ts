import { test, expect } from "@playwright/test";

test("navbar logo links back to the homepage", async ({ page }) => {
  await page.goto("/resume/");
  await page.getByRole("link", { name: "VIVIAN SARAZIN" }).click();
  await expect(page).toHaveURL("/");
  await expect(page.locator("h1")).toContainText("Vivian SARAZIN");
});

test("navbar links navigate between top-level pages", async ({ page }) => {
  await page.goto("/");

  const nav = page.locator("nav").first();
  await nav.getByRole("link", { name: "Resume" }).click();
  await expect(page).toHaveURL("/resume/");
  await expect(page.locator("h1")).toHaveText("Resume");

  await nav.getByRole("link", { name: "AI" }).click();
  await expect(page).toHaveURL("/ai/");
  await expect(page.locator("h1")).toHaveText("AI");

  await nav.getByRole("link", { name: "Misc" }).click();
  await expect(page).toHaveURL("/misc/");
  await expect(page.locator("h1")).toHaveText("Misc");
});

test("homepage exposes social links to GitHub and Bluesky", async ({
  page,
}) => {
  await page.goto("/");
  const github = page.getByTitle("GitHub").first();
  const bluesky = page.getByTitle("Bluesky").first();
  await expect(github).toHaveAttribute("href", /github\.com\//);
  await expect(bluesky).toHaveAttribute("href", /bsky\.app\/profile\//);
});

test("color mode toggle flips the active mode label", async ({ page }) => {
  await page.goto("/");
  const toggle = page.getByRole("button", { name: "Color Mode" }).first();
  await expect(toggle).toContainText("Light Mode");
  await toggle.click();
  await expect(toggle).toContainText("Dark Mode");
  await toggle.click();
  await expect(toggle).toContainText("Light Mode");
});
