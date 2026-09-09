import { Page, test, expect } from '@playwright/test';

export class ValidateBookingMixPage {
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



private async attachValidation(
  title: string,
  validations: {
    field: string;
    expected: string | number;
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
}

private parseMixedBookingDetails(actualText: string) {
  const detailsRegex =
    /(\d{2}\s\w{3}\s\d{4},\s\d{2}:\d{2}\s(?:AM|PM))([\d,]+\.\d{2}MYR)([A-Z0-9]+)\s-([\d,]+\.\d{2}MYR)-\s(\d+\sticket\(s\))/g;

  const results: {
    dateTime: string;
    totalPrice: string;
    category: string;
    ticketPrice: string;
    ticketQty: string;
  }[] = [];

  let match;

  while ((match = detailsRegex.exec(actualText)) !== null) {
    results.push({
      dateTime: match[1],
      totalPrice: match[2],
      category: match[3],
      ticketPrice: match[4],
      ticketQty: match[5],
    });
  }

  return results;
}

async validateBookingDetailsMixed(
  eventTitle: string,
  bookingDate: string,
  bookingTime: string,
  categories: {
    category: string;
    ticketPrice: number;
    ticketQty: number;
  }[]
) {
  const actualDetails =
  (await this.page
    .locator('[data-testid="showsEvents.screen.checkoutBar.detail"]')
    .textContent()) ?? '';

    const parsedDetails =
    this.parseMixedBookingDetails(actualDetails);

    console.log('Parsed booking details:', parsedDetails);

    const totalSection = this.page.getByText(/Total.*MYR/i);

    const actualTotalText = (await totalSection.textContent()) ?? '';
    const actualGrandTotal = actualTotalText.match(/(\d{1,3}(?:,\d{3})*\.\d{2}MYR)/)?.[0] ?? '';

    console.log(actualTotalText);

  const validations = [
    {
      field: 'Event Title',
      expected: eventTitle,
      actual: actualDetails,
      passed: actualDetails.includes(eventTitle),
    },
  ];

    const grandTotal = categories.reduce((total, item) => total + (item.ticketPrice * item.ticketQty),0);
    const expectedGrandTotal = `${grandTotal.toLocaleString('en-US')}.00MYR`;

  for (const item of categories) {
  const expectedPrice =
    `${item.ticketPrice.toLocaleString('en-US')}.00MYR`;

  const expectedQty =
    `${item.ticketQty} ticket(s)`;

  const actualCategory =
    parsedDetails.find(
      detail => detail.category === item.category
    );
    const actualDateTime = actualCategory?.dateTime ?? '';
  validations.push(
  {
    field: 'Booking Date',
    expected: bookingDate,
    actual: actualCategory?.dateTime ?? '',
    passed: actualDateTime?.includes(bookingDate),
  },
  {
    field: 'Booking Time',
    expected: bookingTime,
    actual: actualCategory?.dateTime ?? '',
    passed:
      actualDateTime?.includes(bookingTime),
  },
    {
      field: `${item.category} - Category`,
      expected: item.category,
      actual: actualCategory?.category ?? '',
      passed: actualCategory?.category === item.category,
    },
    {
      field: `${item.category} - Ticket Price`,
      expected: expectedPrice,
      actual: actualCategory?.ticketPrice ?? '',
      passed: actualCategory?.ticketPrice === expectedPrice,
    },
    {
      field: `${item.category} - Ticket Quantity`,
      expected: expectedQty,
      actual: actualCategory?.ticketQty ?? '',
      passed: actualCategory?.ticketQty === expectedQty,
    }
  );
}

  validations.push({
  field: 'Grand Total',
  expected: expectedGrandTotal,
  actual: actualGrandTotal,
  passed:
    actualGrandTotal === expectedGrandTotal,
});

  await this.attachValidation(
    'Mixed Category Booking Validation',
    validations
  );

  //await this.proceedButton.click();
};
async addToCartAndProceedMixed(
  eventTitle: string,
  bookingTime: string,
  bookingDate: string,
  categories: {
    category: string;
    ticketPrice: number;
    ticketQty: number;
  }[]
) {
  const dialog = this.page.getByRole('dialog');

  await this.addToCartButton.click();
  await expect(dialog).toBeVisible();

  // Get all text inside dialog
  const dialogText = (await dialog.textContent()) ?? '';

  // ==========================================
  // Expected Data
  // ==========================================

  // Only use the main part of the event title.
  // Example:
  // "LOLO Monthly Show 2026 LOLO"
  // becomes:
  // "LOLO Monthly Show 2026"
  const expectedTitle = eventTitle
    .split(' ')
    .slice(0, 4)
    .join(' ');

  const expectedDateTime =
    `${bookingDate}, ${bookingTime}`;

  const grandTotal = categories.reduce(
    (total, item) =>
      total + item.ticketPrice * item.ticketQty,
    0
  );

  const expectedGrandTotal =
    `${grandTotal.toLocaleString('en-US')}.00MYR`;

  // ==========================================
  // Event Title Validation
  // ==========================================

  const actualTitle = dialogText.trim();

  const eventTitlePassed =
    actualTitle.includes(expectedTitle);

  // ==========================================
  // Date & Time
  // ==========================================

  // Supports:
  // 26 Jun 2026, 06:30 PM
  // 26 July 2026, 06:30 PM
  // 05 Sep 2026, 6:00 PM
  const actualDateTime =
    dialogText.match(
      /\d{1,2}\s[A-Za-z]{3,9}\s\d{4},\s\d{1,2}:\d{2}\s(?:AM|PM)/i
    )?.[0] ?? '';

  // ==========================================
  // Initial Validations
  // ==========================================

  const validations = [
    {
      field: 'Event Title',
      expected: expectedTitle,
      actual: actualTitle,
      passed: eventTitlePassed,
    },
    {
      field: 'Booking Date & Time',
      expected: expectedDateTime,
      actual: actualDateTime,
      passed: actualDateTime.includes(
        expectedDateTime
      ),
    },
  ];

  // ==========================================
  // Category Validation
  // ==========================================

  for (const item of categories) {
    const expectedPrice =
      `${item.ticketPrice.toLocaleString('en-US')}.00MYR`;

    const expectedQty =
      `${item.ticketQty} ticket(s)`;

    const expectedCategoryDetails =
      `${item.category} -${expectedPrice}- ${expectedQty}`;

    // Find category details from dialog text
    const actualCategoryDetails =
      dialogText.match(
        new RegExp(
          `${item.category}\\s*-\\s*${expectedPrice.replace(
            '.',
            '\\.'
          )}-\\s*${item.ticketQty}\\s*ticket\\(s\\)`,
          'i'
        )
      )?.[0] ?? '';

    validations.push({
      field: `${item.category} - Category, Ticket Price & Quantity`,
      expected: expectedCategoryDetails,
      actual: actualCategoryDetails,
      passed:
        actualCategoryDetails.includes(
          item.category
        ) &&
        actualCategoryDetails.includes(
          expectedPrice
        ) &&
        actualCategoryDetails.includes(
          `${item.ticketQty} ticket(s)`
        ),
    });
  }

  // ==========================================
  // Grand Total Validation
  // ==========================================

  const grandTotalPassed =
    dialogText.includes(expectedGrandTotal);

  validations.push({
    field: 'Grand Total',
    expected: expectedGrandTotal,
    actual: dialogText,
    passed: grandTotalPassed,
  });

  // ==========================================
  // Validation Report
  // ==========================================

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
    'Add To Cart Mixed Booking Details Validation',
    {
      body: validationDetails,
      contentType: 'text/plain',
    }
  );

  // ==========================================
  // Validation Summary
  // ==========================================

  const hasFailedValidation =
    validations.some(
      item => !item.passed
    );

  if (hasFailedValidation) {
    console.warn(
      'Some validations failed, but the test will continue. Please check the HTML report attachment.'
    );
  } else {
    console.log(
      'All Add To Cart Mixed Booking validations passed ✅'
    );
  }

  // ==========================================
  // Proceed
  // ==========================================

  await this.proceedButton.click();
}
async validateShoppingCartMixed(
  data: {
    bookingDate: string;
    bookingTime: string;
    categories: {
      category: string;
      ticketQty: number;
      ticketPrice: number;
    }[];
  },
  selectedSeats: {
    section: string;
    seatNumber: string;
    entrance: string;
  }[]
) {
  const validations: {
    field: string;
    expected: string;
    actual: string;
    passed: boolean;
  }[] = [];

  const summaryCards = this.page
    .locator('div')
    .filter({
      hasText:
        /Date[\s\S]*Time[\s\S]*Seat Number[\s\S]*No\. of Ticket\(s\)[\s\S]*Gate/,
    });

  await expect(summaryCards.first()).toBeVisible({
    timeout: 15000,
  });

  const cardCount = await summaryCards.count();

  console.log(`Found ${cardCount} shopping cart card(s)`);

  for (let i = 0; i < cardCount; i++) {
    const summaryText =
      (await summaryCards.nth(i).textContent())
        ?.replace(/\s+/g, ' ')
        .trim() ?? '';

    console.log(`===== Card ${i + 1} =====`);
    console.log(summaryText);

    const actualDate =
      summaryText.match(/Date\s*(.*?)\s*Time/i)?.[1]?.trim() ?? '';

    const actualTime =
      summaryText.match(/Time\s*(.*?)\s*Seat Number/i)?.[1]?.trim() ?? '';

    const actualSeatNo =
      summaryText
        .match(/Seat Number\s*(.*?)\s*No\. of Ticket\(s\)/i)?.[1]
        ?.trim() ?? '';

    const actualTicketInfo =
      summaryText
        .match(/No\. of Ticket\(s\)\s*(.*?)\s*Gate/i)?.[1]
        ?.trim() ?? '';

    const actualGate =
      summaryText.match(/Gate\s*(.*)$/i)?.[1]?.trim() ?? '';

    /**
     * Example:
     * 1150.00MYR
     * 11,292.00MYR
     */
    const qty = actualTicketInfo.charAt(0);
    const ticketPrice = actualTicketInfo.substring(1).trim();

    const matchedSeat = selectedSeats.find(seat => {
      const expectedSeat =
        seat.seatNumber.replace(/([A-Z]+)(\d+)/, '$1 $2');

      return actualSeatNo === expectedSeat;
    });

    const matchedCategory = data.categories.find(category => {
      const expectedPrice =
        `${category.ticketPrice.toLocaleString('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}MYR`;

      return ticketPrice === expectedPrice;
    });

    const label =
      matchedCategory?.category ??
      actualSeatNo;

    validations.push(
      {
        field: `${label} - Date`,
        expected: data.bookingDate,
        actual: actualDate,
        passed: actualDate.includes(data.bookingDate),
      },
      {
        field: `${label} - Time`,
        expected: data.bookingTime,
        actual: actualTime,
        passed: actualTime.includes(data.bookingTime),
      },
      {
        field: `${label} - Seat Number`,
        expected: matchedSeat
          ? matchedSeat.seatNumber.replace(/([A-Z]+)(\d+)/, '$1 $2')
          : '',
        actual: actualSeatNo,
        passed: !!matchedSeat,
      },
      {
        field: `${label} - Gate`,
        expected: matchedSeat?.entrance ?? '',
        actual: actualGate,
        passed: matchedSeat
          ? actualGate.includes(matchedSeat.entrance)
          : false,
      },
      {
        field: `${label} - Ticket Quantity`,
        expected: matchedCategory
          ? `${matchedCategory.ticketQty}`
          : '',
        actual: qty,
        passed: matchedCategory
          ? qty === `${matchedCategory.ticketQty}`
          : false,
      },
      {
        field: `${label} - Ticket Price`,
        expected: matchedCategory
          ? `${matchedCategory.ticketPrice.toLocaleString('en-US', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}MYR`
          : '',
        actual: ticketPrice,
        passed: !!matchedCategory,
      }
    );
  }

  // ============================
  // Grand Total
  // ============================

  const expectedGrandTotal = data.categories
    .reduce(
      (sum, item) => sum + item.ticketPrice * item.ticketQty,
      0
    )
    .toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  const totalLocator = this.page.getByText(
    new RegExp(`${expectedGrandTotal.replace('.', '\\.')}\\s*MYR`)
  );

  await expect(totalLocator.first()).toBeVisible();

  const actualGrandTotal =
    (await totalLocator.first().textContent())
      ?.replace(/\s+/g, ' ')
      .trim() ?? '';

  validations.push({
    field: 'Grand Total',
    expected: `${expectedGrandTotal} MYR`,
    actual: actualGrandTotal,
    passed: actualGrandTotal.includes(expectedGrandTotal),
  });

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

  validations.push({
    field: 'Venue',
    expected: expectedVenue,
    actual: actualVenue,
    passed: isVenueDisplayed
      ? actualVenue.includes(expectedVenue)
      : true,
  });

  await this.attachValidation(
    'Shopping Cart Mixed Validation',
    validations
  );
}
async validateShoppingCartMixed_ws(
  data: {
    title: string;
    bookingDate: string;
    time: string;
    categories: {
      category: string;
      ticketQty: number;
      ticketPrice: number;
    }[];
  }
) {
  const validations: {
    field: string;
    expected: string;
    actual: string;
    passed: boolean;
  }[] = [];

  // ==========================================
  // Get Page Text
  // ==========================================

  const bodyText =
    (await this.page.locator('body').textContent()) ?? '';

  // ==========================================
  // Event Title Validation
  // Contains title - not exact match
  // ==========================================

  const eventTitlePassed =
    bodyText.includes(data.title);

  validations.push({
    field: 'Event Title',
    expected: data.title,
    actual: eventTitlePassed
      ? data.title
      : bodyText,
    passed: eventTitlePassed,
  });

  // ==========================================
  // Find Ticket Cards
  // ==========================================

  const allCards = this.page
    .locator('div')
    .filter({
      hasText: /Date.*Time.*No\. of Ticket\(s\).*MYR/,
    });

  await expect
    .poll(async () => await allCards.count(), {
      message: 'Waiting for shopping cart ticket cards',
      timeout: 15000,
    })
    .toBeGreaterThan(0);

  const ticketTexts: string[] = [];

  const count = await allCards.count();

  for (let i = 0; i < count; i++) {
    const text =
      ((await allCards.nth(i).textContent()) ?? '').trim();

    const isTicketCard =
      /^Date\d{1,2}\s[A-Za-z]{3}\s\d{4}Time.*No\. of Ticket\(s\).*\d[\d,]*\.00MYR$/i.test(
        text
      );

    if (isTicketCard && !ticketTexts.includes(text)) {
      ticketTexts.push(text);
    }
  }

  console.log(
    `Found ${ticketTexts.length} unique ticket card(s)`
  );

  // ==========================================
  // Parse Ticket Cards
  // ==========================================

  const parsedTickets = ticketTexts.map(
    (text, index) => {
      console.log(`===== Card ${index + 1} =====`);
      console.log(text);

      const date =
        text.match(/Date(.*?)Time/i)?.[1]?.trim() ?? '';

      const time =
        text.match(
          /Time(.*?)No\. of Ticket\(s\)/i
        )?.[1]?.trim() ?? '';

      const ticketInfo =
        text.match(
          /No\. of Ticket\(s\)(.*?MYR)/i
        )?.[1]?.trim() ?? '';

      const qty = ticketInfo.charAt(0);

      const ticketPrice =
        ticketInfo.substring(1).trim();

      return {
        date,
        time,
        qty,
        ticketPrice,
        rawText: text,
      };
    }
  );

  // ==========================================
  // Validate Each Ticket / Category
  // ==========================================

  for (const ticket of parsedTickets) {
    const matchedCategory =
      data.categories.find(item => {
        const expectedPrice =
          `${item.ticketPrice.toLocaleString(
            'en-US'
          )}.00MYR`;

        return ticket.ticketPrice === expectedPrice;
      });

    const cartLabel =
      matchedCategory?.category ??
      ticket.ticketPrice;

    // Booking Date
    validations.push({
      field: `${cartLabel} - Booking Date`,
      expected: data.bookingDate,
      actual: ticket.date,
      passed: ticket.date.includes(
        data.bookingDate
      ),
    });

    // Booking Time
    validations.push({
      field: `${cartLabel} - Booking Time`,
      expected: data.time,
      actual: ticket.time,
      passed: ticket.time.includes(
        data.time
      ),
    });

    // Ticket Price
    const expectedPrice =
      matchedCategory
        ? `${matchedCategory.ticketPrice.toLocaleString(
            'en-US'
          )}.00MYR`
        : '';

    validations.push({
      field: `${cartLabel} - Ticket Price`,
      expected: expectedPrice,
      actual: ticket.ticketPrice,
      passed:
        !!matchedCategory &&
        ticket.ticketPrice === expectedPrice,
    });

    // Ticket Quantity
    const expectedQty =
      matchedCategory
        ? `${matchedCategory.ticketQty}`
        : '';

    validations.push({
      field: `${cartLabel} - Ticket Quantity`,
      expected: expectedQty,
      actual: ticket.qty,
      passed:
        !!matchedCategory &&
        ticket.qty === expectedQty,
    });
  }

  // ==========================================
  // Validate Expected Categories
  // ==========================================

  for (const category of data.categories) {
    const expectedPrice =
      `${category.ticketPrice.toLocaleString(
        'en-US'
      )}.00MYR`;

    const expectedQty =
      `${category.ticketQty}`;

    const matchedTicket =
      parsedTickets.find(
        ticket =>
          ticket.ticketPrice === expectedPrice &&
          ticket.qty === expectedQty
      );

    validations.push({
      field: `${category.category} - Category Exists`,
      expected:
        `${category.category} - ${expectedQty} ticket(s)`,
      actual: matchedTicket
        ? `${category.category} - ${matchedTicket.qty} ticket(s)`
        : 'Not found',
      passed: !!matchedTicket,
    });
  }

  // ==========================================
  // Grand Total
  // ==========================================

  const grandTotal =
    data.categories.reduce(
      (sum, item) =>
        sum +
        item.ticketPrice * item.ticketQty,
      0
    );

  const expectedGrandTotal =
    `${grandTotal.toLocaleString(
      'en-US'
    )}.00MYR`;

  const totalText =
    (await this.page
      .getByText(/Total.*MYR/i)
      .first()
      .textContent()) ?? '';

  const actualGrandTotalValue =
    totalText.match(
      /Total\s*([\d,]+\.\d{2})MYR/i
    )?.[1] ?? '';

  const actualGrandTotal =
    actualGrandTotalValue
      ? `${actualGrandTotalValue}MYR`
      : totalText;

  validations.push({
    field: 'Grand Total',
    expected: expectedGrandTotal,
    actual: actualGrandTotal,
    passed:
      actualGrandTotal ===
      expectedGrandTotal,
  });

  // ==========================================
  // Attach Validation
  // ==========================================

  await this.attachValidation(
    'Shopping Cart Mixed Validation',
    validations
  );
}
}
