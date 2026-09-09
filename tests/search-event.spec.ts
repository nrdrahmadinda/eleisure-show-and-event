import { test } from '../fixtures/app.fixture';
import {bookingData,personalInfoData,} from '../data/bookingData';

test('@Booking-with-mixed-category-without-seat', async ({
    page,
    homePage,
    searchevent,
  }) => {
    const booking = {
      ...bookingData.LoloMix,
      //ticketQty: qty,
    };
    await homePage.goto();
    await homePage.openShowsAndEvents();
    await homePage.stayAsGuest();
    await searchevent.searchAndSelectEvent({
    keyword: 'LOLO',
    eventName: 'LOLO Monthly Show 2026',
    });

    await searchevent.searchEvent({
    keyword: 'Lisa',
    expectNotFound: true,
    });
  })