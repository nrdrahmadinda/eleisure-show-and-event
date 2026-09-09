import { test } from '../fixtures/app.fixture';
import {bookingData,personalInfoData,} from '../data/bookingData';

  /*test('@Booking 2 ticket One Category With Country and Phone Number Malaysia Lisa', async ({
    page,
    homePage,
    showsEventsPage,
    fillPersonalDataPage,
    paymentPage,
    validateBookingPage,
  }) => {
    const booking = {
      ...bookingData.hahaLive2,
    };


    await homePage.goto();
    await homePage.openShowsAndEvents();
    await homePage.stayAsGuest();
    await showsEventsPage.selectEvent(booking.title);
    await showsEventsPage.selectDate(booking.bookingDate);
    await showsEventsPage.selectTime(booking.time);
    await showsEventsPage.selectCategory(booking.category);
    await showsEventsPage.selectAvailableCategory();

    await page.waitForTimeout(1000);

    const selectedSeats =
      await showsEventsPage.selectAnyAvailableSeats(
        booking.ticketQty
      );

    await showsEventsPage.confirmSeatSelection();
    await showsEventsPage.openBookingDetails();

    await validateBookingPage.validateBookingDetails(
      booking.title,
      booking.bookingDate,
      booking.time,
      booking.ticketPrice,
      booking.ticketQty,
      booking.category
    );

    await validateBookingPage.addToCartAndProceed(
      booking.title,
      booking.time,
      booking.ticketPrice,
      booking.ticketQty,
      booking.category,
      booking.bookingDate
    );

    await page.waitForTimeout(5000);

    await validateBookingPage.validateShoppingCart(
      booking,
      selectedSeats
    );

    await page.waitForTimeout(5000);

    await showsEventsPage.proceedFromShoppingCart();

    await fillPersonalDataPage.fillPersonalData(
      personalInfoData.malaysia
    );

    await paymentPage.validatePaymentDetails(
      booking,
      selectedSeats
    );

    await paymentPage.selectPaymentMethod({
      ticketQty: booking.ticketQty,
      ticketPrice: booking.ticketPrice,
      method: booking.payment.method,
    });
  });*/

   /*test('@Booking 2 ticket One Category With Free Seat Lisa', async ({
    page,
    homePage,
    showsEventsPage,
    fillPersonalDataPage,
    paymentPage,
    validateBookingPage,
  }) => {
    const booking = {
      ...bookingData.LisaLive2,
    };


    await homePage.goto();
    await homePage.openShowsAndEvents();
    await homePage.stayAsGuest();
    await showsEventsPage.selectEvent(booking.title);
    await showsEventsPage.selectDate(booking.bookingDate);
    await showsEventsPage.selectTime(booking.time);
    await showsEventsPage.selectCategory(booking.category);
    await showsEventsPage.selectAvailableCategory();

    await page.waitForTimeout(1000);

    const selectedSeats =
      await showsEventsPage.selectAnyAvailableSeats(
        booking.ticketQty
      );

    await showsEventsPage.confirmSeatSelection();
    await showsEventsPage.openBookingDetails();

    await validateBookingPage.validateBookingDetails(
      booking.title,
      booking.bookingDate,
      booking.time,
      booking.ticketPrice,
      booking.ticketQty,
      booking.category
    );

    await validateBookingPage.addToCartAndProceed(
      booking.title,
      booking.time,
      booking.ticketPrice,
      booking.ticketQty,
      booking.category,
      booking.bookingDate
    );

    await page.waitForTimeout(5000);

    await validateBookingPage.validateShoppingCart(
      booking,
      selectedSeats
    );

    await page.waitForTimeout(5000);

    await showsEventsPage.proceedFromShoppingCart();

    await fillPersonalDataPage.fillPersonalData(
      personalInfoData.malaysia
    );

    await paymentPage.validatePaymentDetails(
      booking,
      selectedSeats
    );

    await paymentPage.selectPaymentMethod({
      ticketQty: booking.ticketQty,
      ticketPrice: booking.ticketPrice,
      method: booking.payment.method,
    });
  });*/

  /*test('@Booking 3 ticket One Category With Country and Phone Number Singapore Rose-1', async ({
    page,
    homePage,
    showsEventsPage,
    fillPersonalDataPage,
    paymentPage,
    validateBookingPage,
    validateBookingMixPage,
  }) => {
    const booking = {
      ...bookingData.hahaLive,
    };


    await homePage.goto();
    await homePage.openShowsAndEvents();
    await homePage.stayAsGuest();
    await showsEventsPage.selectEvent(booking.title);
    await page.waitForTimeout(3000);
    //await showsEventsPage.selectDate(booking.bookingDate);
    //await showsEventsPage.selectTime(booking.time);
    await showsEventsPage.selectCategory(booking.category);
    await showsEventsPage.selectAvailableCategory();

    await page.waitForTimeout(1000);

    const selectedSeats =
      await showsEventsPage.selectAnyAvailableSeats(
        booking.ticketQty
      );

    await showsEventsPage.confirmSeatSelection();
    await showsEventsPage.openBookingDetails();

    await validateBookingPage.validateBookingDetails(
      booking.title,
      booking.bookingDate,
      booking.time,
      booking.ticketPrice,
      booking.ticketQty,
      booking.category
    );

    await validateBookingPage.addToCartAndProceed(
      booking.title,
      booking.time,
      booking.ticketPrice,
      booking.ticketQty,
      booking.category,
      booking.bookingDate
    );

    await page.waitForTimeout(5000);

    await validateBookingPage.validateShoppingCart(
      booking,
      selectedSeats
    );

    await page.waitForTimeout(5000);

    await showsEventsPage.proceedFromShoppingCart();

    await fillPersonalDataPage.fillPersonalData(
      personalInfoData.singapore
    );

    await paymentPage.validatePaymentDetails(
      booking,
      selectedSeats
    );

    await paymentPage.selectPaymentMethod({
      ticketQty: booking.ticketQty,
      ticketPrice: booking.ticketPrice,
      method: booking.payment.method,
    });
  });*/

  /*test('@Booking 3 ticket One Category With Country and Phone Number Philippnes Lion', async ({
    page,
    homePage,
    showsEventsPage,
    fillPersonalDataPage,
    paymentPage,
    validateBookingPage,
    validateBookingMixPage,
  }) => {
    const booking = {
      ...bookingData.hahaLive3,
    };


    await homePage.goto();
    await homePage.openShowsAndEvents();
    await homePage.stayAsGuest();

    await showsEventsPage.selectEvent(booking.title);
    await showsEventsPage.selectDate(booking.bookingDate);
    await showsEventsPage.selectTime(booking.time);
    await showsEventsPage.selectCategory(booking.category);
    await showsEventsPage.selectAvailableCategory();

    await page.waitForTimeout(1000);

    const selectedSeats =
      await showsEventsPage.selectAnyAvailableSeats(
        booking.ticketQty
      );

    await showsEventsPage.confirmSeatSelection();
    await showsEventsPage.openBookingDetails();

    await validateBookingPage.validateBookingDetails(
      booking.title,
      booking.bookingDate,
      booking.time,
      booking.ticketPrice,
      booking.ticketQty,
      booking.category
    );

    await validateBookingPage.addToCartAndProceed(
      booking.title,
      booking.time,
      booking.ticketPrice,
      booking.ticketQty,
      booking.category,
      booking.bookingDate
    );

    await page.waitForTimeout(5000);

    await validateBookingPage.validateShoppingCart(
      booking,
      selectedSeats
    );

    await page.waitForTimeout(5000);

    await showsEventsPage.proceedFromShoppingCart();

    await fillPersonalDataPage.fillPersonalData(
      personalInfoData.philippines
    );

    await paymentPage.validatePaymentDetails(
      booking,
      selectedSeats
    );

    await paymentPage.selectPaymentMethod({
      ticketQty: booking.ticketQty,
      ticketPrice: booking.ticketPrice,
      method: booking.payment.method,
    });
  });*/


  /*test('@Booking ticket mixed category with seat selection Rose', async ({
    page,
    homePage,
    showsEventsPage,
    fillPersonalDataPage,
    paymentPage,
    validateBookingMixPage,
  }) => {
    const booking = {
      ...bookingData.hahaLiveMixedCategory,
    };

    await homePage.goto();
    await homePage.openShowsAndEvents();
    await homePage.stayAsGuest();

    await showsEventsPage.selectEvent(booking.title);
    //await showsEventsPage.selectDate(booking.bookingDate);
    await showsEventsPage.selectTime(booking.time);
    const selectedSeats =
      await showsEventsPage.selectSeatMixedCategories(
      booking.categories,
    );
    await showsEventsPage.openBookingDetails();
    await validateBookingMixPage.validateBookingDetailsMixed(
    booking.title,
    booking.bookingDate,
    booking.time,
    booking.categories
  );

  await validateBookingMixPage.addToCartAndProceedMixed(
  booking.title,
  booking.time,
  booking.bookingDate,
  booking.categories
);
await validateBookingMixPage.validateShoppingCartMixed(
  {
    bookingDate: booking.bookingDate,
    bookingTime: booking.time,
    categories: booking.categories,
  },
  selectedSeats
);


    await showsEventsPage.proceedFromShoppingCart();

    await fillPersonalDataPage.fillPersonalData(
      personalInfoData.indonesia
    );

    await paymentPage.validatePaymentDetailsMixed(
      {
        title: booking.title,
        bookingDate: booking.bookingDate,
        time: booking.time,
        categories: booking.categories,
      },
      selectedSeats
    );

await paymentPage.selectPaymentMethod({
  categories: booking.categories,
  method: booking.payment.method,
});
  });*/

test('@Booking-with-mixed-category-without-seat-guest', async ({
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
    await showsEventsPage.selectCategoryMix_ws(booking.categories);
    await showsEventsPage.openBookingDetails();
    await validateBookingMixPage.validateBookingDetailsMixed(
    booking.title,
    booking.bookingDate,
    booking.time,
    booking.categories
  );

await validateBookingMixPage.addToCartAndProceedMixed(
  booking.title,
  booking.time,
  booking.bookingDate,
  booking.categories
);
await validateBookingMixPage.validateShoppingCartMixed_ws(bookingData.LoloMix);
await showsEventsPage.proceedFromShoppingCart();
await fillPersonalDataPage.fillPersonalData(personalInfoData.indonesia);
await paymentPage.validatePaymentDetailsMixed_ws(bookingData.LoloMix);
await paymentPage.selectPaymentMethod({
  categories: booking.categories,
  method: booking.payment.method,
});
  });

test('@Booking-Lion-with-mixed-category-without-seat-guest', async ({
    page,
    homePage,
    showsEventsPage,
    fillPersonalDataPage,
    paymentPage,
    validateBookingPage,
    validateBookingMixPage,
  }) => {
    const booking = {
      ...bookingData.LionDance,
      //ticketQty: qty,
    };

    await homePage.goto();
    await homePage.openShowsAndEvents();
    await homePage.stayAsGuest();
    await showsEventsPage.selectEvent(booking.title);
    await showsEventsPage.selectDate(booking.bookingDate);
    await showsEventsPage.selectTime(booking.time);
    await showsEventsPage.selectCategory(booking.category);
    await showsEventsPage.openBookingDetails();
    await validateBookingPage.validateBookingDetails(
      booking.title,
      booking.bookingDate,
      booking.time,
      booking.ticketPrice,
      booking.ticketQty,
      booking.category
    );

    await validateBookingPage.addToCartAndProceed(
      booking.title,
      booking.time,
      booking.ticketPrice,
      booking.ticketQty,
      booking.category,
      booking.bookingDate
    );

    await validateBookingMixPage.validateShoppingCartMixed_ws(bookingData.LoloMix);
    await showsEventsPage.proceedFromShoppingCart();
    await fillPersonalDataPage.fillPersonalData(personalInfoData.indonesia);
    await paymentPage.validatePaymentDetailsMixed_ws(bookingData.LoloMix);
    await paymentPage.selectPaymentMethod({
      ticketQty: booking.ticketQty,
      ticketPrice: booking.ticketPrice,
      method: booking.payment.method,
    });
  });

test('@Booking-with-mixed-category-without-seat-guest-AddOns-ThemePark', async ({
    page,
    homePage,
    showsEventsPage,
    fillPersonalDataPage,
    paymentPage,
    validateBookingMixPage,
    AddOns
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
    await showsEventsPage.selectCategoryMix_ws(booking.categories);
    await showsEventsPage.openBookingDetails();
    await validateBookingMixPage.validateBookingDetailsMixed(
    booking.title,
    booking.bookingDate,
    booking.time,
    booking.categories
  );

    await validateBookingMixPage.addToCartAndProceedMixed(
      booking.title,
      booking.time,
      booking.bookingDate,
      booking.categories
    );
    await AddOns.addOnsThemePark();
    await validateBookingMixPage.validateShoppingCartMixed_ws(bookingData.LoloMix);
    await showsEventsPage.proceedFromShoppingCart();
    await fillPersonalDataPage.fillPersonalData(personalInfoData.indonesia);
    await paymentPage.validatePaymentDetailsMixed_ws(bookingData.LoloMix);
    await paymentPage.selectPaymentMethod({
      categories: booking.categories,
      method: booking.payment.method,
    });
      });

test('@Booking-with-mixed-category-without-seat-guest-AddOns-SkyWay', async ({
    page,
    homePage,
    showsEventsPage,
    fillPersonalDataPage,
    paymentPage,
    validateBookingMixPage,
    AddOns
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
    await showsEventsPage.selectCategoryMix_ws(booking.categories);
    await showsEventsPage.openBookingDetails();
    await validateBookingMixPage.validateBookingDetailsMixed(
    booking.title,
    booking.bookingDate,
    booking.time,
    booking.categories
  );

    await validateBookingMixPage.addToCartAndProceedMixed(
      booking.title,
      booking.time,
      booking.bookingDate,
      booking.categories
    );
    await AddOns.addOnsSkyway();
    await validateBookingMixPage.validateShoppingCartMixed_ws(bookingData.LoloMix);
    await showsEventsPage.proceedFromShoppingCart();
    await fillPersonalDataPage.fillPersonalData(personalInfoData.indonesia);
    await paymentPage.validatePaymentDetailsMixed_ws(bookingData.LoloMix);
    await paymentPage.selectPaymentMethod({
      categories: booking.categories,
      method: booking.payment.method,
    });
      });
test('@Booking-with-mixed-category-without-seat-guest-AddOns-Dining', async ({
    page,
    homePage,
    showsEventsPage,
    fillPersonalDataPage,
    paymentPage,
    validateBookingMixPage,
    AddOns
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
    await showsEventsPage.selectCategoryMix_ws(booking.categories);
    await showsEventsPage.openBookingDetails();
    await validateBookingMixPage.validateBookingDetailsMixed(
    booking.title,
    booking.bookingDate,
    booking.time,
    booking.categories
  );

    await validateBookingMixPage.addToCartAndProceedMixed(
      booking.title,
      booking.time,
      booking.bookingDate,
      booking.categories
    );
    await AddOns.addOnsDining();
    await validateBookingMixPage.validateShoppingCartMixed_ws(bookingData.LoloMix);
    await showsEventsPage.proceedFromShoppingCart();
    await fillPersonalDataPage.fillPersonalData(personalInfoData.indonesia);
    await paymentPage.validatePaymentDetailsMixed_ws(bookingData.LoloMix);
    await paymentPage.selectPaymentMethod({
      categories: booking.categories,
      method: booking.payment.method,
    });
      });
test('@Booking-with-max-purchase', async ({
    page,
    homePage,
    showsEventsPage,
    fillPersonalDataPage,
    paymentPage,
    validateBookingMixPage,
  }) => {
    const booking = {
      ...bookingData.hahamaxpurchase,
      //ticketQty: qty,
    };

    await homePage.goto();
    await homePage.openShowsAndEvents();
    await homePage.stayAsGuest();
    await showsEventsPage.selectEvent(booking.title);
    await showsEventsPage.selectDate(booking.bookingDate);
    await showsEventsPage.selectTime(booking.time);
    await showsEventsPage.selectCategoryMix_ws(booking.categories);
    await showsEventsPage.openBookingDetails();
    await validateBookingMixPage.validateBookingDetailsMixed(
    booking.title,
    booking.bookingDate,
    booking.time,
    booking.categories
  );
await validateBookingMixPage.addToCartAndProceedMixed(
  booking.title,
  booking.time,
  booking.bookingDate,
  booking.categories
);
await validateBookingMixPage.validateShoppingCartMixed_ws(bookingData.LoloMix);
});