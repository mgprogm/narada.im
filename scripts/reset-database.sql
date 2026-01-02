-- ============================================================================
-- RESET DATABASE - Clear all data from all tables
-- ============================================================================
-- WARNING: This will DELETE ALL DATA from your database
-- This operation is IRREVERSIBLE
-- ============================================================================

-- Disable triggers temporarily to avoid conflicts
SET session_replication_role = 'replica';

-- Delete all conversations
DELETE FROM public.conversations;

-- Delete all faqs
DELETE FROM public.faqs;

-- Delete all settings
DELETE FROM public.settings;

-- Delete all user profiles
-- Note: This will NOT delete auth.users entries
DELETE FROM public.users;

-- Re-enable triggers
SET session_replication_role = 'origin';

-- ============================================================================
-- OPTIONAL: Delete auth.users entries as well
-- ============================================================================
-- Uncomment the lines below if you also want to delete authentication users
-- This requires elevated privileges

-- DELETE FROM auth.users;

-- ============================================================================
-- Verification queries
-- ============================================================================
-- Run these to confirm all data has been cleared:

SELECT 'users' as table_name, COUNT(*) as row_count FROM public.users
UNION ALL
SELECT 'faqs', COUNT(*) FROM public.faqs
UNION ALL
SELECT 'conversations', COUNT(*) FROM public.conversations
UNION ALL
SELECT 'settings', COUNT(*) FROM public.settings
UNION ALL
SELECT 'auth.users', COUNT(*) FROM auth.users;
