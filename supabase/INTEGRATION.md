# Supabase Integration Guide

Quick reference for integrating Supabase with the Next.js application.

## Environment Variables

Create/update `.env.local`:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

# Azure OpenAI Configuration
AZURE_OPENAI_ENDPOINT=https://your-resource.openai.azure.com
AZURE_OPENAI_API_KEY=your-azure-openai-key
AZURE_OPENAI_DEPLOYMENT_NAME=gpt-4o-mini
AZURE_OPENAI_API_VERSION=2024-02-15-preview
```

## Supabase Client Usage

The project already has Supabase client utilities set up in `/lib/supabase/`:

### Client-side (Browser)
```typescript
import { createClient } from '@/lib/supabase/client'

// In a React component
const supabase = createClient()
const { data, error } = await supabase.from('faqs').select('*')
```

### Server-side (API Routes, Server Components)
```typescript
import { createClient } from '@/lib/supabase/server'

// In API routes or Server Components
const supabase = await createClient()
const { data, error } = await supabase.from('faqs').select('*')
```

## Common Database Operations

### Authentication

#### Sign Up
```typescript
const { data, error } = await supabase.auth.signUp({
  email: 'user@example.com',
  password: 'password123',
  options: {
    data: {
      shop_name: 'My Shop'
    }
  }
})

// After signup, create user profile
if (data.user) {
  await supabase.from('users').insert({
    id: data.user.id,
    email: data.user.email,
    shop_name: 'My Shop',
    trial_ends_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
  })
}
```

#### Sign In
```typescript
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'password123'
})
```

#### Sign Out
```typescript
const { error } = await supabase.auth.signOut()
```

#### Get Current User
```typescript
const { data: { user } } = await supabase.auth.getUser()
```

### FAQ Operations

#### Get All FAQs
```typescript
const { data: faqs, error } = await supabase
  .from('faqs')
  .select('*')
  .eq('user_id', userId)
  .eq('is_active', true)
  .order('category', { ascending: true })
```

#### Create FAQ
```typescript
const { data, error } = await supabase
  .from('faqs')
  .insert({
    user_id: userId,
    category: 'การจัดส่ง',
    question: 'จัดส่งฟรีไหม',
    answer: 'ฟรีสำหรับยอดซื้อ 500 บาทขึ้นไป'
  })
  .select()
  .single()
```

#### Update FAQ
```typescript
const { data, error } = await supabase
  .from('faqs')
  .update({
    question: 'Updated question',
    answer: 'Updated answer'
  })
  .eq('id', faqId)
  .select()
  .single()
```

#### Delete FAQ (Soft delete)
```typescript
const { error } = await supabase
  .from('faqs')
  .update({ is_active: false })
  .eq('id', faqId)
```

#### Search FAQs
```typescript
const { data, error } = await supabase
  .from('faqs')
  .select('*')
  .textSearch('question', searchTerm, {
    type: 'websearch',
    config: 'simple' // 'simple' works with Thai and all languages
  })
```

### Conversation History

#### Save Conversation
```typescript
const { data, error } = await supabase
  .from('conversations')
  .insert({
    user_id: userId,
    customer_question: 'ราคาเท่าไหร่',
    ai_answer: 'ราคา 299 บาทค่ะ',
    was_copied: true,
    response_time_ms: 1500
  })
```

#### Get Conversation History
```typescript
const { data, error } = await supabase
  .from('conversations')
  .select('*')
  .eq('user_id', userId)
  .order('created_at', { ascending: false })
  .limit(50)
```

#### Get Trending Questions
```typescript
const { data, error } = await supabase
  .rpc('get_trending_questions', {
    p_user_id: userId,
    p_days: 7,
    p_limit: 10
  })
```

### Settings

#### Get User Settings
```typescript
const { data: settings, error } = await supabase
  .from('settings')
  .select('*')
  .eq('user_id', userId)
  .single()
```

#### Update Settings
```typescript
const { data, error } = await supabase
  .from('settings')
  .update({
    tone: 'friendly',
    greeting_message: 'สวัสดีค่ะ',
    custom_instructions: 'เพิ่มอิโมจิ 😊'
  })
  .eq('user_id', userId)
```

### Usage Limits Check

#### Check if user can make more requests
```typescript
const { data, error } = await supabase
  .rpc('check_usage_limits', {
    p_user_id: userId
  })

if (data && !data.is_within_limits) {
  // Show upgrade prompt
  console.log('Daily limit reached:', data.daily_count, '/', data.daily_limit)
}
```

#### Check subscription status
```typescript
const { data: isActive, error } = await supabase
  .rpc('is_subscription_active', {
    p_user_id: userId
  })

if (!isActive) {
  // Show subscription expired message
}
```

## Real-time Subscriptions (Optional)

Listen to changes in real-time:

```typescript
const channel = supabase
  .channel('faqs-changes')
  .on(
    'postgres_changes',
    {
      event: '*',
      schema: 'public',
      table: 'faqs',
      filter: `user_id=eq.${userId}`
    },
    (payload) => {
      console.log('FAQ changed:', payload)
      // Update UI
    }
  )
  .subscribe()

// Cleanup
return () => {
  supabase.removeChannel(channel)
}
```

## Error Handling

Always handle errors properly:

```typescript
const { data, error } = await supabase
  .from('faqs')
  .select('*')

if (error) {
  console.error('Database error:', error.message)
  // Show user-friendly error message
  return { success: false, error: error.message }
}

return { success: true, data }
```

## Type Safety

Generate TypeScript types from your database:

```bash
npx supabase gen types typescript --project-id your-project-id > types/database.ts
```

Then use in your code:

```typescript
import { Database } from '@/types/database'

type FAQ = Database['public']['Tables']['faqs']['Row']
type FAQInsert = Database['public']['Tables']['faqs']['Insert']
type FAQUpdate = Database['public']['Tables']['faqs']['Update']
```

## Best Practices

1. **Always use RLS**: Never disable Row Level Security in production
2. **Use prepared statements**: Supabase handles SQL injection, but still validate input
3. **Handle errors**: Always check for errors and provide feedback
4. **Optimize queries**: Use `.select()` to only fetch needed columns
5. **Cache when possible**: Use React Query or SWR for data fetching
6. **Monitor usage**: Keep track of database usage in Supabase dashboard
7. **Backup regularly**: Enable point-in-time recovery in Supabase

## Testing

Test database operations:

```typescript
// In your tests
import { createClient } from '@/lib/supabase/client'

describe('FAQ Operations', () => {
  it('should create FAQ', async () => {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('faqs')
      .insert({ ... })

    expect(error).toBeNull()
    expect(data).toBeDefined()
  })
})
```

## Troubleshooting

**401 Unauthorized**
- Check if user is authenticated
- Verify RLS policies allow the operation

**403 Forbidden**
- RLS policy is blocking the operation
- Check if `auth.uid()` matches `user_id`

**500 Internal Server Error**
- Check Supabase logs in dashboard
- Verify database function syntax
- Check for null values in NOT NULL columns

**Slow queries**
- Add indexes on frequently queried columns
- Use `.explain()` to analyze query performance
- Check Supabase Performance tab

## Resources

- [Supabase Docs](https://supabase.com/docs)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript/introduction)
- [Row Level Security Guide](https://supabase.com/docs/guides/auth/row-level-security)
- [Supabase + Next.js Guide](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs)
