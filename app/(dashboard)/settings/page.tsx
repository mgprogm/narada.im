"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { ToneType } from "@/types";

export default function SettingsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const [tone, setTone] = useState<ToneType>("friendly");
  const [shopName, setShopName] = useState("");
  const [greetingMessage, setGreetingMessage] = useState("");
  const [customInstructions, setCustomInstructions] = useState("");

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    setIsLoading(true);
    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) return;

      const { data, error } = await supabase
        .from("settings")
        .select("*")
        .eq("user_id", user.id)
        .single();

      if (error) {
        console.error("Error loading settings:", error);
        return;
      }

      if (data) {
        setTone(data.tone as ToneType);
        setShopName(data.shop_name || "");
        setGreetingMessage(data.greeting_message || "");
        setCustomInstructions(data.custom_instructions || "");
      }
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    setMessage(null);

    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        setMessage({ type: "error", text: "ไม่พบข้อมูลผู้ใช้" });
        return;
      }

      const { error } = await supabase
        .from("settings")
        .upsert({
          user_id: user.id,
          tone,
          shop_name: shopName,
          greeting_message: greetingMessage,
          custom_instructions: customInstructions,
          updated_at: new Date().toISOString(),
        });

      if (error) {
        setMessage({ type: "error", text: "เกิดข้อผิดพลาดในการบันทึก" });
        return;
      }

      setMessage({ type: "success", text: "บันทึกการตั้งค่าเรียบร้อยแล้ว" });
    } catch (err) {
      setMessage({ type: "error", text: "เกิดข้อผิดพลาดในการบันทึก" });
    } finally {
      setIsSaving(false);
    }
  };

  const toneOptions = [
    { value: "polite", label: "สุภาพ", description: "เหมาะกับธุรกิจที่ต้องการความเป็นทางการ" },
    { value: "friendly", label: "เป็นกันเอง", description: "เหมาะกับร้านค้าทั่วไป" },
    { value: "professional", label: "มืออาชีพ", description: "เหมาะกับธุรกิจบริการ คลินิก" },
    { value: "vendor", label: "แบบแม่ค้า", description: "พูดจาสนุกสนาน เหมือนแม่ค้าตลาด" },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-slate-500">กำลังโหลด...</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">ตั้งค่า</h1>
        <p className="text-slate-500 mt-1">ปรับแต่งบุคลิกและน้ำเสียงของบอท</p>
      </div>

      {message && (
        <div
          className={`p-4 rounded-lg ${
            message.type === "success"
              ? "bg-green-50 text-green-800 border border-green-200"
              : "bg-red-50 text-red-800 border border-red-200"
          }`}
        >
          {message.text}
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>บุคลิกบอท (Bot Personality)</CardTitle>
          <CardDescription>
            กำหนดน้ำเสียงและรูปแบบการตอบของบอทให้เหมาะกับแบรนด์ของคุณ
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="tone">น้ำเสียง (Tone)</Label>
            <Select value={tone} onValueChange={(value) => setTone(value as ToneType)}>
              <SelectTrigger id="tone">
                <SelectValue placeholder="เลือกน้ำเสียง" />
              </SelectTrigger>
              <SelectContent>
                {toneOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    <div className="flex flex-col">
                      <span className="font-medium">{option.label}</span>
                      <span className="text-xs text-slate-500">{option.description}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="shopName">ชื่อร้าน/ธุรกิจ</Label>
            <Input
              id="shopName"
              value={shopName}
              onChange={(e) => setShopName(e.target.value)}
              placeholder="เช่น ร้านเสื้อผ้า ABC"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="greetingMessage">ข้อความทักทาย</Label>
            <Textarea
              id="greetingMessage"
              value={greetingMessage}
              onChange={(e) => setGreetingMessage(e.target.value)}
              placeholder="เช่น สวัสดีค่ะ ยินดีต้อนรับสู่ร้านของเรา มีอะไรให้ช่วยไหมคะ?"
              rows={3}
              maxLength={200}
            />
            <p className="text-xs text-slate-500">{greetingMessage.length}/200 ตัวอักษร</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="customInstructions">คำสั่งเพิ่มเติม (ถ้ามี)</Label>
            <Textarea
              id="customInstructions"
              value={customInstructions}
              onChange={(e) => setCustomInstructions(e.target.value)}
              placeholder="เช่น อย่าใช้คำว่า 'ครับ/ค่ะ' มากเกินไป หรือ เน้นย้ำโปรโมชั่นพิเศษ"
              rows={4}
              maxLength={500}
            />
            <p className="text-xs text-slate-500">{customInstructions.length}/500 ตัวอักษร</p>
          </div>

          <div className="flex justify-end gap-3">
            <Button onClick={loadSettings} variant="outline" disabled={isSaving}>
              รีเซ็ต
            </Button>
            <Button onClick={handleSave} disabled={isSaving}>
              {isSaving ? "กำลังบันทึก..." : "บันทึกการตั้งค่า"}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>ตัวอย่างน้ำเสียง</CardTitle>
          <CardDescription>ดูตัวอย่างการตอบในแต่ละน้ำเสียง</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-slate-50 rounded-lg">
            <p className="text-sm font-medium text-slate-700 mb-2">สุภาพ:</p>
            <p className="text-sm text-slate-600">
              "สวัสดีครับ/ค่ะ ขอบคุณที่สนใจสินค้าของเรา สินค้านี้มีสต็อกพร้อมส่งครับ/ค่ะ หากต้องการสอบถามเพิ่มเติม ยินดีให้บริการครับ/ค่ะ"
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-lg">
            <p className="text-sm font-medium text-slate-700 mb-2">เป็นกันเอง:</p>
            <p className="text-sm text-slate-600">
              "สวัสดีค่า 😊 ขอบคุณที่สนใจนะคะ สินค้าตัวนี้มีพร้อมส่งเลยค่ะ ถ้ามีอะไรสงสัยถามได้เลยนะคะ"
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-lg">
            <p className="text-sm font-medium text-slate-700 mb-2">มืออาชีพ:</p>
            <p className="text-sm text-slate-600">
              "สวัสดีครับ ทางเรามีสินค้าที่ท่านสอบถามในสต็อกพร้อมจัดส่ง สามารถสั่งซื้อได้ทันทีครับ หากต้องการข้อมูลเพิ่มเติม สามารถติดต่อได้ตลอดเวลาครับ"
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-lg">
            <p className="text-sm font-medium text-slate-700 mb-2">แบบแม่ค้า:</p>
            <p className="text-sm text-slate-600">
              "สวัสดีจ้า! ของมีนะจ๊ะ พร้อมส่งเลยค่ะ 😄 อยากได้ตัวไหนบอกได้เลยจ้า ราคาดีแน่นอน!"
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
