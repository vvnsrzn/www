import { test, expect } from "@playwright/test";

const pages = [
  { path: "/ai/", heading: "AI" },
  { path: "/misc/", heading: "Misc" },
  { path: "/resume/", heading: "Resume" },
];

for (const { path, heading } of pages) {
  test(`${path} loads with the expected h1`, async ({ page }) => {
    await page.goto(path);
    const h1 = page.locator("h1");
    await expect(h1).toBeVisible();
    await expect(h1).toHaveText(heading);
  });
}

const projects = [
  "david-poupon",
  "groupe-nomblot",
  "les-cahiers-de-jeanine",
  "omicure",
  "pme-partner",
  "radiofrance",
  "solinum",
];

for (const slug of projects) {
  test(`project page /projects/${slug}/ renders its content`, async ({
    page,
  }) => {
    const response = await page.goto(`/projects/${slug}/`);
    expect(response?.status()).toBe(200);
    await expect(page.locator("main")).toBeVisible();
    await expect(page.locator("main :is(h1, h2)").first()).toBeVisible();
  });
}

test("unknown route returns a 404 response", async ({ page }) => {
  const response = await page.goto("/this-page-does-not-exist/");
  expect(response?.status()).toBe(404);
});
