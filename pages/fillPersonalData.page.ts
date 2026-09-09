import { Page } from '@playwright/test';

export class FillPersonalDataPage {
  constructor(private page: Page) {}

  private get titleDropdown() {
    return this.page.locator('#title-selectbutton');
  }

  private titleOption(title: string) {
    return this.page
      .locator('div')
      .filter({ hasText: new RegExp(`^${title}$`) })
      .nth(2);
  }

  private get inputFields() {
    return this.page.getByRole('textbox', {
      name: 'Input Field',
    });
  }

  private get phoneCountryDropdown() {
    return this.page.locator('#phone-selectbutton');
  }

  private get searchCountryInput() {
    return this.page.getByPlaceholder('Search Country');
  }

  private phoneCountryOption(option: string) {
    return this.page.getByText(option);
  }

  private get phoneNumberField() {
    return this.page.getByText('Phone Number*+');
  }

  private get countryDropdown() {
    return this.page.locator('#country-selectbutton');
  }

private countryOption(option: string) {
  return this.page.getByText(option, { exact: true }).last();
}

  private get stateDropdown() {
    return this.page.locator('#state-selectbutton');
  }

  private stateOption(option: string) {
    return this.page
      .locator('div')
      .filter({ hasText: new RegExp(`^${option}$`) })
      .nth(2);
  }

  private get consentCheckboxes() {
    return this.page.getByTestId('Component.Consent.Checkbox');
  }

  async fillPersonalData(data: {
    title: string;
    firstName: string;
    lastName: string;
    nricPassport: string;
    phoneCountrySearch: string;
    phoneCountryOption: string;
    phoneNumber: string;
    email: string;
    confirmationEmail: string;
    countrySearch: string;
    countryOption: string;
    stateOption?: string;
  }) {
    await this.titleDropdown.click();
    await this.titleOption(data.title).click();

    await this.inputFields.first().fill(data.firstName);
    await this.inputFields.nth(1).fill(data.lastName);
    await this.inputFields.nth(2).fill(data.nricPassport);

    await this.phoneCountryDropdown.click();
    await this.searchCountryInput.fill(data.phoneCountrySearch);
    await this.phoneCountryOption(data.phoneCountryOption).click();

    await this.phoneNumberField.click();
    await this.inputFields.nth(3).fill(data.phoneNumber);

    await this.inputFields.nth(4).fill(data.email);

    await this.page
      .locator('div')
      .filter({ hasText: /^Confirmation Email Address\*$/ })
      .first()
      .click();

    await this.inputFields.nth(5).fill(data.confirmationEmail);

    await this.countryDropdown.click();
    await this.searchCountryInput.click();
    await this.searchCountryInput.fill(data.countrySearch);
    await this.countryOption(data.countryOption).waitFor({
    state: 'visible',
    });

    await this.countryOption(data.countryOption).click();

    if (data.countryOption === 'MALAYSIA') {
      await this.stateDropdown.click();
      await this.stateOption(data.stateOption ?? 'Kedah').click();
    }

    await this.consentCheckboxes.first().click();
    await this.consentCheckboxes.nth(1).click();
  }

async agreement(){
    await this.consentCheckboxes.first().click();
    await this.consentCheckboxes.nth(1).click();
}
}