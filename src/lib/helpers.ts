export function trimText(input: string, maxLength: number = 100): string {
  if (input.length <= maxLength) return input;
  return input.substring(0, maxLength - 3) + "...";
}
export function getCurrentTime(): Date {
  // Create a date object with the current UTC time
  const now = new Date();

  now.setHours(now.getHours());

  return now;
}

export function formatTime(
  date: Date,
  locale: string,
  timeZone = "Europe/Berlin",
): string {
  const options: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false, // AM/ PM format
    timeZone,
  };

  return new Intl.DateTimeFormat(locale, options).format(date);
}

export function formatDate(date: Date, locale = "en-US"): string {
  return date.toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
