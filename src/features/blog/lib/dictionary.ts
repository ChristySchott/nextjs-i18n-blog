import 'server-only'
import type { Locale } from '@/shared/lib/i18n'

const dictionaries = {
  'en-US': () =>
    import('../dictionaries/en-US.json').then((module) => module.default),
  'pt-BR': () =>
    import('../dictionaries/pt-BR.json').then((module) => module.default),
  ar: () => import('../dictionaries/ar.json').then((module) => module.default),
}

export const getBlogDictionary = async (locale: Locale) =>
  dictionaries[locale]?.() ?? dictionaries['en-US']()
