import Link from 'next/link'
import { Navigation } from './navigation'
import { LanguageSwitcher } from './language-switcher'
import type { Locale } from '@/shared/lib/i18n'

interface HeaderProps {
  locale: Locale
  dictionary: {
    siteTitle: string
    navigation: {
      home: string
      about: string
      blog: string
      contact: string
    }
  }
}

export function Header({ locale, dictionary }: HeaderProps) {
  return (
    <header className="border-b border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 py-4 md:py-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center justify-between">
            <Link
              href={`/${locale}`}
              className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white"
            >
              {dictionary.siteTitle}
            </Link>
            <LanguageSwitcher currentLocale={locale} variant="mobile" />
          </div>

          <div className="flex items-center justify-between md:gap-8">
            <Navigation locale={locale} dictionary={dictionary.navigation} />
            <LanguageSwitcher currentLocale={locale} variant="desktop" />
          </div>
        </div>
      </div>
    </header>
  )
}
