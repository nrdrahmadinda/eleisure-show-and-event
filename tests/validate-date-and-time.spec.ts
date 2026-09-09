import { test } from '../fixtures/app.fixture';
import {bookingData} from '../data/bookingData';

test('@Lisa Live date enable 24-25 July', async ({
  page,
  homePage,
  showsEventsPage,
}) => {
  const booking = {...bookingData.LoloMix};
  await homePage.goto();
  await homePage.openShowsAndEvents();
  await homePage.stayAsGuest();
  await showsEventsPage.selectEvent(booking.title);
  await homePage.validateCalendar(booking.calendar);
  await page.waitForTimeout(1000);
});

/*test('@HAHA Live date enable', async ({
  page,
  homePage,
  showsEventsPage,
}) => {
  const booking = {...bookingData.hahaLive2};
  await homePage.goto();
  await homePage.openShowsAndEvents();
  await homePage.stayAsGuest();
  await showsEventsPage.selectEvent(booking.title);
await homePage.validateCalendar(
  booking.calendar
);
  await page.waitForTimeout(1000);
});

test('@Booking multiple showtime Rose', async ({
    page,
    homePage,
    showsEventsPage,
    fillPersonalDataPage,
    paymentPage,
    validateBookingPage,
  }) => {
    const booking = {
      ...bookingData.hahaLive,
    };

    await homePage.goto();
    await homePage.openShowsAndEvents();
    await homePage.stayAsGuest();
    await showsEventsPage.selectEvent(booking.title);
    await showsEventsPage.selectDate(booking.bookingDate);
    await showsEventsPage.selectShowTime({showTimes: booking.showTimes,time: booking.time,});
    await showsEventsPage.selectTime(booking.time);
    await showsEventsPage.selectCategory(booking.category);
  });*/

