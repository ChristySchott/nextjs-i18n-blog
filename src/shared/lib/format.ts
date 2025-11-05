import type { Locale } from './i18n'

export function formatDate(date: Date, locale: Locale): string {
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date)
}

export function formatRelativeTime(date: Date, locale: Locale): string {
  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' })
  const diffInDays = Math.floor(
    (date.getTime() - Date.now()) / (1000 * 60 * 60 * 24)
  )

  if (Math.abs(diffInDays) < 7) {
    return rtf.format(diffInDays, 'day')
  }

  if (Math.abs(diffInDays) < 30) {
    return rtf.format(Math.floor(diffInDays / 7), 'week')
  }

  return rtf.format(Math.floor(diffInDays / 30), 'month')
}

export function formatCurrency(
  amount: number,
  locale: Locale,
  currency: string = 'USD'
): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(amount)
}
