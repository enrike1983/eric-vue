export const formatGigDate = (value?: string) => {
  if (!value) {
    return "";
  }

  const parsedDate = new Date(value);
  if (Number.isNaN(parsedDate.getTime())) {
    return value;
  }

  // Keep date-only values stable across timezones.
  return parsedDate.toLocaleDateString("it-IT", { timeZone: "UTC" });
};