"use client";

import { memo, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { QUICK_REPLIES, CHAT_RADIUS, CHAT_ANIMATIONS } from "./chat-constants";

interface QuickReplyButtonsProps {
  onQuickReply: (message: string) => void;
  disabled?: boolean;
}

export const QuickReplyButtons = memo(function QuickReplyButtons({
  onQuickReply,
  disabled = false,
}: QuickReplyButtonsProps) {
  const handleClick = useCallback(
    (text: string) => () => {
      onQuickReply(text);
    },
    [onQuickReply]
  );

  return (
    <div className="px-4 py-2">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {QUICK_REPLIES.map((reply) => (
          <Button
            key={reply.id}
            variant="outline"
            onClick={handleClick(reply.text)}
            disabled={disabled}
            className={cn(
              "justify-start text-left h-auto py-3 px-4",
              CHAT_RADIUS.button,
              "border-primary/30 hover:border-primary hover:bg-primary/5",
              CHAT_ANIMATIONS.buttonHover,
              "text-sm"
            )}
          >
            {reply.text}
          </Button>
        ))}
      </div>
    </div>
  );
});
