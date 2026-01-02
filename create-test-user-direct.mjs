import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { randomUUID } from 'crypto';

// Read environment variables from .env.local
const envContent = readFileSync('.env.local', 'utf8');
const envVars = {};
envContent.split('\n').forEach(line => {
  const match = line.match(/^([^#=]+)=(.*)$/);
  if (match) {
    envVars[match[1].trim()] = match[2].trim();
  }
});

const supabaseUrl = envVars.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = envVars.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

console.log('🧪 Creating Test User (Direct Database Insert)\n');
console.log('⚠️  NOTE: This creates a user record WITHOUT auth credentials');
console.log('⚠️  This is only for testing database structure, not full auth flow\n');
console.log('='.repeat(60));

async function createTestUserDirect() {
  try {
    const testUserId = randomUUID();
    const testEmail = `testuser_${Date.now()}@narada.test`;
    const testShopName = 'ร้านทดสอบ Direct Insert Shop';

    console.log(`User ID: ${testUserId}`);
    console.log(`Email: ${testEmail}`);
    console.log(`Shop Name: ${testShopName}`);
    console.log('='.repeat(60) + '\n');

    // Calculate trial end date
    const trialEndsAt = new Date();
    trialEndsAt.setDate(trialEndsAt.getDate() + 7);

    console.log('📝 Attempting direct user profile creation via RPC function...\n');

    // Note: This will likely fail due to RLS policies since we don't have auth
    // But let's try anyway to see what happens
    const { data, error } = await supabase.rpc('create_user_profile', {
      p_user_id: testUserId,
      p_email: testEmail,
      p_shop_name: testShopName,
      p_plan_type: 'free',
      p_trial_days: 7,
    });

    if (error) {
      console.error('❌ Direct insert failed (expected due to RLS):', error.message);
      console.log('\n💡 To test registration properly, you need to:');
      console.log('   1. Disable email confirmation in Supabase Dashboard');
      console.log('   2. Wait for rate limit to reset (1 hour)');
      console.log('   3. Or set up custom SMTP provider\n');
      return false;
    }

    if (data && data.success) {
      console.log('✅ User profile created!');
      console.log(JSON.stringify(data, null, 2));
      return true;
    } else {
      console.log('❌ Creation failed:', data);
      return false;
    }
  } catch (error) {
    console.error('❌ Unexpected error:', error.message);
    return false;
  }
}

createTestUserDirect().then(success => {
  process.exit(success ? 0 : 1);
});
