import { render, screen } from '@testing-library/react'
import { Footer } from '../footer'

const mockDictionary = {
  copyright: '© {year} My Blog. All rights reserved.',
  madeWith: 'Made with Next.js and TypeScript',
}

const mockDictionaryPtBR = {
  copyright: '© {year} Meu Blog. Todos os direitos reservados.',
  madeWith: 'Feito com Next.js e TypeScript',
}

const mockDictionaryAr = {
  copyright: '© {year} مدونتي. جميع الحقوق محفوظة.',
  madeWith: 'مصنوع بـ Next.js و TypeScript',
}

describe('Footer', () => {
  beforeAll(() => {
    jest.useFakeTimers()
    jest.setSystemTime(new Date('2025-11-05T12:00:00Z'))
  })

  afterAll(() => {
    jest.useRealTimers()
  })

  describe('basic rendering', () => {
    it('should render footer element', () => {
      const { container } = render(
        <Footer locale="en-US" dictionary={mockDictionary} />
      )

      const footer = container.querySelector('footer')
      expect(footer).toBeInTheDocument()
    })

    it('should render two paragraphs', () => {
      const { container } = render(
        <Footer locale="en-US" dictionary={mockDictionary} />
      )

      const paragraphs = container.querySelectorAll('p')
      expect(paragraphs).toHaveLength(2)
    })

    it('should have proper semantic structure', () => {
      const { container } = render(
        <Footer locale="en-US" dictionary={mockDictionary} />
      )

      const footer = container.querySelector('footer')
      expect(footer?.tagName).toBe('FOOTER')
    })
  })

  describe('copyright text', () => {
    it('should display copyright with current year', () => {
      render(<Footer locale="en-US" dictionary={mockDictionary} />)

      expect(
        screen.getByText('© 2025 My Blog. All rights reserved.')
      ).toBeInTheDocument()
    })

    it('should replace {year} placeholder with actual year', () => {
      render(<Footer locale="en-US" dictionary={mockDictionary} />)

      expect(screen.queryByText(/{year}/)).not.toBeInTheDocument()
      expect(screen.getByText(/2025/)).toBeInTheDocument()
    })

    it('should not contain placeholder in rendered output', () => {
      const { container } = render(
        <Footer locale="en-US" dictionary={mockDictionary} />
      )

      expect(container.textContent).not.toContain('{year}')
    })

    it('should use year from mocked date', () => {
      render(<Footer locale="en-US" dictionary={mockDictionary} />)

      const copyrightText = screen.getByText(/© \d{4}/)
      expect(copyrightText).toHaveTextContent('2025')
    })
  })

  describe('made with text', () => {
    it('should display made with message', () => {
      render(<Footer locale="en-US" dictionary={mockDictionary} />)

      expect(
        screen.getByText('Made with Next.js and TypeScript')
      ).toBeInTheDocument()
    })

    it('should render made with text without modifications', () => {
      render(<Footer locale="en-US" dictionary={mockDictionary} />)

      const madeWithText = screen.getByText(/Next.js/)
      expect(madeWithText.textContent).toBe(mockDictionary.madeWith)
    })
  })

  describe('translations', () => {
    it('should display English copyright', () => {
      render(<Footer locale="en-US" dictionary={mockDictionary} />)

      expect(screen.getByText(/All rights reserved/)).toBeInTheDocument()
    })

    it('should display Portuguese copyright', () => {
      render(<Footer locale="pt-BR" dictionary={mockDictionaryPtBR} />)

      expect(
        screen.getByText(/Todos os direitos reservados/)
      ).toBeInTheDocument()
    })

    it('should display Arabic copyright', () => {
      render(<Footer locale="ar" dictionary={mockDictionaryAr} />)

      expect(screen.getByText(/جميع الحقوق محفوظة/)).toBeInTheDocument()
    })

    it('should display Portuguese made with text', () => {
      render(<Footer locale="pt-BR" dictionary={mockDictionaryPtBR} />)

      expect(screen.getByText(/Feito com Next.js/)).toBeInTheDocument()
    })

    it('should display Arabic made with text', () => {
      render(<Footer locale="ar" dictionary={mockDictionaryAr} />)

      expect(screen.getByText(/مصنوع بـ Next.js/)).toBeInTheDocument()
    })

    it('should replace year in all locales', () => {
      const { rerender } = render(
        <Footer locale="en-US" dictionary={mockDictionary} />
      )
      expect(screen.getByText(/2025/)).toBeInTheDocument()

      rerender(<Footer locale="pt-BR" dictionary={mockDictionaryPtBR} />)
      expect(screen.getByText(/2025/)).toBeInTheDocument()

      rerender(<Footer locale="ar" dictionary={mockDictionaryAr} />)
      expect(screen.getByText(/2025/)).toBeInTheDocument()
    })
  })

  describe('styling and layout', () => {
    it('should have border top', () => {
      const { container } = render(
        <Footer locale="en-US" dictionary={mockDictionary} />
      )

      const footer = container.querySelector('footer')
      expect(footer).toHaveClass('border-t')
    })

    it('should have margin top auto', () => {
      const { container } = render(
        <Footer locale="en-US" dictionary={mockDictionary} />
      )

      const footer = container.querySelector('footer')
      expect(footer).toHaveClass('mt-auto')
    })

    it('should center content', () => {
      const { container } = render(
        <Footer locale="en-US" dictionary={mockDictionary} />
      )

      const contentDiv = container.querySelector('.flex')
      expect(contentDiv).toHaveClass('items-center')
      expect(contentDiv).toHaveClass('justify-center')
      expect(contentDiv).toHaveClass('text-center')
    })

    it('should have responsive padding', () => {
      const { container } = render(
        <Footer locale="en-US" dictionary={mockDictionary} />
      )

      const containerDiv = container.querySelector('.container')
      expect(containerDiv).toHaveClass('py-6')
      expect(containerDiv).toHaveClass('md:py-8')
    })

    it('should have appropriate text sizes', () => {
      const { container } = render(
        <Footer locale="en-US" dictionary={mockDictionary} />
      )

      const paragraphs = container.querySelectorAll('p')
      expect(paragraphs[0]).toHaveClass('text-sm')
      expect(paragraphs[1]).toHaveClass('text-xs')
    })

    it('should have dark mode classes', () => {
      const { container } = render(
        <Footer locale="en-US" dictionary={mockDictionary} />
      )

      const footer = container.querySelector('footer')
      expect(footer).toHaveClass('dark:border-gray-800')
    })
  })
})
