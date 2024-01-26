export function getFileExtension(filename: string | undefined): string | null {
  if (filename === undefined) {
    return null; // Handle undefined case
  }

  const lastIndex = filename.lastIndexOf('.');
  if (lastIndex !== -1) {
    return filename.slice(lastIndex);
  }

  return null; // No file extension found
}
