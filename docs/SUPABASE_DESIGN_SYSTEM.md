# Supabase Design System Reference

> A comprehensive guide to implementing Supabase-inspired design in the Narada project.
>
> Based on analysis of Supabase's official design system, UI components, and brand guidelines.

## Table of Contents
1. [Color System](#color-system)
2. [Typography](#typography)
3. [Component Patterns](#component-patterns)
4. [Layout & Spacing](#layout--spacing)
5. [Tailwind Configuration](#tailwind-configuration)
6. [Implementation Guide](#implementation-guide)

---

## Color System

### Brand Colors

Supabase's visual identity is built around three primary brand colors:

| Color Name | Hex Code | Usage |
|------------|----------|-------|
| **Jungle Green** (Primary) | `#34B27B` | Primary brand color, CTAs, success states |
| **Athens Gray** | `#F8F9FA` | Light backgrounds, cards (light mode) |
| **Bunker** | `#11181C` | Dark backgrounds (dark mode) |

The signature **Jungle Green (#34B27B)** embodies growth, speed, and gives users the 'green light' to build.

### Design Token System

Supabase uses a **CSS property-based theming system** with six foundational color categories exported from Figma as design tokens:

#### 1. Foreground (Text Colors)

```css
/* Light Mode */
--foreground: /* Default text */
--foreground-light: /* Secondary text */
--foreground-lighter: /* Tertiary text */
--foreground-muted: /* De-emphasized text */

/* Dark Mode */
--foreground: /* Brighter default text */
--foreground-light: /* Medium text */
--foreground-lighter: /* Dimmer text */
--foreground-muted: /* Subtle text */
```

**Tailwind Usage:**
```html
<p class="text-foreground">Default text</p>
<p class="text-foreground-light">Secondary text</p>
<p class="text-foreground-muted">Muted text</p>
```

#### 2. Background (Surface Colors)

```css
--surface-100: /* Base level panels */
--surface-200: /* Overlapping surfaces, dropdowns */
--surface-300: /* Stacked above surface-200 */
--alternative: /* Inverted backgrounds */
--overlay: /* Dropdown/popover backgrounds */
--control: /* Input and checkbox backgrounds */
--button-DEFAULT: /* Button backgrounds */
```

**Tailwind Usage:**
```html
<div class="bg-surface-100">Base panel</div>
<div class="bg-surface-200">Elevated panel</div>
<div class="bg-overlay">Dropdown</div>
<button class="bg-button">Click me</button>
```

#### 3. Border Colors

```css
--border-DEFAULT: /* Standard borders */
--border-secondary: /* Secondary emphasis */
--border-alternative: /* Inverted borders */
--border-overlay: /* Dropdown borders */
--border-control: /* Input borders */
--border-strong: /* Hover/focus states */
--border-stronger: /* Highlighted borders */
--border-button-DEFAULT: /* Button borders */
--border-button-hover: /* Button hover borders */
```

**Tailwind Usage:**
```html
<div class="border border-border">Default border</div>
<input class="border border-control focus:border-strong" />
<button class="border border-button-DEFAULT hover:border-button-hover">Button</button>
```

#### 4. Brand Colors (Accent)

```css
--brand-200: /* Lightest brand tint */
--brand-300: /* Light brand */
--brand-400: /* Medium-light brand */
--brand-500: /* Medium brand */
--brand-DEFAULT: /* Primary brand color (#34B27B) */
--brand-600: /* Dark brand */
--brand-button: /* Brand button variant */
```

**Tailwind Usage:**
```html
<button class="bg-brand text-white">Primary Action</button>
<a class="text-brand-600 hover:text-brand">Link</a>
<div class="bg-brand-200 text-brand-600">Light brand background</div>
```

#### 5. Destructive Colors (Errors)

```css
--destructive-200: /* Light destructive */
--destructive-300
--destructive-400
--destructive-500
--destructive-DEFAULT: /* Error red */
--destructive-600: /* Dark destructive */
```

**Tailwind Usage:**
```html
<button class="bg-destructive text-white">Delete</button>
<p class="text-destructive">Error message</p>
```

#### 6. Warning Colors

```css
--warning-200: /* Light warning */
--warning-300
--warning-400
--warning-500
--warning-DEFAULT: /* Warning yellow/orange */
--warning-600: /* Dark warning */
```

### Radix UI Color Integration

Supabase uses **Radix Colors** with a custom grayscale called **"scale"**:

```css
/* Light Mode: Gray scale */
:root {
  --colors-scale1: var(--colors-gray1);
  --colors-scale2: var(--colors-gray2);
  /* ... up to scale12 */
}

/* Dark Mode: Slate scale */
.dark {
  --colors-scale1: var(--colors-slate1);
  --colors-scale2: var(--colors-slate2);
  /* ... up to scale12 */
}
```

The scale system provides 12-step color progressions:
- `scale-100` → `var(--colors-scale1)`
- `scale-200` → `var(--colors-scale2)`
- ...
- `scale-1200` → `var(--colors-scale12)`

### Dark Mode Implementation

```javascript
// Theme detection script
const theme = localStorage.getItem('theme') || 'system';

if (theme === 'dark' ||
    (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
  document.documentElement.setAttribute('data-theme', 'dark');
  document.documentElement.style.colorScheme = 'dark';
} else {
  document.documentElement.setAttribute('data-theme', 'light');
  document.documentElement.style.colorScheme = 'light';
}
```

**HTML Attribute:**
```html
<html data-theme="dark">
```

---

## Typography

### Font Families

Supabase uses a modern, professional font stack:

**Primary Font:**
```css
font-family: 'Inter', 'Circular', 'custom-font', 'Helvetica Neue', Helvetica, Arial, sans-serif;
```

**Monospace (Code):**
```css
font-family: 'Source Code Pro', monospace;
```

### Type Scale

Supabase follows a systematic type scale for hierarchy:

| Element | Tailwind Class | Size | Weight | Line Height |
|---------|---------------|------|--------|-------------|
| **Headings** |
| H1 | `text-4xl` | 36px (2.25rem) | 700-800 | 1.2 |
| H2 | `text-3xl` | 30px (1.875rem) | 700 | 1.3 |
| H3 | `text-2xl` | 24px (1.5rem) | 600-700 | 1.4 |
| H4 | `text-xl` | 20px (1.25rem) | 600 | 1.4 |
| H5 | `text-lg` | 18px (1.125rem) | 600 | 1.5 |
| **Body** |
| Large | `text-lg` | 18px (1.125rem) | 400 | 1.6 |
| Base | `text-base` | 16px (1rem) | 400 | 1.6 |
| Small | `text-sm` | 14px (0.875rem) | 400 | 1.5 |
| Extra Small | `text-xs` | 12px (0.75rem) | 400 | 1.4 |

### Font Loading (Next.js)

```typescript
// app/layout.tsx
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export default function RootLayout({ children }) {
  return (
    <html className={inter.variable}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
```

### Typography Components

```html
<!-- Heading with proper hierarchy -->
<h1 class="text-4xl font-bold text-foreground mb-4">
  Build in a weekend, scale to millions
</h1>

<!-- Body text with optimal reading width -->
<p class="text-base text-foreground-light max-w-[80ch] leading-relaxed">
  Supabase is an open source Firebase alternative providing all the backend features you need.
</p>

<!-- Code block -->
<code class="font-mono text-sm bg-surface-200 px-2 py-1 rounded">
  npm install @supabase/supabase-js
</code>
```

---

## Component Patterns

### Buttons

Supabase uses shadcn/ui-based button components with multiple variants:

#### Button Variants

**1. Primary (Brand)**
```html
<button class="inline-flex items-center justify-center rounded-md bg-brand px-4 py-2 text-sm font-medium text-white hover:bg-brand-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none transition-colors">
  Start your project
</button>
```

**2. Secondary**
```html
<button class="inline-flex items-center justify-center rounded-md border border-border bg-surface-100 px-4 py-2 text-sm font-medium text-foreground hover:bg-surface-200 hover:border-border-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand disabled:opacity-50 transition-colors">
  Request a demo
</button>
```

**3. Ghost**
```html
<button class="inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-foreground hover:bg-surface-200 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand transition-colors">
  Learn more
</button>
```

**4. Outline**
```html
<button class="inline-flex items-center justify-center rounded-md border border-border-strong px-4 py-2 text-sm font-medium text-foreground hover:bg-surface-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand transition-colors">
  Get started
</button>
```

**5. Destructive**
```html
<button class="inline-flex items-center justify-center rounded-md bg-destructive px-4 py-2 text-sm font-medium text-white hover:bg-destructive-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-destructive transition-colors">
  Delete
</button>
```

#### Button Sizes

```html
<!-- Small -->
<button class="... px-3 py-1.5 text-xs">Small</button>

<!-- Default -->
<button class="... px-4 py-2 text-sm">Default</button>

<!-- Large -->
<button class="... px-6 py-3 text-base">Large</button>
```

#### Button with Icon

```html
<button class="inline-flex items-center justify-center gap-2 rounded-md bg-brand px-4 py-2 text-sm font-medium text-white hover:bg-brand-600 transition-colors">
  <svg class="w-4 h-4" fill="currentColor"><!-- icon --></svg>
  Start your project
</button>
```

### Cards

```html
<div class="rounded-lg border border-border bg-surface-100 p-6 shadow-sm hover:shadow-md transition-shadow">
  <h3 class="text-lg font-semibold text-foreground mb-2">Card Title</h3>
  <p class="text-sm text-foreground-light">
    Card description goes here with supporting information.
  </p>
</div>
```

**Elevated Card (Dropdown/Overlay)**
```html
<div class="rounded-lg border border-overlay bg-overlay p-4 shadow-lg">
  <p class="text-sm text-foreground">Elevated content</p>
</div>
```

### Form Elements

#### Input Fields

```html
<input
  type="text"
  class="flex h-10 w-full rounded-md border border-control bg-control px-3 py-2 text-sm text-foreground placeholder:text-foreground-muted focus:outline-none focus:ring-2 focus:ring-brand focus:border-strong disabled:opacity-50 transition-colors"
  placeholder="Enter your email"
/>
```

#### Textarea

```html
<textarea
  class="flex min-h-[80px] w-full rounded-md border border-control bg-control px-3 py-2 text-sm text-foreground placeholder:text-foreground-muted focus:outline-none focus:ring-2 focus:ring-brand focus:border-strong disabled:opacity-50 transition-colors resize-none"
  placeholder="Your message"
></textarea>
```

#### Select Dropdown

```html
<select class="flex h-10 w-full rounded-md border border-control bg-control px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-brand focus:border-strong disabled:opacity-50 transition-colors">
  <option>Select option</option>
  <option>Option 1</option>
  <option>Option 2</option>
</select>
```

#### Checkbox

```html
<div class="flex items-center gap-2">
  <input
    type="checkbox"
    id="terms"
    class="h-4 w-4 rounded border-control text-brand focus:ring-2 focus:ring-brand focus:ring-offset-0"
  />
  <label for="terms" class="text-sm text-foreground cursor-pointer">
    I agree to the terms and conditions
  </label>
</div>
```

### Navigation

#### Top Navigation Bar

```html
<nav class="sticky top-0 z-50 border-b border-border bg-surface-100 backdrop-blur supports-[backdrop-filter]:bg-surface-100/60">
  <div class="container mx-auto flex h-16 items-center justify-between px-4">
    <div class="flex items-center gap-6">
      <!-- Logo -->
      <a href="/" class="flex items-center gap-2">
        <img src="/logo.svg" alt="Logo" class="h-6" />
      </a>

      <!-- Nav Links -->
      <div class="hidden md:flex items-center gap-6">
        <a href="/docs" class="text-sm font-medium text-foreground-light hover:text-foreground transition-colors">
          Docs
        </a>
        <a href="/pricing" class="text-sm font-medium text-foreground-light hover:text-foreground transition-colors">
          Pricing
        </a>
      </div>
    </div>

    <!-- Actions -->
    <div class="flex items-center gap-3">
      <button class="px-3 py-1.5 text-sm font-medium text-foreground hover:text-brand transition-colors">
        Sign in
      </button>
      <button class="px-4 py-2 text-sm font-medium text-white bg-brand rounded-md hover:bg-brand-600 transition-colors">
        Start your project
      </button>
    </div>
  </div>
</nav>
```

### Code Blocks

```html
<div class="relative rounded-lg border border-border bg-surface-200 p-4 overflow-x-auto">
  <pre class="text-sm"><code class="font-mono text-foreground">
npm install @supabase/supabase-js
  </code></pre>

  <!-- Copy button -->
  <button class="absolute top-2 right-2 p-2 rounded hover:bg-surface-300 transition-colors">
    <svg class="w-4 h-4 text-foreground-light" fill="currentColor">
      <!-- Copy icon -->
    </svg>
  </button>
</div>
```

---

## Layout & Spacing

### Grid System

Supabase uses a **12-column grid** with Tailwind's responsive breakpoints:

```html
<div class="grid grid-cols-12 gap-6">
  <div class="col-span-12 md:col-span-6 lg:col-span-4">
    <!-- Content -->
  </div>
</div>
```

### Spacing Scale

Tailwind's default 4px-based spacing scale (which Supabase uses):

| Class | Size | Usage |
|-------|------|-------|
| `p-1` | 4px | Minimal padding |
| `p-2` | 8px | Tight spacing |
| `p-3` | 12px | Compact spacing |
| `p-4` | 16px | Standard spacing |
| `p-5` | 20px | Comfortable spacing |
| `p-6` | 24px | Generous spacing |
| `p-8` | 32px | Large spacing |
| `p-12` | 48px | Extra large spacing |
| `p-16` | 64px | Section spacing |

### Container & Max Widths

```css
/* Content containers */
.container {
  max-width: 1280px; /* or 1440px for wider layouts */
  margin: 0 auto;
  padding: 0 1rem;
}

/* Reading width (prose) */
.prose {
  max-width: 65ch; /* ~80ch for Supabase */
}
```

### Common Layout Patterns

**Hero Section**
```html
<section class="container mx-auto px-4 py-16 md:py-24 lg:py-32">
  <div class="max-w-3xl mx-auto text-center">
    <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
      Build in a weekend, scale to millions
    </h1>
    <p class="text-lg text-foreground-light mb-8">
      Supabase is an open source Firebase alternative.
    </p>
    <div class="flex flex-col sm:flex-row gap-4 justify-center">
      <button class="px-6 py-3 text-base font-medium text-white bg-brand rounded-md hover:bg-brand-600">
        Start your project
      </button>
      <button class="px-6 py-3 text-base font-medium text-foreground border border-border rounded-md hover:bg-surface-200">
        Request a demo
      </button>
    </div>
  </div>
</section>
```

**Feature Grid**
```html
<section class="container mx-auto px-4 py-16">
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    <div class="rounded-lg border border-border bg-surface-100 p-6">
      <h3 class="text-xl font-semibold text-foreground mb-3">Database</h3>
      <p class="text-sm text-foreground-light">
        Every project is a full Postgres database.
      </p>
    </div>
    <!-- More features -->
  </div>
</section>
```

### Responsive Breakpoints

```javascript
// Tailwind default breakpoints (used by Supabase)
{
  sm: '640px',   // Mobile landscape
  md: '768px',   // Tablet
  lg: '1024px',  // Desktop
  xl: '1280px',  // Large desktop
  '2xl': '1536px' // Extra large
}
```

### Border Radius

```css
/* Common border radius values */
.rounded-sm { border-radius: 0.125rem; } /* 2px */
.rounded { border-radius: 0.25rem; } /* 4px */
.rounded-md { border-radius: 0.375rem; } /* 6px */
.rounded-lg { border-radius: 0.5rem; } /* 8px */
.rounded-xl { border-radius: 0.75rem; } /* 12px */
```

### Shadows

```css
/* Shadow system */
.shadow-sm {
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
}

.shadow {
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
}

.shadow-md {
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
}

.shadow-lg {
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
}

.shadow-xl {
  box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
}
```

---

## Tailwind Configuration

### Complete tailwind.config.js

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class', '[data-theme="dark"]'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Brand colors
        brand: {
          DEFAULT: '#34B27B',
          50: '#E8F5F0',
          100: '#D1EBE1',
          200: '#A3D7C3',
          300: '#75C3A5',
          400: '#47AF87',
          500: '#34B27B',
          600: '#2A8F63',
          700: '#206C4A',
          800: '#164931',
          900: '#0C2619',
        },

        // Foreground (text)
        foreground: {
          DEFAULT: 'hsl(var(--foreground))',
          light: 'hsl(var(--foreground-light))',
          lighter: 'hsl(var(--foreground-lighter))',
          muted: 'hsl(var(--foreground-muted))',
        },

        // Background surfaces
        background: {
          DEFAULT: 'hsl(var(--background))',
          alternative: 'hsl(var(--background-alternative))',
        },
        surface: {
          100: 'hsl(var(--surface-100))',
          200: 'hsl(var(--surface-200))',
          300: 'hsl(var(--surface-300))',
        },
        overlay: 'hsl(var(--overlay))',
        control: 'hsl(var(--control))',
        button: {
          DEFAULT: 'hsl(var(--button))',
        },

        // Borders
        border: {
          DEFAULT: 'hsl(var(--border))',
          secondary: 'hsl(var(--border-secondary))',
          alternative: 'hsl(var(--border-alternative))',
          overlay: 'hsl(var(--border-overlay))',
          control: 'hsl(var(--border-control))',
          strong: 'hsl(var(--border-strong))',
          stronger: 'hsl(var(--border-stronger))',
          button: {
            DEFAULT: 'hsl(var(--border-button))',
            hover: 'hsl(var(--border-button-hover))',
          },
        },

        // Semantic colors
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          200: 'hsl(var(--destructive-200))',
          300: 'hsl(var(--destructive-300))',
          400: 'hsl(var(--destructive-400))',
          500: 'hsl(var(--destructive-500))',
          600: 'hsl(var(--destructive-600))',
        },
        warning: {
          DEFAULT: 'hsl(var(--warning))',
          200: 'hsl(var(--warning-200))',
          300: 'hsl(var(--warning-300))',
          400: 'hsl(var(--warning-400))',
          500: 'hsl(var(--warning-500))',
          600: 'hsl(var(--warning-600))',
        },
      },

      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'Circular', 'Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
        mono: ['Source Code Pro', 'monospace'],
      },

      fontSize: {
        xs: ['0.75rem', { lineHeight: '1.4' }],
        sm: ['0.875rem', { lineHeight: '1.5' }],
        base: ['1rem', { lineHeight: '1.6' }],
        lg: ['1.125rem', { lineHeight: '1.6' }],
        xl: ['1.25rem', { lineHeight: '1.4' }],
        '2xl': ['1.5rem', { lineHeight: '1.4' }],
        '3xl': ['1.875rem', { lineHeight: '1.3' }],
        '4xl': ['2.25rem', { lineHeight: '1.2' }],
        '5xl': ['3rem', { lineHeight: '1.1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
      },

      borderRadius: {
        lg: '0.5rem',
        md: '0.375rem',
        sm: '0.25rem',
      },

      keyframes: {
        'flash-code': {
          '0%': { backgroundColor: 'rgba(52, 178, 123, 0.1)' },
          '100%': { backgroundColor: 'transparent' },
        },
        slideIn: {
          from: { transform: 'translateY(100%)' },
          to: { transform: 'translateY(0)' },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-100%)' },
        },
      },

      animation: {
        'flash-code': 'flash-code 1s',
        'slide-in': 'slideIn 0.3s ease-out',
        'marquee': 'marquee 30s linear infinite',
      },

      transitionDelay: {
        1200: '1200ms',
        1500: '1500ms',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
}
```

### CSS Variables (globals.css)

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    /* Light mode colors */
    --background: 0 0% 100%;
    --foreground: 222 47% 11%;
    --foreground-light: 215 16% 47%;
    --foreground-lighter: 215 14% 71%;
    --foreground-muted: 215 10% 82%;

    --surface-100: 210 20% 98%;
    --surface-200: 210 16% 93%;
    --surface-300: 210 14% 89%;

    --overlay: 0 0% 100%;
    --control: 0 0% 100%;
    --button: 0 0% 100%;

    --border: 214 14% 90%;
    --border-secondary: 214 12% 85%;
    --border-alternative: 0 0% 100%;
    --border-overlay: 214 14% 90%;
    --border-control: 216 12% 84%;
    --border-strong: 215 16% 47%;
    --border-stronger: 215 19% 35%;
    --border-button: 214 14% 90%;
    --border-button-hover: 215 16% 47%;

    --brand: 158 53% 45%; /* #34B27B */
    --brand-200: 158 53% 85%;
    --brand-300: 158 53% 75%;
    --brand-400: 158 53% 60%;
    --brand-500: 158 53% 45%;
    --brand-600: 158 53% 35%;

    --destructive: 0 84% 60%;
    --destructive-200: 0 84% 95%;
    --destructive-300: 0 84% 85%;
    --destructive-400: 0 84% 70%;
    --destructive-500: 0 84% 60%;
    --destructive-600: 0 84% 45%;

    --warning: 38 92% 50%;
    --warning-200: 38 92% 95%;
    --warning-300: 38 92% 85%;
    --warning-400: 38 92% 65%;
    --warning-500: 38 92% 50%;
    --warning-600: 38 92% 40%;
  }

  [data-theme="dark"] {
    /* Dark mode colors */
    --background: 222 47% 11%;
    --foreground: 210 20% 98%;
    --foreground-light: 215 16% 65%;
    --foreground-lighter: 215 14% 45%;
    --foreground-muted: 215 10% 35%;

    --surface-100: 222 41% 13%;
    --surface-200: 222 37% 15%;
    --surface-300: 222 33% 17%;

    --overlay: 222 41% 13%;
    --control: 222 41% 13%;
    --button: 222 41% 13%;

    --border: 217 19% 27%;
    --border-secondary: 217 19% 32%;
    --border-alternative: 222 47% 11%;
    --border-overlay: 217 19% 27%;
    --border-control: 217 19% 27%;
    --border-strong: 215 16% 47%;
    --border-stronger: 215 14% 71%;
    --border-button: 217 19% 27%;
    --border-button-hover: 215 16% 47%;

    /* Brand colors remain similar */
    --brand: 158 53% 45%;
    --brand-200: 158 53% 25%;
    --brand-300: 158 53% 35%;
    --brand-400: 158 53% 40%;
    --brand-500: 158 53% 45%;
    --brand-600: 158 53% 55%;

    --destructive: 0 84% 60%;
    --destructive-200: 0 84% 25%;
    --destructive-300: 0 84% 35%;
    --destructive-400: 0 84% 50%;
    --destructive-500: 0 84% 60%;
    --destructive-600: 0 84% 70%;

    --warning: 38 92% 50%;
    --warning-200: 38 92% 25%;
    --warning-300: 38 92% 35%;
    --warning-400: 38 92% 45%;
    --warning-500: 38 92% 50%;
    --warning-600: 38 92% 60%;
  }
}

@layer base {
  * {
    @apply border-border;
  }

  body {
    @apply bg-background text-foreground;
    font-feature-settings: "rlig" 1, "calt" 1;
  }
}
```

---

## Implementation Guide

### Step 1: Install Dependencies

```bash
npm install -D tailwindcss postcss autoprefixer @tailwindcss/typography @tailwindcss/forms
npx tailwindcss init -p
```

### Step 2: Configure Fonts (Next.js 14+)

```typescript
// app/layout.tsx
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
```

### Step 3: Theme Switcher Component

```typescript
// components/theme-switcher.tsx
'use client';

import { useEffect, useState } from 'react';

export function ThemeSwitcher() {
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('system');

  useEffect(() => {
    const stored = localStorage.getItem('theme') as typeof theme;
    if (stored) setTheme(stored);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    localStorage.setItem('theme', theme);

    if (theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      root.setAttribute('data-theme', 'dark');
      root.style.colorScheme = 'dark';
    } else {
      root.setAttribute('data-theme', 'light');
      root.style.colorScheme = 'light';
    }
  }, [theme]);

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => setTheme('light')}
        className={`px-3 py-1.5 text-sm rounded ${
          theme === 'light' ? 'bg-brand text-white' : 'text-foreground-light hover:text-foreground'
        }`}
      >
        Light
      </button>
      <button
        onClick={() => setTheme('dark')}
        className={`px-3 py-1.5 text-sm rounded ${
          theme === 'dark' ? 'bg-brand text-white' : 'text-foreground-light hover:text-foreground'
        }`}
      >
        Dark
      </button>
      <button
        onClick={() => setTheme('system')}
        className={`px-3 py-1.5 text-sm rounded ${
          theme === 'system' ? 'bg-brand text-white' : 'text-foreground-light hover:text-foreground'
        }`}
      >
        System
      </button>
    </div>
  );
}
```

### Step 4: Reusable Button Component

```typescript
// components/ui/button.tsx
import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'secondary' | 'ghost' | 'outline' | 'destructive';
  size?: 'sm' | 'default' | 'lg';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', ...props }, ref) => {
    return (
      <button
        className={cn(
          'inline-flex items-center justify-center rounded-md font-medium transition-colors',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2',
          'disabled:opacity-50 disabled:pointer-events-none',
          {
            'bg-brand text-white hover:bg-brand-600': variant === 'default',
            'border border-border bg-surface-100 text-foreground hover:bg-surface-200 hover:border-border-strong':
              variant === 'secondary',
            'hover:bg-surface-200 hover:text-foreground': variant === 'ghost',
            'border border-border-strong text-foreground hover:bg-surface-200': variant === 'outline',
            'bg-destructive text-white hover:bg-destructive-600': variant === 'destructive',
            'px-3 py-1.5 text-xs': size === 'sm',
            'px-4 py-2 text-sm': size === 'default',
            'px-6 py-3 text-base': size === 'lg',
          },
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button };
```

### Step 5: Utility Helper

```typescript
// lib/utils.ts
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

### Step 6: Example Page Implementation

```typescript
// app/page.tsx
import { Button } from '@/components/ui/button';
import { ThemeSwitcher } from '@/components/theme-switcher';

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-border bg-surface-100/60 backdrop-blur">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="text-xl font-bold text-brand">Narada</div>
          <ThemeSwitcher />
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-24 text-center">
        <h1 className="text-5xl font-bold text-foreground mb-6">
          AI-Powered Customer Support
        </h1>
        <p className="text-lg text-foreground-light max-w-2xl mx-auto mb-8">
          Automate your customer service with intelligent responses powered by AI.
          Handle unlimited inquiries 24/7.
        </p>
        <div className="flex gap-4 justify-center">
          <Button size="lg">Start Free Trial</Button>
          <Button variant="secondary" size="lg">
            Request Demo
          </Button>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {['24/7 Availability', 'Smart Responses', 'Easy Setup'].map((feature) => (
            <div
              key={feature}
              className="rounded-lg border border-border bg-surface-100 p-6 hover:shadow-md transition-shadow"
            >
              <h3 className="text-xl font-semibold text-foreground mb-3">{feature}</h3>
              <p className="text-sm text-foreground-light">
                Description of the {feature.toLowerCase()} feature goes here.
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
```

---

## Resources & References

### Official Documentation
- [Supabase Brand Assets](https://supabase.com/brand-assets) - Official brand guidelines and logo kit
- [Supabase UI Library](https://ui.supabase.com/) - Component documentation and examples
- [Tailwind Theming Documentation](https://github.com/supabase/supabase/blob/master/packages/ui/tailwind-theming.md) - Design token system

### Design System
- [shadcn/ui Theming](https://ui.shadcn.com/docs/theming) - Component library foundation
- [Radix Colors](https://www.radix-ui.com/colors) - Color system used by Supabase
- [Radix UI Primitives](https://www.radix-ui.com/) - Accessible component primitives

### GitHub Repositories
- [Supabase Monorepo](https://github.com/supabase/supabase) - Main repository with UI packages
- [Supabase UI (Deprecated)](https://github.com/supabase/ui) - Legacy UI library reference
- [Supabase Auth UI](https://github.com/supabase-community/auth-ui) - Authentication components

### Color Information
- [Mobbin Brand Colors](https://mobbin.com/colors/brand/supabase) - Color palette reference

### Tools
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Next.js](https://nextjs.org/) - React framework used by Supabase
- [Inter Font](https://rsms.me/inter/) - Typography font family

---

## Notes

1. **Design Tokens Location**: The Supabase design team defines primitive color values using Figma Variables, exported as JSON and transformed into Tailwind utilities via scripts in `packages/ui/internals/tokens`.

2. **Theming System**: The design system is "under development and likely to change," but most implementations are stable for production use.

3. **Mobile-First**: All components and layouts follow mobile-first responsive design principles.

4. **Accessibility**: Components are built with accessibility in mind, using proper ARIA attributes and keyboard navigation.

5. **Performance**: Use `display: swap` for font loading and backdrop-blur sparingly for better performance.

6. **Customization**: The design token system allows easy theme customization by updating CSS variables without changing component code.

---

**Last Updated**: January 2026
**Version**: 1.0
**For Project**: Narada.im
