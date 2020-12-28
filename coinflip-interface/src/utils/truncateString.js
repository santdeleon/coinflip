const truncateString = (str, desiredLength, separator) => {
  if (!str) return null;
  if (str.length <= desiredLength) return str;

  let newStr = str;

  separator = separator || '...';

  const sepLen = separator.length,
    charsToShow = desiredLength - sepLen,
    frontChars = Math.ceil(charsToShow / 2),
    backChars = Math.floor(charsToShow / 2);

  return (
    newStr.substr(0, frontChars) +
    separator +
    newStr.substr(newStr.length - backChars)
  );
};

export default truncateString;
