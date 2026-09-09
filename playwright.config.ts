import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

// Default environment = UAT
const environment = process.env.TEST_ENV || 'uat';

// Load environment file
dotenv.config({
  path: `.env.${environment}`,
});

export default defineConfig({
  testDir: './tests',

  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,

  reporter: [
    ['html'],
    ['list'],
  ],

  use: {
    baseURL: process.env.BASE_URL,

    headless: true,

    screenshot: 'only-on-failure',

    video: 'on',

    trace: 'retain-on-failure',

    actionTimeout: 30000,

    navigationTimeout: 60000,
  },

  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],

        launchOptions: {
          slowMo: 500,
        },
      },
    },
  ],

  timeout: 120000,

  expect: {
    timeout: 10000,
  },
});