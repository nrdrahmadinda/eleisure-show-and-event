import { expect, Page } from '@playwright/test';

export class ShoppingCartPage {
  constructor(private page: Page) {}

  private get deleteButtons() {
    return this.page.getByRole('button', {
      name: 'delete button',
    });
  }

  private get yesButton() {
    return this.page
      .locator('div')
      .filter({ hasText: /^Yes$/ })
      .first();
  }

  async deleteAllCartItems() {
    await expect(this.page.getByText('Shopping Cart')).toBeVisible({
      timeout: 15000,
    });

    await this.page.waitForTimeout(2000);


    const initialCount = await this.deleteButtons.count();
    console.log(`Initial delete button count: ${initialCount}`);

    if (initialCount === 0) {
      await this.page.screenshot({
        path: 'test-results/delete-button-not-found.png',
        fullPage: true,
      });

      throw new Error('Delete button not found on Shopping Cart page.');
    }

    while (await this.deleteButtons.count() > 0) {
      const beforeCount = await this.deleteButtons.count();

      await this.deleteButtons.first().click();

      await expect(this.yesButton).toBeVisible({
        timeout: 10000,
      });

      await this.yesButton.click();

      await this.page.waitForTimeout(3000);

      const afterCount = await this.deleteButtons.count();

      console.log(`Before: ${beforeCount}, After: ${afterCount}`);

      if (afterCount >= beforeCount) {
        break;
      }
    }
  }

  async deleteAllCartItemsBook() {
      await this.page
    .getByRole('button', { name: 'Shopping cart' })
    .click();

    await this.page.waitForTimeout(2000);

    
    const initialCount = await this.deleteButtons.count();
    console.log(`Initial delete button count: ${initialCount}`);

    if (initialCount === 0) {
      await this.page.screenshot({
        path: 'test-results/delete-button-not-found.png',
        fullPage: true,
      });

      throw new Error('Delete button not found on Shopping Cart page.');
    }

    while (await this.deleteButtons.count() > 0) {
      const beforeCount = await this.deleteButtons.count();

      await this.deleteButtons.first().click();

      await expect(this.yesButton).toBeVisible({
        timeout: 10000,
      });

      await this.yesButton.click();

      await this.page.waitForTimeout(3000);

      const afterCount = await this.deleteButtons.count();

      console.log(`Before: ${beforeCount}, After: ${afterCount}`);

      if (afterCount >= beforeCount) {
        break;
      }
    }
  }
  private get globalCartTimer() {
    return this.page.getByTestId('Component.CartTimer');
  }

  private get allVisibleTimerTexts() {
    return this.page
      .locator('div')
      .filter({
        hasText: /^\d{2}:\d{2}$/,
      });
  }

  private convertTimerToSeconds(timer: string): number {
    const match = timer.trim().match(/^(\d{2}):(\d{2})$/);

    if (!match) {
      throw new Error(`Invalid timer format: ${timer}`);
    }

    const minutes = Number(match[1]);
    const seconds = Number(match[2]);

    return minutes * 60 + seconds;
  }

  private async getGlobalTimerText(): Promise<string> {
    await expect(this.globalCartTimer).toBeVisible({
      timeout: 10000,
    });

    const rawText =
      (await this.globalCartTimer.textContent())?.trim() ?? '';

    const match = rawText.match(/\d{2}:\d{2}/);

    if (!match) {
      throw new Error(
        `Global cart timer was not found inside Component.CartTimer. Actual text: ${rawText}`
      );
    }

    return match[0];
  }

  private async getVisibleTimerValues(): Promise<string[]> {
    const timerLocator = this.allVisibleTimerTexts;
    const timerCount = await timerLocator.count();

    const timers: string[] = [];

    for (let i = 0; i < timerCount; i++) {
      const timer = timerLocator.nth(i);

      const isVisible = await timer
        .isVisible()
        .catch(() => false);

      if (!isVisible) {
        continue;
      }

      const timerText =
        (await timer.textContent())?.trim() ?? '';

      if (/^\d{2}:\d{2}$/.test(timerText)) {
        timers.push(timerText);
      }
    }

    return [...new Set(timers)];
  }

  private async getEventTimerText(): Promise<string> {
    const globalTimerText = await this
      .getGlobalTimerText()
      .catch(() => '');

    const visibleTimers =
      await this.getVisibleTimerValues();

    console.log(
      `Visible timer values: ${visibleTimers.join(', ')}`
    );

    const eventTimer = visibleTimers
      .map(timer => ({
        text: timer,
        seconds: this.convertTimerToSeconds(timer),
      }))
      .find(timer => {
        const isWithinFiveMinutes =
          timer.seconds > 0 &&
          timer.seconds <= 5 * 60;

        const isDifferentFromGlobalTimer =
          timer.text !== globalTimerText;

        return (
          isWithinFiveMinutes &&
          isDifferentFromGlobalTimer
        );
      });

    if (!eventTimer) {
      throw new Error(
        `Event timer was not found. Visible timers: ${visibleTimers.join(', ')}. Global timer: ${globalTimerText}`
      );
    }

    return eventTimer.text;
  }

  async validateEventOnlyTimer() {
    const visibleTimers =
      await this.getVisibleTimerValues();

    console.log(
      `Event-only visible timers: ${visibleTimers.join(', ')}`
    );

    const eventTimers = visibleTimers
      .map(timer => ({
        text: timer,
        seconds: this.convertTimerToSeconds(timer),
      }))
      .filter(
        timer =>
          timer.seconds > 0 &&
          timer.seconds <= 5 * 60
      );

    expect(
      eventTimers.length,
      `Expected one active Event timer within 5 minutes. Actual timers: ${visibleTimers.join(', ')}`
    ).toBeGreaterThanOrEqual(1);

    const eventTimer = eventTimers[0];

    console.log(`Event timer: ${eventTimer.text}`);

    expect(
      eventTimer.seconds,
      `Event timer should not exceed 5 minutes. Actual: ${eventTimer.text}`
    ).toBeLessThanOrEqual(5 * 60);

    expect(
      eventTimer.seconds,
      `Event timer should still be active. Actual: ${eventTimer.text}`
    ).toBeGreaterThan(0);

    console.log(
      'PASSED: Event-only cart displays an active timer within 5 minutes.'
    );
  }

  async validateEventAndHotelTimers() {
    const eventTimerText =
      await this.getEventTimerText();

    const globalTimerText =
      await this.getGlobalTimerText();

    const eventTimerSeconds =
      this.convertTimerToSeconds(eventTimerText);

    const globalTimerSeconds =
      this.convertTimerToSeconds(globalTimerText);

    console.log(`Event timer: ${eventTimerText}`);
    console.log(`Global cart timer: ${globalTimerText}`);

    expect(
      eventTimerSeconds,
      `Event timer should not exceed 5 minutes. Actual: ${eventTimerText}`
    ).toBeLessThanOrEqual(5 * 60);

    expect(
      eventTimerSeconds,
      `Event timer should still be active. Actual: ${eventTimerText}`
    ).toBeGreaterThan(0);

    expect(
      globalTimerSeconds,
      `Global cart timer should not exceed 20 minutes. Actual: ${globalTimerText}`
    ).toBeLessThanOrEqual(20 * 60);

    expect(
      globalTimerSeconds,
      `Global cart timer should be more than 5 minutes. Actual: ${globalTimerText}`
    ).toBeGreaterThan(5 * 60);

    console.log(
      'PASSED: Event timer is within 5 minutes and Global Cart timer is within 20 minutes.'
    );
  }

  async validateEventAndHotelTimersAreCountingDown() {
    const initialEventTimer =
      await this.getEventTimerText();

    const initialGlobalTimer =
      await this.getGlobalTimerText();

    const initialEventSeconds =
      this.convertTimerToSeconds(initialEventTimer);

    const initialGlobalSeconds =
      this.convertTimerToSeconds(initialGlobalTimer);

    console.log(
      `Initial Event timer: ${initialEventTimer}`
    );
    console.log(
      `Initial Global timer: ${initialGlobalTimer}`
    );

    await this.page.waitForTimeout(3000);

    const updatedEventTimer =
      await this.getEventTimerText();

    const updatedGlobalTimer =
      await this.getGlobalTimerText();

    const updatedEventSeconds =
      this.convertTimerToSeconds(updatedEventTimer);

    const updatedGlobalSeconds =
      this.convertTimerToSeconds(updatedGlobalTimer);

    console.log(
      `Updated Event timer: ${updatedEventTimer}`
    );
    console.log(
      `Updated Global timer: ${updatedGlobalTimer}`
    );

    expect(
      updatedEventSeconds,
      `Event timer did not count down. Initial: ${initialEventTimer}, Updated: ${updatedEventTimer}`
    ).toBeLessThan(initialEventSeconds);

    expect(
      updatedGlobalSeconds,
      `Global timer did not count down. Initial: ${initialGlobalTimer}, Updated: ${updatedGlobalTimer}`
    ).toBeLessThan(initialGlobalSeconds);

    console.log(
      'PASSED: Event and Global Cart timers are counting down.'
    );
  }
}

