import { getAboutDictionary } from '../dictionary'
import type { Locale } from '@/shared/lib/i18n'

jest.mock('@/features/about/dictionaries/en-US.json', () => ({
  metadata: {
    title: 'My Blog',
  },
}))

jest.mock('@/features/about/dictionaries/pt-BR.json', () => ({
  metadata: {
    title: 'Meu Blog',
  },
}))

jest.mock('@/features/about/dictionaries/ar.json', () => ({
  metadata: {
    title: 'مدونتي',
  },
}))

describe('getAboutDictionary', () => {
  describe('valid locales', () => {
    it('should return English dictionary for en-US locale', async () => {
      const dictionary = await getAboutDictionary('en-US')

      expect(dictionary).toBeDefined()
      expect(dictionary.metadata.title).toBe('My Blog')
    })

    it('should return Portuguese dictionary for pt-BR locale', async () => {
      const dictionary = await getAboutDictionary('pt-BR')

      expect(dictionary).toBeDefined()
      expect(dictionary.metadata.title).toBe('Meu Blog')
    })

    it('should return Arabic dictionary for ar locale', async () => {
      const dictionary = await getAboutDictionary('ar')

      expect(dictionary).toBeDefined()
      expect(dictionary.metadata.title).toBe('مدونتي')
    })
  })

  describe('locale-specific content', () => {
    it('should return different content for each locale', async () => {
      const enDict = await getAboutDictionary('en-US')
      const ptDict = await getAboutDictionary('pt-BR')
      const arDict = await getAboutDictionary('ar')

      expect(enDict.metadata.title).not.toBe(ptDict.metadata.title)
      expect(ptDict.metadata.title).not.toBe(arDict.metadata.title)
      expect(arDict.metadata.title).not.toBe(enDict.metadata.title)
    })

    it('should maintain consistent structure across locales', async () => {
      const enDict = await getAboutDictionary('en-US')
      const ptDict = await getAboutDictionary('pt-BR')
      const arDict = await getAboutDictionary('ar')

      const enKeys = Object.keys(enDict.metadata).sort()
      const ptKeys = Object.keys(ptDict.metadata).sort()
      const arKeys = Object.keys(arDict.metadata).sort()

      expect(enKeys).toEqual(ptKeys)
      expect(ptKeys).toEqual(arKeys)
    })
  })

  describe('default locale', () => {
    it('should use default en-US locale if none is provide', async () => {
      const enDict = await getAboutDictionary('en-US')
      const dictionary = await getAboutDictionary(
        undefined as unknown as Locale
      )

      expect(dictionary.metadata.title).toBe(enDict.metadata.title)
    })
  })

  describe('caching behavior', () => {
    it('should return same structure on repeated calls', async () => {
      const dict1 = await getAboutDictionary('en-US')
      const dict2 = await getAboutDictionary('en-US')

      expect(dict1.metadata.title).toBe(dict2.metadata.title)
    })
  })
})
