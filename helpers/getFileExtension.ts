export function getFileExtension(filename: string): string | null {
  const lastIndex = filename.lastIndexOf('.');
  if (lastIndex !== -1) {
    return filename.slice(lastIndex);
  }
  return null; // No file extension found
}

