import { defineConfig } from "@playwright/test";

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: "./src/e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 0 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI ? "github" : "html",
  timeout: 20_000, // Lower overall test timeout for simple smoke tests
  expect: { timeout: 5_000 },
  use: {
    baseURL: "http://localhost:4222",
    trace: process.env.CI ? "off" : "on-first-retry",
    screenshot: process.env.CI ? "off" : "only-on-failure",
    video: "off",
    navigationTimeout: 10_000, // Reduce navigation timeout
    actionTimeout: 7_500, // Slightly lower action timeout
  },
  projects: [
    {
      name: "chromium",
      use: {
        // Use bundled Chromium in Playwright Docker image; no system Chrome channel in CI
      },
    },
  ],
  webServer: {
    command: "npx nx serve x-and-ride --port=4222",
    url: "http://localhost:4222",
    reuseExistingServer: true, // We'll pre-start server in CI to avoid startup cost
    timeout: 20_000, // Lower webServer timeout
    stdout: 'pipe', // Capture server logs
    stderr: 'pipe',
  },
});
