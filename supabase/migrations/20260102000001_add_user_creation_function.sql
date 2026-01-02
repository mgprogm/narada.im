-- Create a function to handle user profile creation that bypasses RLS
-- This is called after successful auth.signUp()

CREATE OR REPLACE FUNCTION public.create_user_profile(
  p_user_id UUID,
  p_email TEXT,
  p_shop_name TEXT,
  p_plan_type TEXT DEFAULT 'free',
  p_trial_days INTEGER DEFAULT 7
)
RETURNS JSON AS $$
DECLARE
  v_trial_ends_at TIMESTAMPTZ;
BEGIN
  -- Calculate trial end date
  v_trial_ends_at := NOW() + (p_trial_days || ' days')::INTERVAL;

  -- Insert user profile (SECURITY DEFINER bypasses RLS)
  INSERT INTO public.users (id, email, shop_name, plan_type, trial_ends_at)
  VALUES (p_user_id, p_email, p_shop_name, p_plan_type, v_trial_ends_at);

  -- Return success
  RETURN json_build_object(
    'success', true,
    'user_id', p_user_id,
    'trial_ends_at', v_trial_ends_at
  );
EXCEPTION
  WHEN OTHERS THEN
    RETURN json_build_object(
      'success', false,
      'error', SQLERRM
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION public.create_user_profile TO authenticated;
