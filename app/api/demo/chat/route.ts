import { NextRequest, NextResponse } from "next/server";
import { generateResponse } from "@/lib/ai/azure-openai";

// Demo FAQs for public chatbot demonstration
const DEMO_FAQS = [
  {
    category: "สินค้า",
    question: "สินค้ามีสต็อกไหม",
    answer: "สินค้าทุกรายการมีสต็อกพร้อมส่งค่ะ สามารถสั่งซื้อได้เลยค่ะ"
  },
  {
    category: "การจัดส่ง",
    question: "จัดส่งใช้เวลากี่วัน",
    answer: "จัดส่งภายใน 2-3 วันทำการค่ะ ในกรุงเทพและปริมณฑล 1-2 วันค่ะ"
  },
  {
    category: "ราคา",
    question: "ราคาสินค้า",
    answer: "ราคาเริ่มต้น 299 บาทค่ะ สำหรับสมาชิกลด 10% ค่ะ"
  },
  {
    category: "โปรโมชั่น",
    question: "มีโปรโมชั่นอะไร",
    answer: "ตอนนี้มีโปรโมชั่นซื้อ 2 แถม 1 และฟรีค่าจัดส่งเมื่อซื้อครบ 500 บาทค่ะ"
  }
];

// Simple in-memory rate limiting (10 requests per minute per IP)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const limit = rateLimitMap.get(ip);

  if (!limit || now > limit.resetTime) {
    // Reset or create new limit
    rateLimitMap.set(ip, { count: 1, resetTime: now + 60000 }); // 60 seconds
    return true;
  }

  if (limit.count >= 10) {
    return false;
  }

  limit.count++;
  return true;
}

export async function POST(req: NextRequest) {
  try {
    // Get client IP for rate limiting
    const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown";

    // Check rate limit
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "กรุณารอสักครู่ก่อนส่งคำถามใหม่ค่ะ" },
        { status: 429 }
      );
    }

    // Parse request body
    const body = await req.json();
    const { question } = body;

    // Validate input
    if (!question || typeof question !== "string" || question.trim() === "") {
      return NextResponse.json(
        { error: "กรุณาใส่คำถามค่ะ" },
        { status: 400 }
      );
    }

    // Sanitize input (strip HTML tags)
    const sanitizedQuestion = question.replace(/<[^>]*>/g, "").trim();

    // Build FAQ context string
    const faqContext = DEMO_FAQS.map(
      (faq) => `หมวดหมู่: ${faq.category}\nคำถาม: ${faq.question}\nคำตอบ: ${faq.answer}`
    ).join("\n\n");

    // Generate AI response using existing infrastructure
    const answer = await generateResponse(
      sanitizedQuestion,
      faqContext,
      "friendly", // Always use friendly tone for demo
      "Demo Shop", // Demo shop name
      "คุณกำลังแสดงตัวอย่างการทำงานของระบบ Narada ให้กับผู้มาเยือนเว็บไซต์ กรุณาตอบอย่างเป็นมิตรและน่าสนใจ เพื่อแสดงความสามารถของระบบ"
    );

    // Return response
    return NextResponse.json({
      answer,
      tone: "friendly"
    });

  } catch (error) {
    console.error("Demo chat API error:", error);

    return NextResponse.json(
      { error: "เกิดข้อผิดพลาดในการตอบกลับค่ะ กรุณาลองใหม่อีกครั้งค่ะ" },
      { status: 500 }
    );
  }
}
