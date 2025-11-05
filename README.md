# 🌍 Next.js Internationalization (Study case)

A modern **internationalization (i18n) learning project** built with Next.js 16, React 19, and TypeScript. Features a complete i18n system with native Next.js patterns, pluralization, dynamic interpolation, RTL support, and SEO optimization without external i18n libraries.

> 🎯 **Learning Focus**: Native i18n patterns, locale routing, pluralization rules, date/time/currency formatting, RTL layouts (arabic), SEO for multilingual sites, feature-based dictionary organization, and modern internationalization best practices.

---

## 🚀 Tech Stack

### Framework & Core

- **Next.js 16.0.1** - App Router with native i18n support
- **React 19.2.0** - Latest React with Server Components
- **TypeScript** - Strict mode for type safety
- **Tailwind CSS 4** - Utility-first styling with dark mode

### Internationalization

- **Native Next.js i18n** - No external libraries needed, such as `next-intl`
- **@formatjs/intl-localematcher** - RFC 4647 locale matching
- **Negotiator** - HTTP Accept-Language parsing
- **Server-Only** - Ensures dictionaries stay server-side
- **Native Intl API** - Date, time, number, and currency formatting

### Tooling

- **pnpm** - Fast, disk-efficient package manager
- **ESLint** - Code quality and consistency
- **Prettier** - Code formatting
- **PostCSS** - CSS processing for Tailwind

---

## ✨ Features

### 🌐 Multi-Language Support

- Three languages out of the box (English, Portuguese, Arabic)
- Automatic locale detection from browser headers
- Language switcher preserves current page
- Flag-based language selection (mobile + desktop)
- Easy to add more languages
- Fallback to default locale (en-US)

### 📝 Advanced Translation Features

- **Pluralization** - Correct singular/plural forms per language
- **Interpolation** - Dynamic variable replacement in translations
- **Nested dictionaries** - Organized by feature for scalability
- **Type-Safe** - Full TypeScript support with autocomplete
- **Server-Side** - Zero client-side JavaScript for translations
- **Code Splitting** - Only load translations for current feature

### 📊 Date & Number Formatting

- Native `Intl` API for formatting (no libraries)
- Date formatting per locale ("November 5, 2025" vs "5 de novembro de 2025")
- Relative time ("2 days ago" vs "há 2 dias")
- Currency formatting ("$1,299.99" vs "R$ 1.299,99")
- Number formatting with proper separators
- Timezone-aware formatting

### 🔄 RTL (Right-to-Left) Support

- Automatic direction detection (`dir="ltr"` or `dir="rtl"`)
- Arabic language with full RTL layout
- Tailwind automatically handles RTL styling
- Mirrored layouts (navigation, content flow)
- No additional CSS needed
- Text alignment and spacing handled automatically

### 🎯 SEO Optimization

- Localized metadata (title, description) per page
- Alternate language links in `<head>`
- `hreflang` tags for search engines
- `x-default` locale specification
- Language-specific URLs (`/en-US/blog`, `/pt-BR/blog`)
- Server-rendered HTML for better crawling

### 🏗️ Architecture Patterns

- Feature-based dictionary organization
- Server Components first approach
- Shared translations for common elements
- Feature-specific translations for pages
- Type-safe dictionary access
- Automatic locale routing with middleware

### 🎨 Modern UI

- Responsive mobile-first design
- Dark mode support throughout
- Clean blog-style layout
- Professional navigation and footer
- Accessible components
- Beautiful typography with Geist fonts

---

## 🏗️ Project Structure

```
.
├── src/
│   ├── app/
│   │   ├── globals.css
│   │   └── [lang]/                    # Locale-based routing
│   │       ├── layout.tsx             # Root layout with header/footer
│   │       ├── page.tsx               # Home page
│   │       ├── about/
│   │       │   └── page.tsx           # About page
│   │       ├── blog/
│   │       │   └── page.tsx           # Blog listing page
│   │       └── contact/
│   │           └── page.tsx           # Contact page
│   │
│   ├── features/                      # Feature-based organization
│   │   ├── blog/
│   │   │   ├── dictionaries/
│   │   │   │   ├── en-US.json        # Blog translations (English)
│   │   │   │   ├── pt-BR.json        # Blog translations (Portuguese)
│   │   │   │   └── ar.json           # Blog translations (Arabic)
│   │   │   └── getDictionary.ts      # Blog dictionary loader
│   │   │
│   │   ├── about/
│   │   │   ├── dictionaries/
│   │   │   │   ├── en-US.json
│   │   │   │   ├── pt-BR.json
│   │   │   │   └── ar.json
│   │   │   └── getDictionary.ts
│   │   │
│   │   └── contact/
│   │       ├── dictionaries/
│   │       │   ├── en-US.json
│   │       │   ├── pt-BR.json
│   │       │   └── ar.json
│   │       └── getDictionary.ts
│   │
│   ├── shared/
│   │   ├── components/
│   │   │   ├── header.tsx            # Site header (server component)
│   │   │   ├── footer.tsx            # Site footer
│   │   │   ├── navigation.tsx        # Navigation links
│   │   │   └── language-switcher.tsx # Language switcher (client)
│   │   │
│   │   ├── dictionaries/
│   │   │   ├── en-US.json            # Shared translations
│   │   │   ├── pt-BR.json
│   │   │   └── ar.json
│   │   │
│   │   └── lib/
│   │       ├── i18n.ts               # Locale config & utilities
│   │       ├── dictionary.ts         # Shared dictionary loader
│   │       └── locale.ts             # Locale detection logic
│   │
│   └── proxy.ts                       # Middleware for locale routing
│
├── next.config.ts
├── package.json
├── tsconfig.json
└── tailwind.config.ts
```

### Architecture Highlights

- **Feature colocation**: Each feature has its own translations
- **Server components**: No client-side JavaScript for translations
- **Type safety**: Full TypeScript with autocomplete
- **Code splitting**: Features load only their dictionaries
- **Clean separation**: Shared vs feature-specific translations
- **Native approach**: No external i18n libraries needed

---

## 🎓 Internationalization patterns

### Locale detection

**Problem**: How to determine user's preferred language?

**Solution**: Multi-tier locale detection with fallback.

**How it Works:**

1. Check URL path for locale (`/pt-BR/blog`)
2. If no locale in URL, check `Accept-Language` header
3. Use `@formatjs/intl-localematcher` for RFC 4647 matching
4. Fallback to default locale (`en-US`)
5. Redirect to localized URL

**Key concepts:**

- ✅ Browser language negotiation
- ✅ URL-based locale persistence
- ✅ Graceful fallback handling
- ✅ SEO-friendly URL structure
- ✅ Automatic detection on first visit

### Dictionary organization

**Shared dictionaries** (`/shared/dictionaries/`):

- ✅ Header, footer, navigation
- ✅ Common UI elements
- ✅ Error messages
- ✅ Loaded once per layout

**Feature dictionaries** (`/features/{feature}/dictionaries/`):

- ✅ Page-specific content
- ✅ Only loaded when needed
- ✅ Keeps bundles small
- ✅ Independent feature development

**Why this approach?**

- Shared content stays DRY
- Features are self-contained
- Better code splitting
- Easier maintenance
- Team can work in parallel

### Pluralization rules

**Problem**: Different languages have different plural rules.

**Solution**: Flexible pluralization function supporting multiple forms.

**How it Works:**

```typescript
// English (2 forms)
{
  "one": "1 item",
  "other": "{count} items"
}

// Arabic (6 forms)
{
  "zero": "لا توجد عناصر",
  "one": "عنصر واحد",
  "two": "عنصران",
  "few": "{count} عناصر",
  "many": "{count} عنصرًا",
  "other": "{count} عنصر"
}

// Usage
getPlural(0, translations)  // "No items" or "لا توجد عناصر"
getPlural(1, translations)  // "1 item" or "عنصر واحد"
getPlural(2, translations)  // "2 items" or "عنصران"
```

**Languages supported:**

- English: zero, one, other
- Portuguese: one, other
- Arabic: zero, one, two, few, many, other

### Dynamic Interpolation

**Problem**: Hard-coded values in translations aren't flexible.

**Solution**: Template strings with variable replacement.

**How it works:**

```typescript
// In dictionary
{
  "welcome": "Hello {name}, you have {count} messages!"
}

// Usage
interpolate(dictionary.welcome, {
  name: "Maria",
  count: 5
})
// Output: "Hello Maria, you have 5 messages!"
```

**Key features:**

- ✅ Multiple variables per string
- ✅ Type-safe with TypeScript
- ✅ Fallback for missing values
- ✅ Works with numbers and strings
- ✅ Simple template syntax

### Native formatting with Intl API

**Date formatting:**

```typescript
formatDate(new Date(), 'en-US')
// "November 5, 2025"

formatDate(new Date(), 'pt-BR')
// "5 de novembro de 2025"

formatDate(new Date(), 'ar')
// "٥ نوفمبر ٢٠٢٥"
```

**Relative time:**

```typescript
formatRelativeTime(yesterday, 'en-US') // "yesterday"
formatRelativeTime(yesterday, 'pt-BR') // "ontem"
formatRelativeTime(yesterday, 'ar') // "أمس"
```

**Currency:**

```typescript
formatCurrency(99.99, 'en-US', 'USD') // "$99.99"
formatCurrency(99.99, 'pt-BR', 'BRL') // "R$ 99,99"
formatCurrency(99.99, 'ar', 'USD') // "٩٩٫٩٩ US$"
```

### RTL (right-to-Left) layout

**Problem**: Arabic, Hebrew, and other RTL languages need mirrored layouts.

**Solution**: Automatic direction detection with native HTML `dir` attribute.

**How it Works:**

1. Detect locale direction in `i18n.ts`
2. Set `dir="rtl"` or `dir="ltr"` on `<html>`
3. Tailwind automatically mirrors layout
4. Text flows right-to-left
5. Navigation, padding, margins mirror

**Example:**

```typescript
// i18n.ts
export const localeConfig = {
  'en-US': { direction: 'ltr' },
  'pt-BR': { direction: 'ltr' },
  'ar': { direction: 'rtl' }
}

// layout.tsx
<html lang={lang} dir={getDirection(lang)}>
```

**What gets mirrored:**

- ✅ Text direction
- ✅ Navigation order
- ✅ Padding/margins
- ✅ Flex/grid direction
- ✅ Border radius
- ✅ Scrollbars

### SEO for multilingual sites

**Alternate language links:**

```html
<head>
  <link rel="alternate" hreflang="en-US" href="/en-US/blog" />
  <link rel="alternate" hreflang="pt-BR" href="/pt-BR/blog" />
  <link rel="alternate" hreflang="ar" href="/ar/blog" />
  <link rel="alternate" hreflang="x-default" href="/en-US/blog" />
</head>
```

**Localized metadata:**

```typescript
export async function generateMetadata({ params }) {
  const { lang } = await params
  const dictionary = await getBlogDictionary(lang)

  return {
    title: dictionary.metadata.title,
    description: dictionary.metadata.description,
  }
}
```

**SEO benefits:**

- ✅ Google knows about language versions
- ✅ Prevents duplicate content penalties
- ✅ Users get correct language in search
- ✅ Better ranking per locale
- ✅ Proper language attribution

### Language switcher pattern

**Problem**: Users need to switch languages without losing their place.

**Solution**: Client component that preserves current page path.

**How it Works:**

```typescript
// User is on: /pt-BR/contact
// Clicks: English

getLocalizedPath('en-US')
// 1. Get pathname: '/pt-BR/contact'
// 2. Extract segments: ['pt-BR', 'contact']
// 3. Replace locale: ['en-US', 'contact']
// 4. Return: '/en-US/contact'
```

**Result:**

- From `/pt-BR/contact` → `/en-US/contact` ✅
- From `/ar/blog` → `/pt-BR/blog` ✅
- User stays on same page, just translated

---

## 🚀 Getting started

### Prerequisites

- Node.js >= 18
- pnpm >= 8 (or npm/yarn)

### Quick start

```bash
# 1. Clone the repository
git clone git@github.com:ChristySchott/nextjs-i18n-blog.git

# 2. Navigate to project
cd nextjs-i18n-blog

# 3. Install dependencies
pnpm install

# 4. Start development server
pnpm dev
```

The app will be available at:

- **Homepage**: http://localhost:3000
- **Auto-detects your browser language and redirects!**

### Manual language access

- **English**: http://localhost:3000/en-US
- **Portuguese**: http://localhost:3000/pt-BR
- **Arabic (RTL)**: http://localhost:3000/ar

## 🎯 Pages & features

![Language Switching Demo](./docs/demo.gif)

### 🏠 Home (`/`)

- Hero section with CTA
- Featured blog posts
- Interpolation demo ("View all {count} articles")
- Formatted dates
- Responsive grid layout

### 📝 Blog (`/blog`)

- Article listing with metadata
- Date formatting (full and relative)
- Reading time with pluralization
- Article count with pluralization
- Category badges
- SEO metadata

### 👤 About (`/about`)

- Personal introduction
- Skills showcase
- Statistics with pluralization
- Experience/projects counters
- Responsive sections

### 📧 Contact (`/contact`)

- Email display
- Social media links
- Response time with interpolation
- Call-to-action
- Contact form ready

### 🧭 Navigation

- Responsive header
- Mobile menu (< 768px)
- Desktop navigation (≥ 768px)
- Language switcher (preserves page)
- Dark mode compatible

---

## 🌍 Supported Languages

| Language   | Locale  | Direction | Status      |
| ---------- | ------- | --------- | ----------- |
| English    | `en-US` | LTR       | ✅ Complete |
| Portuguese | `pt-BR` | LTR       | ✅ Complete |
| Arabic     | `ar`    | RTL       | ✅ Complete |

---

## ⚠️ Project scope

**This is a learning/study project focused on internationalization fundamentals.**

**Included** (✅):

- Native Next.js i18n patterns
- Multiple languages (LTR + RTL)
- Pluralization and interpolation
- Date/time/currency formatting
- SEO optimization (hreflang, metadata)
- Feature-based dictionary organization
- Type-safe translations
- Language switcher with page preservation
- Server Components architecture
- Responsive design

**Not Included** (intentionally):

- Translation management UI
- Automatic translation services
- Language auto-detection cookies
- Per-user language preferences
- Translation memory/cache
- CI/CD for translations
- Unit/Integration testing for translations

The focus is on understanding **native i18n patterns**, **Next.js App Router**, **locale routing**, **pluralization rules**, **RTL support**, and **modern internationalization architecture**.
