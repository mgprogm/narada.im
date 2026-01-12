"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChatInput } from "./ChatInput";
import { QuickReplyButtons } from "./QuickReplyButtons";
import { cn } from "@/lib/utils";

export interface Message {
  id: string;
  role: "user" | "bot";
  content: string;
  timestamp: Date;
}

interface ChatInterfaceProps {
  messages: Message[];
  isLoading: boolean;
  hasInteracted: boolean;
  onSendMessage: (message: string) => void;
  onClose: () => void;
}

const GREETING_MESSAGE: Message = {
  id: "greeting",
  role: "bot",
  content: "สวัสดีค่ะ! ยินดีต้อนรับสู่ Narada 👋\n\nฉันเป็น AI ที่ช่วยตอบคำถามลูกค้าอัตโนมัติ ลองถามคำถามด้านล่างเพื่อดูการทำงานกันเลย!",
  timestamp: new Date(),
};

function LoadingIndicator() {
  return (
    <div className="flex gap-1 items-center px-4 py-3 bg-secondary/50 rounded-2xl rounded-bl-md max-w-[80%] w-fit">
      <div className="w-2 h-2 bg-foreground/60 rounded-full animate-bounce [animation-delay:-0.3s]" />
      <div className="w-2 h-2 bg-foreground/60 rounded-full animate-bounce [animation-delay:-0.15s]" />
      <div className="w-2 h-2 bg-foreground/60 rounded-full animate-bounce" />
    </div>
  );
}

function MessageBubble({ message }: { message: Message }) {
  const isBot = message.role === "bot";

  return (
    <div
      className={cn(
        "flex w-full mb-3 animate-in fade-in slide-in-from-bottom-2 duration-300",
        isBot ? "justify-start" : "justify-end"
      )}
    >
      <div
        className={cn(
          "px-4 py-3 rounded-2xl max-w-[80%] md:max-w-[85%]",
          "whitespace-pre-wrap break-words",
          isBot
            ? "bg-secondary text-secondary-foreground rounded-bl-md"
            : "bg-gradient-to-r from-[#34B27B] to-[#2a9463] text-white rounded-br-md"
        )}
      >
        {message.content}
      </div>
    </div>
  );
}

export function ChatInterface({
  messages,
  isLoading,
  hasInteracted,
  onSendMessage,
  onClose,
}: ChatInterfaceProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const allMessages = [GREETING_MESSAGE, ...messages];

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 rounded-t-none md:rounded-t-2xl">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-[#34B27B] to-[#2a9463] text-white font-bold text-xl relative overflow-hidden">
            <div className="absolute inset-0 animate-gradient bg-gradient-to-r from-[#34B27B] via-[#2a9463] to-[#34B27B] bg-[length:200%_100%]" />
            <span className="relative z-10">N</span>
          </div>
          <div>
            <h3 className="font-semibold text-sm">Narada</h3>
            <p className="text-xs text-muted-foreground">AI Assistant</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          aria-label="ปิดแชทบอท"
          className="rounded-full"
        >
          <X className="h-5 w-5" />
        </Button>
      </div>

      {/* Messages */}
      <div
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-1"
        style={{ scrollBehavior: "smooth" }}
      >
        {allMessages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}

        {isLoading && <LoadingIndicator />}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Replies (shown only before first interaction) */}
      {!hasInteracted && !isLoading && (
        <QuickReplyButtons onQuickReply={onSendMessage} disabled={isLoading} />
      )}

      {/* Input */}
      <ChatInput
        onSendMessage={onSendMessage}
        disabled={isLoading}
        placeholder="พิมพ์คำถามของคุณ..."
      />
    </div>
  );
}
