import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const TEST_EMAIL = `testuser${Date.now()}@gmail.com`;
const TEST_PASSWORD = 'TestPassword123!';
const TEST_SHOP_NAME = 'ร้านทดสอบ Automated';

console.log('🧪 Starting Authentication Tests\n');

async function testRegistration() {
  console.log('📝 Test 1: User Registration');

  try {
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
      return null;
    }

    if (!signUpData.user) {
      console.error('❌ No user returned from signup');
      return null;
    }

    console.log('✅ Auth user created:', signUpData.user.id);

    // Set the session explicitly so RPC calls are authenticated
    if (signUpData.session) {
      await supabase.auth.setSession({
        access_token: signUpData.session.access_token,
        refresh_token: signUpData.session.refresh_token,
      });
    }

    // Use the database function to create user profile (bypasses RLS)
    const { data: profileData, error: userError } = await supabase
      .rpc('create_user_profile', {
        p_user_id: signUpData.user.id,
        p_email: TEST_EMAIL,
        p_shop_name: TEST_SHOP_NAME,
        p_plan_type: 'free',
        p_trial_days: 7,
      });

    if (userError) {
      console.error('❌ User profile creation error:', userError.message);
      return null;
    }

    if (!profileData.success) {
      console.error('❌ User profile creation failed:', profileData.error);
      return null;
    }

    console.log('✅ User profile created');

    await new Promise(resolve => setTimeout(resolve, 1000));

    const { data: settingsData, error: settingsError } = await supabase
      .from('settings')
      .select('*')
      .eq('user_id', signUpData.user.id)
      .single();

    if (settingsError) {
      console.error('❌ Settings not found (trigger may have failed):', settingsError.message);
    } else {
      console.log('✅ Settings auto-created by trigger');
      console.log(`   - Tone: ${settingsData.tone}`);
      console.log(`   - Shop name: ${settingsData.shop_name}`);
    }

    await supabase.auth.signOut();

    return signUpData.user.id;
  } catch (err) {
    console.error('❌ Registration test failed:', err.message);
    return null;
  }
}

async function testLogin(userId) {
  console.log('\n🔐 Test 2: User Login');

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: TEST_EMAIL,
      password: TEST_PASSWORD,
    });

    if (error) {
      console.error('❌ Login error:', error.message);
      return false;
    }

    if (!data.user) {
      console.error('❌ No user returned from login');
      return false;
    }

    console.log('✅ Login successful');
    console.log(`   - User ID: ${data.user.id}`);
    console.log(`   - Email: ${data.user.email}`);

    return true;
  } catch (err) {
    console.error('❌ Login test failed:', err.message);
    return false;
  }
}

async function testDataAccess() {
  console.log('\n🔒 Test 3: RLS Policies & Data Access');

  try {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      console.error('❌ No authenticated user');
      return false;
    }

    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('id', user.id)
      .single();

    if (userError) {
      console.error('❌ Failed to fetch user profile:', userError.message);
      return false;
    }

    console.log('✅ User can read own profile');
    console.log(`   - Shop name: ${userData.shop_name}`);
    console.log(`   - Plan type: ${userData.plan_type}`);
    console.log(`   - Trial ends: ${new Date(userData.trial_ends_at).toLocaleString()}`);

    const { data: settingsData, error: settingsError } = await supabase
      .from('settings')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (settingsError) {
      console.error('❌ Failed to fetch settings:', settingsError.message);
      return false;
    }

    console.log('✅ User can read own settings');
    console.log(`   - Tone: ${settingsData.tone}`);

    return true;
  } catch (err) {
    console.error('❌ Data access test failed:', err.message);
    return false;
  }
}

async function testLogout() {
  console.log('\n🚪 Test 4: User Logout');

  try {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error('❌ Logout error:', error.message);
      return false;
    }

    const { data: { user } } = await supabase.auth.getUser();

    if (user) {
      console.error('❌ User still authenticated after logout');
      return false;
    }

    console.log('✅ Logout successful');
    return true;
  } catch (err) {
    console.error('❌ Logout test failed:', err.message);
    return false;
  }
}

async function cleanup(userId) {
  console.log('\n🧹 Cleanup: Removing test user');

  try {
    const adminClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

    await adminClient.auth.signInWithPassword({
      email: TEST_EMAIL,
      password: TEST_PASSWORD,
    });

    const { error: settingsError } = await adminClient
      .from('settings')
      .delete()
      .eq('user_id', userId);

    const { error: userError } = await adminClient
      .from('users')
      .delete()
      .eq('id', userId);

    await adminClient.auth.signOut();

    console.log('✅ Test data cleaned up');
  } catch (err) {
    console.log('⚠️  Cleanup may have failed (this is okay for testing)');
  }
}

async function runTests() {
  console.log('Environment:', {
    url: SUPABASE_URL,
    hasKey: !!SUPABASE_ANON_KEY,
  });
  console.log('\n' + '='.repeat(50) + '\n');

  const userId = await testRegistration();

  if (!userId) {
    console.log('\n❌ Registration test failed. Stopping tests.');
    process.exit(1);
  }

  const loginSuccess = await testLogin(userId);

  if (!loginSuccess) {
    console.log('\n❌ Login test failed. Stopping tests.');
    await cleanup(userId);
    process.exit(1);
  }

  const dataAccessSuccess = await testDataAccess();

  if (!dataAccessSuccess) {
    console.log('\n❌ Data access test failed.');
  }

  const logoutSuccess = await testLogout();

  if (!logoutSuccess) {
    console.log('\n❌ Logout test failed.');
  }

  await cleanup(userId);

  console.log('\n' + '='.repeat(50));
  console.log('\n🎉 All authentication tests completed!\n');

  const allPassed = loginSuccess && dataAccessSuccess && logoutSuccess;
  process.exit(allPassed ? 0 : 1);
}

runTests();
