import { defineConfig, devices } from '@playwright/test';

const STORAGE_STATE_PATH = 'playwright/.auth/user.json'; 

export default defineConfig({
  testDir: './tests', 
  fullyParallel: false, 
  workers: 1, 
  
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  timeout: 60000,

  reporter: [['junit', { outputFile: 'junit-report.xml' }]], 

  use: {
    actionTimeout: 15000,
    baseURL: 'https://parabank.parasoft.com/parabank/index.htm',
    headless: true, 
    viewport: { width: 1280, height: 720 },
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'setup',
      testMatch: '01_register.spec.ts', 
      use: {
        ...devices['Desktop Chrome'],
        baseURL: 'https://parabank.parasoft.com/parabank/index.htm', 
      },
    },
    {
      name: 'chromium-auth',
      dependencies: ['setup'], 
      testMatch: ['02_open_account.spec.ts', '03_transfer_funds.spec.ts'], 
      use: {
        ...devices['Desktop Chrome'],
        storageState: STORAGE_STATE_PATH, 
        baseURL: 'https://parabank.parasoft.com/parabank/index.htm',
      },
    },
  ],
});