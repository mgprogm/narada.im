import { z } from "zod";

// Auth validations
export const loginSchema = z.object({
  email: z.string().email("กรุณากรอกอีเมลที่ถูกต้อง"),
  password: z.string().min(6, "รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร"),
});

export const registerSchema = z
  .object({
    email: z.string().email("กรุณากรอกอีเมลที่ถูกต้อง"),
    password: z.string().min(6, "รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร"),
    confirmPassword: z.string(),
    shopName: z.string().min(2, "กรุณากรอกชื่อร้านค้า"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "รหัสผ่านไม่ตรงกัน",
    path: ["confirmPassword"],
  });

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;

// FAQ validations
export const faqSchema = z.object({
  category: z.string().min(1, "กรุณาเลือกหมวดหมู่"),
  question: z.string().min(5, "คำถามต้องมีอย่างน้อย 5 ตัวอักษร"),
  answer: z.string().min(10, "คำตอบต้องมีอย่างน้อย 10 ตัวอักษร"),
  is_active: z.boolean().default(true),
});

export type FAQInput = z.infer<typeof faqSchema>;

// Settings validations
export const settingsSchema = z.object({
  tone: z.enum(["polite", "friendly", "professional", "vendor"], {
    required_error: "กรุณาเลือก tone",
  }),
  shop_name: z.string().min(2, "ชื่อร้านต้องมีอย่างน้อย 2 ตัวอักษร"),
  greeting_message: z.string().max(200, "ข้อความทักทายต้องไม่เกิน 200 ตัวอักษร").optional(),
  custom_instructions: z.string().max(500, "คำแนะนำเพิ่มเติมต้องไม่เกิน 500 ตัวอักษร").optional(),
});

export type SettingsInput = z.infer<typeof settingsSchema>;

// AI Generator validations
export const generateAnswerSchema = z.object({
  question: z.string().min(3, "คำถามต้องมีอย่างน้อย 3 ตัวอักษร"),
});

export type GenerateAnswerInput = z.infer<typeof generateAnswerSchema>;

// Profile update validations
export const profileUpdateSchema = z.object({
  shop_name: z.string().min(2, "ชื่อร้านต้องมีอย่างน้อย 2 ตัวอักษร"),
});

export type ProfileUpdateInput = z.infer<typeof profileUpdateSchema>;
