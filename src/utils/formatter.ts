enum LOCALE {
  NG = "en-NG",
  US = "en-US",
}

enum CURRENCY {
  NG = "NGN",
  US = "USD",
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

export function formatAmount(amount: number) {
  if (isNaN(amount)) {
    return "NaN";
  }
  const formatted = new Intl.NumberFormat(LOCALE.US, {
    style: "currency",
    currency: CURRENCY.US,
  }).format(amount);

  return formatted;
}
