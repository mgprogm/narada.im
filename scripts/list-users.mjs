import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';

// Read environment variables from .env.local
const envContent = readFileSync('../.env.local', 'utf8');
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
  console.error('Missing Supabase credentials in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function listUsers() {
  console.log('Fetching users from database...\n');
  console.log('⚠️  Note: RLS policies may restrict anonymous access\n');

  const { data: users, error } = await supabase
    .from('users')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching users:', error.message);
    console.log('\n💡 This is likely due to Row Level Security (RLS) policies.');
    console.log('   RLS only allows authenticated users to view their own profile.');
    console.log('   To view all users, you need a service_role key or disable RLS.\n');
    return;
  }

  if (!users || users.length === 0) {
    console.log('No users found in the database.');
    return;
  }

  console.log(`Found ${users.length} user(s):\n`);
  console.log('='.repeat(100));

  users.forEach((user, index) => {
    console.log(`\n${index + 1}. User ID: ${user.id}`);
    console.log(`   Email: ${user.email}`);
    console.log(`   Shop Name: ${user.shop_name}`);
    console.log(`   Plan: ${user.plan_type}`);
    console.log(`   Trial Ends: ${user.trial_ends_at || 'N/A'}`);
    console.log(`   Subscription Ends: ${user.subscription_ends_at || 'N/A'}`);
    console.log(`   Created: ${new Date(user.created_at).toLocaleString()}`);
    console.log(`   Updated: ${new Date(user.updated_at).toLocaleString()}`);
  });

  console.log('\n' + '='.repeat(100));
}

listUsers().catch(console.error);
