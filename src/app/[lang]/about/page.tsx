import { getAboutDictionary } from '@/features/about/lib/dictionary'
import type { Locale } from '@/shared/lib/i18n'
import { getPlural } from '@/shared/lib/i18n'
import { Metadata } from 'next'

interface Props {
  params: Promise<{ lang: Locale }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  const dictionary = await getAboutDictionary(lang)

  return {
    title: dictionary.metadata.title,
    description: dictionary.metadata.description,
  }
}

export default async function AboutPage({ params }: Props) {
  const { lang } = await params
  const dictionary = await getAboutDictionary(lang)

  const { about } = { about: dictionary }

  const experienceText = getPlural(
    about.content.stats.experience.value,
    about.content.stats.experience.label
  )

  const projectsText = getPlural(
    about.content.stats.projects.value,
    about.content.stats.projects.label
  )

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <section className="mb-12 md:mb-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          {about.hero.title}
        </h1>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400">
          {about.hero.subtitle}
        </p>
      </section>

      <div className="max-w-3xl mx-auto space-y-8">
        <section className="prose dark:prose-invert max-w-none">
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            {about.content.introduction}
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
            {about.content.mission}
          </p>
        </section>

        <section className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 md:p-8">
          <div className="grid grid-cols-2 gap-6 mb-8">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                {about.content.stats.experience.value}+
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {experienceText}
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                {about.content.stats.projects.value}+
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {projectsText}
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            {about.content.skills.title}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {about.content.skills.items.map((skill, index) => (
              <div
                key={index}
                className="flex items-center gap-2 text-gray-700 dark:text-gray-300"
              >
                <span className="w-2 h-2 bg-gray-900 dark:bg-white rounded-full" />
                <span>{skill}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="prose dark:prose-invert max-w-none">
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            {about.content.closing}
          </p>
        </section>
      </div>
    </div>
  )
}
