import Link from 'next/link'
import { getDictionary } from '@/shared/lib/dictionary'
import type { Locale } from '@/shared/lib/i18n'

export default async function HomePage(props: {
  params: Promise<{ lang: Locale }>
}) {
  const { lang } = await props.params
  const dictionary = await getDictionary(lang)

  const { home } = dictionary

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <section className="mb-12 md:mb-16 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4">
          {home.hero.title}
        </h1>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
          {home.hero.subtitle}
        </p>
        <Link
          href={`/${lang}/blog`}
          className="inline-block px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
        >
          {home.hero.cta}
        </Link>
      </section>

      <section>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-8">
          {home.featured.title}
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {home.featured.posts.map((post, index) => (
            <article
              key={index}
              className="border border-gray-200 dark:border-gray-800 rounded-lg p-6 hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {post.title}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-500 mb-3">
                {post.date}
              </p>
              <p className="text-gray-600 dark:text-gray-400">{post.excerpt}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
