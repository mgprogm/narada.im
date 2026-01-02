# Authentication Setup Guide

This guide covers the authentication system implementation for the Narada project.

## Overview

The authentication system is built with:
- **Supabase Auth** - User authentication and session management
- **Next.js Middleware** - Protected route handling
- **Row Level Security (RLS)** - Database-level access control

## Setup Instructions

### 1. Configure Environment Variables

Copy `.env.example` to `.env.local` and fill in your credentials:

```bash
cp .env.example .env.local
```

Get your Supabase credentials from:
- Dashboard: https://supabase.com/dashboard
- Project Settings → API
- Copy: `URL`, `anon key`, and `service_role key`

### 2. Apply Database Schema

Run the migration in your Supabase SQL Editor:
```sql
-- Copy and run: supabase/migrations/20260101000000_initial_schema.sql
```

This creates:
- `users` table for user profiles
- `settings` table for bot configuration
- RLS policies for data security
- Automatic triggers for default settings

### 3. Configure Supabase Auth Settings

In your Supabase Dashboard:

**Authentication → URL Configuration:**
- Site URL: `http://localhost:3000` (dev) or your production URL
- Redirect URLs: Add these URLs:
  - `http://localhost:3000/login`
  - `http://localhost:3000/dashboard`
  - Your production URLs

**Authentication → Email Templates:**
The default templates work fine, or customize:
- Confirmation email (optional, can disable email verification for dev)
- Password recovery email

**Authentication → Providers:**
- Enable **Email** provider (enabled by default)

**Authentication → Email Auth:**
- ✅ Enable email confirmations (for production)
- ⚠️ For development, you can disable "Confirm email" to skip verification

## Architecture

### Authentication Flow

```
┌─────────────┐
│   Register  │
│    Page     │
└──────┬──────┘
       │
       ↓
┌─────────────┐
│  Supabase   │ ← Create auth.users record
│    Auth     │
└──────┬──────┘
       │
       ↓
┌─────────────┐
│   Create    │ ← Insert into public.users table
│   Profile   │ ← Trigger creates default settings
└──────┬──────┘
       │
       ↓
┌─────────────┐
│  Dashboard  │ ← Redirect to dashboard
└─────────────┘
```

### Login Flow

```
┌─────────────┐
│    Login    │
│    Page     │
└──────┬──────┘
       │
       ↓
┌─────────────┐
│  Supabase   │ ← Verify credentials
│    Auth     │ ← Create session cookie
└──────┬──────┘
       │
       ↓
┌─────────────┐
│ Middleware  │ ← Verify session
│   Check     │ ← Redirect if needed
└──────┬──────┘
       │
       ↓
┌─────────────┐
│  Dashboard  │
└─────────────┘
```

### Protected Routes

The middleware (`middleware.ts`) automatically:
1. **Refreshes auth tokens** on every request
2. **Protects dashboard routes** - redirects to `/login` if not authenticated
3. **Redirects auth pages** - sends logged-in users to `/dashboard`

Protected routes:
- `/dashboard/*` - All dashboard pages require authentication
- `/login` and `/register` - Redirect to dashboard if already logged in

## Code Reference

### Register Page
Location: `app/(auth)/register/page.tsx`

Key functionality:
- Client-side form validation
- Supabase Auth signup
- User profile creation via database function (bypasses RLS)
- Automatic settings creation via database trigger
- Redirect to dashboard on success

```typescript
// Signup flow
const { data, error } = await supabase.auth.signUp({
  email,
  password,
  options: { data: { shop_name: shopName } }
});

// Create user profile using RPC function (SECURITY DEFINER bypasses RLS)
const { data: profileData, error: userError } = await supabase
  .rpc("create_user_profile", {
    p_user_id: data.user.id,
    p_email: email,
    p_shop_name: shopName,
    p_plan_type: "free",
    p_trial_days: 7,
  });
```

**Important Note on RLS**:
The user profile is created using a database function (`create_user_profile`) with `SECURITY DEFINER` instead of direct INSERT. This is necessary because immediately after `auth.signUp()`, the session might not be fully propagated to RLS policies, causing INSERT policy violations. The function bypasses RLS safely and ensures profile creation always succeeds.

### Login Page
Location: `app/(auth)/login/page.tsx`

Key functionality:
- Email/password authentication
- Session creation
- Redirect to dashboard

```typescript
const { data, error } = await supabase.auth.signInWithPassword({
  email,
  password,
});
```

### Logout Functionality
Location: `components/dashboard/dashboard-header.tsx`

```typescript
const handleLogout = async () => {
  const supabase = createClient();
  await supabase.auth.signOut();
  router.push("/login");
};
```

### Middleware
Location: `lib/supabase/middleware.ts`

Handles:
- Session refresh
- Protected route checks
- Authentication redirects

```typescript
// Check if user is authenticated
const { data: { user } } = await supabase.auth.getUser();

// Protect dashboard routes
if (!user && isDashboardRoute) {
  return NextResponse.redirect(new URL("/login", request.url));
}
```

## Database Tables

### users table
Stores user profiles and subscription information:
- `id` - References `auth.users(id)`
- `email` - User's email
- `shop_name` - Business name
- `plan_type` - Subscription plan (free/starter/pro)
- `trial_ends_at` - Trial expiration date
- `subscription_ends_at` - Subscription expiration date

### settings table
Bot configuration per user (auto-created via trigger):
- `user_id` - References `users(id)`
- `tone` - Bot personality (polite/friendly/professional/vendor)
- `shop_name` - Display name
- `greeting_message` - Welcome message
- `custom_instructions` - Additional AI instructions

## Database Functions

### create_user_profile
Location: `supabase/migrations/20260102000001_add_user_creation_function.sql`

A `SECURITY DEFINER` function that creates user profiles during registration, bypassing RLS policies.

**Why needed**: After `auth.signUp()`, the session may not be immediately available to RLS policies, causing INSERT operations to fail with "violates row-level security policy" errors. This function runs with elevated privileges to ensure profile creation always succeeds.

**Usage**:
```typescript
const { data, error } = await supabase.rpc("create_user_profile", {
  p_user_id: userId,
  p_email: email,
  p_shop_name: shopName,
  p_plan_type: "free",
  p_trial_days: 7,
});
```

**Returns**: JSON object with `success` boolean and error details if applicable.

## Security

### Row Level Security (RLS)
All tables have RLS enabled with policies:

```sql
-- Users can only view their own data
CREATE POLICY "Users can view own profile"
  ON public.users FOR SELECT
  USING (auth.uid() = id);

-- Users can insert their own profile (applied but may fail during signup)
CREATE POLICY "Users can insert own profile"
  ON public.users FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Users can only modify their own data
CREATE POLICY "Users can update own profile"
  ON public.users FOR UPDATE
  USING (auth.uid() = id);
```

**Note**: The INSERT policy exists but is not used during registration. Instead, we use the `create_user_profile()` function to bypass potential RLS timing issues during signup.

### Session Management
- Sessions stored in HTTP-only cookies
- Automatic token refresh via middleware
- Secure cookie settings in production

### Password Requirements
- Minimum 8 characters
- Validated on client and server side
- Hashed by Supabase Auth

## Testing the Authentication

### Test Signup Flow
1. Start dev server: `npm run dev`
2. Go to: http://localhost:3000/register
3. Fill in the form:
   - Shop name: "ร้านทดสอบ"
   - Email: "test@example.com"
   - Password: "password123"
4. Submit and verify:
   - ✅ User created in `auth.users`
   - ✅ Profile created in `public.users`
   - ✅ Settings created automatically
   - ✅ Redirected to `/dashboard`

### Test Login Flow
1. Go to: http://localhost:3000/login
2. Enter credentials from signup
3. Verify redirect to dashboard

### Test Protected Routes
1. Logout from dashboard
2. Try to access: http://localhost:3000/dashboard
3. Should redirect to `/login`

### Test Logout
1. Login and go to dashboard
2. Click user icon → "ออกจากระบบ"
3. Should redirect to `/login`
4. Try accessing dashboard → redirects to login

### Automated Testing
Multiple test scripts are available in the `scripts/` directory:

```bash
# Test authentication flow
node scripts/test-auth.mjs

# Test registration flow
node scripts/test-register.mjs

# Create a test user directly
node scripts/create-test-user-direct.mjs

# List all users
node scripts/list-users.mjs

# Verify user authentication
node scripts/verify-user.mjs

# Reset all database data (WARNING: irreversible!)
node scripts/reset-all-data.mjs
```

The test scripts verify:
- User registration
- Profile creation via RPC function
- Settings auto-creation
- Login flow
- RLS data access
- Logout

**Note**: Supabase has rate limiting on signups. If you get "email rate limit exceeded", wait a few minutes or test manually in browser.

For more details on available scripts, see `scripts/README.md`.

## Troubleshooting

### "Invalid email or password"
- Check if email verification is required
- In Supabase Dashboard → Authentication → Email Auth
- Disable "Confirm email" for development

### "Profile creation error" or "violates row-level security policy"
- **Fixed in current implementation**: We now use the `create_user_profile()` RPC function instead of direct INSERT
- If you see this error, ensure migration `20260102000001_add_user_creation_function.sql` is applied
- The function uses `SECURITY DEFINER` to bypass RLS timing issues
- Check Supabase logs in Dashboard → Logs for details

### Middleware redirect loop
- Clear browser cookies
- Check middleware route matching logic
- Verify `NEXT_PUBLIC_SUPABASE_URL` is set

### "Failed to fetch" errors
- Verify environment variables are set
- Check Supabase project is active
- Verify API keys are correct

## Next Steps

After authentication is working:
1. ✅ Add user profile display in dashboard
2. ✅ Implement subscription status checking
3. ✅ Add password reset functionality
4. ✅ Build FAQ management (requires auth)
5. ✅ Build AI answer generator (requires auth)

## Resources

- [Supabase Auth Docs](https://supabase.com/docs/guides/auth)
- [Next.js Middleware](https://nextjs.org/docs/app/building-your-application/routing/middleware)
- [Supabase RLS](https://supabase.com/docs/guides/auth/row-level-security)
