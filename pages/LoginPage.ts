import { expect, Page } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  // ===== Locators =====

  private get profileButton() {
    return this.page.getByRole('button', {
      name: 'user profile',
    });
  }

  private get loginMenu() {
    return this.page
      .locator('div')
      .filter({ hasText: /^Login$/ })
      .nth(1);
  }

  private get membershipIdField() {
    return this.page.getByRole('textbox', {
      name: 'Membership ID',
    });
  }

  private get passwordField() {
    return this.page.getByRole('textbox', {
      name: 'Password',
    });
  }

  private get loginButton() {
    return this.page.getByRole('button', {
      name: 'Login',
      exact: true,
    });
  }

  // ===== Actions =====
async loginAsClassicMember(data: {
  membershipId: string;
  password: string;
}) {
  await this.profileButton.click();
  await this.loginMenu.click();

  const membershipTab = this.page
    .locator('#mat-tab-label-0-2')
    .getByText('Membership ID');

  await expect(membershipTab).toBeVisible({ timeout: 30000 });
  await membershipTab.click({ force: true });

  const membershipIdField = this.page.getByRole('textbox', {
    name: 'Membership ID',
  });

  const passwordField = this.page.getByRole('textbox', {
    name: 'Password',
  });

  await expect(membershipIdField).toBeVisible({ timeout: 30000 });

  await membershipIdField.click();
  await membershipIdField.pressSequentially(data.membershipId, { delay: 100 });
  await membershipIdField.dispatchEvent('input');
  await membershipIdField.dispatchEvent('change');
  await membershipIdField.blur();

  await passwordField.click();
  await passwordField.pressSequentially(data.password, { delay: 100 });
  await passwordField.dispatchEvent('input');
  await passwordField.dispatchEvent('change');
  await passwordField.blur();

  const loginButton = this.page.getByRole('button', {
    name: 'Login',
    exact: true,
  });

  await expect(loginButton).toBeEnabled({ timeout: 10000 });
  await loginButton.click();
}
}