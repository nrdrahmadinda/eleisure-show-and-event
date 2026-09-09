import { Page, expect } from '@playwright/test';

export class AddOnsPage {
  constructor(private page: Page) {}

  // ===========================
  // Add Ons Hotel
  // ===========================

  async addOnsHotel() {

    await this.page.locator('div').filter({ hasText: 'Next' }).nth(4).click();

    // Select Hotel
    await this.page
      .getByText('First World Hotel From1.00 MYR')
      .click();

    // Select Room
    await this.page
      .locator('div')
      .filter({ hasText: /^Select$/ })
      .first()
      .click();

    // Select Room Option
    await this.page
      .locator('div:nth-child(8) > div:nth-child(2)')
      .first()
      .click();

    // Add Hotel to Cart
    await this.page
      .getByTestId('hotel-checkout-add-to-cart')
      .click();

    // Proceed to Add Ons
    await this.page
      .getByTestId('hotel-basket-proceed')
      .click();
  }

  async addOnsThemePark() {
  await this.page.locator('div').filter({ hasText: 'Next' }).nth(4).click();
  await this.page
    .getByText('Genting SkyWorlds Theme Park')
    .first()
    .click();

  await this.page
    .locator('div')
    .filter({ hasText: /^Continue$/ })
    .first()
    .click();

  await this.page
    .locator(
      'div:nth-child(2) > div:nth-child(2) > .css-175oi2r > svg'
    )
    .click();

  await this.page
    .locator('div')
    .filter({ hasText: 'Add to Cart' })
    .nth(4)
    .click();

  await this.page
    .locator('div')
    .filter({ hasText: 'Proceed' })
    .nth(5)
    .click();
}
async addOnsSkyway() {
  await this.page.getByText('Next').click();

  await this.page
    .getByText('Genting Highlands Premium Outlets SkyWay From11.00 MYR')
    .click();

  await this.page.locator('div').filter({ hasText: /^Continue$/ }).first().click();

  /*await this.page
    .locator('div')
    .filter({ hasText: /^7$/ })
    .nth(1)
    .click();*/

  await this.page
    .locator('div:nth-child(2) > div:nth-child(2) > .css-175oi2r > svg')
    .first()
    .click();

  await this.page
    .locator('div')
    .filter({ hasText: 'Add to Cart' })
    .nth(4)
    .click();

  await this.page
    .locator('div')
    .filter({ hasText: 'Proceed' })
    .nth(5)
    .click();
}
async addOnsDining() {
  await this.page.getByText('Next').click();
  await this.page
    .getByText('Sea-nsational Dinner Buffet')
    .click();

  await this.page
    .locator('div:nth-child(2) > div:nth-child(2) > .css-175oi2r > svg')
    .first()
    .click();

  await this.page
    .locator('div')
    .filter({ hasText: 'Add to Cart' })
    .nth(4)
    .click();

  await this.page
    .locator('div')
    .filter({ hasText: 'Proceed' })
    .nth(5)
    .click();
}
}

