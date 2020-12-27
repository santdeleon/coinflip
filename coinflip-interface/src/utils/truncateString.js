export const truncateString = (string, desiredLength, separator) => {
  if (!string) return null;
  if (string.length <= desiredLength) return string;

  separator = separator || '...';

  const sepLen = separator.length,
    charsToShow = desiredLength - sepLen,
    frontChars = Math.ceil(charsToShow / 2),
    backChars = Math.floor(charsToShow / 2);

  return string.substr(0, frontChars) + separator + string.substr(string.length - backChars);
};
