# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Narada** - An AI-powered chatbot system that automatically responds to customers 24/7 via Facebook Messenger. The system helps Thai SME businesses (online shops, clinics, service businesses) manage customer inquiries using an FAQ engine combined with AI-generated responses.

**Core Architecture:** Webhook-based system where Facebook Messenger sends webhooks to the server, the FAQ Engine attempts keyword matching, and if no match is found, an AI Generator creates contextual responses. Responses are sent back to customers within 2-5 seconds.

**Target Market:** Thai businesses with 30,000-200,000 baht/month revenue, 1-3 admin staff, handling 50+ repetitive customer questions daily.

## Tech Stack

### Frontend
- **Next.js 14** (App Router) - Primary framework
- **Tailwind CSS + shadcn/ui** - Styling and component library
- **Zustand or React Context** - State management
- **React Hook Form + Zod** - Form handling and validation

### Backend
- **Next.js API Routes** - Backend API
- **Supabase** (PostgreSQL) - Database and authentication
- **OpenAI GPT-4o-mini or Claude API** - AI response generation

### Deployment
- **Vercel** - Hosting (free tier)
- **Supabase** - Database (free tier)

## Database Schema

The system uses four main tables:

**users** - User accounts with subscription management
- id (UUID), email, password_hash, shop_name
- plan_type (free/starter/pro)
- trial_ends_at, subscription_ends_at, created_at

**faqs** - FAQ knowledge base per user
- id, user_id, category, question, answer, is_active, created_at

**conversations** - Query history for learning
- id, user_id, customer_question, ai_answer, was_copied, created_at

**settings** - Bot personality configuration
- id, user_id, tone (polite/friendly/professional/vendor)
- shop_name, greeting_message, custom_instructions

## Key Features & Implementation Areas

### 1. Admin Dashboard
- FAQ CRUD operations with category management
- Bot personality settings (tone selection, shop name, greeting)
- Optional CSV import for FAQ bulk upload

### 2. AI Answer Generator (Core Feature)
- Input interface for customer questions
- AI generates responses based on FAQ context + selected tone
- Copy-to-clipboard functionality with animation
- Edit capability before copying
- Conversation history tracking

### 3. FAQ Learning System
- Track unmatched questions
- Suggest new FAQ entries to admin
- Dashboard showing popular/trending questions

### 4. Authentication & Subscription
- Email/password authentication via Supabase
- 7-day free trial (no credit card required)
- Three tiers: Free (trial), Starter (499฿/mo), Pro (999฿/mo)
- Usage limits enforcement per plan

### 5. Payment Integration
- PromptPay QR Code generation (manual verification initially)
- Payment status display
- Expiration notifications

### 6. Landing Page
- Hero section highlighting problem → solution
- Demo video showcase
- Before/After examples
- Pricing table with clear CTAs

## Development Approach

### MVP Philosophy
- **"Done is better than perfect"** - Ship 80% solution quickly over 100% perfection
- Revenue-first approach - Focus on features that directly enable monetization
- Minimal viable product in 7 days

### Scope Management
If time/resources are constrained:
- Use GPT-4o-mini to reduce API costs
- Implement manual payment verification before automation
- Defer FAQ learning system (not critical for MVP)

### Thai Language Support
- AI responses must be natural Thai language, not robotic
- Support multiple tones: สุภาพ (polite), เป็นกันเอง (friendly), มืออาชีพ (professional), แบบแม่ค้า (vendor style)
- Prompt engineering focused on Thai language patterns

## Future Roadmap

### Phase 2 (Week 2-4)
- LINE Official Account integration
- Facebook Messenger webhook integration (auto-reply mode)

### Phase 3 (Month 2-3)
- Analytics dashboard (response time, conversion metrics)
- A/B testing for responses
- Multi-language support

### Phase 4 (Month 4+)
- WhatsApp integration
- Voice message support
- E-commerce platform integration (Shopee, Lazada)

## Important Notes

- API cost management is critical - implement caching for repeated questions and rate limiting
- Mobile responsiveness is essential (target users manage businesses on mobile)
- Focus on Thai SME market - localized UX patterns and payment methods (PromptPay)
- The system should feel conversational and natural, not like a rigid chatbot
