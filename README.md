# Narada - AI Chatbot for Thai SME Businesses

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

## Design System

The project implements a professional design system based on Supabase's design philosophy:

- **Color Palette**: Jungle Green (#34B27B) brand color with semantic color tokens
- **Typography**: Sarabun font family optimized for Thai-English bilingual content
- **Thai Language Support**: Native Thai character rendering with proper tone marks and vowel positioning
- **Icons**: Lucide React with muted, monochromatic style and semantic colors
- **Dark Mode**: Fully supported with `[data-theme="dark"]` attribute
- **Components**: shadcn/ui components styled with Supabase design tokens

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

## Project Structure

```
narada.im/
├── app/                    # Next.js app directory
│   ├── (auth)/            # Authentication pages (login, register)
│   ├── dashboard/         # Protected dashboard pages
│   └── api/               # API routes
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
- ✓ Professional Lucide React icon system
- ✓ Sarabun font with native Thai language support
- ✓ Dark mode support
- ✓ FAQ management
- ✓ AI answer generator
- ✓ Basic dashboard

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
