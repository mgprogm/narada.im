"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface QuickReplyButtonsProps {
  onQuickReply: (message: string) => void;
  disabled?: boolean;
}

const QUICK_REPLIES = [
  { id: 1, text: "สินค้ามีสต็อกไหมคะ?" },
  { id: 2, text: "จัดส่งใช้เวลากี่วัน?" },
  { id: 3, text: "ราคาเท่าไหร่คะ?" },
  { id: 4, text: "มีโปรโมชั่นอะไรบ้าง?" },
];

export function QuickReplyButtons({ onQuickReply, disabled = false }: QuickReplyButtonsProps) {
  return (
    <div className="px-4 py-2">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {QUICK_REPLIES.map((reply) => (
          <Button
            key={reply.id}
            variant="outline"
            onClick={() => onQuickReply(reply.text)}
            disabled={disabled}
            className={cn(
              "justify-start text-left h-auto py-3 px-4",
              "border-primary/30 hover:border-primary hover:bg-primary/5",
              "transition-all duration-200",
              "hover:scale-[1.02] hover:shadow-md",
              "text-sm"
            )}
          >
            {reply.text}
          </Button>
        ))}
      </div>
    </div>
  );
}
