"use client";

import { useState, useCallback } from "react";
import { MessageSquare } from "lucide-react";
import { Dialog, DialogContent, DialogPortal, DialogOverlay, DialogTitle } from "@/components/ui/dialog";
import { ChatInterface } from "./ChatInterface";
import { useChatMessages } from "./useChatMessages";
import { useChatAPI } from "./useChatAPI";
import { cn } from "@/lib/utils";
import {
  CHAT_COLORS,
  CHAT_DIMENSIONS,
  CHAT_Z_INDEX,
  CHAT_ANIMATIONS,
  CHAT_RADIUS,
} from "./chat-constants";

export default function ChatbotOverlay() {
  const [isOpen, setIsOpen] = useState(false);

  // Use custom hooks for state management
  const {
    messages,
    isLoading,
    setIsLoading,
    hasInteracted,
    addUserMessage,
    addBotMessage,
    markAsInteracted,
  } = useChatMessages();

  // API handler callbacks
  const handleAPISuccess = useCallback(
    (answer: string) => {
      addBotMessage(answer);
    },
    [addBotMessage]
  );

  const handleAPIError = useCallback(
    (error: string) => {
      addBotMessage(error);
    },
    [addBotMessage]
  );

  // Use API hook
  const { sendMessage } = useChatAPI({
    onSuccess: handleAPISuccess,
    onError: handleAPIError,
    setIsLoading,
  });

  // Handle sending messages
  const handleSendMessage = useCallback(
    async (messageText: string) => {
      // Mark as interacted to hide quick replies
      if (!hasInteracted) {
        markAsInteracted();
      }

      // Add user message
      addUserMessage(messageText);

      // Send to API
      await sendMessage(messageText);
    },
    [hasInteracted, markAsInteracted, addUserMessage, sendMessage]
  );

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleOpen = useCallback(() => {
    setIsOpen(true);
  }, []);

  return (
    <>
      {/* Trigger Button - Hidden when dialog is open */}
      {!isOpen && (
        <button
          onClick={handleOpen}
          aria-label="เปิดแชทบอท"
          className={cn(
            // Position with safe spacing for touch targets
            "fixed",
            CHAT_DIMENSIONS.mobile.triggerPosition,
            CHAT_DIMENSIONS.desktop.triggerPosition,
            // Safe area insets for notched devices (iOS)
            "pb-[env(safe-area-inset-bottom)] pr-[env(safe-area-inset-right)]",
            // Size
            CHAT_DIMENSIONS.mobile.trigger,
            CHAT_DIMENSIONS.desktop.trigger,
            "rounded-full",
            // Colors and gradients
            CHAT_COLORS.brand.gradient,
            "text-white",
            // Shadows
            CHAT_COLORS.shadow.base,
            `hover:${CHAT_COLORS.shadow.hover}`,
            // Hover effects
            CHAT_ANIMATIONS.scaleHover,
            // High z-index to stay above everything
            CHAT_Z_INDEX.button,
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
          <div
            className={`absolute inset-0 rounded-full ${CHAT_COLORS.brand.gradientAnimated} ${CHAT_ANIMATIONS.gradient} opacity-0 group-hover:opacity-100 transition-opacity`}
          />

          {/* Icon */}
          <MessageSquare className="h-6 w-6 md:h-7 md:w-7 relative z-10" />
        </button>
      )}

      {/* Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogPortal>
          <DialogOverlay className={`fixed inset-0 bg-transparent ${CHAT_Z_INDEX.overlay}`} />
          <DialogContent
            className={cn(
              // Mobile: full screen with safe area insets
              "fixed inset-0 w-full h-full p-0 m-0 border-0",
              CHAT_RADIUS.container.mobile,
              // Override default Dialog styles
              "sm:rounded-none sm:max-w-none",
              // Critical: Override default transforms on mobile
              "left-0 top-0 translate-x-0 translate-y-0",
              // Desktop: bottom-right positioned (aligned with button)
              "md:inset-auto md:left-auto md:top-auto",
              `md:bottom-8 md:right-8`,
              CHAT_DIMENSIONS.desktop.dialog,
              "md:max-w-[400px]",
              CHAT_RADIUS.container.desktop,
              "md:border",
              // Animations
              "data-[state=open]:animate-in data-[state=closed]:animate-out",
              "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
              "md:data-[state=closed]:slide-out-to-bottom-4 md:data-[state=open]:slide-in-from-bottom-4",
              // Remove default close button (we have custom one in ChatInterface)
              "[&>button]:hidden",
              // High z-index
              CHAT_Z_INDEX.dialog
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
