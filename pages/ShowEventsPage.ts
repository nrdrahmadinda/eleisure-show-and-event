import { expect, Page, test } from '@playwright/test';

export class ShowsEventsPage {
  constructor(private page: Page) {}

private async validateSelectedSeats(
  selectedSeatIndex: number,
  expectedQuantity: number,
  category: string
) {
  const selectedSeatLabel = this.page
    .getByText('Selected Seat :', { exact: true })
    .nth(selectedSeatIndex);

  await expect(
    selectedSeatLabel,
    `Selected Seat label should be displayed for ${category}`
  ).toBeVisible({
    timeout: 10000,
  });

  const selectedSeatContainer = selectedSeatLabel.locator('..');

  const selectedSeatText =
    (await selectedSeatContainer.textContent())?.trim() ?? '';

  console.log(
    `${category} selected seat information: ${selectedSeatText}`
  );

  const seatNumberText = selectedSeatText
    .replace(/Selected Seat\s*:/i, '')
    .trim();

  expect(
    seatNumberText,
    `Seat number should be displayed for ${category}`
  ).not.toBe('');

  const seatNumbers = seatNumberText
    .split(',')
    .map(seat => seat.trim())
    .filter(Boolean);

  expect(
    seatNumbers.length,
    `Expected ${expectedQuantity} selected seat(s) for ${category}, but found: ${seatNumberText}`
  ).toBe(expectedQuantity);

  console.log(
    `PASSED: ${category} has ${seatNumbers.length} selected seat(s): ${seatNumbers.join(', ')}`
  );
}

async selectEvent(eventTitle: string) {
  const event = this.page.getByRole('link', {
    name: eventTitle,
    exact: false,
  });

  await expect(event).toBeVisible({
    timeout: 10000,
  });

  await event.click();
}

async selectDate(bookingDate: string) {
  const [day, month, year] = bookingDate.split(' ');
  const targetMonth = `${month} ${year}`;

  const calendarPopup = this.page
    .locator(
      'div:nth-child(4) > div:nth-child(2) > div > div > div > div:nth-child(2)'
    )
    .first();

  const nextMonthButton = this.page.getByRole('button', {
    name: 'next month button',
  });

  // Maksimal pindah 12 bulan supaya tidak infinite loop
  for (let i = 0; i < 12; i++) {
    const monthVisible = await calendarPopup
      .getByText(targetMonth, { exact: true })
      .isVisible()
      .catch(() => false);

    if (monthVisible) {
      console.log(`Found month: ${targetMonth}`);
      break;
    }

    console.log(`Current month is not ${targetMonth}, click Next Month`);

    await nextMonthButton.click();

    await this.page.waitForTimeout(300);
  }

  console.log(`Selecting date ${day}`);

  await calendarPopup
    .locator('div.r-lrvibr')
    .filter({
      hasText: new RegExp(`^${day}$`),
    })
    .first()
    .click();
}
  async selectTime(time: string) {
    await this.page
      .locator('div')
      .filter({ hasText: new RegExp(`^${time}$`) })
      .first()
      .click();
  }

async selectCategory(category: string) {
  const categoryTicket = this.page.locator(
    'div:nth-child(2) > .css-175oi2r > svg'
  ).first();

  await expect(categoryTicket).toBeVisible();
  await categoryTicket.click();
}

async selectCategoryMix(category: string) {
  switch (category) {
    case 'VIP':
      await this.page
        .locator('div')
        .filter({ hasText: /^VIP$/ })
        .nth(1)
        .click();

      await this.page
        .locator('div:nth-child(2) > .css-175oi2r > svg')
        .first()
        .click();
      break;

    case 'PS3':
      await this.page
        .locator('div')
        .filter({ hasText: /^PS3$/ })
        .nth(1)
        .click();

      await this.page
        .locator('div:nth-child(4) > div:nth-child(2) > div:nth-child(2) > .css-175oi2r')
        .click();
      break;

    default:
      throw new Error(
        `Seat map selector is not defined for category: ${category}`
      );
  }
}

async increaseTicketQuantity(category: string, ticketQty: number) {
  for (let i = 1; i < ticketQty; i++) {
    if (category === 'PS3') {
      await this.page
        .locator(
          'div:nth-child(4) > div:nth-child(2) > div:nth-child(2) > .css-175oi2r > svg'
        )
        .click();
    } else {
      throw new Error(`Plus button selector is not defined for category: ${category}`);
    }

    await this.page.waitForTimeout(300);
  }
}

async selectAvailableCategory() {
  const frame = this.page
    .locator('iframe[name="tts-seat-selection-frame"]')
    .contentFrame();

  const availableCategory = frame
    .getByAltText('Available')
    .first();

  await availableCategory.waitFor({
    state: 'attached',
    timeout: 30000,
  });

  await availableCategory.evaluate((element) => {
    const groupId = element.getAttribute('data-group-id');

    // @ts-ignore
    window.SelectSeat(groupId);
  });

  await this.page.waitForTimeout(2000);

  await expect(
    frame.getByText('Please choose your seat:')
  ).toBeVisible({
    timeout: 10000,
  });
}

async selectAnyAvailableSeats(quantity: number) {
  const seatFrame = this.page
    .locator('iframe[name="tts-seat-selection-frame"]')
    .contentFrame();

  await expect(
    seatFrame.getByText('Please choose your seat:')
  ).toBeVisible({
    timeout: 15000,
  });

  const spans = seatFrame.locator('span');

  await expect.poll(
    async () => await spans.count(),
    {
      message: 'Waiting for seat elements to be loaded',
      timeout: 15000,
    }
  ).toBeGreaterThan(0);

  const count = await spans.count();

  console.log(`Found ${count} span elements`);

  const selectedSeats: {
    section: string;
    seatNumber: string;
    entrance: string;
  }[] = [];

  let selected = 0;

  for (let i = 0; i < count && selected < quantity; i++) {
    const seat = spans.nth(i);

    try {
      await seat.hover();
      await this.page.waitForTimeout(300);

      const text = (await seat.textContent()) ?? '';

      if (!/Seat Number:/i.test(text)) continue;

      if (/Not Available/i.test(text)) {
        console.log('Seat not available, skip.');
        continue;
      }

      await seat.click();

      selected++;

      const match = text.match(
        /^(.+?)Seat Number:\s*(.+?)Entrance:\s*(.+)$/
      );

      if (match) {
        const [, section, seatNumber, entrance] = match;

        const selectedSeatInfo = {
          section: section.trim(),
          seatNumber: seatNumber.trim(),
          entrance: entrance.trim(),
        };

        selectedSeats.push(selectedSeatInfo);

        console.log(
          `Selected seat ${selected}: ${selectedSeatInfo.section}, Seat Number: ${selectedSeatInfo.seatNumber}, Entrance: ${selectedSeatInfo.entrance}`
        );
      }

      await this.page.waitForTimeout(500);
    } catch {
      continue;
    }
  }

  if (selected < quantity) {
    throw new Error(
      `Only ${selected} seat(s) selected out of ${quantity} requested.`
    );
  }

  console.log(`Successfully selected ${selected} seat(s).`);

  return selectedSeats;
}

async confirmSeatSelection() {
  await this.page
    .locator('div')
    .filter({ hasText: /Confirm/ })
    .nth(3)
    .click();
    await this.page.waitForTimeout(2000);

  const okButton = this.page
    .locator('div')
    .filter({ hasText: /^OK$/ })
    .nth(1);

  if (await okButton.isVisible().catch(() => false)) {
    
    await okButton.click();
  }
}

async selectSeatMixedCategories(
  categories: {
    category: string;
    ticketQty: number;
    requiresSeatSelection: boolean;
  }[]
) {
  const allSelectedSeats: {
    section: string;
    seatNumber: string;
    entrance: string;
  }[] = [];

  for (const item of categories) {
    console.log(
      `Selecting mixed category: ${item.category}, Qty: ${item.ticketQty}, Seat Selection: ${item.requiresSeatSelection}`
    );

    await this.selectCategoryMix(item.category);

    if (item.requiresSeatSelection) {
      await this.selectAvailableCategory();

      const selectedSeats =
        await this.selectAnyAvailableSeats(item.ticketQty);

      allSelectedSeats.push(...selectedSeats);

      await this.confirmSeatSelection();
    } else {
      await this.page.waitForTimeout(2000);
    }

    //await this.page.waitForTimeout(2000);
  }

  return allSelectedSeats;
}

  async openBookingDetails() {
    await this.page.getByText('Booking Details').click();
  }

async proceedFromShoppingCart() {
  // Click Next
   const nextButton = this.page
    .locator('div')
    .filter({ hasText: /^Next$/ })
    .last();

  await nextButton.waitFor({
    state: 'visible',
    timeout: 10000,
  });

  await nextButton.click();

  console.log('Clicked Next button.');

  const skipButton = this.page
    .locator('div')
    .filter({ hasText: /^Skip$/ })
    .last();

  try {
    await skipButton.waitFor({
      state: 'visible',
      timeout: 5000,
    });

    await this.page.waitForTimeout(1000);

    await skipButton.click();

    console.log('Clicked Skip button.');
  } catch {
    console.log('Skip button not displayed.');
  }
  
}
async selectCategoryMix_ws(
  categories: {
    category: string;
    ticketQty: number;
  }[]
) {
  for (let categoryIndex = 0; categoryIndex < categories.length; categoryIndex++) {
    const item = categories[categoryIndex];

    console.log(
      `Selecting category: ${item.category}, quantity: ${item.ticketQty}`
    );

    switch (item.category) {
      case 'PS4': {
        // Quantity pertama
        await this.page
          .locator(
            'div:nth-child(2) > .css-175oi2r > svg'
          ).first().click();

        // Quantity berikutnya
        const ps3PlusButton = this.page
          .locator(
            'div:nth-child(3) > svg'
          );

        for (let quantity = 2; quantity <= item.ticketQty; quantity++) {
          await ps3PlusButton.click();
        }

        break;
      }

      case 'VIP': {
        // Quantity pertama
        await this.page
          .locator(
            'div:nth-child(2) > div:nth-child(2) > div:nth-child(2) > div:nth-child(2) > .css-175oi2r'
          )
          .click();

        // Quantity berikutnya
        const ps4PlusButton = this.page
          .locator(
            'div:nth-child(2) > div:nth-child(2) > div:nth-child(2) > div > div:nth-child(3) > svg'
          )
          .last();

        for (let quantity = 2; quantity <= item.ticketQty; quantity++) {
          await ps4PlusButton.click();
        }

        break;
      }

      default:
        throw new Error(
          `Seat map selector is not defined for category: ${item.category}`
        );
    }
  }
}
async validateMaximumPurchaseError() {
  const errorTitle = this.page.getByText('Error', {
    exact: true,
  });

const errorMessage = this.page.getByText(
  'Requested quantity',
  { exact: false }
);

  const continueButton = this.page
    .locator('div')
    .filter({
      hasText: /^Continue$/,
    })
    .first();

  await expect(errorTitle).toBeVisible({
    timeout: 10000,
  });

  await expect(errorMessage).toBeVisible();

  console.log(
    'Maximum purchase validation displayed:',
    await errorMessage.textContent()
  );

  await continueButton.click();

  await expect(errorTitle).not.toBeVisible();

  console.log('Maximum purchase dialog closed.');
}
 
async selectShowTime(data: {
  showTimes: string[];
  time: string;
}) {
  // Open Show Time dropdown
  await this.page.getByText('Select show time').click();

  // Validate all expected showtimes are displayed
  for (const showTime of data.showTimes) {
    const showTimeOption = this.page
      .locator('div')
      .filter({
        hasText: new RegExp(`^${showTime}$`),
      })
      .first();

    await expect(
      showTimeOption,
      `Show time "${showTime}" should be displayed`
    ).toBeVisible();

    console.log(`✓ Show time found: ${showTime}`);
  }

  // Select booking time
  const selectedShowTime = this.page
    .locator('div')
    .filter({
      hasText: new RegExp(`^${data.time}$`),
    })
    .first();

  await selectedShowTime.click();

  console.log(`✓ Selected show time: ${data.time}`);
}

async selectCategoryMember(category: string, ticketQty: number) {
  const categoryTicket = this.page.locator(
    'div:nth-child(2) > div:nth-child(2) > .css-175oi2r > svg'
  );

  await expect(categoryTicket).toBeVisible();
  await categoryTicket.click();

  for (let i = 1; i < ticketQty; i++) {
    if (category === 'PS1') {
      await this.page
        .locator(
          'div:nth-child(2) > div:nth-child(2) > div > div:nth-child(3) > svg'
        )
        .click();
    } else {
      throw new Error(`Plus button selector is not defined for category: ${category}`);
    }

    await this.page.waitForTimeout(300);
  }
}
async selectCategoryMixMember_ws(
  categories: {
    category: string;
    ticketQty: number;
  }[]
) {
  for (let categoryIndex = 0; categoryIndex < categories.length; categoryIndex++) {
    const item = categories[categoryIndex];

    console.log(
      `Selecting category: ${item.category}, quantity: ${item.ticketQty}`
    );

    switch (item.category) {
      case 'PS1': {
        // Quantity pertama
        await this.page
          .locator(
            'div:nth-child(2) > div:nth-child(2) > div:nth-child(2) > .css-175oi2r > svg'
          ).first().click();

        // Quantity berikutnya
        const ps3PlusButton = this.page
          .locator(
            'div:nth-child(3) > svg'
          ).first();

        for (let quantity = 2; quantity <= item.ticketQty; quantity++) {
          await ps3PlusButton.click();
        }

        break;
      }

      case 'PS2': {
        // Quantity pertama
        await this.page
          .locator(
            'div:nth-child(3) > div:nth-child(2) > div:nth-child(2) > .css-175oi2r'
          )
          .click();

        // Quantity berikutnya
        const ps4PlusButton = this.page
          .locator('div:nth-child(3) > div:nth-child(2) > div:nth-child(2) > div > div:nth-child(3)');

        for (let quantity = 2; quantity <= item.ticketQty; quantity++) {
          await ps4PlusButton.click();
        }

        break;
      }

      default:
        throw new Error(
          `Seat map selector is not defined for category: ${item.category}`
        );
    }
  }
}
async deleteShoppingCart() {
  await this.page
    .getByRole('button', { name: 'Shopping cart' })
    .click();

  await this.page
    .getByRole('button', { name: 'delete button' })
    .click();

  await this.page
    .locator('div')
    .filter({ hasText: /^Yes$/ })
    .first()
    .click();
}
}