/**
 * Chat Dialog Design Tokens and Constants
 * Centralized styling and configuration for the chat interface
 */

// Brand Colors
export const CHAT_COLORS = {
  brand: {
    from: "#34B27B",
    to: "#2a9463",
    gradient: "bg-gradient-to-r from-[#34B27B] to-[#2a9463]",
    gradientAnimated: "bg-gradient-to-r from-[#34B27B] via-[#2a9463] to-[#34B27B]",
  },
  shadow: {
    base: "shadow-lg shadow-[#34B27B]/30",
    hover: "shadow-xl shadow-[#34B27B]/40",
  },
} as const;

// Border Radius
export const CHAT_RADIUS = {
  container: {
    mobile: "rounded-none",
    desktop: "md:rounded-2xl",
  },
  header: "rounded-t-none md:rounded-t-2xl",
  footer: "rounded-b-none md:rounded-b-2xl",
  button: "!rounded-xl",
  input: "rounded-xl",
  message: "rounded-2xl",
  messageTail: {
    bot: "rounded-bl-md",
    user: "rounded-br-md",
  },
  circle: "!rounded-full",
} as const;

// Z-Index Layers
export const CHAT_Z_INDEX = {
  overlay: "z-[9998]",
  dialog: "z-[9999]",
  button: "z-[9999]",
} as const;

// Dialog Dimensions
export const CHAT_DIMENSIONS = {
  mobile: {
    trigger: "w-14 h-14",
    triggerPosition: "fixed bottom-5 right-5",
  },
  desktop: {
    trigger: "md:w-16 md:h-16",
    triggerPosition: "md:bottom-8 md:right-8",
    dialog: "md:w-[400px] md:h-[600px]",
    dialogPosition: "md:bottom-8 md:right-8",
  },
} as const;

// Animation Classes
export const CHAT_ANIMATIONS = {
  gradient: "animate-gradient bg-[length:200%_100%]",
  bounce: "animate-bounce",
  fadeIn: "animate-in fade-in slide-in-from-bottom-2 duration-300",
  scaleHover: "hover:scale-110 active:scale-95 transition-all duration-200",
  buttonHover: "hover:scale-[1.02] hover:shadow-md transition-all duration-200",
} as const;

// Message Configuration
export const MESSAGE_CONFIG = {
  maxWidth: {
    mobile: "max-w-[80%]",
    desktop: "md:max-w-[85%]",
  },
  spacing: "mb-3",
} as const;

// Input Configuration
export const INPUT_CONFIG = {
  maxHeight: 72, // pixels
  placeholder: "พิมพ์คำถามของคุณ...",
} as const;

// Quick Replies
export const QUICK_REPLIES = [
  { id: 1, text: "สินค้ามีสต็อกไหมคะ?" },
  { id: 2, text: "จัดส่งใช้เวลากี่วัน?" },
  { id: 3, text: "ราคาเท่าไหร่คะ?" },
  { id: 4, text: "มีโปรโมชั่นอะไรบ้าง?" },
] as const;

// Greeting Message
export const GREETING_MESSAGE = {
  id: "greeting",
  role: "bot" as const,
  content:
    "สวัสดีค่ะ! ยินดีต้อนรับสู่ Narada 👋\n\nฉันเป็น AI ที่ช่วยตอบคำถามลูกค้าอัตโนมัติ ลองถามคำถามด้านล่างเพื่อดูการทำงานกันเลย!",
  timestamp: new Date(),
};
