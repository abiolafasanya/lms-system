enum LOCALE {
  NG = "en-NG",
  US = "en-US",
}

export function formatDate(date: string) {
  const parsedDate = Date.parse(date);
  if (isNaN(parsedDate)) {
    return "Invalid Date";
  }

  const formattedDate = new Intl.DateTimeFormat(LOCALE.US, {
    year: "2-digit",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  }).format(parsedDate);

  return formattedDate;
}
