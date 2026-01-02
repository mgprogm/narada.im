-- Narada Project Database Schema
-- Initial migration for all core tables

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================================
-- USERS TABLE
-- ============================================================================
-- Extends Supabase auth.users with subscription and business information
CREATE TABLE public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  shop_name TEXT NOT NULL,
  plan_type TEXT NOT NULL DEFAULT 'free' CHECK (plan_type IN ('free', 'starter', 'pro')),
  trial_ends_at TIMESTAMPTZ,
  subscription_ends_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Add index for faster lookups
CREATE INDEX idx_users_email ON public.users(email);
CREATE INDEX idx_users_plan_type ON public.users(plan_type);
CREATE INDEX idx_users_subscription_ends_at ON public.users(subscription_ends_at);

-- ============================================================================
-- FAQS TABLE
-- ============================================================================
-- Stores FAQ knowledge base for each user
CREATE TABLE public.faqs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  category TEXT NOT NULL DEFAULT 'ทั่วไป',
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Add indexes for performance
CREATE INDEX idx_faqs_user_id ON public.faqs(user_id);
CREATE INDEX idx_faqs_category ON public.faqs(category);
CREATE INDEX idx_faqs_is_active ON public.faqs(is_active);
CREATE INDEX idx_faqs_user_active ON public.faqs(user_id, is_active);

-- Full text search index for question matching
-- Using 'simple' config which works with Thai and all languages (no stemming)
CREATE INDEX idx_faqs_question_search ON public.faqs USING gin(to_tsvector('simple', question));
CREATE INDEX idx_faqs_answer_search ON public.faqs USING gin(to_tsvector('simple', answer));

-- ============================================================================
-- CONVERSATIONS TABLE
-- ============================================================================
-- Stores conversation history for learning and analytics
CREATE TABLE public.conversations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  customer_question TEXT NOT NULL,
  ai_answer TEXT NOT NULL,
  was_copied BOOLEAN NOT NULL DEFAULT false,
  was_edited BOOLEAN NOT NULL DEFAULT false,
  response_time_ms INTEGER,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Add indexes for analytics and filtering
CREATE INDEX idx_conversations_user_id ON public.conversations(user_id);
CREATE INDEX idx_conversations_created_at ON public.conversations(created_at);
CREATE INDEX idx_conversations_was_copied ON public.conversations(was_copied);
CREATE INDEX idx_conversations_user_date ON public.conversations(user_id, created_at DESC);

-- ============================================================================
-- SETTINGS TABLE
-- ============================================================================
-- Stores bot personality and configuration per user
CREATE TABLE public.settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE UNIQUE,
  tone TEXT NOT NULL DEFAULT 'friendly' CHECK (tone IN ('polite', 'friendly', 'professional', 'vendor')),
  shop_name TEXT NOT NULL,
  greeting_message TEXT,
  custom_instructions TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Add index
CREATE INDEX idx_settings_user_id ON public.settings(user_id);

-- ============================================================================
-- UPDATED_AT TRIGGER FUNCTION
-- ============================================================================
-- Automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply trigger to tables with updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON public.users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_faqs_updated_at BEFORE UPDATE ON public.faqs
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_settings_updated_at BEFORE UPDATE ON public.settings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================

-- Enable RLS on all tables
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;

-- Users table policies
CREATE POLICY "Users can view own profile"
  ON public.users FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON public.users FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.users FOR UPDATE
  USING (auth.uid() = id);

-- FAQs table policies
CREATE POLICY "Users can view own FAQs"
  ON public.faqs FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own FAQs"
  ON public.faqs FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own FAQs"
  ON public.faqs FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own FAQs"
  ON public.faqs FOR DELETE
  USING (auth.uid() = user_id);

-- Conversations table policies
CREATE POLICY "Users can view own conversations"
  ON public.conversations FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own conversations"
  ON public.conversations FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own conversations"
  ON public.conversations FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own conversations"
  ON public.conversations FOR DELETE
  USING (auth.uid() = user_id);

-- Settings table policies
CREATE POLICY "Users can view own settings"
  ON public.settings FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own settings"
  ON public.settings FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own settings"
  ON public.settings FOR UPDATE
  USING (auth.uid() = user_id);

-- ============================================================================
-- HELPER FUNCTIONS
-- ============================================================================

-- Function to check if user has exceeded their plan limits
CREATE OR REPLACE FUNCTION check_usage_limits(
  p_user_id UUID,
  p_date DATE DEFAULT CURRENT_DATE
)
RETURNS JSON AS $$
DECLARE
  v_plan_type TEXT;
  v_daily_count INTEGER;
  v_faq_count INTEGER;
  v_limit INTEGER;
  v_faq_limit INTEGER;
  v_is_within_limits BOOLEAN;
BEGIN
  -- Get user's plan type
  SELECT plan_type INTO v_plan_type
  FROM public.users
  WHERE id = p_user_id;

  -- Count today's conversations
  SELECT COUNT(*) INTO v_daily_count
  FROM public.conversations
  WHERE user_id = p_user_id
    AND DATE(created_at) = p_date;

  -- Count active FAQs
  SELECT COUNT(*) INTO v_faq_count
  FROM public.faqs
  WHERE user_id = p_user_id
    AND is_active = true;

  -- Determine limits based on plan
  CASE v_plan_type
    WHEN 'free' THEN
      v_limit := 20;
      v_faq_limit := 30;
    WHEN 'starter' THEN
      v_limit := 200;
      v_faq_limit := NULL; -- unlimited
    WHEN 'pro' THEN
      v_limit := NULL; -- unlimited
      v_faq_limit := NULL; -- unlimited
  END CASE;

  -- Check if within limits
  v_is_within_limits := (
    (v_limit IS NULL OR v_daily_count < v_limit) AND
    (v_faq_limit IS NULL OR v_faq_count < v_faq_limit)
  );

  RETURN json_build_object(
    'plan_type', v_plan_type,
    'daily_count', v_daily_count,
    'daily_limit', v_limit,
    'faq_count', v_faq_count,
    'faq_limit', v_faq_limit,
    'is_within_limits', v_is_within_limits
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to check if subscription is active
CREATE OR REPLACE FUNCTION is_subscription_active(p_user_id UUID)
RETURNS BOOLEAN AS $$
DECLARE
  v_plan_type TEXT;
  v_trial_ends_at TIMESTAMPTZ;
  v_subscription_ends_at TIMESTAMPTZ;
BEGIN
  SELECT plan_type, trial_ends_at, subscription_ends_at
  INTO v_plan_type, v_trial_ends_at, v_subscription_ends_at
  FROM public.users
  WHERE id = p_user_id;

  -- Free trial: check if trial period is still valid
  IF v_plan_type = 'free' THEN
    RETURN v_trial_ends_at IS NOT NULL AND v_trial_ends_at > NOW();
  END IF;

  -- Paid plans: check if subscription is still valid
  RETURN v_subscription_ends_at IS NOT NULL AND v_subscription_ends_at > NOW();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to initialize user settings after signup
CREATE OR REPLACE FUNCTION initialize_user_settings()
RETURNS TRIGGER AS $$
BEGIN
  -- Create default settings for new user
  INSERT INTO public.settings (user_id, shop_name, tone)
  VALUES (NEW.id, NEW.shop_name, 'friendly');

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to auto-create settings when user is created
CREATE TRIGGER on_user_created
  AFTER INSERT ON public.users
  FOR EACH ROW
  EXECUTE FUNCTION initialize_user_settings();

-- Function to get trending unmatched questions (for FAQ learning)
CREATE OR REPLACE FUNCTION get_trending_questions(
  p_user_id UUID,
  p_days INTEGER DEFAULT 7,
  p_limit INTEGER DEFAULT 10
)
RETURNS TABLE (
  question TEXT,
  count BIGINT,
  latest_date TIMESTAMPTZ
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    c.customer_question,
    COUNT(*) as count,
    MAX(c.created_at) as latest_date
  FROM public.conversations c
  WHERE c.user_id = p_user_id
    AND c.created_at >= NOW() - (p_days || ' days')::INTERVAL
  GROUP BY c.customer_question
  ORDER BY count DESC, latest_date DESC
  LIMIT p_limit;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================================================
-- INITIAL DATA / SEED DATA
-- ============================================================================

-- You can add sample FAQs or default data here if needed
-- Example:
-- INSERT INTO public.faqs (user_id, category, question, answer) VALUES (...);

-- ============================================================================
-- GRANTS
-- ============================================================================

-- Grant access to authenticated users
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO authenticated;
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA public TO authenticated;
