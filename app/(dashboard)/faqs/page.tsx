"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Pencil, Trash2 } from "lucide-react";
import type { FAQ } from "@/types";

export default function FAQsPage() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingFAQ, setEditingFAQ] = useState<FAQ | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const [category, setCategory] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  useEffect(() => {
    loadFAQs();
  }, []);

  const loadFAQs = async () => {
    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) return;

      const { data, error } = await supabase
        .from("faqs")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error loading FAQs:", error);
        return;
      }

      setFaqs(data || []);
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAdd = () => {
    setEditingFAQ(null);
    setCategory("");
    setQuestion("");
    setAnswer("");
    setIsDialogOpen(true);
  };

  const handleEdit = (faq: FAQ) => {
    setEditingFAQ(faq);
    setCategory(faq.category);
    setQuestion(faq.question);
    setAnswer(faq.answer);
    setIsDialogOpen(true);
  };

  const handleSave = async () => {
    setIsSaving(true);

    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) return;

      if (editingFAQ) {
        // Update existing FAQ
        const { error } = await supabase
          .from("faqs")
          .update({
            category,
            question,
            answer,
            updated_at: new Date().toISOString(),
          })
          .eq("id", editingFAQ.id);

        if (error) {
          console.error("Error updating FAQ:", error);
          return;
        }
      } else {
        // Create new FAQ
        const { error } = await supabase
          .from("faqs")
          .insert({
            user_id: user.id,
            category,
            question,
            answer,
            is_active: true,
          });

        if (error) {
          console.error("Error creating FAQ:", error);
          return;
        }
      }

      setIsDialogOpen(false);
      loadFAQs();
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("คุณต้องการลบ FAQ นี้ใช่หรือไม่?")) return;

    try {
      const supabase = createClient();
      const { error } = await supabase
        .from("faqs")
        .delete()
        .eq("id", id);

      if (error) {
        console.error("Error deleting FAQ:", error);
        return;
      }

      loadFAQs();
    } catch (err) {
      console.error("Error:", err);
    }
  };

  const toggleActive = async (faq: FAQ) => {
    try {
      const supabase = createClient();
      const { error } = await supabase
        .from("faqs")
        .update({ is_active: !faq.is_active })
        .eq("id", faq.id);

      if (error) {
        console.error("Error updating FAQ:", error);
        return;
      }

      loadFAQs();
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">จัดการ FAQ</h1>
          <p className="text-slate-500 mt-1">คำถาม-คำตอบที่ลูกค้าถามบ่อย</p>
        </div>
        <Button onClick={handleAdd}>
          <Plus className="w-4 h-4 mr-2" />
          เพิ่ม FAQ
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>FAQ ทั้งหมด ({faqs.length} รายการ)</CardTitle>
          <CardDescription>
            {faqs.filter(f => f.is_active).length} รายการที่เปิดใช้งาน
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <p className="text-slate-500">กำลังโหลด...</p>
            </div>
          ) : faqs.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12">
              <p className="text-slate-500 mb-4">ยังไม่มี FAQ</p>
              <Button onClick={handleAdd} variant="outline">
                <Plus className="w-4 h-4 mr-2" />
                เพิ่ม FAQ แรก
              </Button>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>หมวดหมู่</TableHead>
                  <TableHead>คำถาม</TableHead>
                  <TableHead>คำตอบ</TableHead>
                  <TableHead>สถานะ</TableHead>
                  <TableHead className="text-right">จัดการ</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {faqs.map((faq) => (
                  <TableRow key={faq.id}>
                    <TableCell>
                      <Badge variant="outline">{faq.category}</Badge>
                    </TableCell>
                    <TableCell className="max-w-xs truncate">{faq.question}</TableCell>
                    <TableCell className="max-w-md truncate text-slate-500">
                      {faq.answer}
                    </TableCell>
                    <TableCell>
                      <button
                        onClick={() => toggleActive(faq)}
                        className="text-sm"
                      >
                        {faq.is_active ? (
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
                            เปิดใช้งาน
                          </Badge>
                        ) : (
                          <Badge variant="secondary">ปิดใช้งาน</Badge>
                        )}
                      </button>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(faq)}
                        >
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(faq.id)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editingFAQ ? "แก้ไข FAQ" : "เพิ่ม FAQ ใหม่"}
            </DialogTitle>
            <DialogDescription>
              กรอกคำถามและคำตอบที่ลูกค้าถามบ่อย
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="category">หมวดหมู่</Label>
              <Input
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="เช่น ราคา, การจัดส่ง, สินค้า"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="question">คำถาม</Label>
              <Textarea
                id="question"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="เช่น สินค้ามีสต็อกไหม?"
                rows={2}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="answer">คำตอบ</Label>
              <Textarea
                id="answer"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="เช่น สินค้าทุกรายการมีสต็อกพร้อมส่งค่ะ สามารถสั่งซื้อได้เลยค่ะ"
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              ยกเลิก
            </Button>
            <Button onClick={handleSave} disabled={isSaving || !question || !answer}>
              {isSaving ? "กำลังบันทึก..." : "บันทึก"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
