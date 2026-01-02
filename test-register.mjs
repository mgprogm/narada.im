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

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Test user data - you can modify these
const TEST_EMAIL = process.argv[2] || `test${Date.now()}@example.com`;
const TEST_PASSWORD = process.argv[3] || 'Password123!';
const TEST_SHOP_NAME = process.argv[4] || 'ร้านทดสอบ Test Shop';

console.log('🧪 Testing User Registration\n');
console.log('='.repeat(60));
console.log(`Email: ${TEST_EMAIL}`);
console.log(`Password: ${TEST_PASSWORD}`);
console.log(`Shop Name: ${TEST_SHOP_NAME}`);
console.log('='.repeat(60) + '\n');

async function testRegister() {
  try {
    // Step 1: Sign up with Supabase Auth
    console.log('📝 Step 1: Creating auth user...');
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
      email: TEST_EMAIL,
      password: TEST_PASSWORD,
      options: {
        data: {
          shop_name: TEST_SHOP_NAME,
        },
      },
    });

    if (signUpError) {
      console.error('❌ Signup error:', signUpError.message);
      return false;
    }

    if (!signUpData.user) {
      console.error('❌ No user returned from signup');
      return false;
    }

    console.log('✅ Auth user created successfully');
    console.log(`   User ID: ${signUpData.user.id}`);
    console.log(`   Email: ${signUpData.user.email}\n`);

    // Step 2: Set session for authenticated operations
    if (signUpData.session) {
      await supabase.auth.setSession({
        access_token: signUpData.session.access_token,
        refresh_token: signUpData.session.refresh_token,
      });
      console.log('✅ Session established\n');
    }

    // Step 3: Create user profile using database function
    console.log('📝 Step 2: Creating user profile...');
    const { data: profileData, error: profileError } = await supabase.rpc(
      'create_user_profile',
      {
        p_user_id: signUpData.user.id,
        p_email: TEST_EMAIL,
        p_shop_name: TEST_SHOP_NAME,
        p_plan_type: 'free',
        p_trial_days: 7,
      }
    );

    if (profileError) {
      console.error('❌ Profile creation error:', profileError.message);
      console.log('\n⚠️  Auth user created but profile failed. You may need to clean up manually.');
      return false;
    }

    if (!profileData.success) {
      console.error('❌ Profile creation failed:', profileData.error);
      return false;
    }

    console.log('✅ User profile created successfully');
    console.log(`   Trial ends: ${new Date(profileData.trial_ends_at).toLocaleString()}\n`);

    // Step 4: Wait a moment for trigger to execute
    console.log('⏳ Waiting for settings trigger...');
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Step 5: Verify settings were auto-created
    const { data: settingsData, error: settingsError } = await supabase
      .from('settings')
      .select('*')
      .eq('user_id', signUpData.user.id)
      .single();

    if (settingsError) {
      console.error('❌ Settings not found:', settingsError.message);
      console.log('   (Settings trigger may have failed)\n');
    } else {
      console.log('✅ Settings auto-created by trigger');
      console.log(`   Tone: ${settingsData.tone}`);
      console.log(`   Shop name: ${settingsData.shop_name}\n`);
    }

    // Step 6: Fetch complete user data
    console.log('📊 Final verification...');
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('id', signUpData.user.id)
      .single();

    if (userError) {
      console.error('❌ Failed to fetch user data:', userError.message);
      return false;
    }

    console.log('✅ User data verified\n');
    console.log('='.repeat(60));
    console.log('📋 COMPLETE USER PROFILE:');
    console.log('='.repeat(60));
    console.log(`ID:                ${userData.id}`);
    console.log(`Email:             ${userData.email}`);
    console.log(`Shop Name:         ${userData.shop_name}`);
    console.log(`Plan Type:         ${userData.plan_type}`);
    console.log(`Trial Ends:        ${new Date(userData.trial_ends_at).toLocaleString()}`);
    console.log(`Subscription Ends: ${userData.subscription_ends_at || 'N/A'}`);
    console.log(`Created:           ${new Date(userData.created_at).toLocaleString()}`);
    console.log(`Updated:           ${new Date(userData.updated_at).toLocaleString()}`);
    console.log('='.repeat(60) + '\n');

    console.log('🎉 Registration test completed successfully!\n');

    // Sign out
    await supabase.auth.signOut();

    return true;
  } catch (error) {
    console.error('❌ Unexpected error:', error.message);
    return false;
  }
}

// Run the test
testRegister().then(success => {
  process.exit(success ? 0 : 1);
});
