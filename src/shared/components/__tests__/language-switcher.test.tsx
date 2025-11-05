import { render, screen } from '@testing-library/react'
import { LanguageSwitcher } from '../language-switcher'
import { usePathname } from 'next/navigation'

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(() => '/en-US/blog'),
}))

describe('LanguageSwitcher', () => {
  describe('desktop variant', () => {
    it('should render available locales with names', () => {
      render(<LanguageSwitcher currentLocale="en-US" variant="desktop" />)

      expect(screen.getByText('Português')).toBeInTheDocument()
      expect(screen.getByText('العربية')).toBeInTheDocument()
    })

    it('should not render current locale', () => {
      render(<LanguageSwitcher currentLocale="en-US" variant="desktop" />)

      expect(screen.queryByText('English')).not.toBeInTheDocument()
    })

    it('should render flags for each locale', () => {
      render(<LanguageSwitcher currentLocale="en-US" variant="desktop" />)

      expect(screen.getByText('🇧🇷')).toBeInTheDocument()
      expect(screen.getByText('🇸🇦')).toBeInTheDocument()
    })

    it('should generate correct href for language links', () => {
      render(<LanguageSwitcher currentLocale="en-US" variant="desktop" />)

      const ptLink = screen.getByRole('link', { name: /Português/i })
      const arLink = screen.getByRole('link', { name: /العربية/i })

      expect(ptLink).toHaveAttribute('href', '/pt-BR/blog')
      expect(arLink).toHaveAttribute('href', '/ar/blog')
    })

    it('should have proper accessibility attributes', () => {
      render(<LanguageSwitcher currentLocale="en-US" variant="desktop" />)

      const ptLink = screen.getByRole('link', { name: /Português/i })

      expect(ptLink).toHaveAttribute('title', 'Português')
    })
  })

  describe('mobile variant', () => {
    it('should render only flags without text', () => {
      render(<LanguageSwitcher currentLocale="en-US" variant="mobile" />)

      expect(screen.getByText('🇧🇷')).toBeInTheDocument()
      expect(screen.getByText('🇸🇦')).toBeInTheDocument()
      expect(screen.queryByText('Português')).not.toBeInTheDocument()
      expect(screen.queryByText('العربية')).not.toBeInTheDocument()
    })

    it('should have mobile-specific classes', () => {
      const { container } = render(
        <LanguageSwitcher currentLocale="en-US" variant="mobile" />
      )

      const wrapper = container.firstChild
      expect(wrapper).toHaveClass('md:hidden')
    })
  })

  describe('path preservation', () => {
    it('should preserve current page on root', () => {
      ;(usePathname as jest.Mock).mockReturnValue('/en-US')

      render(<LanguageSwitcher currentLocale="en-US" variant="desktop" />)

      const ptLink = screen.getByRole('link', { name: /Português/i })
      expect(ptLink).toHaveAttribute('href', '/pt-BR')
    })

    it('should preserve current page on nested route', () => {
      ;(usePathname as jest.Mock).mockReturnValue('/en-US/about')

      render(<LanguageSwitcher currentLocale="en-US" variant="desktop" />)

      const ptLink = screen.getByRole('link', { name: /Português/i })
      expect(ptLink).toHaveAttribute('href', '/pt-BR/about')
    })

    it('should preserve deeply nested paths', () => {
      ;(usePathname as jest.Mock).mockReturnValue('/en-US/blog/article-123')

      render(<LanguageSwitcher currentLocale="en-US" variant="desktop" />)

      const ptLink = screen.getByRole('link', { name: /Português/i })
      expect(ptLink).toHaveAttribute('href', '/pt-BR/blog/article-123')
    })

    it('should handle switching from non-default locale', () => {
      ;(usePathname as jest.Mock).mockReturnValue('/pt-BR/contact')

      render(<LanguageSwitcher currentLocale="pt-BR" variant="desktop" />)

      const enLink = screen.getByRole('link', { name: /English/i })
      const arLink = screen.getByRole('link', { name: /العربية/i })

      expect(enLink).toHaveAttribute('href', '/en-US/contact')
      expect(arLink).toHaveAttribute('href', '/ar/contact')
    })
  })

  describe('different current locales', () => {
    it('should show correct alternatives when current is Portuguese', () => {
      render(<LanguageSwitcher currentLocale="pt-BR" variant="desktop" />)

      expect(screen.getByText('English')).toBeInTheDocument()
      expect(screen.getByText('العربية')).toBeInTheDocument()
      expect(screen.queryByText('Português')).not.toBeInTheDocument()
    })

    it('should show correct alternatives when current is Arabic', () => {
      render(<LanguageSwitcher currentLocale="ar" variant="desktop" />)

      expect(screen.getByText('English')).toBeInTheDocument()
      expect(screen.getByText('Português')).toBeInTheDocument()
      expect(screen.queryByText('العربية')).not.toBeInTheDocument()
    })
  })
})
