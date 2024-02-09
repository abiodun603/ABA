export function isEventDateLessThanCurrent(eventDate: string): boolean {
  const currentDateTime = new Date();
  const eventDateTime = new Date(eventDate);

  // Convert both dates to UTC for accurate comparison
  currentDateTime.setUTCHours(0, 0, 0, 0);
  eventDateTime.setUTCHours(0, 0, 0, 0);

  // Compare the dates
  return eventDateTime <= currentDateTime || eventDateTime === currentDateTime || eventDateTime == currentDateTime;
}