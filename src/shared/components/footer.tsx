import type { Locale } from '@/shared/lib/i18n'

interface FooterProps {
  locale: Locale
  dictionary: {
    copyright: string
    madeWith: string
  }
}

const currentYear = new Date().getFullYear()

export function Footer({ dictionary }: FooterProps) {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 mt-auto">
      <div className="container mx-auto px-4 py-6 md:py-8">
        <div className="flex flex-col gap-2 items-center justify-center text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {dictionary.copyright.replace('{year}', currentYear.toString())}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-500">
            {dictionary.madeWith}
          </p>
        </div>
      </div>
    </footer>
  )
}
