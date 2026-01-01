# Supabase Database Setup

This directory contains the database schema and migrations for the SmartSales Assistant project.

## Database Schema Overview

The database consists of four main tables:

### 1. **users** (extends Supabase auth.users)
- Stores user profiles with subscription information
- Fields: id, email, shop_name, plan_type, trial_ends_at, subscription_ends_at
- Plan types: `free`, `starter`, `pro`

### 2. **faqs**
- FAQ knowledge base for each user
- Fields: id, user_id, category, question, answer, is_active
- Includes full-text search indexes for Thai language

### 3. **conversations**
- Conversation history for analytics and learning
- Fields: id, user_id, customer_question, ai_answer, was_copied, was_edited, response_time_ms
- Used to track usage and suggest new FAQs

### 4. **settings**
- Bot personality and configuration per user
- Fields: id, user_id, tone, shop_name, greeting_message, custom_instructions
- Tone options: `polite`, `friendly`, `professional`, `vendor`

## Setup Instructions

### Option 1: Using Supabase Dashboard (Recommended for first-time setup)

1. **Create a Supabase project**
   - Go to https://supabase.com/dashboard
   - Click "New Project"
   - Fill in project details and wait for setup to complete

2. **Apply the migration**
   - In your Supabase project dashboard, go to **SQL Editor**
   - Click "New Query"
   - Copy the contents of `migrations/20260101000000_initial_schema.sql`
   - Paste into the SQL Editor
   - Click "Run" to execute

3. **Verify the setup**
   - Go to **Table Editor** to see all tables
   - Go to **Database** > **Policies** to verify RLS policies
   - Go to **Database** > **Functions** to see helper functions

### Option 2: Using Supabase CLI (For development workflow)

1. **Install Supabase CLI**
   ```bash
   npm install -g supabase
   ```

2. **Login to Supabase**
   ```bash
   supabase login
   ```

3. **Link to your project**
   ```bash
   supabase link --project-ref your-project-ref
   ```

4. **Push migrations**
   ```bash
   supabase db push
   ```

## Helper Functions

The migration includes several useful helper functions:

### `check_usage_limits(user_id, date)`
Checks if a user has exceeded their daily usage limits based on their plan.

```sql
SELECT check_usage_limits('user-uuid');
```

Returns:
```json
{
  "plan_type": "starter",
  "daily_count": 45,
  "daily_limit": 200,
  "faq_count": 50,
  "faq_limit": null,
  "is_within_limits": true
}
```

### `is_subscription_active(user_id)`
Checks if a user's subscription or trial is still active.

```sql
SELECT is_subscription_active('user-uuid');
```

### `get_trending_questions(user_id, days, limit)`
Gets trending/repeated customer questions for FAQ learning.

```sql
SELECT * FROM get_trending_questions('user-uuid', 7, 10);
```

## Usage Limits by Plan

| Plan | Daily Questions | FAQ Limit | Notes |
|------|----------------|-----------|-------|
| **Free (Trial)** | 20/day | 30 FAQs | 7-day trial |
| **Starter** | 200/day | Unlimited | 499฿/month |
| **Pro** | Unlimited | Unlimited | 999฿/month, 3 users |

## Row Level Security (RLS)

All tables have RLS enabled. Users can only:
- View their own data
- Insert their own data
- Update their own data
- Delete their own data

RLS policies use `auth.uid()` to ensure data isolation between users.

## Indexes

The schema includes optimized indexes for:
- **Full-text search** on FAQ questions/answers (Thai language support)
- **User queries** (fast lookups by user_id)
- **Date ranges** (for analytics and conversation history)
- **Subscription status** (for quick plan checks)

## Auto-initialization

When a new user signs up:
1. A row is automatically created in the `users` table
2. Default settings are created via trigger (`initialize_user_settings()`)
3. Trial period is set (7 days from signup)

## Environment Variables

After setting up the database, update your `.env.local`:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

Find these values in your Supabase project:
- Dashboard > Settings > API

## Testing the Setup

You can test the database setup with these SQL queries:

```sql
-- Check if all tables exist
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public';

-- Check RLS policies
SELECT tablename, policyname
FROM pg_policies
WHERE schemaname = 'public';

-- Test helper function
SELECT check_usage_limits(auth.uid());
```

## Next Steps

After database setup:
1. ✅ Configure environment variables in `.env.local`
2. ✅ Test Supabase connection in your app
3. ✅ Implement authentication (signup/login)
4. ✅ Build FAQ management interface
5. ✅ Implement AI answer generator

## Troubleshooting

**Error: "permission denied for schema public"**
- Make sure you're using the correct API keys
- Verify RLS policies are enabled
- Check if you're authenticated

**Full-text search not working**
- The schema uses `to_tsvector('simple', ...)` which works with Thai and all languages
- The 'simple' configuration doesn't do language-specific stemming but provides universal text search

**Trigger not firing**
- Check if triggers are enabled
- Verify function permissions (SECURITY DEFINER)

## Support

For Supabase-specific issues:
- Supabase Docs: https://supabase.com/docs
- Supabase Discord: https://discord.supabase.com
