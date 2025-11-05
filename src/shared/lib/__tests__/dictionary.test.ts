import { getDictionary } from '../dictionary'
import type { Locale } from '../i18n'

jest.mock('@/shared/dictionaries/en-US.json', () => ({
  header: {
    siteTitle: 'My Blog',
    navigation: {
      home: 'Home',
      about: 'About',
      blog: 'Blog',
      contact: 'Contact',
    },
  },
  footer: {
    copyright: '© {year} My Blog. All rights reserved.',
    madeWith: 'Made with Next.js and TypeScript',
  },
}))

jest.mock('@/shared/dictionaries/pt-BR.json', () => ({
  header: {
    siteTitle: 'Meu Blog',
    navigation: {
      home: 'Início',
      about: 'Sobre',
      blog: 'Blog',
      contact: 'Contato',
    },
  },
  footer: {
    copyright: '© {year} Meu Blog. Todos os direitos reservados.',
    madeWith: 'Feito com Next.js e TypeScript',
  },
}))

jest.mock('@/shared/dictionaries/ar.json', () => ({
  header: {
    siteTitle: 'مدونتي',
    navigation: {
      home: 'الرئيسية',
      about: 'عنّي',
      blog: 'المدونة',
      contact: 'اتصل',
    },
  },
  footer: {
    copyright: '© {year} مدونتي. جميع الحقوق محفوظة.',
    madeWith: 'مصنوع بـ Next.js و TypeScript',
  },
}))

describe('getDictionary', () => {
  describe('valid locales', () => {
    it('should return English dictionary for en-US locale', async () => {
      const dictionary = await getDictionary('en-US')

      expect(dictionary).toBeDefined()
      expect(dictionary.header.siteTitle).toBe('My Blog')
      expect(dictionary.header.navigation.home).toBe('Home')
      expect(dictionary.footer.madeWith).toBe(
        'Made with Next.js and TypeScript'
      )
    })

    it('should return Portuguese dictionary for pt-BR locale', async () => {
      const dictionary = await getDictionary('pt-BR')

      expect(dictionary).toBeDefined()
      expect(dictionary.header.siteTitle).toBe('Meu Blog')
      expect(dictionary.header.navigation.home).toBe('Início')
      expect(dictionary.footer.madeWith).toBe('Feito com Next.js e TypeScript')
    })

    it('should return Arabic dictionary for ar locale', async () => {
      const dictionary = await getDictionary('ar')

      expect(dictionary).toBeDefined()
      expect(dictionary.header.siteTitle).toBe('مدونتي')
      expect(dictionary.header.navigation.home).toBe('الرئيسية')
      expect(dictionary.footer.madeWith).toBe('مصنوع بـ Next.js و TypeScript')
    })
  })

  describe('dictionary structure', () => {
    it('should return object with header property', async () => {
      const dictionary = await getDictionary('en-US')

      expect(dictionary).toHaveProperty('header')
      expect(dictionary.header).toBeInstanceOf(Object)
    })

    it('should return object with footer property', async () => {
      const dictionary = await getDictionary('en-US')

      expect(dictionary).toHaveProperty('footer')
      expect(dictionary.footer).toBeInstanceOf(Object)
    })

    it('should have nested navigation in header', async () => {
      const dictionary = await getDictionary('en-US')

      expect(dictionary.header).toHaveProperty('navigation')
      expect(dictionary.header.navigation).toHaveProperty('home')
      expect(dictionary.header.navigation).toHaveProperty('about')
      expect(dictionary.header.navigation).toHaveProperty('blog')
      expect(dictionary.header.navigation).toHaveProperty('contact')
    })

    it('should have copyright placeholder in footer', async () => {
      const dictionary = await getDictionary('en-US')

      expect(dictionary.footer.copyright).toContain('{year}')
    })
  })

  describe('fallback behavior', () => {
    it('should fall back to English for invalid locale', async () => {
      const dictionary = await getDictionary('fr-FR' as Locale)

      expect(dictionary).toBeDefined()
      expect(dictionary.header.siteTitle).toBe('My Blog')
      expect(dictionary.header.navigation.home).toBe('Home')
    })

    it('should fall back to English for undefined locale', async () => {
      const dictionary = await getDictionary(undefined as unknown as Locale)

      expect(dictionary).toBeDefined()
      expect(dictionary.header.siteTitle).toBe('My Blog')
    })

    it('should fall back to English for null locale', async () => {
      const dictionary = await getDictionary(null as unknown as Locale)

      expect(dictionary).toBeDefined()
      expect(dictionary.header.siteTitle).toBe('My Blog')
    })
  })

  describe('async behavior', () => {
    it('should return a promise', () => {
      const result = getDictionary('en-US')

      expect(result).toBeInstanceOf(Promise)
    })

    it('should resolve with dictionary object', async () => {
      const dictionary = await getDictionary('en-US')

      expect(dictionary).toBeInstanceOf(Object)
      expect(dictionary).not.toBeNull()
    })

    it('should handle multiple concurrent calls', async () => {
      const promises = [
        getDictionary('en-US'),
        getDictionary('pt-BR'),
        getDictionary('ar'),
      ]

      const results = await Promise.all(promises)

      expect(results).toHaveLength(3)
      expect(results[0].header.siteTitle).toBe('My Blog')
      expect(results[1].header.siteTitle).toBe('Meu Blog')
      expect(results[2].header.siteTitle).toBe('مدونتي')
    })
  })

  describe('locale-specific content', () => {
    it('should return different content for each locale', async () => {
      const enDict = await getDictionary('en-US')
      const ptDict = await getDictionary('pt-BR')
      const arDict = await getDictionary('ar')

      expect(enDict.header.siteTitle).not.toBe(ptDict.header.siteTitle)
      expect(ptDict.header.siteTitle).not.toBe(arDict.header.siteTitle)
      expect(arDict.header.siteTitle).not.toBe(enDict.header.siteTitle)
    })

    it('should maintain consistent structure across locales', async () => {
      const enDict = await getDictionary('en-US')
      const ptDict = await getDictionary('pt-BR')
      const arDict = await getDictionary('ar')

      const enKeys = Object.keys(enDict.header.navigation).sort()
      const ptKeys = Object.keys(ptDict.header.navigation).sort()
      const arKeys = Object.keys(arDict.header.navigation).sort()

      expect(enKeys).toEqual(ptKeys)
      expect(ptKeys).toEqual(arKeys)
    })
  })

  describe('type safety', () => {
    it('should accept valid Locale type', async () => {
      const locales: Locale[] = ['en-US', 'pt-BR', 'ar']

      for (const locale of locales) {
        const dictionary = await getDictionary(locale)
        expect(dictionary).toBeDefined()
      }
    })

    it('should return dictionary with correct structure', async () => {
      const dictionary = await getDictionary('en-US')

      expect(typeof dictionary.header.siteTitle).toBe('string')
      expect(typeof dictionary.header.navigation.home).toBe('string')
      expect(typeof dictionary.footer.copyright).toBe('string')
      expect(typeof dictionary.footer.madeWith).toBe('string')
    })
  })

  describe('caching behavior', () => {
    it('should return same structure on repeated calls', async () => {
      const dict1 = await getDictionary('en-US')
      const dict2 = await getDictionary('en-US')

      expect(dict1.header.siteTitle).toBe(dict2.header.siteTitle)
      expect(dict1.footer.copyright).toBe(dict2.footer.copyright)
    })
  })
})
