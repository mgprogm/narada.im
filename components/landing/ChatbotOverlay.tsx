"use client";

import { useState } from "react";
import { MessageSquare } from "lucide-react";
import { Dialog, DialogContent, DialogPortal, DialogOverlay, DialogTitle } from "@/components/ui/dialog";
import { ChatInterface, Message } from "./ChatInterface";
import { cn } from "@/lib/utils";

export default function ChatbotOverlay() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  const handleSendMessage = async (messageText: string) => {
    // Mark as interacted to hide quick replies
    if (!hasInteracted) {
      setHasInteracted(true);
    }

    // Add user message
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: messageText,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Call demo API
      const response = await fetch("/api/demo/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: messageText }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "เกิดข้อผิดพลาดในการตอบกลับค่ะ");
      }

      const data = await response.json();

      // Add bot response
      const botMessage: Message = {
        id: `bot-${Date.now()}`,
        role: "bot",
        content: data.answer,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error sending message:", error);

      // Add error message
      const errorMessage: Message = {
        id: `error-${Date.now()}`,
        role: "bot",
        content:
          error instanceof Error
            ? error.message
            : "ขออภัยค่ะ ระบบขัดข้องชั่วคราว กรุณาลองใหม่อีกครั้งค่ะ",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  return (
    <>
      {/* Trigger Button - Hidden when dialog is open */}
      {!isOpen && (
        <button
          onClick={handleOpen}
          aria-label="เปิดแชทบอท"
          className={cn(
            // Position with safe spacing for touch targets
            "fixed bottom-5 right-5 md:bottom-8 md:right-8",
            // Safe area insets for notched devices (iOS)
            "pb-[env(safe-area-inset-bottom)] pr-[env(safe-area-inset-right)]",
            // Size
            "w-14 h-14 md:w-16 md:h-16",
            "rounded-full",
            // Colors and gradients
            "bg-gradient-to-r from-[#34B27B] to-[#2a9463]",
            "text-white",
            // Shadows
            "shadow-lg shadow-[#34B27B]/30",
            "hover:shadow-xl hover:shadow-[#34B27B]/40",
            // Hover effects
            "hover:scale-110",
            "active:scale-95",
            "transition-all duration-200",
            // High z-index to stay above everything
            "z-[9999]",
            // Flex layout
            "flex items-center justify-center",
            "overflow-hidden",
            "group",
            // Prevent text selection
            "select-none",
            // Minimum touch target size for accessibility
            "min-w-[44px] min-h-[44px]"
          )}
        >
        {/* Animated border */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#34B27B] via-[#2a9463] to-[#34B27B] bg-[length:200%_100%] animate-gradient opacity-0 group-hover:opacity-100 transition-opacity" />

        {/* Icon */}
        <MessageSquare className="h-6 w-6 md:h-7 md:w-7 relative z-10" />
      </button>
      )}

      {/* Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogPortal>
          <DialogOverlay className="bg-transparent z-[9998]" />
          <DialogContent
            className={cn(
              // Mobile: full screen with safe area insets
              "fixed inset-0 w-full h-full p-0 m-0 border-0 rounded-none",
              // Override default Dialog rounded corners on small screens
              "sm:rounded-none",
              // Desktop: bottom-right positioned (aligned with button)
              "md:inset-auto md:bottom-8 md:right-8 md:left-auto md:top-auto",
              "md:w-[400px] md:h-[600px]",
              "md:rounded-2xl md:border",
              // Animations
              "data-[state=open]:animate-in data-[state=closed]:animate-out",
              "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
              "md:data-[state=closed]:slide-out-to-bottom-4 md:data-[state=open]:slide-in-from-bottom-4",
              // Transform fix for custom positioning
              "md:translate-x-0 md:translate-y-0",
              // Remove default close button (we have custom one in ChatInterface)
              "[&>button]:hidden",
              // High z-index
              "z-[9999]"
            )}
          >
            {/* Visually hidden title for screen readers */}
            <DialogTitle className="sr-only">แชทบอท Narada AI</DialogTitle>

            <ChatInterface
              messages={messages}
              isLoading={isLoading}
              hasInteracted={hasInteracted}
              onSendMessage={handleSendMessage}
              onClose={handleClose}
            />
          </DialogContent>
        </DialogPortal>
      </Dialog>
    </>
  );
}
