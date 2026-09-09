// pages/HomePage.ts

import { Page,expect } from '@playwright/test';

export class HomePage {
  constructor(private page: Page) {}

  // ===== Locators =====

  private get stayAsGuestButton() {
    return this.page.getByTestId('Component.LoginPopup.Button.StayAsGuest');
  }

  private get showsAndEventsMenu() {
    return this.page.getByText('Shows & Events');
  }

private get nextMonthButton() {
  return this.page.getByRole('button', {
    name: 'next month button',
  });
}

async goToCalendarMonth(expectedMonth: string) {
  const calendarContainer = this.page
    .locator(
      'div:nth-child(4) > div:nth-child(2) > div > div > div > div:nth-child(2)'
    )
    .first();

  for (let i = 0; i < 12; i++) {
    const isMonthVisible =
      await calendarContainer
        .getByText(expectedMonth, { exact: true })
        .isVisible()
        .catch(() => false);

    if (isMonthVisible) {
      console.log(`✓ Calendar Month : ${expectedMonth}`);
      return;
    }

    await this.nextMonthButton.click();
    await this.page.waitForTimeout(500);
  }

  throw new Error(`Calendar month ${expectedMonth} was not found.`);
}

  // ===== Actions =====

  async goto() {
    await this.page.goto('/');
  }

  async stayAsGuest() {
    await this.stayAsGuestButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async openShowsAndEvents() {
    await this.showsAndEventsMenu.hover();
    await this.showsAndEventsMenu.click();
  }

async validateCalendar(
  calendar: {
    month: string;
    dates: string[];
  }[]
) {
  const calendarContainer = this.page
    .locator(
      'div:nth-child(4) > div:nth-child(2) > div > div > div > div:nth-child(2)'
    )
    .first();

  const getDateCell = (date: string) =>
    calendarContainer
      .locator('div.r-lrvibr')
      .filter({ hasText: new RegExp(`^${date}$`) })
      .first();

  for (const item of calendar) {
  await this.goToCalendarMonth(item.month);

  for (const date of item.dates) {
    const dateCell = getDateCell(date);

    await expect(dateCell).toBeVisible({
      timeout: 10000,
    });

    await dateCell.click({ force: true });

    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(1000);

    console.log(`   ✓ Date ${date} is enabled`);
  }

  // tunggu semua validasi tanggal bulan ini selesai sebelum lanjut bulan berikutnya
  await this.page.waitForTimeout(1000);
}
}
}