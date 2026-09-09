import { expect, Page } from '@playwright/test';

export class searchEvent {
  constructor(private page: Page) {}

private get searchShowsEventsInput() {
  return this.page.getByRole('textbox', {
    name: 'Search Shows & Events',
  });
}

private get searchNotFoundText() {
  return this.page.getByText('Search Not Found...');
}

private searchResult(eventName: string) {
  return this.page.getByText(eventName).first();
}

async searchEvent(data: {
  keyword: string;
  eventName?: string;
  expectNotFound?: boolean;
}) {
  await expect(this.searchShowsEventsInput).toBeVisible({
    timeout: 10000,
  });

  await this.searchShowsEventsInput.click();

  // clear keyword lama
  await this.searchShowsEventsInput.fill('');

  // input keyword baru
  await this.searchShowsEventsInput.fill(data.keyword);

  if (data.expectNotFound) {
    await expect(this.searchNotFoundText).toBeVisible({
      timeout: 10000,
    });

    console.log(`Search "${data.keyword}" : No result found`);
    return;
  }

  if (!data.eventName) {
    throw new Error('eventName is required when expectNotFound is false');
  }

  await expect(this.searchResult(data.eventName)).toBeVisible({
    timeout: 10000,
  });

  console.log(`Search "${data.keyword}" : Event found`);
}

async searchAndSelectEvent(data: {
  keyword: string;
  eventName: string;
}) {
  await this.searchEvent({
    keyword: data.keyword,
    eventName: data.eventName,
  });

  await this.searchResult(data.eventName).click();

  console.log(`Selected event: ${data.eventName}`);
}

}
