import { AzureOpenAI } from "@azure/openai";

// Initialize Azure OpenAI client
const client = new AzureOpenAI({
  endpoint: process.env.AZURE_OPENAI_ENDPOINT,
  apiKey: process.env.AZURE_OPENAI_API_KEY,
  apiVersion: process.env.AZURE_OPENAI_API_VERSION,
  deployment: process.env.AZURE_OPENAI_DEPLOYMENT_NAME,
});

// Tone presets for Thai language responses
export const tonePresets = {
  polite: {
    name: "สุภาพ",
    description: "ใช้คำสุภาพ เป็นทางการ เหมาะกับธุรกิจระดับ premium",
    systemPrompt:
      "คุณเป็นผู้ช่วยลูกค้าที่มีความสุภาพมาก ใช้ภาษาไทยที่สุภาพเป็นทางการ ใช้คำว่า 'คะ/ครับ' ทุกประโยค และเรียกลูกค้าว่า 'คุณลูกค้า'",
  },
  friendly: {
    name: "เป็นกันเอง",
    description: "พูดจาเป็นกันเอง อบอุ่น ใกล้ชิด",
    systemPrompt:
      "คุณเป็นผู้ช่วยลูกค้าที่เป็นกันเอง อบอุ่น พูดจาเหมือนเพื่อน แต่ยังคงความเป็นมืออาชีพ ใช้ภาษาไทยที่เข้าใจง่าย",
  },
  professional: {
    name: "มืออาชีพ",
    description: "กระชับ ตรงประเด็น มีประสิทธิภาพ",
    systemPrompt:
      "คุณเป็นผู้ช่วยลูกค้าที่มืออาชีพ ตอบคำถามตรงประเด็น กระชับ ชัดเจน ไม่พูดเยิ่นเย้อ ใช้ภาษาไทยที่เป็นมาตรฐาน",
  },
  vendor: {
    name: "แบบแม่ค้า",
    description: "สนิทสนม ดูแล เหมือนแม่ค้าตลาด",
    systemPrompt:
      "คุณเป็นผู้ช่วยลูกค้าที่พูดจาเหมือนแม่ค้าที่น่ารัก สนิทสนม เป็นกันเองมาก ดูแลลูกค้าเหมือนญาติ อาจใช้คำว่า 'ค่ะ/ครับ' หรือ 'จ้า/จ๊ะ' ตามความเหมาะสม",
  },
};

export type ToneType = keyof typeof tonePresets;

interface GenerateResponseOptions {
  customerQuestion: string;
  faqs: Array<{ question: string; answer: string; category?: string }>;
  tone: ToneType;
  shopName?: string;
  customInstructions?: string;
}

/**
 * Generate AI response for customer question based on FAQs and tone
 */
export async function generateResponse({
  customerQuestion,
  faqs,
  tone,
  shopName = "ร้านค้า",
  customInstructions = "",
}: GenerateResponseOptions): Promise<string> {
  const tonePreset = tonePresets[tone];

  // Build FAQ context
  const faqContext = faqs
    .map(
      (faq, index) =>
        `${index + 1}. คำถาม: ${faq.question}\n   คำตอบ: ${faq.answer}\n   หมวดหมู่: ${faq.category || "ทั่วไป"}`
    )
    .join("\n\n");

  // Build system prompt
  const systemPrompt = `${tonePreset.systemPrompt}

คุณทำงานให้กับ "${shopName}" และมีหน้าที่ตอบคำถามลูกค้าโดยอิงจากฐานความรู้ FAQ ด้านล่าง

ฐานความรู้ FAQ:
${faqContext}

${customInstructions ? `คำแนะนำเพิ่มเติม: ${customInstructions}\n` : ""}

หลักการตอบคำถาม:
1. อ้างอิงข้อมูลจาก FAQ เท่านั้น อย่าแต่งข้อมูลเอง
2. ถ้าไม่มีข้อมูลใน FAQ ให้บอกว่า "ขออภัยค่ะ/ครับ ยังไม่มีข้อมูลส่วนนี้ รบกวนสอบถามเพิ่มเติมได้ที่ [ช่องทางติดต่อ]"
3. ตอบเป็นภาษาไทยที่เข้าใจง่าย ไม่ยาวเกินไป
4. ใช้ tone ตามที่กำหนด: ${tonePreset.name}
5. ถ้าคำถามคล้ายกับหลาย FAQ ให้ตอบครอบคลุมทุกมุม`;

  try {
    const response = await client.chat.completions.create({
      model: process.env.AZURE_OPENAI_DEPLOYMENT_NAME!,
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: customerQuestion,
        },
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    return response.choices[0]?.message?.content || "ขออภัย ไม่สามารถสร้างคำตอบได้ในขณะนี้";
  } catch (error) {
    console.error("Error generating AI response:", error);
    throw new Error("Failed to generate AI response");
  }
}

/**
 * Test Azure OpenAI connection
 */
export async function testConnection(): Promise<boolean> {
  try {
    const response = await client.chat.completions.create({
      model: process.env.AZURE_OPENAI_DEPLOYMENT_NAME!,
      messages: [
        {
          role: "user",
          content: "สวัสดี",
        },
      ],
      max_tokens: 10,
    });

    return !!response.choices[0]?.message?.content;
  } catch (error) {
    console.error("Azure OpenAI connection test failed:", error);
    return false;
  }
}
