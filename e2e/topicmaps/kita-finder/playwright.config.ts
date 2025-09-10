import { defineConfig } from "@playwright/test";

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: "./src/e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",
  use: {
    baseURL: "http://localhost:4333",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
        navigationTimeout: 15_000, actionTimeout: 10_000,
  },
  projects: [
    {
      name: "chromium",
      use: {
            navigationTimeout: 15_000, actionTimeout: 10_000,
      },
    },
  ],
  webServer: {
    command: "npx nx serve kita-finder --port=4333",
    url: "http://localhost:4333",
    reuseExistingServer: false,
    timeout: 60_000,
  },
});
