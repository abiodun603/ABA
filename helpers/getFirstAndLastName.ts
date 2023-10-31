export function getFirstAndLastName(fullName: string): { firstName: string; lastName: string } {
  const names: string[] = fullName.split(' ');
  const firstName: string = names[0];
  const lastName: string = names[1];
  return { firstName, lastName };
}