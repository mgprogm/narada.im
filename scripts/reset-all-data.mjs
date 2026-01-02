#!/usr/bin/env node

/**
 * Reset Database Script
 * Clears all data from all tables in the Narada database
 * WARNING: This is irreversible!
 */

import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'

// Load environment variables from .env.local
function loadEnv() {
  try {
    const envFile = readFileSync('../.env.local', 'utf-8')
    const env = {}
    envFile.split('\n').forEach(line => {
      const trimmed = line.trim()
      if (trimmed && !trimmed.startsWith('#')) {
        const [key, ...valueParts] = trimmed.split('=')
        env[key] = valueParts.join('=')
      }
    })
    return env
  } catch (error) {
    console.error('❌ Could not read .env.local file:', error.message)
    return {}
  }
}

const env = loadEnv()
const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials in .env.local')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function resetDatabase() {
  console.log('🚨 WARNING: This will delete ALL data from your database!')
  console.log('⏳ Starting database reset...\n')

  try {
    // Delete conversations
    console.log('🗑️  Deleting conversations...')
    const { error: convError } = await supabase
      .from('conversations')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000') // Delete all

    if (convError) {
      console.error('❌ Error deleting conversations:', convError.message)
    } else {
      console.log('✅ Conversations deleted')
    }

    // Delete FAQs
    console.log('🗑️  Deleting FAQs...')
    const { error: faqError } = await supabase
      .from('faqs')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000') // Delete all

    if (faqError) {
      console.error('❌ Error deleting FAQs:', faqError.message)
    } else {
      console.log('✅ FAQs deleted')
    }

    // Delete settings
    console.log('🗑️  Deleting settings...')
    const { error: settingsError } = await supabase
      .from('settings')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000') // Delete all

    if (settingsError) {
      console.error('❌ Error deleting settings:', settingsError.message)
    } else {
      console.log('✅ Settings deleted')
    }

    // Delete users (this should cascade if foreign keys are set up)
    console.log('🗑️  Deleting users...')
    const { error: usersError } = await supabase
      .from('users')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000') // Delete all

    if (usersError) {
      console.error('❌ Error deleting users:', usersError.message)
    } else {
      console.log('✅ Users deleted')
    }

    // Verify counts
    console.log('\n📊 Verifying database is empty...')

    const tables = ['users', 'faqs', 'conversations', 'settings']

    for (const table of tables) {
      const { count, error } = await supabase
        .from(table)
        .select('*', { count: 'exact', head: true })

      if (error) {
        console.log(`⚠️  ${table}: Could not verify (${error.message})`)
      } else {
        console.log(`   ${table}: ${count} rows`)
      }
    }

    console.log('\n✅ Database reset complete!')
    console.log('⚠️  Note: auth.users entries still exist. To delete authentication users, use Supabase Dashboard.')

  } catch (error) {
    console.error('❌ Fatal error during reset:', error)
    process.exit(1)
  }
}

// Run the reset
resetDatabase()
