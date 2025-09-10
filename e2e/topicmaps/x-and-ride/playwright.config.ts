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
  timeout: 30_000, // Reduce test timeout for simple tests
  use: {
    baseURL: "http://localhost:4222",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    navigationTimeout: 15_000, // Reduce navigation timeout
    actionTimeout: 10_000, // Add action timeout
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
    reuseExistingServer: !process.env.CI, // Reuse server locally, fresh in CI
    timeout: 30_000, // Reduce webServer timeout
    stdout: 'pipe', // Capture server logs
    stderr: 'pipe',
  },
});
