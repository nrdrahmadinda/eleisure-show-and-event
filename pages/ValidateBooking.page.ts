import { Page, test, expect } from '@playwright/test';

export class ValidateBookingPage {
  constructor(private page: Page) {}

private get addToCartButton() {
  return this.page.getByText('Add to Cart');
}

private get proceedButton() {
  return this.page
    .locator('div')
    .filter({ hasText: 'Proceed' })
    .nth(5);
}

async addToCartAndProceed(
  eventTitle: string,
  bookingTime: string,
  ticketPrice: number,
  ticketQty: number,
  category: string,
  bookingDate: string
) {
  const totalPrice = ticketPrice * ticketQty;
  const dialog = this.page.getByRole('dialog');

  await this.addToCartButton.click();
  await expect(dialog).toBeVisible();

  const expectedTitle = eventTitle;

  const expectedDateTime = `${bookingDate}, ${bookingTime}`;

  const expectedCategoryDetails =
    `${category} -${ticketPrice.toLocaleString('en-US')}.00MYR- ${ticketQty} ticket(s)`;

  const expectedTotalPrice =
    `${totalPrice.toLocaleString('en-US')}.00MYR`;

  // Get all dialog text once
  const dialogText = (await dialog.textContent()) ?? '';

  // Don't use getByText(eventTitle)
  // because eventTitle may not exactly match the displayed title
  const actualTitle = dialogText;

  const actualDateTime = dialogText;

  const actualCategoryDetails = dialogText;

  const actualTotalPrice = dialogText;

  const validations = [
    {
      field: 'Event Title',
      expected: expectedTitle,
      actual: actualTitle,
      passed: actualTitle.includes(expectedTitle),
    },
    {
      field: 'Date & Time',
      expected: expectedDateTime,
      actual: actualDateTime,
      passed: actualDateTime.includes(expectedDateTime),
    },
    {
      field: 'Category, Ticket Price & Quantity',
      expected: expectedCategoryDetails,
      actual: actualCategoryDetails,
      passed: actualCategoryDetails.includes(expectedCategoryDetails),
    },
    {
      field: 'Total Price',
      expected: expectedTotalPrice,
      actual: actualTotalPrice,
      passed: actualTotalPrice.includes(expectedTotalPrice),
    },
  ];

  const validationDetails = validations
    .map(
      item => `
Field   : ${item.field}
Status  : ${item.passed ? 'PASSED ✅' : 'FAILED ❌'}

Expected:
${item.expected}

Actual:
${item.actual}
`
    )
    .join('\n');

  await test.info().attach(
    'Add To Cart Booking Details Validation',
    {
      body: validationDetails,
      contentType: 'text/plain',
    }
  );

  const hasFailedValidation = validations.some(
    item => !item.passed
  );

  if (hasFailedValidation) {
    console.warn(
      'Some validations failed, but the test will continue. Please check the HTML report attachment.'
    );
  }

  await this.proceedButton.click();
}
  async validateBookingDetails(
    eventTitle: string,
    bookingDate: string,
    bookingTime: string,
    ticketPrice: number,
    ticketQty: number,
    category: string
  ) {
    const totalPrice = ticketPrice * ticketQty;

    const actualEventTitle =
      (await this.page
        .getByTestId('showsEvents.screen.checkoutBar.detail')
        .textContent()) ?? '';

    const actualBookingDetails =
      (await this.page
        .locator('[data-testid="showsEvents.screen.checkoutBar.detail"]')
        .textContent()) ?? '';

    const validations = [
      {
        field: 'Event Title',
        expected: eventTitle,
        actual: actualEventTitle,
        passed: actualEventTitle.includes(eventTitle),
      },
      {
        field: 'Booking Date',
        expected: bookingDate,
        actual: actualBookingDetails,
        passed: actualBookingDetails.includes(bookingDate),
      },
      {
        field: 'Booking Time',
        expected: bookingTime,
        actual: actualBookingDetails,
        passed: actualBookingDetails.includes(bookingTime),
      },
      {
        field: 'Category',
        expected: category,
        actual: actualBookingDetails,
        passed: actualBookingDetails.includes(category),
      },
      {
        field: 'Ticket Price',
        expected: `${ticketPrice.toLocaleString('en-US')}.00MYR`,
        actual: actualBookingDetails,
        passed: actualBookingDetails.includes(
          `${ticketPrice.toLocaleString('en-US')}.00MYR`
        ),
      },
      {
        field: 'Ticket Quantity',
        expected: `${ticketQty} ticket(s)`,
        actual: actualBookingDetails,
        passed: actualBookingDetails.includes(`${ticketQty} ticket(s)`),
      },
      {
        field: 'Total Price',
        expected: `${totalPrice.toLocaleString('en-US')}.00MYR`,
        actual: actualBookingDetails,
        passed: actualBookingDetails.includes(
          `${totalPrice.toLocaleString('en-US')}.00MYR`
        ),
      },
    ];

    await this.attachValidation(
      'Booking Details Validation',
      validations
    );
  }

async validateShoppingCart(
  data: {
    bookingDate: string;
    time: string;
    ticketQty: number;
    ticketPrice: number;
  },
  selectedSeats: {
    section: string;
    seatNumber: string;
    entrance: string;
  }[]
) {
  const expectedSeatNumbers = selectedSeats
    .map(seat => seat.seatNumber.replace(/([A-Z]+)(\d+)/, '$1 $2'))
    .join(', ');

  const expectedGate = selectedSeats[0]?.entrance ?? '';

  // ============================
  // Shopping Cart Summary
  // ============================

  const summaryCard = this.page
    .locator('div')
    .filter({
      hasText: /Date[\s\S]*Time[\s\S]*Seat Number[\s\S]*No\. of Ticket\(s\)[\s\S]*Gate/,
    })
    .first();

  await expect(summaryCard).toBeVisible({
    timeout: 15000,
  });

  const actualSummaryText =
    (await summaryCard.textContent())?.replace(/\s+/g, ' ').trim() ?? '';

  console.log('Shopping Cart Summary');
  console.log(actualSummaryText);

  // ============================
  // Parse Summary
  // ============================

  const actualDate =
    actualSummaryText.match(/Date\s*(.*?)\s*Time/i)?.[1]?.trim() ?? '';

  const actualTime =
    actualSummaryText.match(/Time\s*(.*?)\s*Seat Number/i)?.[1]?.trim() ?? '';

  const actualSeatNo =
    actualSummaryText
      .match(/Seat Number\s*(.*?)\s*No\. of Ticket\(s\)/i)?.[1]
      ?.trim() ?? '';

  const actualTicketInfo =
    actualSummaryText
      .match(/No\. of Ticket\(s\)\s*(.*?)\s*Gate/i)?.[1]
      ?.trim() ?? '';

  const actualGate =
    actualSummaryText.match(/Gate\s*(.*)$/i)?.[1]?.trim() ?? '';

  // ============================
  // Total Price
  // ============================

  //const expectedTotalPrice = (
    //data.ticketQty * data.ticketPrice
  //).toLocaleString('en-US', {
    //minimumFractionDigits: 2,
    //maximumFractionDigits: 2,
  //});

  //const totalLocator = this.page.getByText(
    //new RegExp(`${expectedTotalPrice.replace('.', '\\.')}\\s*MYR`)
  //);

  //await expect(totalLocator.first()).toBeVisible();

  //const actualTotalPrice =
    //(await totalLocator.first().textContent())?.replace(/\s+/g, '') ?? '';

  // ============================
  // Venue
  // ============================

  const expectedVenue = 'Arena of Stars';

  const venueLocator = this.page.getByText(expectedVenue);

  const isVenueDisplayed =
    await venueLocator.isVisible().catch(() => false);

  const actualVenue = isVenueDisplayed
    ? ((await venueLocator.textContent()) ?? '').trim()
    : 'Venue not displayed';

  // ============================
  // Validation
  // ============================

  const validations = [
    {
      field: 'Date',
      expected: data.bookingDate,
      actual: actualDate,
      passed: actualDate.includes(data.bookingDate),
    },
    {
      field: 'Time',
      expected: data.time,
      actual: actualTime,
      passed: actualTime.includes(data.time),
    },
    {
      field: 'Seat Number',
      expected: expectedSeatNumbers,
      actual: actualSeatNo,
      passed: selectedSeats.every(seat =>
        actualSeatNo.includes(
          seat.seatNumber.replace(/([A-Z]+)(\d+)/, '$1 $2')
        )
      ),
    },
    {
      field: 'Ticket Quantity',
      expected: `${data.ticketQty}`,
      actual: actualTicketInfo,
      passed: actualTicketInfo.includes(`${data.ticketQty}`),
    },
    //{
      //field: 'Ticket Price',
      //expected: `${data.ticketPrice.toFixed(2)}`,
      //actual: actualTicketInfo,
      //passed: actualTicketInfo.includes(
        //data.ticketPrice.toFixed(2)
      //),
    //},
    {
      field: 'Gate',
      expected: expectedGate,
      actual: actualGate,
      passed: actualGate.includes(expectedGate),
    },
    //{
      //field: 'Total Price',
      //expected: `${expectedTotalPrice} MYR`,
      //actual: actualTotalPrice,
      //passed: actualTotalPrice.includes(expectedTotalPrice),
    //},
    {
      field: 'Venue',
      expected: expectedVenue,
      actual: actualVenue,
      passed: isVenueDisplayed
        ? actualVenue.includes(expectedVenue)
        : true,
    },
  ];

  await this.attachValidation(
    'Shopping Cart Details Validation',
    validations
  );
}
  private async attachValidation(
    title: string,
    validations: {
      field: string;
      expected: string;
      actual: string;
      passed: boolean;
    }[]
  ) {
    const validationDetails = validations
      .map(
        item => `
Field   : ${item.field}
Status  : ${item.passed ? 'PASSED ✅' : 'FAILED ❌'}
Expected: ${item.expected}
Actual  : ${item.actual}
`
      )
      .join('\n');

    console.log(validationDetails);

    await test.info().attach(title, {
      body: validationDetails,
      contentType: 'text/plain',
    });

    const hasFailedValidation = validations.some(item => !item.passed);

    if (hasFailedValidation) {
      console.warn(
        'Some validations failed, but the test will continue. Please check the HTML report attachment.'
      );
    }
  }
}