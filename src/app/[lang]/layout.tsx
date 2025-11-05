import { i18n, type Locale, getDirection } from '@/shared/lib/i18n'
import '../globals.css'
import { Geist, Geist_Mono } from 'next/font/google'
import { Metadata } from 'next'
import { getDictionary } from '@/shared/lib/dictionary'
import { Header } from '@/shared/components/header'
import { Footer } from '@/shared/components/footer'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'My Blog',
  description: 'A modern blog built with Next.js and i18n',
}

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }))
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ lang: Locale }>
}>) {
  const { lang } = await params
  const dictionary = await getDictionary(lang)
  const direction = getDirection(lang)

  return (
    <html lang={lang} dir={direction}>
      <head>
        <link rel="alternate" hrefLang="en-US" href="/en-US" />
        <link rel="alternate" hrefLang="pt-BR" href="/pt-BR" />
        <link rel="alternate" hrefLang="ar" href="/ar" />
        <link rel="alternate" hrefLang="x-default" href="/en-US" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <Header locale={lang} dictionary={dictionary.header} />
        <main className="flex-1">{children}</main>
        <Footer locale={lang} dictionary={dictionary.footer} />
      </body>
    </html>
  )
}
