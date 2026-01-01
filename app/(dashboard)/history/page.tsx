"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Copy, Trash2 } from "lucide-react";
import type { Conversation } from "@/types";

export default function HistoryPage() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    loadConversations();
  }, []);

  const loadConversations = async () => {
    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) return;

      const { data, error } = await supabase
        .from("conversations")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(50);

      if (error) {
        console.error("Error loading conversations:", error);
        return;
      }

      setConversations(data || []);
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async (answer: string, id: string) => {
    try {
      await navigator.clipboard.writeText(answer);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error("Error copying:", err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("คุณต้องการลบประวัติการสนทนานี้ใช่หรือไม่?")) return;

    try {
      const supabase = createClient();
      const { error } = await supabase
        .from("conversations")
        .delete()
        .eq("id", id);

      if (error) {
        console.error("Error deleting conversation:", error);
        return;
      }

      loadConversations();
    } catch (err) {
      console.error("Error:", err);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("th-TH", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">ประวัติการตอบคำถาม</h1>
        <p className="text-slate-500 mt-1">คำถามและคำตอบที่บันทึกไว้</p>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <p className="text-slate-500">กำลังโหลด...</p>
        </div>
      ) : conversations.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <p className="text-slate-500 mb-2">ยังไม่มีประวัติการสนทนา</p>
            <p className="text-sm text-slate-400">ไปที่หน้า "ตอบคำถาม" เพื่อเริ่มใช้งาน</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-600">
              ทั้งหมด {conversations.length} รายการ
            </p>
          </div>

          {conversations.map((conversation) => (
            <Card key={conversation.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg">
                      {conversation.customer_question}
                    </CardTitle>
                    <CardDescription className="mt-1">
                      {formatDate(conversation.created_at)}
                      {conversation.was_copied && (
                        <Badge variant="outline" className="ml-2 text-xs">
                          คัดลอกแล้ว
                        </Badge>
                      )}
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleCopy(conversation.ai_answer, conversation.id)}
                    >
                      {copiedId === conversation.id ? (
                        <>คัดลอกแล้ว</>
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(conversation.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                  <p className="text-sm font-medium text-slate-700 mb-2">คำตอบ:</p>
                  <p className="text-slate-600 whitespace-pre-wrap">
                    {conversation.ai_answer}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
