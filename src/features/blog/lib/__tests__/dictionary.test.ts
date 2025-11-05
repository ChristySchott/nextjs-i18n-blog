import { getBlogDictionary } from '../dictionary'
import type { Locale } from '@/shared/lib/i18n'

jest.mock('@/features/blog/dictionaries/en-US.json', () => ({
  hero: {
    title: 'My Blog',
  },
}))

jest.mock('@/features/blog/dictionaries/pt-BR.json', () => ({
  hero: {
    title: 'Meu Blog',
  },
}))

jest.mock('@/features/blog/dictionaries/ar.json', () => ({
  hero: {
    title: 'مدونتي',
  },
}))

describe('getBlogDictionary', () => {
  describe('valid locales', () => {
    it('should return English dictionary for en-US locale', async () => {
      const dictionary = await getBlogDictionary('en-US')

      expect(dictionary).toBeDefined()
      expect(dictionary.hero.title).toBe('My Blog')
    })

    it('should return Portuguese dictionary for pt-BR locale', async () => {
      const dictionary = await getBlogDictionary('pt-BR')

      expect(dictionary).toBeDefined()
      expect(dictionary.hero.title).toBe('Meu Blog')
    })

    it('should return Arabic dictionary for ar locale', async () => {
      const dictionary = await getBlogDictionary('ar')

      expect(dictionary).toBeDefined()
      expect(dictionary.hero.title).toBe('مدونتي')
    })
  })

  describe('locale-specific content', () => {
    it('should return different content for each locale', async () => {
      const enDict = await getBlogDictionary('en-US')
      const ptDict = await getBlogDictionary('pt-BR')
      const arDict = await getBlogDictionary('ar')

      expect(enDict.hero.title).not.toBe(ptDict.hero.title)
      expect(ptDict.hero.title).not.toBe(arDict.hero.title)
      expect(arDict.hero.title).not.toBe(enDict.hero.title)
    })

    it('should maintain consistent structure across locales', async () => {
      const enDict = await getBlogDictionary('en-US')
      const ptDict = await getBlogDictionary('pt-BR')
      const arDict = await getBlogDictionary('ar')

      const enKeys = Object.keys(enDict.hero).sort()
      const ptKeys = Object.keys(ptDict.hero).sort()
      const arKeys = Object.keys(arDict.hero).sort()

      expect(enKeys).toEqual(ptKeys)
      expect(ptKeys).toEqual(arKeys)
    })
  })

  describe('default locale', () => {
    it('should use default en-US locale if none is provide', async () => {
      const enDict = await getBlogDictionary('en-US')
      const dictionary = await getBlogDictionary(undefined as unknown as Locale)

      expect(dictionary.hero.title).toBe(enDict.hero.title)
    })
  })

  describe('caching behavior', () => {
    it('should return same structure on repeated calls', async () => {
      const dict1 = await getBlogDictionary('en-US')
      const dict2 = await getBlogDictionary('en-US')

      expect(dict1.hero.title).toBe(dict2.hero.title)
    })
  })
})
