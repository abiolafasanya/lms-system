
enum CURRENCY {
    NGN = 'NGN',
    USD = 'USD',
}   

enum LOCALE {
    NG = 'en-NG',
    US = 'en-US'
}

const CURRENCY_FORMATTER = new Intl.NumberFormat(LOCALE.NG, {
    currency: CURRENCY.NGN, style: 'currency'
})

export function formatCurrency(number: number) {
    return CURRENCY_FORMATTER.format(number)
}

export function formatDate(date: Date) {
  const f = new Intl.DateTimeFormat(LOCALE.NG, {
    dateStyle: 'full',
  });
  return f.format(date);
}