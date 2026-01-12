"use client";

import { useState, KeyboardEvent, useRef, useEffect } from "react";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

export function ChatInput({ onSendMessage, disabled = false, placeholder = "พิมพ์คำถามของคุณ..." }: ChatInputProps) {
  const [value, setValue] = useState("");
  const [hasError, setHasError] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${Math.min(textarea.scrollHeight, 72)}px`; // Max 3 lines (~24px per line)
    }
  }, [value]);

  const handleSend = () => {
    const trimmedValue = value.trim();

    if (trimmedValue === "") {
      setHasError(true);
      return;
    }

    setHasError(false);
    onSendMessage(trimmedValue);
    setValue("");

    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
    if (hasError) {
      setHasError(false);
    }
  };

  return (
    <div className="border-t bg-background p-4 rounded-b-none md:rounded-b-2xl">
      <div className="flex gap-2 items-end">
        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            value={value}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            disabled={disabled}
            placeholder={placeholder}
            rows={1}
            className={cn(
              "w-full resize-none rounded-lg border bg-background px-4 py-3 text-sm",
              "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
              "disabled:cursor-not-allowed disabled:opacity-50",
              "placeholder:text-muted-foreground",
              "transition-colors",
              hasError && "border-red-500 focus:ring-red-500"
            )}
            style={{ maxHeight: "72px", overflowY: "auto" }}
          />
        </div>
        <Button
          onClick={handleSend}
          disabled={disabled}
          size="icon"
          className="h-12 w-12 shrink-0"
          aria-label="ส่งข้อความ"
        >
          <Sparkles className="h-5 w-5" />
        </Button>
      </div>
      {hasError && (
        <p className="text-xs text-red-500 mt-2">กรุณาใส่คำถามค่ะ</p>
      )}
    </div>
  );
}
