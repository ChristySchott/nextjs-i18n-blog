import { getBlogDictionary } from '@/features/blog/lib/dictionary'
import { formatDate, formatRelativeTime } from '@/shared/lib/format'
import type { Locale } from '@/shared/lib/i18n'
import { getPlural } from '@/shared/lib/i18n'
import { Metadata } from 'next'

interface Props {
  params: Promise<{ lang: Locale }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  const dictionary = await getBlogDictionary(lang)

  return {
    title: dictionary.metadata.title,
    description: dictionary.metadata.description,
  }
}

export default async function BlogPage({ params }: Props) {
  const { lang } = await params
  const dictionary = await getBlogDictionary(lang)
  const { blog } = { blog: dictionary }

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <section className="mb-12 md:mb-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          {blog.hero.title}
        </h1>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400">
          {blog.hero.subtitle}
        </p>
      </section>

      <div className="max-w-4xl mx-auto mb-8">
        <p className="text-sm text-gray-500 dark:text-gray-500">
          {getPlural(blog.articles.length, blog.articlesCount)}
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="space-y-8">
          {blog.articles.map((article, index) => {
            const articleDate = new Date(article.date)
            const readTimeText = getPlural(article.readTime, blog.readTime)

            return (
              <article
                key={index}
                className="border-b border-gray-200 dark:border-gray-800 pb-8 last:border-b-0"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                    {article.title}
                  </h2>
                  <span className="text-sm px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full w-fit">
                    {article.category}
                  </span>
                </div>
                <div className="flex flex-wrap gap-3 text-sm text-gray-500 dark:text-gray-500 mb-3">
                  <time dateTime={article.date}>
                    {formatDate(articleDate, lang)}
                  </time>
                  <span>•</span>
                  <span>{formatRelativeTime(articleDate, lang)}</span>
                  <span>•</span>
                  <span>{readTimeText}</span>
                </div>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {article.excerpt}
                </p>
              </article>
            )
          })}
        </div>
      </div>
    </div>
  )
}
