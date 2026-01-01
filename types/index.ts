export type { Database } from "./database";

// Re-export common types for convenience
export type Profile = Database["public"]["Tables"]["profiles"]["Row"];
export type FAQ = Database["public"]["Tables"]["faqs"]["Row"];
export type Conversation = Database["public"]["Tables"]["conversations"]["Row"];
export type Settings = Database["public"]["Tables"]["settings"]["Row"];

export type ToneType = "polite" | "friendly" | "professional" | "vendor";
export type PlanType = "free" | "starter" | "pro";
