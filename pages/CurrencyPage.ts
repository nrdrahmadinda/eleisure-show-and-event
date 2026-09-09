import { expect, Page } from '@playwright/test';

export class CurrencyPage {
  constructor(private page: Page) {}

  private currencyButton = () =>
    this.page.getByRole('button', {
      name: /MYR|SGD|USD|CNY/,
    });

  private searchButton = () =>
    this.page
      .locator('div')
      .filter({ hasText: /^Search$/ })
      .first();

  async changeCurrency(currency: string) {
    await this.currencyButton().click();

    await this.page
      .locator('div')
      .filter({
        hasText: new RegExp(`^${currency}$`),
      })
      .last()
      .click();

    await this.searchButton().click();
  }

  async validateCurrency(currency: string) {
    await expect
      .poll(
        async () => {
          const body =
            (await this.page.locator('body').textContent()) ??
            '';

          return body.includes(currency);
        },
        {
          message: `Waiting currency ${currency} to be displayed`,
          timeout: 10000,
        }
      )
      .toBeTruthy();
  }

  async changeAndValidateCurrency(currency: string) {
    await this.changeCurrency(currency);
    await this.validateCurrency(currency);

    console.log(
      `✅ Currency successfully changed to ${currency}`
    );
  }

  async validateMultipleCurrencies(
    currencies: string[]
  ) {
    for (const currency of currencies) {
      await this.changeAndValidateCurrency(currency);
    }
  }
}