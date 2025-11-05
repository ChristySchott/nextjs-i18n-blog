import 'server-only'
import type { Locale } from './i18n'

const dictionaries = {
  'en-US': () =>
    import('@/shared/dictionaries/en-US.json').then((module) => module.default),
  'pt-BR': () =>
    import('@/shared/dictionaries/pt-BR.json').then((module) => module.default),
  ar: () =>
    import('@/shared/dictionaries/ar.json').then((module) => module.default),
}

export const getDictionary = async (locale: Locale) =>
  dictionaries[locale]?.() ?? dictionaries['en-US']()
