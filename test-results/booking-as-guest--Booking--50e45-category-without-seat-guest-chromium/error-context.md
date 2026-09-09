# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: booking-as-guest.spec.ts >> @Booking-with-mixed-category-without-seat-guest
- Location: tests/booking-as-guest.spec.ts:386:5

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByRole('link', { name: 'LOLO Monthly Show 2026 LOLO' })
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByRole('link', { name: 'LOLO Monthly Show 2026 LOLO' })

```

```yaml
- main:
  - link "Resorts World Genting logo":
    - /url: https://www.rwgenting.com/
    - img "Resorts World Genting logo":
      - img "Resorts World Genting logo"
  - link "Genting Rewards logo":
    - /url: https://www.rwgenting.com/content/rw-genting/web/en/genting-rewards.html
    - img "Genting Rewards logo":
      - img "Genting Rewards logo"
  - text: Transaction History
  - button "Shopping cart":
    - img
  - button "user profile":
    - img "user profile":
      - img "user profile"
  - button "Search":
    - img "search icon":
      - img "search icon"
  - button "Change language": EN
  - img "Shows & Events":
    - img "Shows & Events"
  - img
  - button "back button":
    - img "back button":
      - img "back button"
  - text: Shows & Events
  - img
  - button "Shows & Events":
    - text: Shows & Events
    - img
  - button "All Shows & Events":
    - text: All Shows & Events
    - img
  - button "MYR":
    - text: MYR
    - img
  - text: Search
  - textbox "Search Shows & Events"
  - img
  - heading "Switch View" [level=3]:
    - button "Switch View" [expanded]:
      - img
      - text: Switch View
      - img
  - region "Switch View": List Month
  - text: Selling Now
  - link "Day 1 - 21st National Lion Dance Championship 2026 - Semi Final Day 1 - 21st National Lion Dance Championship 2026 - Semi Final 31 Oct 2026 (Saturday) Starting Price From 292. 00 MYR":
    - /url: /shows-and-events/tts-show-2574?date=2026-10-31
    - img "Day 1 - 21st National Lion Dance Championship 2026 - Semi Final":
      - img "Day 1 - 21st National Lion Dance Championship 2026 - Semi Final"
    - text: Day 1 - 21st National Lion Dance Championship 2026 - Semi Final 31 Oct 2026 (Saturday) Starting Price From 292. 00 MYR
  - link "BUY 2 FREE 1 - HAHA Live in Malaysia 2026 BUY 2 FREE 1 - HAHA Live in Malaysia 2026 31 Dec 2026 (Thursday) Starting Price From 200. 00 MYR":
    - /url: /shows-and-events/tts-show-2523?date=2026-12-31
    - img "BUY 2 FREE 1 - HAHA Live in Malaysia 2026":
      - img "BUY 2 FREE 1 - HAHA Live in Malaysia 2026"
    - text: BUY 2 FREE 1 - HAHA Live in Malaysia 2026 31 Dec 2026 (Thursday) Starting Price From 200. 00 MYR
  - text: CONTACT US
  - link "Reservation":
    - /url: https://book.rwgenting.com/member2/HotelApp/HotelList.aspx
  - link "Meeting Enquiries":
    - /url: mailto:meetings-events@rwgenting.com
  - link "Offices":
    - /url: https://www.rwgenting.com/en/sales-and-reservations.html
  - link "Safety & Security":
    - /url: https://www.rwgenting.com/en/security.html
  - link "Feedback":
    - /url: mailto:customerfeedback@rwgenting.com
  - link "WhatsApp":
    - /url: https://www.rwgenting.com/en/rwg-whatsapp.html
  - text: GENTING MALAYSIA
  - link "About Us":
    - /url: https://www.gentingmalaysia.com/corporate_profile/
  - link "Investor Relations":
    - /url: https://www.gentingmalaysia.com/investor_relations/
  - link "Press Room":
    - /url: https://www.rwgenting.com/en/press-room.html
  - link "RWG Blog":
    - /url: https://www.rwgenting.com/en/blog.html
  - link "RWG eBrochure":
    - /url: https://www.rwgenting.com/en/ebrochure.html
  - link "Genting's Highland Heroes":
    - /url: https://www.rwgenting.com/en/entertainment/gentings-highland-heroes.html
  - link "Genting Sustainbiz":
    - /url: https://www.rwgenting.com/en/sustainability.html
  - link "Tour Agents":
    - /url: https://book.rwgenting.com/Agent/V1/eb2b.App/UI/Common/Login.aspx
  - link "Careers":
    - /url: https://www.rwgenting.com/en/careers.html
  - link "Awards & Accolades":
    - /url: https://www.rwgenting.com/en/hotels/awards-and-accolades.html
  - link "ASEAN-BAC":
    - /url: https://www.rwgenting.com/en/aseanbac.html
  - link "Disclaimer":
    - /url: https://www.rwgenting.com/en/disclaimer.html
  - link "Privacy Policy":
    - /url: https://www.rwgenting.com/en/privacy-policy.html
  - link "Fraudulent Alert":
    - /url: https://www.rwgenting.com/en/fraudulent-alert.html
  - link "Notice":
    - /url: https://www.rwgenting.com/en/notice.html
  - link "E-invoice":
    - /url: https://www.rwgenting.com/en/einvoice.html
  - link "Anti Bribery and Anti Corruption Policy":
    - /url: https://www.rwgenting.com/content/dam/approved/rw-genting/web/footer/GENM-ABAC-Policy.pdf
  - link "Whistleblower Policy":
    - /url: https://www.rwgenting.com/content/dam/approved/rw-genting/web/footer/whistleblower-policy-20240816.pdf
  - 'link "Rules & Regulations: Genting Main Road"':
    - /url: https://www.rwgenting.com/content/dam/approved/rw-genting/web/footer/official_communication_channels/rules_regulations_genting_main_road_16012025.pdf
  - text: PRODUCTS
  - link "Genting SkyWorlds Theme Park":
    - /url: https://www.gentingskyworlds.com
  - link "VIP Experience":
    - /url: https://gentingskyworlds.com/en/tickets/vip-experience.html?show=_-tabpanel
  - link "Unlimited Pass":
    - /url: https://www.gentingskyworlds.com/en/tickets/unlimited-pass.html
  - link "Team Building Package":
    - /url: https://gentingskyworlds.com/content/genting-skyworlds/web/en/tickets/team-building-family-day-package.html
  - link "Pre-Wedding Photoshoot Package":
    - /url: https://www.gentingskyworlds.com/en/tickets/genting-skyworlds-pre-wedding-photoshoot-package.html
  - link "Gohtong Way":
    - /url: https://www.rwgenting.com/en/event/gohtong-way-street.html
  - link "Resorts World Kijal":
    - /url: https://www.rwkijal.com/
  - link "Resorts World Langkawi":
    - /url: https://www.rwlangkawi.com/
  - link "Resorts World Awana":
    - /url: https://www.rwgenting.com/en/hotels/resorts-world-awana.html
  - link "Genting Nature Adventures":
    - /url: https://www.rwgenting.com/en/things-to-do/leisure/Genting-Nature-Adventures.html
  - link "Corporate Green Bonding":
    - /url: https://www.rwgenting.com/en/things-to-do/leisure/Genting-Nature-Adventures/gna-green-bonding.html
  - link "Meetings & Events":
    - /url: https://www.rwgenting.com/en/mice.html
  - link "Hot Deals":
    - /url: https://www.rwgenting.com/en/hot-deals.html
  - text: PARTNERS
  - link "Resorts World Tours":
    - /url: https://www.discoverrwt.com/
  - link "Chin Swee":
    - /url: https://www.chinswee.org/
  - link "Genting Highlands Premium Outlets":
    - /url: https://www.premiumoutlets.com.my/
  - link "Zouk Genting":
    - /url: https://zoukgroup.com/zouk-malaysia/
  - link "Ayu Awana":
    - /url: https://www.facebook.com/ayuawana
  - link "Ripley's Adventureland":
    - /url: https://ripleys.com.my/
  - link:
    - /url: https://www.facebook.com/ResortsWorldGenting/
  - link:
    - /url: https://www.instagram.com/resortsworldgenting/
  - link:
    - /url: https://www.youtube.com/resortsworldgenting
  - link:
    - /url: https://twitter.com/rw_genting
  - link:
    - /url: https://www.linkedin.com/company/resorts-world-genting/jobs/
  - link:
    - /url: https://www.xiaohongshu.com/user/profile/600549ab000000000100192b?xhsshare=CopyLink&appuid=5f9a5e910000000001005275&apptime=1687939284
  - text: STAY UPDATE Get exclusive news, stories and updates
  - link "Subscribe Now":
    - /url: https://www.rwgenting.com/en/register.html
  - img "Resorts World Genting Logo":
    - img "Resorts World Genting Logo"
  - text: © 2026 Genting Malaysia Berhad 198001004236 (58019-U). All Rights Reserved. Best viewed in Chrome, Safari, Firefox and Edge.
- alert: Resorts World Genting
```

# Test source

```ts
  1   | import { expect, Page, test } from '@playwright/test';
  2   | 
  3   | export class ShowsEventsPage {
  4   |   constructor(private page: Page) {}
  5   | 
  6   | private async validateSelectedSeats(
  7   |   selectedSeatIndex: number,
  8   |   expectedQuantity: number,
  9   |   category: string
  10  | ) {
  11  |   const selectedSeatLabel = this.page
  12  |     .getByText('Selected Seat :', { exact: true })
  13  |     .nth(selectedSeatIndex);
  14  | 
  15  |   await expect(
  16  |     selectedSeatLabel,
  17  |     `Selected Seat label should be displayed for ${category}`
  18  |   ).toBeVisible({
  19  |     timeout: 10000,
  20  |   });
  21  | 
  22  |   const selectedSeatContainer = selectedSeatLabel.locator('..');
  23  | 
  24  |   const selectedSeatText =
  25  |     (await selectedSeatContainer.textContent())?.trim() ?? '';
  26  | 
  27  |   console.log(
  28  |     `${category} selected seat information: ${selectedSeatText}`
  29  |   );
  30  | 
  31  |   const seatNumberText = selectedSeatText
  32  |     .replace(/Selected Seat\s*:/i, '')
  33  |     .trim();
  34  | 
  35  |   expect(
  36  |     seatNumberText,
  37  |     `Seat number should be displayed for ${category}`
  38  |   ).not.toBe('');
  39  | 
  40  |   const seatNumbers = seatNumberText
  41  |     .split(',')
  42  |     .map(seat => seat.trim())
  43  |     .filter(Boolean);
  44  | 
  45  |   expect(
  46  |     seatNumbers.length,
  47  |     `Expected ${expectedQuantity} selected seat(s) for ${category}, but found: ${seatNumberText}`
  48  |   ).toBe(expectedQuantity);
  49  | 
  50  |   console.log(
  51  |     `PASSED: ${category} has ${seatNumbers.length} selected seat(s): ${seatNumbers.join(', ')}`
  52  |   );
  53  | }
  54  | 
  55  | async selectEvent(eventTitle: string) {
  56  |   const event = this.page.getByRole('link', {
  57  |     name: eventTitle,
  58  |     exact: false,
  59  |   });
  60  | 
> 61  |   await expect(event).toBeVisible({
      |                       ^ Error: expect(locator).toBeVisible() failed
  62  |     timeout: 10000,
  63  |   });
  64  | 
  65  |   await event.click();
  66  | }
  67  | 
  68  | async selectDate(bookingDate: string) {
  69  |   const [day, month, year] = bookingDate.split(' ');
  70  |   const targetMonth = `${month} ${year}`;
  71  | 
  72  |   const calendarPopup = this.page
  73  |     .locator(
  74  |       'div:nth-child(4) > div:nth-child(2) > div > div > div > div:nth-child(2)'
  75  |     )
  76  |     .first();
  77  | 
  78  |   const nextMonthButton = this.page.getByRole('button', {
  79  |     name: 'next month button',
  80  |   });
  81  | 
  82  |   // Maksimal pindah 12 bulan supaya tidak infinite loop
  83  |   for (let i = 0; i < 12; i++) {
  84  |     const monthVisible = await calendarPopup
  85  |       .getByText(targetMonth, { exact: true })
  86  |       .isVisible()
  87  |       .catch(() => false);
  88  | 
  89  |     if (monthVisible) {
  90  |       console.log(`Found month: ${targetMonth}`);
  91  |       break;
  92  |     }
  93  | 
  94  |     console.log(`Current month is not ${targetMonth}, click Next Month`);
  95  | 
  96  |     await nextMonthButton.click();
  97  | 
  98  |     await this.page.waitForTimeout(300);
  99  |   }
  100 | 
  101 |   console.log(`Selecting date ${day}`);
  102 | 
  103 |   await calendarPopup
  104 |     .locator('div.r-lrvibr')
  105 |     .filter({
  106 |       hasText: new RegExp(`^${day}$`),
  107 |     })
  108 |     .first()
  109 |     .click();
  110 | }
  111 |   async selectTime(time: string) {
  112 |     await this.page
  113 |       .locator('div')
  114 |       .filter({ hasText: new RegExp(`^${time}$`) })
  115 |       .first()
  116 |       .click();
  117 |   }
  118 | 
  119 | async selectCategory(category: string) {
  120 |   const categoryTicket = this.page.locator(
  121 |     'div:nth-child(2) > .css-175oi2r > svg'
  122 |   ).first();
  123 | 
  124 |   await expect(categoryTicket).toBeVisible();
  125 |   await categoryTicket.click();
  126 | }
  127 | 
  128 | async selectCategoryMix(category: string) {
  129 |   switch (category) {
  130 |     case 'VIP':
  131 |       await this.page
  132 |         .locator('div')
  133 |         .filter({ hasText: /^VIP$/ })
  134 |         .nth(1)
  135 |         .click();
  136 | 
  137 |       await this.page
  138 |         .locator('div:nth-child(2) > .css-175oi2r > svg')
  139 |         .first()
  140 |         .click();
  141 |       break;
  142 | 
  143 |     case 'PS3':
  144 |       await this.page
  145 |         .locator('div')
  146 |         .filter({ hasText: /^PS3$/ })
  147 |         .nth(1)
  148 |         .click();
  149 | 
  150 |       await this.page
  151 |         .locator('div:nth-child(4) > div:nth-child(2) > div:nth-child(2) > .css-175oi2r')
  152 |         .click();
  153 |       break;
  154 | 
  155 |     default:
  156 |       throw new Error(
  157 |         `Seat map selector is not defined for category: ${category}`
  158 |       );
  159 |   }
  160 | }
  161 | 
```