import { defineConfig } from "@playwright/test";

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: "./src/e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: process.env.CI ? "github" : "html",
  use: {
    baseURL: "http://localhost:4222",
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    channel: process.env.CI ? "chrome" : undefined,
    navigationTimeout: 15000,
    actionTimeout: 10000,
  },
  projects: [
    {
      name: "chromium",
      use: {
        channel: process.env.CI ? "chrome" : undefined,
      },
    },
  ],
  webServer: {
    // Use Nx preview (which depends on build per project.json) for stable, fast startup in CI
    command: "npx nx preview x-and-ride --port=4222 --configuration=production",
    url: "http://localhost:4222",
    reuseExistingServer: !process.env.CI,
    timeout: 45_000,
  },
});
