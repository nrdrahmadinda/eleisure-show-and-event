export function getFutureBookingDate(daysFromToday: number): string {
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + daysFromToday);

  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(targetDate);
}