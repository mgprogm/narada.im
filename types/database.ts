export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          shop_name: string | null;
          plan_type: "free" | "starter" | "pro";
          trial_ends_at: string | null;
          subscription_ends_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          shop_name?: string | null;
          plan_type?: "free" | "starter" | "pro";
          trial_ends_at?: string | null;
          subscription_ends_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          shop_name?: string | null;
          plan_type?: "free" | "starter" | "pro";
          trial_ends_at?: string | null;
          subscription_ends_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      faqs: {
        Row: {
          id: string;
          user_id: string;
          category: string;
          question: string;
          answer: string;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          category: string;
          question: string;
          answer: string;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          category?: string;
          question?: string;
          answer?: string;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      conversations: {
        Row: {
          id: string;
          user_id: string;
          customer_question: string;
          ai_answer: string;
          was_copied: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          customer_question: string;
          ai_answer: string;
          was_copied?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          customer_question?: string;
          ai_answer?: string;
          was_copied?: boolean;
          created_at?: string;
        };
      };
      settings: {
        Row: {
          id: string;
          user_id: string;
          tone: "polite" | "friendly" | "professional" | "vendor";
          shop_name: string | null;
          greeting_message: string | null;
          custom_instructions: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          tone?: "polite" | "friendly" | "professional" | "vendor";
          shop_name?: string | null;
          greeting_message?: string | null;
          custom_instructions?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          tone?: "polite" | "friendly" | "professional" | "vendor";
          shop_name?: string | null;
          greeting_message?: string | null;
          custom_instructions?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
}
