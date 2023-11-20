export function getTimeZone(date: Date): string {
  const timeZone = Intl.DateTimeFormat('en', { timeZoneName: 'short' }).format(date);
  const [, timeZoneAbbreviation] = timeZone.split(' ');

  return timeZoneAbbreviation || '';
}