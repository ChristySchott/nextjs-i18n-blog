export const i18n = {
  defaultLocale: 'en-US',
  locales: ['en-US', 'pt-BR', 'ar'],
} as const

export type Locale = (typeof i18n)['locales'][number]

export const localeConfig: Record<
  Locale,
  {
    name: string
    direction: 'ltr' | 'rtl'
    flag: string
  }
> = {
  'en-US': {
    name: 'English',
    direction: 'ltr',
    flag: '🇺🇸',
  },
  'pt-BR': {
    name: 'Português',
    direction: 'ltr',
    flag: '🇧🇷',
  },
  ar: {
    name: 'العربية',
    direction: 'rtl',
    flag: '🇸🇦',
  },
}

export function getDirection(locale: Locale): 'ltr' | 'rtl' {
  return localeConfig[locale]?.direction ?? 'ltr'
}

type PluralRules = {
  zero?: string
  one?: string
  two?: string
  few?: string
  many?: string
  other: string
}

export function getPlural(count: number, translations: PluralRules): string {
  if (count === 0 && translations.zero) return translations.zero
  if (count === 1 && translations.one) return translations.one
  if (count === 2 && translations.two) return translations.two

  return translations.other.replace('{count}', count.toString())
}

export function interpolate(
  template: string,
  values: Record<string, string | number>
): string {
  return template.replace(/{(\w+)}/g, (_, key) => {
    const value = values[key]
    return value !== undefined ? String(value) : `{${key}}`
  })
}
