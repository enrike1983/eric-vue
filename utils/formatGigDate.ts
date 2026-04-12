export const formatGigDate = (value?: string) => {
  if (!value) {
    return "";
  }

  // Keep already localized values untouched.
  if (/^\d{2}\/\d{2}\/\d{4}$/.test(value)) {
    return value;
  }

  // Prefer the date part when available (YYYY-MM-DD or ISO datetime)
  // to avoid timezone shifts to previous/next day.
  const isoDateMatch = value.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (isoDateMatch) {
    const [, year, month, day] = isoDateMatch;
    return `${day}/${month}/${year}`;
  }

  const parsedDate = new Date(value);
  if (Number.isNaN(parsedDate.getTime())) {
    return value;
  }

  return parsedDate.toLocaleDateString("it-IT");
};