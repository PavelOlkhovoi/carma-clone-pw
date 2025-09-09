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
  reporter: process.env.CI ? "github" : "html",
  timeout: 20_000, 
  use: {
    baseURL: "http://localhost:4222",
    trace: "off",
    screenshot: "off",
    channel: process.env.CI ? "chrome" : undefined,
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
  webServer: {
    command: "npx nx serve x-and-ride --port=4222",
    url: "http://localhost:4222",
    reuseExistingServer: true,
    timeout: 20_000, 
    stdout: process.env.CI ? 'ignore' : 'pipe', 
    stderr: process.env.CI ? 'ignore' : 'pipe',
  },
});
