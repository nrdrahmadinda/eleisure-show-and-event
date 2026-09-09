import { test } from '../fixtures/app.fixture';
import { ShoppingCartPage } from '../pages/ShoppingCartPage';
import { bookingData } from '../data/bookingData';

test('@Validate-event-only-cart-timer', async ({
  page,
    homePage,
    showsEventsPage,
    fillPersonalDataPage,
    paymentPage,
    validateBookingMixPage,
  }) => {
    const booking = {
      ...bookingData.LoloMix,
      //ticketQty: qty,
    };
    await homePage.goto();
    await homePage.openShowsAndEvents();
    await homePage.stayAsGuest();
    await showsEventsPage.selectEvent(booking.title);
    await showsEventsPage.selectDate(booking.bookingDate);
    await showsEventsPage.selectTime(booking.time);
    await showsEventsPage.selectCategoryMix_ws(booking.categories,);
    await showsEventsPage.openBookingDetails();
    await validateBookingMixPage.addToCartAndProceedMixed(
    booking.title,
    booking.time,
    booking.bookingDate,
    booking.categories
  );
    await page.waitForTimeout(5000);
  const shoppingCartPage = new ShoppingCartPage(page);
  await shoppingCartPage.validateEventOnlyTimer();
});

test('@Validate-event-and-hotel-cart-timer', async ({
  page,
    homePage,
    showsEventsPage,
    fillPersonalDataPage,
    paymentPage,
    validateBookingMixPage,
  }) => {
    const booking = {
      ...bookingData.LoloMix,
      //ticketQty: qty,
    };
    await homePage.goto();
    await homePage.openShowsAndEvents();
    await homePage.stayAsGuest();
    await showsEventsPage.selectEvent(booking.title);
    await showsEventsPage.selectDate(booking.bookingDate);
    await showsEventsPage.selectTime(booking.time);
    await showsEventsPage.selectCategoryMix_ws(booking.categories,);
    await showsEventsPage.openBookingDetails();
    await validateBookingMixPage.addToCartAndProceedMixed(
    booking.title,
    booking.time,
    booking.bookingDate,
    booking.categories
  );
  await page.waitForTimeout(5000);
   // Tambahkan Hotel
  await page.getByText('Book More').click();

  await page
    .locator('div')
    .filter({
      hasText: /^Hotels$/,
    })
    .nth(2)
    .click();

  await page
    .getByText('Select')
    .nth(5)
    .click();

  await page
    .locator('div:nth-child(8) > div:nth-child(2)')
    .first()
    .click();

  await page
    .locator('div')
    .filter({
      hasText: 'Add to Cart',
    })
    .nth(4)
    .click();

  await page
    .locator('div')
    .filter({
      hasText: 'Proceed',
    })
    .nth(5)
    .click();
    await page.waitForTimeout(5000);
  const shoppingCartPage = new ShoppingCartPage(page);
  await shoppingCartPage.validateEventAndHotelTimers();
  await shoppingCartPage.validateEventAndHotelTimersAreCountingDown();
});