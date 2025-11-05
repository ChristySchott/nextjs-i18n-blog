'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { Locale } from '@/shared/lib/i18n'
import { i18n, localeConfig } from '@/shared/lib/i18n'

interface LanguageSwitcherProps {
  currentLocale: Locale
  variant?: 'mobile' | 'desktop'
}

const getLocalizedPath = (targetLocale: Locale, pathname: string): string => {
  const segments = pathname.split('/').filter(Boolean)

  if (segments.length === 0) {
    return `/${targetLocale}`
  }

  const currentLocaleInPath = segments[0]

  if (i18n.locales.includes(currentLocaleInPath as Locale)) {
    segments[0] = targetLocale
  } else {
    segments.unshift(targetLocale)
  }

  return `/${segments.join('/')}`
}

export function LanguageSwitcher({
  currentLocale,
  variant = 'desktop',
}: LanguageSwitcherProps) {
  const pathname = usePathname()
  const availableLocales = i18n.locales.filter((loc) => loc !== currentLocale)

  if (variant === 'mobile') {
    return (
      <div className="md:hidden flex gap-2">
        {availableLocales.map((locale) => (
          <Link
            key={locale}
            href={getLocalizedPath(locale, pathname)}
            className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-700 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            title={localeConfig[locale].name}
          >
            {localeConfig[locale].flag}
          </Link>
        ))}
      </div>
    )
  }

  return (
    <div className="hidden md:flex gap-2">
      {availableLocales.map((locale) => (
        <Link
          key={locale}
          href={getLocalizedPath(locale, pathname)}
          className="px-4 py-2 text-sm border border-gray-300 dark:border-gray-700 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex items-center gap-2"
          title={localeConfig[locale].name}
        >
          <span>{localeConfig[locale].flag}</span>
          <span>{localeConfig[locale].name}</span>
        </Link>
      ))}
    </div>
  )
}
