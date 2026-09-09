import { test } from '../fixtures/app.fixture';
import { memberData } from '../data/bookingData';
import {bookingData,personalInfoData,} from '../data/bookingData';
import { ShoppingCartPage } from '../pages/ShoppingCartPage';


test('@Login as Classic Member', async ({
    homePage,
    loginPage,

    }) => {
    const booking = {...bookingData.hahaLiveMember};
    await homePage.goto();
    await loginPage.loginAsClassicMember(memberData.classicMember);
    await homePage.openShowsAndEvents();

});

test('@Booking-Lolo-Event-member-qty-2', async ({
    page,
    loginPage,
    homePage,
    showsEventsPage,
    fillPersonalDataPage,
    paymentPage,
    validateBookingMixPage,
    validateBookingPage,
  }) => {
    const booking = {
      ...bookingData.LoloMixMember,
      //ticketQty: qty,
    };
    await homePage.goto();
    await loginPage.loginAsClassicMember(memberData.classicMember);
    await homePage.openShowsAndEvents();
    await showsEventsPage.selectEvent(booking.title);
    await showsEventsPage.selectDate(booking.bookingDate);
    await showsEventsPage.selectTime(booking.time);
    await showsEventsPage.selectCategoryMember(booking.category,booking.ticketQty);
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
    await fillPersonalDataPage.agreement();
    await paymentPage.validatePaymentDetailsMixed_ws(bookingData.LoloMix);
    await paymentPage.selectPaymentMethod({
      ticketQty: booking.ticketQty,
      ticketPrice: booking.ticketPrice,
      method: booking.payment.method,
    });
    const shoppingCartPage = new ShoppingCartPage(page);
    await shoppingCartPage.deleteAllCartItemsBook();
  });

test('@Booking Lolo and Add Ons Hotel', async ({ page,AddOns,
    loginPage,
    homePage,
    showsEventsPage,
    fillPersonalDataPage,
    paymentPage,
    validateBookingMixPage,
    validateBookingPage, }) => {

  const booking = {
      ...bookingData.LoloMixMember,
      //ticketQty: qty,
    };
  
  await homePage.goto();
    await loginPage.loginAsClassicMember(memberData.classicMember);
    await homePage.openShowsAndEvents();
    await showsEventsPage.selectEvent(booking.title);
    await showsEventsPage.selectDate(booking.bookingDate);
    await showsEventsPage.selectTime(booking.time);
    await showsEventsPage.selectCategoryMember(booking.category,booking.ticketQty);
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
  await AddOns.addOnsHotel();
  await validateBookingMixPage.validateShoppingCartMixed_ws(bookingData.LoloMix);
  await showsEventsPage.proceedFromShoppingCart();
  await fillPersonalDataPage.agreement();
    //await paymentPage.validatePaymentDetailsMixed_ws(bookingData.LoloMix);
  await paymentPage.selectPaymentMethod({
      ticketQty: booking.ticketQty,
      ticketPrice: booking.ticketPrice,
      method: booking.payment.method,
    });
  const shoppingCartPage = new ShoppingCartPage(page);
  await shoppingCartPage.deleteAllCartItemsBook();
  
});

test('@Booking Lolo and Add Ons Dining', async ({ page,AddOns,
    loginPage,
    homePage,
    showsEventsPage,
    fillPersonalDataPage,
    paymentPage,
    validateBookingMixPage,
    validateBookingPage, }) => {

  const booking = {
      ...bookingData.LoloMixMember,
      //ticketQty: qty,
    };
  
  await homePage.goto();
    await loginPage.loginAsClassicMember(memberData.classicMember);
    await homePage.openShowsAndEvents();
    await showsEventsPage.selectEvent(booking.title);
    await showsEventsPage.selectDate(booking.bookingDate);
    await showsEventsPage.selectTime(booking.time);
    await showsEventsPage.selectCategoryMember(booking.category,booking.ticketQty);
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
  await AddOns.addOnsDining();
  await validateBookingMixPage.validateShoppingCartMixed_ws(bookingData.LoloMix);
  await showsEventsPage.proceedFromShoppingCart();
  await fillPersonalDataPage.agreement();
    //await paymentPage.validatePaymentDetailsMixed_ws(bookingData.LoloMix);
  await paymentPage.selectPaymentMethod({
      ticketQty: booking.ticketQty,
      ticketPrice: booking.ticketPrice,
      method: booking.payment.method,
    });
  const shoppingCartPage = new ShoppingCartPage(page);
  await shoppingCartPage.deleteAllCartItemsBook();
  
});

test('@Booking Lolo and Add Ons SkyWay', async ({ page,AddOns,
    loginPage,
    homePage,
    showsEventsPage,
    fillPersonalDataPage,
    paymentPage,
    validateBookingMixPage,
    validateBookingPage, }) => {

  const booking = {
      ...bookingData.LoloMixMember,
      //ticketQty: qty,
    };
  
  await homePage.goto();
    await loginPage.loginAsClassicMember(memberData.classicMember);
    await homePage.openShowsAndEvents();
    await showsEventsPage.selectEvent(booking.title);
    await showsEventsPage.selectDate(booking.bookingDate);
    await showsEventsPage.selectTime(booking.time);
    await showsEventsPage.selectCategoryMember(booking.category,booking.ticketQty);
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
  await AddOns.addOnsSkyway();
  await validateBookingMixPage.validateShoppingCartMixed_ws(bookingData.LoloMix);
  await showsEventsPage.proceedFromShoppingCart();
  await fillPersonalDataPage.agreement();
    //await paymentPage.validatePaymentDetailsMixed_ws(bookingData.LoloMix);
  await paymentPage.selectPaymentMethod({
      ticketQty: booking.ticketQty,
      ticketPrice: booking.ticketPrice,
      method: booking.payment.method,
    });
  const shoppingCartPage = new ShoppingCartPage(page);
  await shoppingCartPage.deleteAllCartItemsBook();
  
});

test('@Booking Lolo and Add Ons ThemePark', async ({ page,AddOns,
    loginPage,
    homePage,
    showsEventsPage,
    fillPersonalDataPage,
    paymentPage,
    validateBookingMixPage,
    validateBookingPage, }) => {

  const booking = {
      ...bookingData.LoloMixMember,
      //ticketQty: qty,
    };
  
  await homePage.goto();
    await loginPage.loginAsClassicMember(memberData.classicMember);
    await homePage.openShowsAndEvents();
    await showsEventsPage.selectEvent(booking.title);
    await showsEventsPage.selectDate(booking.bookingDate);
    await showsEventsPage.selectTime(booking.time);
    await showsEventsPage.selectCategoryMember(booking.category,booking.ticketQty);
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
  await AddOns.addOnsThemePark();
  await validateBookingMixPage.validateShoppingCartMixed_ws(bookingData.LoloMix);
  await showsEventsPage.proceedFromShoppingCart();
  await fillPersonalDataPage.agreement();
    //await paymentPage.validatePaymentDetailsMixed_ws(bookingData.LoloMix);
  await paymentPage.selectPaymentMethod({
      ticketQty: booking.ticketQty,
      ticketPrice: booking.ticketPrice,
      method: booking.payment.method,
    });
  const shoppingCartPage = new ShoppingCartPage(page);
  await shoppingCartPage.deleteAllCartItemsBook();
  
});

test('@Booking-Lion-Event-member-qty-2', async ({
    page,
    loginPage,
    homePage,
    showsEventsPage,
    fillPersonalDataPage,
    paymentPage,
    validateBookingMixPage,
    validateBookingPage,
  }) => {
    const booking = {
      ...bookingData.LionMixMember,
      //ticketQty: qty,
    };
    await homePage.goto();
    await loginPage.loginAsClassicMember(memberData.classicMember);
    await homePage.openShowsAndEvents();
    await showsEventsPage.selectEvent(booking.title);
    await showsEventsPage.selectDate(booking.bookingDate);
    await showsEventsPage.selectTime(booking.time);
    await showsEventsPage.selectCategoryMixMember_ws(booking.categories);
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
    await validateBookingMixPage.validateShoppingCartMixed_ws(bookingData.LionMixMember);
    await showsEventsPage.proceedFromShoppingCart();
    await fillPersonalDataPage.agreement();
    await paymentPage.validatePaymentDetailsMixed_ws(bookingData.LionMixMember);
    await paymentPage.selectPaymentMethod({
      categories: booking.categories,
      method: booking.payment.method,
    });
  const shoppingCartPage = new ShoppingCartPage(page);
  await shoppingCartPage.deleteAllCartItemsBook();
  });