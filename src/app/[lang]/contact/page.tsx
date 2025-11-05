import { getContactDictionary } from '@/features/contact/lib/dictionary'
import type { Locale } from '@/shared/lib/i18n'
import { interpolate } from '@/shared/lib/i18n'
import { Metadata } from 'next'

interface Props {
  params: Promise<{ lang: Locale }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  const dictionary = await getContactDictionary(lang)

  return {
    title: dictionary.metadata.title,
    description: dictionary.metadata.description,
  }
}

export default async function ContactPage({ params }: Props) {
  const { lang } = await params
  const dictionary = await getContactDictionary(lang)
  const { contact } = { contact: dictionary }

  const closingText = interpolate(contact.content.closing, {
    hours: contact.content.responseTime.hours.toString(),
  })

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <section className="mb-12 md:mb-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          {contact.hero.title}
        </h1>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400">
          {contact.hero.subtitle}
        </p>
      </section>

      <div className="max-w-2xl mx-auto space-y-8">
        <section className="text-center">
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            {contact.content.intro}
          </p>
        </section>

        <section className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 md:p-8">
          <div className="text-center mb-8">
            <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-500 uppercase tracking-wide mb-2">
              {contact.content.email.label}
            </h2>
            <a
              href={`mailto:${contact.content.email.value}`}
              className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            >
              {contact.content.email.value}
            </a>
          </div>

          <div className="border-t border-gray-200 dark:border-gray-800 pt-8">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white text-center mb-4">
              {contact.content.social.title}
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              {contact.content.social.platforms.map((platform, index) => (
                <a
                  key={index}
                  href={`https://${platform.url}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  {platform.name}
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="text-center">
          <p className="text-gray-600 dark:text-gray-400">{closingText}</p>
        </section>
      </div>
    </div>
  )
}
