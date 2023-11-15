export function formatDate(date: Date): string {
  const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', year: 'numeric' };
  return date.toLocaleDateString('en-US', options);
}

// Example usage:
// const originalDate = new Date('Tue Nov 14 2023 08:04:48 GMT+0100 (West Africa Standard Time)');
// const formattedDate = formatDate(originalDate);
// console.log(formattedDate);  // Output: Nov 14, 2023