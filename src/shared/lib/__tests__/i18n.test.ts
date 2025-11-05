import { getPlural, interpolate, getDirection } from '../i18n'

describe('i18n utilities', () => {
  describe('getPlural', () => {
    it('should return zero form when count is 0 and zero form exists', () => {
      const translations = {
        zero: 'No items',
        one: '1 item',
        other: '{count} items',
      }

      expect(getPlural(0, translations)).toBe('No items')
    })

    it('should return one form when count is 1', () => {
      const translations = {
        one: '1 item',
        other: '{count} items',
      }

      expect(getPlural(1, translations)).toBe('1 item')
    })

    it('should return other form and replace {count} placeholder', () => {
      const translations = {
        one: '1 item',
        other: '{count} items',
      }

      expect(getPlural(5, translations)).toBe('5 items')
    })

    it('should handle Arabic dual form (two)', () => {
      const translations = {
        one: 'عنصر واحد',
        two: 'عنصران',
        other: '{count} عناصر',
      }

      expect(getPlural(2, translations)).toBe('عنصران')
    })

    it('should fall back to other form when zero form is missing', () => {
      const translations = {
        one: '1 item',
        other: '{count} items',
      }

      expect(getPlural(0, translations)).toBe('0 items')
    })
  })

  describe('interpolate', () => {
    it('should replace single variable', () => {
      const template = 'Hello {name}!'
      const result = interpolate(template, { name: 'World' })

      expect(result).toBe('Hello World!')
    })

    it('should replace multiple variables', () => {
      const template = '{greeting} {name}, you have {count} messages'
      const result = interpolate(template, {
        greeting: 'Hello',
        name: 'John',
        count: 5,
      })

      expect(result).toBe('Hello John, you have 5 messages')
    })

    it('should keep placeholder if variable is missing', () => {
      const template = 'Hello {name}!'
      const result = interpolate(template, {})

      expect(result).toBe('Hello {name}!')
    })

    it('should handle numeric values correctly', () => {
      const template = 'Price: ${price}'
      const result = interpolate(template, { price: 99.99 })

      expect(result).toBe('Price: $99.99')
    })

    it('should handle zero as a valid value', () => {
      const template = 'You have {count} items'
      const result = interpolate(template, { count: 0 })

      expect(result).toBe('You have 0 items')
    })

    it('should not replace malformed placeholders', () => {
      const template = 'Hello { name } and {name}!'
      const result = interpolate(template, { name: 'World' })

      expect(result).toBe('Hello { name } and World!')
    })
  })

  describe('getDirection', () => {
    it('should return ltr for English', () => {
      expect(getDirection('en-US')).toBe('ltr')
    })

    it('should return ltr for Portuguese', () => {
      expect(getDirection('pt-BR')).toBe('ltr')
    })

    it('should return rtl for Arabic', () => {
      expect(getDirection('ar')).toBe('rtl')
    })

    it('should default to ltr for unknown locale', () => {
      const result = getDirection('unknown' as any) // eslint-disable-line @typescript-eslint/no-explicit-any
      expect(result).toBe('ltr')
    })
  })
})
