import { memo } from "react";
import { cn } from "@/lib/utils";
import { CHAT_COLORS, CHAT_RADIUS, MESSAGE_CONFIG, CHAT_ANIMATIONS } from "./chat-constants";

export interface Message {
  id: string;
  role: "user" | "bot";
  content: string;
  timestamp: Date;
}

interface MessageBubbleProps {
  message: Message;
}

export const MessageBubble = memo(function MessageBubble({ message }: MessageBubbleProps) {
  const isBot = message.role === "bot";

  return (
    <div
      className={cn(
        "flex w-full",
        MESSAGE_CONFIG.spacing,
        CHAT_ANIMATIONS.fadeIn,
        isBot ? "justify-start" : "justify-end"
      )}
    >
      <div
        className={cn(
          "px-4 py-3",
          CHAT_RADIUS.message,
          MESSAGE_CONFIG.maxWidth.mobile,
          MESSAGE_CONFIG.maxWidth.desktop,
          "whitespace-pre-wrap break-words",
          isBot
            ? cn(
                "bg-secondary text-secondary-foreground",
                CHAT_RADIUS.messageTail.bot
              )
            : cn(
                CHAT_COLORS.brand.gradient,
                "text-white",
                CHAT_RADIUS.messageTail.user
              )
        )}
      >
        {message.content}
      </div>
    </div>
  );
});
