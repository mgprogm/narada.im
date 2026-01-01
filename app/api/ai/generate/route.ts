import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { generateResponse } from "@/lib/ai/azure-openai";
import type { ToneType } from "@/types";

export async function POST(request: NextRequest) {
  try {
    const { question } = await request.json();

    if (!question || typeof question !== "string") {
      return NextResponse.json(
        { error: "กรุณาระบุคำถาม" },
        { status: 400 }
      );
    }

    // Get authenticated user
    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: "ไม่พบข้อมูลผู้ใช้" },
        { status: 401 }
      );
    }

    // Load user's settings
    const { data: settings, error: settingsError } = await supabase
      .from("settings")
      .select("*")
      .eq("user_id", user.id)
      .single();

    if (settingsError) {
      return NextResponse.json(
        { error: "ไม่พบการตั้งค่า" },
        { status: 404 }
      );
    }

    // Load user's active FAQs
    const { data: faqs, error: faqsError } = await supabase
      .from("faqs")
      .select("category, question, answer")
      .eq("user_id", user.id)
      .eq("is_active", true);

    if (faqsError) {
      console.error("Error loading FAQs:", faqsError);
    }

    // Build FAQ context
    const faqContext = faqs && faqs.length > 0
      ? faqs
          .map((faq) => `หมวด: ${faq.category}\nQ: ${faq.question}\nA: ${faq.answer}`)
          .join("\n\n")
      : "ไม่มี FAQ ในระบบ";

    // Generate AI response
    const answer = await generateResponse(
      question,
      faqContext,
      settings.tone as ToneType,
      settings.shop_name,
      settings.custom_instructions || ""
    );

    return NextResponse.json({ answer });
  } catch (error) {
    console.error("Error in AI generation:", error);
    return NextResponse.json(
      { error: "เกิดข้อผิดพลาดในการสร้างคำตอบ" },
      { status: 500 }
    );
  }
}
