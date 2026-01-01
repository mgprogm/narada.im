import type { Database as DB } from "./database";

export type { Database } from "./database";

// Re-export common types for convenience
export type Profile = DB["public"]["Tables"]["profiles"]["Row"];
export type FAQ = DB["public"]["Tables"]["faqs"]["Row"];
export type Conversation = DB["public"]["Tables"]["conversations"]["Row"];
export type Settings = DB["public"]["Tables"]["settings"]["Row"];

export type ToneType = "polite" | "friendly" | "professional" | "vendor";
export type PlanType = "free" | "starter" | "pro";
