export function formatTimestampToTime(timestamp: Date) {
  const date = new Date(timestamp);

  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  return `${hours}:${minutes}`;
} 

export function formatTimestampToTimeWithMidday(timestamp: Date) {
  const date = new Date(timestamp);

  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');

  // Determine if it's AM or PM
  const period = hours < 12 ? 'AM' : 'PM';

  // Convert to 12-hour format
  hours = hours % 12 || 12;

  const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes}${period}`;

  return formattedTime;
}