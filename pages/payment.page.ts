import { expect, Page, test } from '@playwright/test';

export class PaymentPage {
  constructor(private page: Page) {}

  private totalPrice(totalAmount: string) {
  const amountOnly = totalAmount.replace('MYR', '').trim();
  const escapedAmount = amountOnly.replace('.', '\\.');

  return this.page.getByText(
    new RegExp(`Total\\s*Amount\\s*to\\s*Pay\\s*${escapedAmount}\\s*(MYR)?`, 'i')
  );
  }

private get paymentDropdown() {return this.page.getByTestId('Component.CheckboxDropdown.Button');}
private paymentOption(method: string) {return this.page.locator('div')
    .filter({ hasText: new RegExp(`^${method}$`) }).nth(2);}
private get checkOutButton() {return this.page.getByText('Check Out');}

async selectPaymentMethod(data: {
  ticketQty?: number;
  ticketPrice?: number;
  categories?: {
    ticketQty: number;
    ticketPrice: number;
  }[];
  method: string;
  uncheckMarketing?: boolean;
}) {
  /*const grandTotal = data.categories
    ? data.categories.reduce(
        (sum, item) => sum + item.ticketQty * item.ticketPrice,
        0
      )
    : (data.ticketQty ?? 0) * (data.ticketPrice ?? 0);

  const totalAmount = grandTotal.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  console.log(`Expected payment total: ${totalAmount}`);

  const totalPrice = this.totalPrice(totalAmount);

  await expect(totalPrice).toBeVisible({
    timeout: 15000,
  });

  await totalPrice.click();*/

  await this.paymentDropdown.click();
  await this.paymentOption(data.method).click();

  // Optional: uncheck marketing switch
  if (data.uncheckMarketing) {
    const marketingSwitch = this.page.getByRole('switch');

    if (await marketingSwitch.isChecked()) {
      await marketingSwitch.uncheck();
    }
  }

  //await this.checkOutButton.click();
  //await this.page.waitForTimeout(15000);
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
async validatePaymentDetails(
  data: {
    title: string;
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
  const totalAmount = data.ticketPrice * data.ticketQty;

  const expectedSeatNumbers = selectedSeats.map(seat =>
    seat.seatNumber.replace(/([A-Z]+)(\d+)/, '$1 $2')
  );

  const expectedGate = selectedSeats[0]?.entrance ?? '';

  // ==========================================
  // PAYMENT DETAIL
  // ==========================================

  const detailContainer = this.page
    .locator('div')
    .filter({
      hasText: new RegExp(
        `Date\\s*${data.bookingDate.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}.*` +
        `Time\\s*${data.time.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}.*` +
        `No\\. of Ticket\\(s\\).*` +
        `Gate\\s*${expectedGate}`,
        'i'
      ),
    })
    .first();

  await expect(detailContainer).toBeVisible({
    timeout: 15000,
  });

  const detailText =
    (await detailContainer.textContent()) ?? '';

  console.log('PAYMENT DETAIL TEXT:', detailText);

  const actualDate =
    detailText.match(
      /Date\s*(.*?)\s*Time/i
    )?.[1]?.trim() ?? '';

  const actualTime =
    detailText.match(
      /Time\s*(.*?)\s*No\. of Ticket\(s\)/i
    )?.[1]?.trim() ?? '';

  const actualTicketInfo =
    detailText.match(
      /No\. of Ticket\(s\)\s*(.*?)\s*Gate/i
    )?.[1]?.trim() ?? '';

  const actualGate =
    detailText.match(
      /Gate\s*(.*?)\s*Seat Number/i
    )?.[1]?.trim() ?? '';

  const actualSeatNumbers =
    detailText.match(
      /Seat Number\s*(.*?)$/i
    )?.[1]?.trim() ?? '';

  const actualSeatNumberList = actualSeatNumbers
    .split(',')
    .map(seat => seat.trim())
    .filter(Boolean);

  // ==========================================
  // TOTAL AMOUNT
  // ==========================================

  /*const expectedTotalAmount =
    `${totalAmount.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}MYR`;

  const totalAmountLocator = this.page.getByText(
    `Amount${expectedTotalAmount}`,
    { exact: true }
  );

  await expect(totalAmountLocator).toBeVisible({
    timeout: 15000,
  });

  const actualTotalAmount =
    (await totalAmountLocator.textContent()) ?? '';

  console.log(
    'TOTAL AMOUNT:',
    actualTotalAmount
  );*/

  // ==========================================
  // VALIDATIONS
  // ==========================================

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
      field: 'No. of Ticket(s) - Quantity',
      expected: `${data.ticketQty}`,
      actual: actualTicketInfo,
      passed: actualTicketInfo.includes(
        `${data.ticketQty}`
      ),
    },

    {
      field: 'No. of Ticket(s) - Ticket Price',
      expected: `${data.ticketPrice.toFixed(2)}MYR`,
      actual: actualTicketInfo,
      passed: actualTicketInfo.includes(
        `${data.ticketPrice.toFixed(2)}MYR`
      ),
    },

    {
      field: 'Gate',
      expected: expectedGate,
      actual: actualGate,
      passed: actualGate.includes(expectedGate),
    },

    {
      field: 'Seat Number',
      expected: expectedSeatNumbers.join(', '),
      actual: actualSeatNumbers,
      passed:
        expectedSeatNumbers.length ===
          actualSeatNumberList.length &&
        expectedSeatNumbers.every(seat =>
          actualSeatNumberList.includes(seat)
        ),
    },

    /*{
      field: 'Total Amount',
      expected: expectedTotalAmount,
      actual: actualTotalAmount,
      passed: actualTotalAmount.includes(
        expectedTotalAmount
      ),
    },*/
  ];

  await this.attachValidation(
    'Payment Details Validation',
    validations
  );
}
async validatePaymentDetailsMixed(
  data: {
    title: string;
    bookingDate: string;
    time: string;
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
  const expectedVenue = 'Arena of Stars';

  const validations: {
    field: string;
    expected: string;
    actual: string;
    passed: boolean;
  }[] = [];

  const detailButtons = this.page.getByRole('button', {
    name: data.title,
  });

  await expect
    .poll(async () => await detailButtons.count(), {
      message: 'Waiting for payment detail sections',
      timeout: 15000,
    })
    .toBeGreaterThan(0);

  const count = await detailButtons.count();

  console.log(`Found ${count} payment detail section(s)`);

  const detailTexts: string[] = [];

  for (let i = 0; i < count; i++) {
    const button = detailButtons.nth(i);

    await button.click();

    const detailText =
      (await button.locator('../..').textContent()) ?? '';

    detailTexts.push(detailText);

    console.log(`===== Payment Detail ${i + 1} =====`);
    console.log(detailText);
  }

  const parsedDetails = detailTexts.map(text => {
    const date =
      text.match(/Date\s*(.*?)\s*Time/)?.[1]?.trim() ?? '';

    const time =
      text.match(/Time\s*(.*?)\s*No\. of Ticket\(s\)/)?.[1]?.trim() ?? '';

    const ticketInfo =
      text.match(/No\. of Ticket\(s\)\s*(.*?)\s*Gate/)?.[1]?.trim() ?? '';

    const gate =
      text.match(/Gate\s*(.*?)\s*Seat No\./)?.[1]?.trim() ?? '';

    const seatNo =
      text.match(/Seat No\.\s*(.*?)\s*Venue/)?.[1]?.trim() ?? '';

    const venue =
      text.match(/Venue\s*(.*?)\s*Subtotal/)?.[1]?.trim() ??
      (text.includes(expectedVenue) ? expectedVenue : '');

    const subtotal =
      text.match(/Subtotal\s*(\d{1,3}(?:,\d{3})*\.\d{2}MYR)/)?.[1] ?? '';

    const qty = ticketInfo.charAt(0);
    const ticketPrice = ticketInfo.substring(1).trim();

    return {
      date,
      time,
      qty,
      ticketPrice,
      gate,
      seatNo,
      venue,
      subtotal,
      rawText: text,
    };
  });

  for (const detail of parsedDetails) {
    const matchedSeat = selectedSeats.find(seat => {
      const expectedSeatNo = seat.seatNumber.replace(
        /([A-Z]+)(\d+)/,
        '$1 $2'
      );

      return detail.seatNo.includes(expectedSeatNo);
    });

    const matchedCategory = data.categories.find(item => {
      const expectedPrice =
        `${item.ticketPrice.toLocaleString('en-US')}.00MYR`;

      return detail.ticketPrice === expectedPrice;
    });

    const cartLabel =
      matchedCategory?.category ?? detail.seatNo;

    validations.push(
      {
        field: `${cartLabel} - Date`,
        expected: data.bookingDate,
        actual: detail.date,
        passed: detail.date.includes(data.bookingDate),
      },
      {
        field: `${cartLabel} - Time`,
        expected: data.time,
        actual: detail.time,
        passed: detail.time.includes(data.time),
      },
      {
        field: `${cartLabel} - No. of Ticket(s) Quantity`,
        expected: matchedCategory
          ? `${matchedCategory.ticketQty}`
          : '',
        actual: detail.qty,
        passed: matchedCategory
          ? detail.qty === `${matchedCategory.ticketQty}`
          : false,
      },
      {
        field: `${cartLabel} - Ticket Price`,
        expected: matchedCategory
          ? `${matchedCategory.ticketPrice.toLocaleString('en-US')}.00MYR`
          : '',
        actual: detail.ticketPrice,
        passed: !!matchedCategory,
      },
      {
        field: `${cartLabel} - Gate`,
        expected: matchedSeat?.entrance ?? '',
        actual: detail.gate,
        passed: matchedSeat
          ? detail.gate === matchedSeat.entrance
          : false,
      },
      {
        field: `${cartLabel} - Seat Number`,
        expected: matchedSeat
          ? matchedSeat.seatNumber.replace(/([A-Z]+)(\d+)/, '$1 $2')
          : '',
        actual: detail.seatNo,
        passed: !!matchedSeat,
      },
      {
        field: `${cartLabel} - Venue`,
        expected: expectedVenue,
        actual: detail.venue,
        passed: detail.venue.includes(expectedVenue),
      },
      {
        field: `${cartLabel} - Subtotal`,
        expected: matchedCategory
          ? `${(
              matchedCategory.ticketPrice *
              matchedCategory.ticketQty
            ).toLocaleString('en-US')}.00MYR`
          : '',
        actual: detail.subtotal,
        passed: matchedCategory
          ? detail.subtotal ===
            `${(
              matchedCategory.ticketPrice *
              matchedCategory.ticketQty
            ).toLocaleString('en-US')}.00MYR`
          : false,
      }
    );
  }

  await this.attachValidation(
    'Payment Details Mixed Validation',
    validations
  );
}
async validatePaymentDetailsMixed_ws(
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
  const expectedVenue = 'Arena of Stars';

  const validations: {
    field: string;
    expected: string;
    actual: string;
    passed: boolean;
  }[] = [];

  // ==========================================
  // Event Title Validation
  // ==========================================

  const pageText =
    (await this.page.locator('main').textContent()) ??
    (await this.page.locator('body').textContent()) ??
    '';

  const actualPageText = pageText
    .replace(/\s+/g, ' ')
    .trim();

  const eventTitlePassed =
    actualPageText
      .toLowerCase()
      .includes(data.title.toLowerCase());

  validations.push({
    field: 'Event Title',
    expected: data.title,
    actual: actualPageText,
    passed: eventTitlePassed,
  });

  // ==========================================
  // Payment Detail Cards
  // ==========================================

  const paymentCards = this.page
    .locator('div')
    .filter({
      hasText: /Date.*Time.*No\. of Ticket\(s\)/i,
    });

  await expect
    .poll(
      async () => {
        return await paymentCards.count();
      },
      {
        timeout: 15000,
        message:
          'Waiting for payment detail cards',
      }
    )
    .toBeGreaterThan(0);

  const count = await paymentCards.count();

  console.log(
    `Found ${count} payment card(s)`
  );

  // ==========================================
  // Validate Each Payment Card
  // ==========================================

  for (let i = 0; i < count; i++) {
    const text =
      (
        await paymentCards
          .nth(i)
          .textContent()
      )
        ?.replace(/\s+/g, ' ')
        .trim() ?? '';

    console.log(
      `===== Payment Card ${i + 1} =====`
    );

    console.log(text);

    // ------------------------------------------
    // Extract Date
    // ------------------------------------------

    const actualDate =
      text
        .match(
          /Date\s*(.*?)\s*Time/i
        )?.[1]
        ?.trim() ?? '';

    // ------------------------------------------
    // Extract Time
    // ------------------------------------------

    const actualTime =
      text
        .match(
          /Time\s*(.*?)\s*No\. of Ticket\(s\)/i
        )?.[1]
        ?.trim() ?? '';

    // ------------------------------------------
    // Extract Ticket Info
    // ------------------------------------------

    const actualTicketInfo =
      text
        .match(
          /No\. of Ticket\(s\)\s*(.*?)\s*Gate/i
        )?.[1]
        ?.trim() ?? '';

    // ------------------------------------------
    // Extract Gate
    // ------------------------------------------

    const actualGate =
      text
        .match(
          /Gate\s*(.*?)\s*(?:Seat Number|Seat No\.|Venue)/i
        )?.[1]
        ?.trim() ?? '';

    // ------------------------------------------
    // Extract Venue
    // ------------------------------------------

    const actualVenue =
      text
        .match(
          /Venue\s*(.*?)(?:Subtotal|$)/i
        )?.[1]
        ?.trim() ?? '';

    // ------------------------------------------
    // Ticket Quantity & Price
    // ------------------------------------------

    const qty =
      actualTicketInfo.charAt(0);

    const ticketPrice =
      actualTicketInfo
        .substring(1)
        .trim();

    const category =
      data.categories[i];

    const label =
      category?.category ??
      `Category ${i + 1}`;

    // ==========================================
    // Date Validation
    // ==========================================

    validations.push({
      field: `${label} - Date`,
      expected: data.bookingDate,
      actual: actualDate,
      passed:
        actualDate.includes(
          data.bookingDate
        ),
    });

    // ==========================================
    // Time Validation
    // ==========================================

    validations.push({
      field: `${label} - Time`,
      expected: data.time,
      actual: actualTime,
      passed:
        actualTime.includes(
          data.time
        ),
    });

    // ==========================================
    // Ticket Quantity Validation
    // ==========================================

    validations.push({
      field:
        `${label} - Ticket Quantity`,
      expected: category
        ? `${category.ticketQty}`
        : '',
      actual: qty,
      passed: category
        ? qty ===
          `${category.ticketQty}`
        : false,
    });

    // ==========================================
    // Ticket Price Validation
    // ==========================================

    const expectedPrice =
      category
        ? `${category.ticketPrice.toLocaleString(
            'en-US'
          )}.00MYR`
        : '';

    validations.push({
      field:
        `${label} - Ticket Price`,
      expected: expectedPrice,
      actual: ticketPrice,
      passed: category
        ? ticketPrice.includes(
            expectedPrice
          )
        : false,
    });

    // ==========================================
    // Gate Validation
    // ==========================================

    validations.push({
      field: `${label} - Gate`,
      expected: 'Displayed',
      actual: actualGate,
      passed:
        actualGate !== '',
    });

    // ==========================================
    // Venue Validation
    // ==========================================

    validations.push({
      field: `${label} - Venue`,
      expected: expectedVenue,
      actual: actualVenue,
      passed:
        actualVenue
          .toLowerCase()
          .includes(
            expectedVenue.toLowerCase()
          ),
    });
  }

  // ==========================================
  // Attach Validation
  // ==========================================

  await this.attachValidation(
    'Payment Details Mixed Validation',
    validations
  );
}
}