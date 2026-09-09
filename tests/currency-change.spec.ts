import { test } from '../fixtures/app.fixture';
import { currencyData } from '../data/bookingData';

test('@Currency Validation', async ({
  homePage,
  currencyPage,
}) => {
    await homePage.goto();
    await homePage.openShowsAndEvents();
    await homePage.stayAsGuest();

    await currencyPage.validateMultipleCurrencies(
        currencyData.currencies
  );
});