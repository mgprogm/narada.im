import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';

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

const supabase = createClient(supabaseUrl, supabaseKey);

// Use credentials from test-register.mjs
const TEST_EMAIL = process.argv[2] || 'test1767325253686@example.com';
const TEST_PASSWORD = process.argv[3] || 'Password123!';

console.log('🔐 Verifying User Registration\n');
console.log('='.repeat(60));
console.log(`Logging in as: ${TEST_EMAIL}`);
console.log('='.repeat(60) + '\n');

async function verifyUser() {
  try {
    // Login
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email: TEST_EMAIL,
      password: TEST_PASSWORD,
    });

    if (authError) {
      console.error('❌ Login failed:', authError.message);
      console.log('\n💡 The user may not exist or credentials are incorrect.');
      return false;
    }

    console.log('✅ Login successful!');
    console.log(`   User ID: ${authData.user.id}\n`);

    // Fetch user profile
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('id', authData.user.id)
      .single();

    if (userError) {
      console.error('❌ Failed to fetch user profile:', userError.message);
      return false;
    }

    console.log('📋 USER PROFILE:');
    console.log('='.repeat(60));
    console.log(`ID:                ${userData.id}`);
    console.log(`Email:             ${userData.email}`);
    console.log(`Shop Name:         ${userData.shop_name}`);
    console.log(`Plan Type:         ${userData.plan_type}`);
    console.log(`Trial Ends:        ${new Date(userData.trial_ends_at).toLocaleString()}`);
    console.log(`Subscription Ends: ${userData.subscription_ends_at || 'N/A'}`);
    console.log(`Created:           ${new Date(userData.created_at).toLocaleString()}`);
    console.log('='.repeat(60) + '\n');

    // Fetch settings
    const { data: settingsData, error: settingsError } = await supabase
      .from('settings')
      .select('*')
      .eq('user_id', authData.user.id)
      .single();

    if (settingsError) {
      console.log('⚠️  Settings not found');
    } else {
      console.log('⚙️  SETTINGS:');
      console.log('='.repeat(60));
      console.log(`Tone:              ${settingsData.tone}`);
      console.log(`Shop Name:         ${settingsData.shop_name}`);
      console.log(`Greeting:          ${settingsData.greeting_message || 'N/A'}`);
      console.log(`Custom Instructions: ${settingsData.custom_instructions || 'N/A'}`);
      console.log('='.repeat(60) + '\n');
    }

    // Sign out
    await supabase.auth.signOut();
    console.log('✅ User verified successfully!\n');

    return true;
  } catch (error) {
    console.error('❌ Unexpected error:', error.message);
    return false;
  }
}

verifyUser().then(success => {
  process.exit(success ? 0 : 1);
});
