import { defineConfig } from "@playwright/test";

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: "./src/e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI ? "line" : "html",
  timeout: 20_000, 
  use: {
    baseURL: process.env.CI ? "http://127.0.0.1:4222" : "http://localhost:4222",
    trace: "off",
    screenshot: "off",
    channel: process.env.CI ? "chrome" : undefined,
    headless: true,
    launchOptions: {
      args: [
        "--no-sandbox",
        "--disable-dev-shm-usage",
        "--disable-extensions",
        "--disable-background-networking"
      ]
    },
    navigationTimeout: 7_000, 
    actionTimeout: 5_000, 
  },
  projects: [
    {
      name: "chromium",
      use: {
        channel: process.env.CI ? "chrome" : undefined,
      },
    },
  ],
  webServer: process.env.CI
    ? undefined
    : {
        command: "npx nx serve x-and-ride --port=4222",
        url: "http://localhost:4222",
        reuseExistingServer: true,
        timeout: 20_000, 
        stdout: 'pipe', 
        stderr: 'pipe',
      },
});
