import { render, screen } from '@testing-library/react'
import { Navigation } from '../navigation'

const mockDictionary = {
  home: 'Home',
  about: 'About',
  blog: 'Blog',
  contact: 'Contact',
}

const mockDictionaryPtBR = {
  home: 'Início',
  about: 'Sobre',
  blog: 'Blog',
  contact: 'Contato',
}

const mockDictionaryAr = {
  home: 'الرئيسية',
  about: 'عنّي',
  blog: 'المدونة',
  contact: 'اتصل',
}

describe('Navigation', () => {
  describe('rendering', () => {
    it('should render all navigation links', () => {
      render(<Navigation locale="en-US" dictionary={mockDictionary} />)

      expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument()
      expect(screen.getByRole('link', { name: 'About' })).toBeInTheDocument()
      expect(screen.getByRole('link', { name: 'Blog' })).toBeInTheDocument()
      expect(screen.getByRole('link', { name: 'Contact' })).toBeInTheDocument()
    })

    it('should render exactly 4 links', () => {
      render(<Navigation locale="en-US" dictionary={mockDictionary} />)

      const links = screen.getAllByRole('link')
      expect(links).toHaveLength(4)
    })

    it('should have navigation landmark', () => {
      render(<Navigation locale="en-US" dictionary={mockDictionary} />)

      const nav = screen.getByRole('navigation')
      expect(nav).toBeInTheDocument()
    })
  })

  describe('link generation', () => {
    it('should generate correct URLs for English locale', () => {
      render(<Navigation locale="en-US" dictionary={mockDictionary} />)

      expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute(
        'href',
        '/en-US'
      )
      expect(screen.getByRole('link', { name: 'About' })).toHaveAttribute(
        'href',
        '/en-US/about'
      )
      expect(screen.getByRole('link', { name: 'Blog' })).toHaveAttribute(
        'href',
        '/en-US/blog'
      )
      expect(screen.getByRole('link', { name: 'Contact' })).toHaveAttribute(
        'href',
        '/en-US/contact'
      )
    })

    it('should generate correct URLs for Portuguese locale', () => {
      render(<Navigation locale="pt-BR" dictionary={mockDictionaryPtBR} />)

      expect(screen.getByRole('link', { name: 'Início' })).toHaveAttribute(
        'href',
        '/pt-BR'
      )
      expect(screen.getByRole('link', { name: 'Sobre' })).toHaveAttribute(
        'href',
        '/pt-BR/about'
      )
      expect(screen.getByRole('link', { name: 'Blog' })).toHaveAttribute(
        'href',
        '/pt-BR/blog'
      )
      expect(screen.getByRole('link', { name: 'Contato' })).toHaveAttribute(
        'href',
        '/pt-BR/contact'
      )
    })

    it('should generate correct URLs for Arabic locale', () => {
      render(<Navigation locale="ar" dictionary={mockDictionaryAr} />)

      const links = screen.getAllByRole('link')
      links.forEach((link) => {
        expect(link.getAttribute('href')).toMatch(/^\/ar/)
      })
    })

    it('should use locale prefix for all links', () => {
      render(<Navigation locale="en-US" dictionary={mockDictionary} />)

      const links = screen.getAllByRole('link')
      links.forEach((link) => {
        const href = link.getAttribute('href')
        expect(href).toMatch(/^\/en-US/)
      })
    })
  })

  describe('translations', () => {
    it('should display English translations', () => {
      render(<Navigation locale="en-US" dictionary={mockDictionary} />)

      expect(screen.getByText('Home')).toBeInTheDocument()
      expect(screen.getByText('About')).toBeInTheDocument()
      expect(screen.getByText('Blog')).toBeInTheDocument()
      expect(screen.getByText('Contact')).toBeInTheDocument()
    })

    it('should display Portuguese translations', () => {
      render(<Navigation locale="pt-BR" dictionary={mockDictionaryPtBR} />)

      expect(screen.getByText('Início')).toBeInTheDocument()
      expect(screen.getByText('Sobre')).toBeInTheDocument()
      expect(screen.getByText('Blog')).toBeInTheDocument()
      expect(screen.getByText('Contato')).toBeInTheDocument()
    })

    it('should display Arabic translations', () => {
      render(<Navigation locale="ar" dictionary={mockDictionaryAr} />)

      expect(screen.getByText('الرئيسية')).toBeInTheDocument()
      expect(screen.getByText('عنّي')).toBeInTheDocument()
      expect(screen.getByText('المدونة')).toBeInTheDocument()
      expect(screen.getByText('اتصل')).toBeInTheDocument()
    })
  })

  describe('accessibility', () => {
    it('should have proper link structure', () => {
      render(<Navigation locale="en-US" dictionary={mockDictionary} />)

      const homeLink = screen.getByRole('link', { name: 'Home' })
      expect(homeLink.tagName).toBe('A')
    })

    it('should have hover styles', () => {
      render(<Navigation locale="en-US" dictionary={mockDictionary} />)

      const links = screen.getAllByRole('link')
      links.forEach((link) => {
        expect(link).toHaveClass('hover:text-gray-900')
      })
    })

    it('should be keyboard navigable', () => {
      render(<Navigation locale="en-US" dictionary={mockDictionary} />)

      const links = screen.getAllByRole('link')
      links.forEach((link) => {
        expect(link).not.toHaveAttribute('tabindex', '-1')
      })
    })
  })

  describe('responsive behavior', () => {
    it('should have responsive text sizes', () => {
      render(<Navigation locale="en-US" dictionary={mockDictionary} />)

      const links = screen.getAllByRole('link')
      links.forEach((link) => {
        expect(link).toHaveClass('text-sm')
        expect(link).toHaveClass('md:text-base')
      })
    })

    it('should have responsive spacing', () => {
      const { container } = render(
        <Navigation locale="en-US" dictionary={mockDictionary} />
      )

      const nav = container.querySelector('nav')
      expect(nav).toHaveClass('gap-4')
      expect(nav).toHaveClass('md:gap-6')
    })
  })

  describe('link order', () => {
    it('should render links in correct order', () => {
      render(<Navigation locale="en-US" dictionary={mockDictionary} />)

      const links = screen.getAllByRole('link')
      expect(links[0]).toHaveAccessibleName('Home')
      expect(links[1]).toHaveAccessibleName('About')
      expect(links[2]).toHaveAccessibleName('Blog')
      expect(links[3]).toHaveAccessibleName('Contact')
    })
  })
})
