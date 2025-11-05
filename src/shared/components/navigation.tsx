import Link from 'next/link'
import type { Locale } from '@/shared/lib/i18n'

interface NavigationProps {
  locale: Locale
  dictionary: {
    home: string
    about: string
    blog: string
    contact: string
  }
}

export function Navigation({ locale, dictionary }: NavigationProps) {
  const links = [
    { href: `/${locale}`, label: dictionary.home },
    { href: `/${locale}/about`, label: dictionary.about },
    { href: `/${locale}/blog`, label: dictionary.blog },
    { href: `/${locale}/contact`, label: dictionary.contact },
  ]

  return (
    <nav className="flex flex-wrap gap-4 md:gap-6">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="text-sm md:text-base text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
        >
          {link.label}
        </Link>
      ))}
    </nav>
  )
}
