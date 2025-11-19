import { defineConfig } from "@playwright/test";

export default defineConfig({
  webServer: {
    command: "pnpm run build && pnpm run preview",
    url: "http://localhost:3000",
  },
  timeout: 60 * 1000,
  use: {
    baseURL: "http://localhost:3000",
    headless: true,
  },
  projects: [{ name: "Chromium", use: { browserName: "chromium" } }],
  outputDir: "test-results",
});
