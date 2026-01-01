import { create } from "zustand";
import type { User } from "@supabase/supabase-js";

interface Profile {
  id: string;
  shop_name: string | null;
  plan_type: "free" | "starter" | "pro";
  trial_ends_at: string | null;
  subscription_ends_at: string | null;
  created_at: string;
  updated_at: string;
}

interface Settings {
  id: string;
  user_id: string;
  tone: "polite" | "friendly" | "professional" | "vendor";
  shop_name: string | null;
  greeting_message: string | null;
  custom_instructions: string | null;
  created_at: string;
  updated_at: string;
}

interface UserStore {
  // State
  user: User | null;
  profile: Profile | null;
  settings: Settings | null;
  isLoading: boolean;

  // Actions
  setUser: (user: User | null) => void;
  setProfile: (profile: Profile | null) => void;
  setSettings: (settings: Settings | null) => void;
  setLoading: (isLoading: boolean) => void;
  reset: () => void;

  // Computed
  isPro: () => boolean;
  isTrialActive: () => boolean;
  isSubscriptionActive: () => boolean;
}

export const useUserStore = create<UserStore>((set, get) => ({
  // Initial state
  user: null,
  profile: null,
  settings: null,
  isLoading: true,

  // Actions
  setUser: (user) => set({ user }),
  setProfile: (profile) => set({ profile }),
  setSettings: (settings) => set({ settings }),
  setLoading: (isLoading) => set({ isLoading }),
  reset: () =>
    set({
      user: null,
      profile: null,
      settings: null,
      isLoading: false,
    }),

  // Computed properties
  isPro: () => {
    const { profile } = get();
    return profile?.plan_type === "pro";
  },

  isTrialActive: () => {
    const { profile } = get();
    if (!profile?.trial_ends_at) return false;
    return new Date(profile.trial_ends_at) > new Date();
  },

  isSubscriptionActive: () => {
    const { profile } = get();
    if (!profile?.subscription_ends_at) return false;
    return new Date(profile.subscription_ends_at) > new Date();
  },
}));
