import { test } from '../fixtures/app.fixture';
import { ShoppingCartPage } from '../pages/ShoppingCartPage';
import {bookingData, memberData} from '../data/bookingData';
import { getFutureBookingDate } from '../utils/dateUtils';

const bookingDate = getFutureBookingDate(3);

test('@Delete-all-cart-items without seat selection', async ({ 
    page,
    homePage,
    showsEventsPage,
    validateBookingMixPage,
 }) => {
    const booking = {
      ...bookingData.LoloMix,
    }
    await homePage.goto();
    await homePage.openShowsAndEvents();
    await homePage.stayAsGuest();
    await showsEventsPage.selectEvent(booking.title);
    await showsEventsPage.selectTime(booking.time);
    await showsEventsPage.selectCategoryMix_ws(booking.categories,);
    await showsEventsPage.openBookingDetails();
    await validateBookingMixPage.addToCartAndProceedMixed(
    booking.title,
    booking.time,
    bookingDate,
    booking.categories
);
    const shoppingCartPage = new ShoppingCartPage(page);
    await shoppingCartPage.deleteAllCartItems();
    await page.waitForTimeout(5000);
});

test('@Delete Booking Ticket as Classic Member', async ({
    page,
    homePage,
    showsEventsPage,
    validateBookingPage,
    loginPage,
 }) => {
    const booking = {
      ...bookingData.LoloMixMember,
    }
    await homePage.goto();
    await loginPage.loginAsClassicMember(memberData.classicMember);
    await homePage.openShowsAndEvents();
    await showsEventsPage.selectEvent(booking.title);
    await showsEventsPage.selectTime(booking.time);
    await showsEventsPage.selectCategoryMember(booking.category,booking.ticketQty);
    await showsEventsPage.openBookingDetails();
    await validateBookingPage.addToCartAndProceed(
      booking.title,
      booking.time,
      booking.ticketPrice,
      booking.ticketQty,
      booking.category,
      booking.bookingDate
    );
    const shoppingCartPage = new ShoppingCartPage(page);
    await shoppingCartPage.deleteAllCartItems();
    await page.waitForTimeout(5000);
});