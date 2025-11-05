import { formatDate, formatRelativeTime, formatCurrency } from '../format'

describe('format utilities', () => {
  describe('formatDate', () => {
    const testDate = new Date('2025-11-05T12:00:00Z')

    it('should format date in English locale', () => {
      const result = formatDate(testDate, 'en-US')
      expect(result).toBe('November 5, 2025')
    })

    it('should format date in Portuguese locale', () => {
      const result = formatDate(testDate, 'pt-BR')
      expect(result).toBe('5 de novembro de 2025')
    })

    it('should format date in Arabic locale', () => {
      const result = formatDate(testDate, 'ar')
      expect(result).toContain('2025')
    })
  })

  describe('formatRelativeTime', () => {
    beforeAll(() => {
      jest.useFakeTimers()
      jest.setSystemTime(new Date('2025-11-05T12:00:00Z'))
    })

    afterAll(() => {
      jest.useRealTimers()
    })

    it('should format yesterday in English', () => {
      const yesterday = new Date('2025-11-04T12:00:00Z')
      const result = formatRelativeTime(yesterday, 'en-US')

      expect(result).toBe('yesterday')
    })

    it('should format yesterday in Portuguese', () => {
      const yesterday = new Date('2025-11-04T12:00:00Z')
      const result = formatRelativeTime(yesterday, 'pt-BR')

      expect(result).toBe('ontem')
    })

    it('should format last week in English', () => {
      const lastWeek = new Date('2025-10-29T12:00:00Z')
      const result = formatRelativeTime(lastWeek, 'en-US')

      expect(result).toBe('last week')
    })
  })

  describe('formatCurrency', () => {
    it('should format USD in English locale', () => {
      const result = formatCurrency(1299.99, 'en-US', 'USD')
      expect(result).toBe('$1,299.99')
    })

    it('should handle zero values', () => {
      const result = formatCurrency(0, 'en-US', 'USD')
      expect(result).toBe('$0.00')
    })

    it('should handle negative values', () => {
      const result = formatCurrency(-50.5, 'en-US', 'USD')
      expect(result).toBe('-$50.50')
    })
  })
})
