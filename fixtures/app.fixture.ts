import { test as base } from '@playwright/test';

import { HomePage } from '../pages/HomePage';
import { ShowsEventsPage } from '../pages/ShowEventsPage';
import { FillPersonalDataPage } from '../pages/fillPersonalData.page';
import { PaymentPage } from '../pages/payment.page';
import { ValidateBookingPage } from '../pages/ValidateBooking.page';
import { ValidateBookingMixPage } from '../pages/ValidateBookingMix.page';
import { CurrencyPage } from '../pages/CurrencyPage';
import { LoginPage } from '../pages/LoginPage';
import { ShoppingCartPage } from '../pages/ShoppingCartPage';
import { searchEvent } from '../pages/SearchEvent.page';
import { AddOnsPage } from '../pages/AddOns.page';

type AppFixtures = {
  homePage: HomePage;
  showsEventsPage: ShowsEventsPage;
  fillPersonalDataPage: FillPersonalDataPage;
  paymentPage: PaymentPage;
  validateBookingPage: ValidateBookingPage;
  validateBookingMixPage: ValidateBookingMixPage;
  currencyPage: CurrencyPage;
  loginPage: LoginPage;
  shoppingPage: ShoppingCartPage;
  searchevent: searchEvent;
  AddOns: AddOnsPage;
  
};

export const test = base.extend<AppFixtures>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },

  showsEventsPage: async ({ page }, use) => {
    await use(new ShowsEventsPage(page));
  },

  fillPersonalDataPage: async ({ page }, use) => {
    await use(new FillPersonalDataPage(page));
  },

  paymentPage: async ({ page }, use) => {
    await use(new PaymentPage(page));
  },

  validateBookingPage: async ({ page }, use) => {
  await use(new ValidateBookingPage(page));
},

  validateBookingMixPage: async ({ page }, use) => {
  await use(new ValidateBookingMixPage(page));
},
  currencyPage: async ({ page }, use) => {
    await use(new CurrencyPage(page));
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
},
  shoppingPage: async ({ page }, use) => {
    await use(new ShoppingCartPage(page));
},

  searchevent: async ({ page }, use) => {
    await use(new searchEvent(page));
},
  AddOns: async ({ page }, use) => {
    await use(new AddOnsPage(page));
},
});