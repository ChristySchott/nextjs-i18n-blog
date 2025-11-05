import { NextRequest } from 'next/server'
import { match } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'

import { getLocale } from '../locale'

jest.mock('@formatjs/intl-localematcher', () => ({
  match: jest.fn(),
}))

jest.mock('negotiator', () => {
  return jest.fn().mockImplementation(() => ({
    languages: jest.fn(),
  }))
})

jest.mock('../i18n', () => ({
  i18n: {
    defaultLocale: 'en-US',
    locales: ['en-US', 'pt-BR', 'ar'],
  },
}))

describe('getLocale', () => {
  let mockMatchLocale: jest.Mock
  let mockNegotiator: jest.Mock

  beforeEach(() => {
    jest.clearAllMocks()

    mockMatchLocale = match as jest.Mock

    mockNegotiator = Negotiator as jest.Mock
  })

  const createMockRequest = (acceptLanguage: string): NextRequest => {
    const headers = new Headers()
    if (acceptLanguage) {
      headers.set('accept-language', acceptLanguage)
    }

    return {
      headers,
      nextUrl: new URL('http://localhost:3000'),
    } as NextRequest
  }

  describe('basic locale detection', () => {
    it('should return locale from Accept-Language header', () => {
      const request = createMockRequest('en-US')

      mockNegotiator.mockImplementation(() => ({
        languages: jest.fn().mockReturnValue(['en-US']),
      }))

      mockMatchLocale.mockReturnValue('en-US')

      const locale = getLocale(request)

      expect(locale).toBe('en-US')
      expect(mockMatchLocale).toHaveBeenCalled()
    })

    it('should detect Portuguese locale', () => {
      const request = createMockRequest('pt-BR')

      mockNegotiator.mockImplementation(() => ({
        languages: jest.fn().mockReturnValue(['pt-BR']),
      }))

      mockMatchLocale.mockReturnValue('pt-BR')

      const locale = getLocale(request)

      expect(locale).toBe('pt-BR')
    })

    it('should detect Arabic locale', () => {
      const request = createMockRequest('ar')

      mockNegotiator.mockImplementation(() => ({
        languages: jest.fn().mockReturnValue(['ar']),
      }))

      mockMatchLocale.mockReturnValue('ar')

      const locale = getLocale(request)

      expect(locale).toBe('ar')
    })
  })

  describe('header parsing', () => {
    it('should parse Accept-Language header correctly', () => {
      const request = createMockRequest('en-US,en;q=0.9')

      const mockLanguages = jest.fn().mockReturnValue(['en-US', 'en'])
      mockNegotiator.mockImplementation(() => ({
        languages: mockLanguages,
      }))

      mockMatchLocale.mockReturnValue('en-US')

      getLocale(request)

      expect(mockNegotiator).toHaveBeenCalled()
      expect(mockLanguages).toHaveBeenCalledWith(['en-US', 'pt-BR', 'ar'])
    })

    it('should convert request headers to object format', () => {
      const request = createMockRequest('pt-BR')

      mockNegotiator.mockImplementation((config) => {
        expect(config.headers).toHaveProperty('accept-language', 'pt-BR')
        return {
          languages: jest.fn().mockReturnValue(['pt-BR']),
        }
      })

      mockMatchLocale.mockReturnValue('pt-BR')

      getLocale(request)
    })

    it('should handle multiple headers', () => {
      const headers = new Headers()
      headers.set('accept-language', 'en-US')
      headers.set('user-agent', 'Mozilla/5.0')
      headers.set('content-type', 'application/json')

      const request = {
        headers,
        nextUrl: new URL('http://localhost:3000'),
      } as NextRequest

      mockNegotiator.mockImplementation((config) => {
        expect(Object.keys(config.headers).length).toBeGreaterThan(1)
        return {
          languages: jest.fn().mockReturnValue(['en-US']),
        }
      })

      mockMatchLocale.mockReturnValue('en-US')

      getLocale(request)
    })
  })

  describe('locale matching', () => {
    it('should call matchLocale with correct arguments', () => {
      const request = createMockRequest('en-US')

      mockNegotiator.mockImplementation(() => ({
        languages: jest.fn().mockReturnValue(['en-US']),
      }))

      mockMatchLocale.mockReturnValue('en-US')

      getLocale(request)

      expect(mockMatchLocale).toHaveBeenCalledWith(
        ['en-US'],
        ['en-US', 'pt-BR', 'ar'],
        'en-US'
      )
    })

    it('should pass supported locales to matcher', () => {
      const request = createMockRequest('fr-FR')

      mockNegotiator.mockImplementation(() => ({
        languages: jest.fn().mockReturnValue(['fr-FR']),
      }))

      mockMatchLocale.mockReturnValue('en-US')

      getLocale(request)

      expect(mockMatchLocale).toHaveBeenCalledWith(
        expect.any(Array),
        ['en-US', 'pt-BR', 'ar'],
        expect.any(String)
      )
    })

    it('should use default locale as fallback', () => {
      const request = createMockRequest('de-DE')

      mockNegotiator.mockImplementation(() => ({
        languages: jest.fn().mockReturnValue(['de-DE']),
      }))

      mockMatchLocale.mockReturnValue('en-US')

      getLocale(request)

      expect(mockMatchLocale).toHaveBeenCalledWith(
        expect.any(Array),
        expect.any(Array),
        'en-US'
      )
    })
  })

  describe('language priority', () => {
    it('should handle quality values in Accept-Language', () => {
      const request = createMockRequest('pt-BR;q=0.9,en-US;q=0.8')

      mockNegotiator.mockImplementation(() => ({
        languages: jest.fn().mockReturnValue(['pt-BR', 'en-US']),
      }))

      mockMatchLocale.mockReturnValue('pt-BR')

      const locale = getLocale(request)

      expect(locale).toBe('pt-BR')
    })

    it('should prefer first matching locale', () => {
      const request = createMockRequest('en-US,pt-BR,ar')

      mockNegotiator.mockImplementation(() => ({
        languages: jest.fn().mockReturnValue(['en-US', 'pt-BR', 'ar']),
      }))

      mockMatchLocale.mockReturnValue('en-US')

      const locale = getLocale(request)

      expect(locale).toBe('en-US')
    })

    it('should handle wildcard in Accept-Language', () => {
      const request = createMockRequest('*')

      mockNegotiator.mockImplementation(() => ({
        languages: jest.fn().mockReturnValue(['*']),
      }))

      mockMatchLocale.mockReturnValue('en-US')

      const locale = getLocale(request)

      expect(locale).toBe('en-US')
    })
  })

  describe('fallback behavior', () => {
    it('should return default locale for unsupported language', () => {
      const request = createMockRequest('fr-FR')

      mockNegotiator.mockImplementation(() => ({
        languages: jest.fn().mockReturnValue(['fr-FR']),
      }))

      mockMatchLocale.mockReturnValue('en-US')

      const locale = getLocale(request)

      expect(locale).toBe('en-US')
    })

    it('should handle empty Accept-Language header', () => {
      const request = createMockRequest('')

      mockNegotiator.mockImplementation(() => ({
        languages: jest.fn().mockReturnValue([]),
      }))

      mockMatchLocale.mockReturnValue('en-US')

      const locale = getLocale(request)

      expect(locale).toBe('en-US')
    })

    it('should handle missing Accept-Language header', () => {
      const headers = new Headers()
      const request = {
        headers,
        nextUrl: new URL('http://localhost:3000'),
      } as NextRequest

      mockNegotiator.mockImplementation(() => ({
        languages: jest.fn().mockReturnValue([]),
      }))

      mockMatchLocale.mockReturnValue('en-US')

      const locale = getLocale(request)

      expect(locale).toBe('en-US')
    })
  })

  describe('edge cases', () => {
    it('should handle locale variants', () => {
      const request = createMockRequest('en-GB')

      mockNegotiator.mockImplementation(() => ({
        languages: jest.fn().mockReturnValue(['en-GB']),
      }))

      mockMatchLocale.mockReturnValue('en-US')

      const locale = getLocale(request)

      expect(locale).toBe('en-US')
    })

    it('should handle case-insensitive locale codes', () => {
      const request = createMockRequest('EN-us')

      mockNegotiator.mockImplementation(() => ({
        languages: jest.fn().mockReturnValue(['EN-us']),
      }))

      mockMatchLocale.mockReturnValue('en-US')

      const locale = getLocale(request)

      expect(locale).toBe('en-US')
    })

    it('should handle malformed Accept-Language header', () => {
      const request = createMockRequest('invalid;;;')

      mockNegotiator.mockImplementation(() => ({
        languages: jest.fn().mockReturnValue([]),
      }))

      mockMatchLocale.mockReturnValue('en-US')

      const locale = getLocale(request)

      expect(locale).toBe('en-US')
    })
  })

  describe('negotiator integration', () => {
    it('should call Negotiator constructor with headers', () => {
      const request = createMockRequest('en-US')

      mockNegotiator.mockImplementation(() => ({
        languages: jest.fn().mockReturnValue(['en-US']),
      }))

      mockMatchLocale.mockReturnValue('en-US')

      getLocale(request)

      expect(mockNegotiator).toHaveBeenCalledWith({
        headers: expect.objectContaining({
          'accept-language': 'en-US',
        }),
      })
    })

    it('should call languages method with supported locales', () => {
      const request = createMockRequest('pt-BR')

      const mockLanguages = jest.fn().mockReturnValue(['pt-BR'])
      mockNegotiator.mockImplementation(() => ({
        languages: mockLanguages,
      }))

      mockMatchLocale.mockReturnValue('pt-BR')

      getLocale(request)

      expect(mockLanguages).toHaveBeenCalledWith(['en-US', 'pt-BR', 'ar'])
    })
  })

  describe('return value', () => {
    it('should return string', () => {
      const request = createMockRequest('en-US')

      mockNegotiator.mockImplementation(() => ({
        languages: jest.fn().mockReturnValue(['en-US']),
      }))

      mockMatchLocale.mockReturnValue('en-US')

      const locale = getLocale(request)

      expect(typeof locale).toBe('string')
    })

    it('should return value from matchLocale', () => {
      const request = createMockRequest('pt-BR')

      mockNegotiator.mockImplementation(() => ({
        languages: jest.fn().mockReturnValue(['pt-BR']),
      }))

      mockMatchLocale.mockReturnValue('pt-BR')

      const locale = getLocale(request)

      expect(locale).toBe(mockMatchLocale.mock.results[0].value)
    })

    it('should never return undefined for valid request', () => {
      const request = createMockRequest('en-US')

      mockNegotiator.mockImplementation(() => ({
        languages: jest.fn().mockReturnValue(['en-US']),
      }))

      mockMatchLocale.mockReturnValue('en-US')

      const locale = getLocale(request)

      expect(locale).toBeDefined()
      expect(locale).not.toBeNull()
    })
  })

  describe('real-world scenarios', () => {
    it('should handle browser default Accept-Language', () => {
      const request = createMockRequest('en-US,en;q=0.9,pt;q=0.8')

      mockNegotiator.mockImplementation(() => ({
        languages: jest.fn().mockReturnValue(['en-US', 'en', 'pt']),
      }))

      mockMatchLocale.mockReturnValue('en-US')

      const locale = getLocale(request)

      expect(locale).toBe('en-US')
    })

    it('should handle mobile browser headers', () => {
      const request = createMockRequest('pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7')

      mockNegotiator.mockImplementation(() => ({
        languages: jest.fn().mockReturnValue(['pt-BR', 'pt', 'en-US', 'en']),
      }))

      mockMatchLocale.mockReturnValue('pt-BR')

      const locale = getLocale(request)

      expect(locale).toBe('pt-BR')
    })

    it('should handle Arabic browser preference', () => {
      const request = createMockRequest('ar,ar-SA;q=0.9,en;q=0.8')

      mockNegotiator.mockImplementation(() => ({
        languages: jest.fn().mockReturnValue(['ar', 'ar-SA', 'en']),
      }))

      mockMatchLocale.mockReturnValue('ar')

      const locale = getLocale(request)

      expect(locale).toBe('ar')
    })
  })
})
