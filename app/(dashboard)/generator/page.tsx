"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Copy, Edit, Sparkles, Check } from "lucide-react";

export default function GeneratorPage() {
  const [customerQuestion, setCustomerQuestion] = useState("");
  const [aiAnswer, setAiAnswer] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedAnswer, setEditedAnswer] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const [faqCount, setFaqCount] = useState(0);
  const [settings, setSettings] = useState<any>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) return;

      // Load FAQ count
      const { count } = await supabase
        .from("faqs")
        .select("*", { count: "exact", head: true })
        .eq("user_id", user.id)
        .eq("is_active", true);

      setFaqCount(count || 0);

      // Load settings
      const { data: settingsData } = await supabase
        .from("settings")
        .select("*")
        .eq("user_id", user.id)
        .single();

      setSettings(settingsData);
    } catch (err) {
      console.error("Error loading data:", err);
    }
  };

  const handleGenerate = async () => {
    if (!customerQuestion.trim()) return;

    setIsGenerating(true);
    setAiAnswer("");
    setIsEditing(false);

    try {
      const response = await fetch("/api/ai/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: customerQuestion,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate answer");
      }

      const data = await response.json();
      setAiAnswer(data.answer);
      setEditedAnswer(data.answer);
    } catch (err) {
      console.error("Error generating answer:", err);
      setAiAnswer("เกิดข้อผิดพลาดในการสร้างคำตอบ กรุณาลองใหม่อีกครั้ง");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = async () => {
    const textToCopy = isEditing ? editedAnswer : aiAnswer;

    try {
      await navigator.clipboard.writeText(textToCopy);
      setIsCopied(true);

      // Save to conversation history
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        await supabase.from("conversations").insert({
          user_id: user.id,
          customer_question: customerQuestion,
          ai_answer: textToCopy,
          was_copied: true,
        });
      }

      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Error copying:", err);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditedAnswer(aiAnswer);
  };

  const handleSaveEdit = () => {
    setAiAnswer(editedAnswer);
    setIsEditing(false);
  };

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">ตอบคำถาม</h1>
        <p className="text-slate-500 mt-1">ให้ AI ช่วยสร้างคำตอบจากฐานความรู้ของคุณ</p>
      </div>

      {faqCount === 0 && (
        <Card className="border-amber-200 bg-amber-50">
          <CardContent className="pt-6">
            <p className="text-amber-800">
              ⚠️ คุณยังไม่มี FAQ ในระบบ กรุณาเพิ่ม FAQ อย่างน้อย 5-10 รายการ เพื่อให้ AI สามารถสร้างคำตอบได้ดีขึ้น
            </p>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-blue-600" />
              คำถามจากลูกค้า
            </CardTitle>
            <CardDescription>พิมพ์คำถามที่ลูกค้าถาม</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              value={customerQuestion}
              onChange={(e) => setCustomerQuestion(e.target.value)}
              placeholder="เช่น สินค้ามีสต็อกไหมคะ? จัดส่งนานไหม?"
              rows={8}
              className="resize-none"
            />
            <Button
              onClick={handleGenerate}
              disabled={isGenerating || !customerQuestion.trim() || faqCount === 0}
              className="w-full"
            >
              {isGenerating ? "กำลังสร้างคำตอบ..." : "สร้างคำตอบ"}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>คำตอบจาก AI</span>
              {settings && (
                <Badge variant="outline">
                  {settings.tone === "polite" && "สุภาพ"}
                  {settings.tone === "friendly" && "เป็นกันเอง"}
                  {settings.tone === "professional" && "มืออาชีพ"}
                  {settings.tone === "vendor" && "แบบแม่ค้า"}
                </Badge>
              )}
            </CardTitle>
            <CardDescription>
              {aiAnswer ? "แก้ไขและคัดลอกไปใช้ได้เลย" : "รอการสร้างคำตอบ"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {aiAnswer ? (
              <>
                {isEditing ? (
                  <Textarea
                    value={editedAnswer}
                    onChange={(e) => setEditedAnswer(e.target.value)}
                    rows={8}
                    className="resize-none"
                  />
                ) : (
                  <div className="min-h-[200px] p-4 bg-slate-50 rounded-lg border border-slate-200">
                    <p className="text-slate-700 whitespace-pre-wrap">{aiAnswer}</p>
                  </div>
                )}
                <div className="flex gap-2">
                  {isEditing ? (
                    <>
                      <Button onClick={handleSaveEdit} className="flex-1">
                        <Check className="w-4 h-4 mr-2" />
                        บันทึก
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setIsEditing(false)}
                        className="flex-1"
                      >
                        ยกเลิก
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button onClick={handleCopy} className="flex-1">
                        {isCopied ? (
                          <>
                            <Check className="w-4 h-4 mr-2" />
                            คัดลอกแล้ว!
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4 mr-2" />
                            คัดลอกคำตอบ
                          </>
                        )}
                      </Button>
                      <Button variant="outline" onClick={handleEdit}>
                        <Edit className="w-4 h-4 mr-2" />
                        แก้ไข
                      </Button>
                    </>
                  )}
                </div>
              </>
            ) : (
              <div className="min-h-[200px] flex items-center justify-center bg-slate-50 rounded-lg border border-slate-200">
                <p className="text-slate-400">พิมพ์คำถามและกดสร้างคำตอบ</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Tips สำหรับการใช้งาน</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-slate-600">
          <p>• ยิ่งมี FAQ มาก คำตอบจะยิ่งแม่นยำ (แนะนำอย่างน้อย 10 รายการ)</p>
          <p>• ปรับ FAQ count: {faqCount} รายการ</p>
          <p>• สามารถแก้ไขคำตอบก่อนคัดลอกได้</p>
          <p>• คำตอบจะถูกบันทึกไว้ในประวัติเมื่อคัดลอก</p>
          <p>• ปรับน้ำเสียงได้ที่หน้าตั้งค่า</p>
        </CardContent>
      </Card>
    </div>
  );
}
