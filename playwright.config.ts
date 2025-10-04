import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  timeout: 60000, 

  // Configuración del Reportero para Jenkins
  reporter: [['junit', { outputFile: 'test-results/junit.xml' }]],

  use: {
    actionTimeout: 15000, 
    baseURL: 'https://parabank.parasoft.com/parabank',
    headless: !!process.env.CI,
    viewport: { width: 1280, height: 720 },
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});