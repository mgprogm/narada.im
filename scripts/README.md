# Scripts Directory

This folder contains utility scripts for database management, testing, and development.

All scripts can be run directly with `node scripts/<script-name>.mjs` or via npm scripts (see package.json).

## Database Management

### `reset-all-data.mjs`
Clears all data from all database tables (users, faqs, conversations, settings).

**Usage:**
```bash
npm run db:reset
# or: node scripts/reset-all-data.mjs
```

**Warning:** This is irreversible and will delete ALL data!

### `reset-database.sql`
SQL script for manual database reset via Supabase SQL Editor or CLI.

## User Management

### `create-test-user-direct.mjs`
Creates a test user directly in the database for development purposes.

**Usage:**
```bash
npm run db:create-user
# or: node scripts/create-test-user-direct.mjs
```

### `list-users.mjs`
Lists all users in the database with their details.

**Usage:**
```bash
npm run db:list-users
# or: node scripts/list-users.mjs
```

### `verify-user.mjs`
Verifies user authentication and retrieves user details.

**Usage:**
```bash
npm run db:verify-user
# or: node scripts/verify-user.mjs
```

## Testing

### `test-auth.mjs`
Tests authentication flow and user login functionality.

**Usage:**
```bash
npm run test:auth
# or: node scripts/test-auth.mjs
```

### `test-register.mjs`
Tests user registration flow.

**Usage:**
```bash
npm run test:register
# or: node scripts/test-register.mjs
```

## Requirements

All scripts require:
- Node.js installed
- `.env.local` file in the project root with Supabase credentials
- `@supabase/supabase-js` package installed

## Environment Variables

Scripts read from `../.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```
