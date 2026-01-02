# narada - AI Chatbot for Thai SME Businesses

An AI-powered chatbot system that automatically responds to customers 24/7 via Facebook Messenger, helping Thai SME businesses manage customer inquiries efficiently.

## Overview

**Narada** helps Thai businesses (online shops, clinics, service businesses) handle customer inquiries using an FAQ engine combined with AI-generated responses. The system automatically responds to customers within 2-5 seconds, reducing admin workload and preventing lost sales from unanswered questions.

### Key Features

- **24/7 Automated Responses** - Answer customer questions instantly, even outside business hours
- **FAQ Management** - Build and maintain a knowledge base of common questions
- **AI-Powered Answers** - Generate contextual responses when FAQ doesn't match
- **Thai Language Support** - Natural Thai responses with multiple tone options (polite, friendly, professional, vendor)
- **Conversation History** - Track and learn from customer interactions
- **Subscription Management** - Free trial + paid tiers with usage limits

## SEO Implementation

The application includes comprehensive SEO optimization for the Thai market:

### Metadata & Social Sharing

- **Thai-Optimized Keywords**: Primary keywords include "AI chatbot ภาษาไทย", "ตอบลูกค้าอัตโนมัติ", "Facebook Messenger bot"
- **OpenGraph Tags**: Full og:title, og:description, og:image, og:url for social media sharing
- **Twitter Cards**: summary_large_image cards for rich Twitter/X previews
- **Canonical URLs**: Proper canonical tags on all pages to prevent duplicate content
- **Per-Page Metadata**: Unique title and description for each page

### Structured Data (JSON-LD)

Two schema types are implemented:

1. **Organization Schema** (Root layout)
   - Brand identity for Google Knowledge Graph
   - Contact information and founding date
   - Available languages (Thai, English)

2. **SoftwareApplication Schema** (Landing page)
   - Application category: BusinessApplication
   - Pricing offers (Free Trial, Starter 499฿, Pro 999฿)
   - Feature list in Thai
   - Enables rich snippets with pricing in search results

### Technical SEO

- **Dynamic Sitemap** (`/sitemap.xml`)
  - Auto-generated via `app/sitemap.ts`
  - Includes landing page (priority: 1), login, and register pages
  - Weekly/monthly update frequencies

- **Robots.txt** (`/robots.txt`)
  - Auto-generated via `app/robots.ts`
  - Allows crawling of public pages
  - Blocks `/dashboard/` and `/api/` endpoints
  - References sitemap location

- **noindex Directives**
  - Auth pages (login/register) set to noindex/nofollow
  - Dashboard pages protected from indexing
  - Prevents low-value pages from appearing in search results

### SEO Environment Variables

Add to your `.env.local` and Vercel environment variables:

```bash
NEXT_PUBLIC_APP_URL=https://narada.im
```

This is used for:
- Canonical URLs
- OpenGraph URLs
- Sitemap base URLs
- Structured data references

### Validation & Testing

After deployment, validate your SEO implementation:

1. **Google Rich Results Test**: https://search.google.com/test/rich-results
2. **Schema.org Validator**: https://validator.schema.org/
3. **Facebook Sharing Debugger**: https://developers.facebook.com/tools/debug/
4. **Twitter Card Validator**: https://cards-dev.twitter.com/validator
5. **Mobile-Friendly Test**: https://search.google.com/test/mobile-friendly

### SEO Monitoring

Set up these tools for ongoing SEO monitoring:

- **Google Search Console**: Submit sitemap and monitor index coverage
- **Google Analytics 4**: Track organic search traffic and conversions
- Monitor keywords: "AI chatbot ภาษาไทย", "ตอบลูกค้าอัตโนมัติ", "Facebook Messenger bot"

### Expected Impact

**Short-term (1-4 weeks)**:
- Landing page indexed by Google
- Proper OG images on Facebook/LINE shares
- Organization schema in Knowledge Graph

**Medium-term (1-3 months)**:
- Rankings for brand queries ("Narada chatbot")
- Long-tail keyword rankings in Thai
- Rich snippets with pricing (Free, 499฿, 999฿)
- 5%+ CTR from search results

**Long-term (3-6 months)**:
- Top 10 rankings for "AI chatbot ภาษาไทย"
- 500+ organic users/month
- Featured snippets for FAQ queries
- 15% organic → trial conversion rate

## Design System

The project implements a professional design system based on Supabase's design philosophy:

### Brand Identity

- **Logo**: Custom animated 'N' logo with:
  - Bold letter 'N' with green gradient (#52d36f → #7de68f → #52d36f)
  - Rotating Cisco-tech style border with gradient animation (cyan #00d4ff → green #52d36f → blue #0099ff)
  - White background with green border accent
  - CSS animations for smooth gradient flow and border rotation
- **Favicon**: Dark theme favicon (app/icon.svg) with:
  - Dark blue-gray background (#1a1d29)
  - Gradient border matching logo style
  - Auto-generated favicon.ico via Next.js
- **Brand Name**: lowercase 'narada' for modern, approachable aesthetic

### Design Tokens

- **Color Palette**:
  - Primary: Jungle Green (#34B27B / #52d36f)
  - Accent gradients: Cyan (#00d4ff), Light Green (#7de68f), Blue (#0099ff)
  - Semantic color tokens for consistency
- **Typography**: Sarabun font family optimized for Thai-English bilingual content
- **Thai Language Support**: Native Thai character rendering with proper tone marks and vowel positioning
- **Icons**: Lucide React with muted, monochromatic style and semantic colors
- **Dark Mode**: Fully supported with `[data-theme="dark"]` attribute
- **Components**: shadcn/ui components styled with Supabase design tokens
- **Animations**: Smooth gradient and rotation effects using CSS keyframes

For complete design system documentation, see [docs/DESIGN_SYSTEM_IMPLEMENTATION.md](docs/DESIGN_SYSTEM_IMPLEMENTATION.md).

## Tech Stack

### Frontend
- **Next.js 14** (App Router)
- **Tailwind CSS + shadcn/ui** - Supabase design system
- **Sarabun Font** (Google Fonts) - Native Thai language support
- **Lucide React** - Icon library with semantic colors
- **React Hook Form + Zod** - Form handling and validation

### Backend
- **Next.js API Routes**
- **Supabase** (PostgreSQL) - Database and authentication
- **OpenAI GPT-4o-mini or Claude API** - AI response generation

### Deployment
- **Vercel** - Hosting
- **Supabase** - Database

## Getting Started

### Prerequisites

- Node.js 18+ installed
- Supabase account
- Azure OpenAI or OpenAI API key

### Installation

1. Clone the repository
```bash
git clone https://github.com/mgprogm/narada.im.git
cd narada.im
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.example .env.local
```

Edit `.env.local` and add your credentials:
- Supabase URL and keys
- OpenAI/Azure OpenAI credentials
- `NEXT_PUBLIC_APP_URL` - Your production URL (e.g., https://narada.im)

4. Apply database migrations

Run the SQL migrations in your Supabase SQL Editor:
- `supabase/migrations/20260101000000_initial_schema.sql`
- `supabase/migrations/20260102000000_add_users_insert_policy.sql`
- `supabase/migrations/20260102000001_add_user_creation_function.sql`

5. Start the development server
```bash
npm run dev
```

Visit `http://localhost:3000` to see the application.

### Building for Production

To create a production build:

```bash
npm run build
```

The build process will:
- Compile TypeScript code
- Generate static pages for optimal performance
- Optimize assets and bundles
- Validate all routes and API endpoints

To start the production server locally:

```bash
npm start
```

### Deployment to Vercel

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)

2. Connect your repository to Vercel:
   - Visit [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your repository

3. Configure environment variables in Vercel dashboard:
   - `NEXT_PUBLIC_APP_URL` (e.g., https://narada.im)
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - Azure OpenAI credentials (or OpenAI API key)

4. Deploy! Vercel will automatically:
   - Build your application
   - Deploy to a global CDN
   - Provide a production URL

**Note**: The theme system has been optimized for SSR/SSG compatibility to ensure successful Vercel builds.

## Project Structure

```
narada.im/
├── app/                    # Next.js app directory
│   ├── (auth)/            # Authentication pages (login, register)
│   │   └── layout.tsx    # Auth layout with noindex metadata
│   ├── (dashboard)/       # Protected dashboard pages
│   │   ├── layout.tsx    # Dashboard layout with noindex metadata
│   │   ├── dashboard/    # Main dashboard
│   │   ├── generator/    # AI answer generator
│   │   ├── faqs/         # FAQ management
│   │   ├── settings/     # Bot settings
│   │   └── history/      # Conversation history
│   ├── api/              # API routes
│   ├── layout.tsx        # Root layout with SEO metadata
│   ├── page.tsx          # Landing page with structured data
│   ├── sitemap.ts        # Dynamic sitemap generation
│   ├── robots.ts         # Robots.txt configuration
│   └── icon.svg          # Favicon
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   └── dashboard/        # Dashboard-specific components
├── lib/                  # Utility functions and configurations
│   └── supabase/        # Supabase client and middleware
├── supabase/            # Database migrations
│   └── migrations/      # SQL migration files
├── scripts/             # Utility scripts (see scripts/README.md)
│   ├── reset-all-data.mjs        # Clear all database data
│   ├── test-auth.mjs             # Test authentication flow
│   ├── test-register.mjs         # Test registration
│   ├── create-test-user-direct.mjs  # Create test users
│   ├── list-users.mjs            # List all users
│   └── verify-user.mjs           # Verify user auth
└── docs/                # Documentation
    ├── AUTHENTICATION_SETUP.md          # Auth system guide
    ├── DESIGN_SYSTEM_IMPLEMENTATION.md  # Design system guide
    ├── SUPABASE_DESIGN_SYSTEM.md        # Supabase design reference
    ├── ICON_REFERENCE.md                # Icon usage guide
    ├── TROUBLESHOOTING.md               # Common issues
    ├── first-project-requirement.md     # Project requirements
    └── README.md                        # Documentation index

```

## Development Tools

### Utility Scripts

The `scripts/` directory contains useful development and testing utilities. You can run them directly or use npm scripts:

```bash
# Test authentication
npm run test:auth
# or: node scripts/test-auth.mjs

# Test registration flow
npm run test:register
# or: node scripts/test-register.mjs

# Create test users
npm run db:create-user
# or: node scripts/create-test-user-direct.mjs

# List all users
npm run db:list-users
# or: node scripts/list-users.mjs

# Verify user authentication
npm run db:verify-user
# or: node scripts/verify-user.mjs

# Reset database (WARNING: deletes all data!)
npm run db:reset
# or: node scripts/reset-all-data.mjs
```

For more information, see [scripts/README.md](scripts/README.md).

### Database Management

- **Migrations**: Located in `supabase/migrations/`
- **Schema**: Initial schema includes users, FAQs, conversations, and settings tables
- **Row Level Security**: Enabled on all tables with user-specific policies

## Architecture Notes

### Theme System

The application uses a custom theme system that supports light, dark, and system themes:

- **ThemeProvider** (`components/theme-provider.tsx`): React Context provider for theme state
- **ThemeSwitcher** (`components/theme-switcher.tsx`): UI component for theme selection
- **SSR/SSG Compatible**: Theme components are optimized to prevent hydration errors during static generation

The theme system uses:
- `localStorage` for persistence
- `data-theme` attribute on `<html>` for CSS theming
- Inline script in `app/layout.tsx` to prevent flash of unstyled content (FOUC)

### Build Optimization

The project is configured for optimal Vercel deployment:
- All pages are statically generated where possible
- Client components use mounted state checks to prevent SSR errors
- API routes are dynamically rendered on-demand
- Middleware proxy pattern for authentication

## Documentation

- [Authentication Setup Guide](docs/AUTHENTICATION_SETUP.md) - Detailed guide for setting up authentication
- [Design System Implementation](docs/DESIGN_SYSTEM_IMPLEMENTATION.md) - Complete design system guide with Supabase colors, typography, and Thai font support
- [Supabase Design System](docs/SUPABASE_DESIGN_SYSTEM.md) - Official Supabase design reference
- [Icon Reference](docs/ICON_REFERENCE.md) - Lucide React icon usage guide
- [Project Requirements](docs/first-project-requirement.md) - Original project requirements and specifications
- [Troubleshooting Guide](docs/TROUBLESHOOTING.md) - Common issues and solutions
- [Claude Instructions](CLAUDE.md) - Instructions for Claude Code AI assistant

## Features Roadmap

### Phase 1 (Week 1) - MVP ✓
- ✓ User authentication and registration
- ✓ Supabase design system with Jungle Green (#34B27B) brand color
- ✓ Custom animated logo with gradient effects
- ✓ Dark theme favicon with Cisco-tech gradient border
- ✓ Professional Lucide React icon system
- ✓ Sarabun font with native Thai language support
- ✓ Dark mode support
- ✓ FAQ management
- ✓ AI answer generator
- ✓ Basic dashboard
- ✓ **Comprehensive SEO implementation**
  - ✓ Thai-optimized metadata and keywords
  - ✓ OpenGraph and Twitter Card tags
  - ✓ JSON-LD structured data (Organization + SoftwareApplication)
  - ✓ Dynamic sitemap and robots.txt
  - ✓ Per-page metadata optimization

### Phase 2 (Week 2-4)
- [ ] Facebook Messenger webhook integration
- [ ] LINE Official Account integration
- [ ] Automated responses

### Phase 3 (Month 2-3)
- [ ] Analytics dashboard
- [ ] A/B testing for responses
- [ ] Multi-language support

### Phase 4 (Month 4+)
- [ ] WhatsApp integration
- [ ] Voice message support
- [ ] E-commerce platform integration

## Subscription Plans

- **Free Trial**: 7 days, 20 queries/day, 30 FAQs
- **Starter**: 499฿/month, 200 queries/day, unlimited FAQs
- **Pro**: 999฿/month, unlimited queries and FAQs

## Contributing

This is a private project. For questions or issues, please contact the development team.

## License

Proprietary - All rights reserved
