"use client";

import { useMemo } from "react";
import { ChatInput } from "./ChatInput";
import { QuickReplyButtons } from "./QuickReplyButtons";
import { ChatHeader } from "./ChatHeader";
import { MessageBubble, Message } from "./MessageBubble";
import { LoadingIndicator } from "./LoadingIndicator";
import { useAutoScroll } from "./useAutoScroll";
import { GREETING_MESSAGE } from "./chat-constants";

interface ChatInterfaceProps {
  messages: Message[];
  isLoading: boolean;
  hasInteracted: boolean;
  onSendMessage: (message: string) => void;
  onClose: () => void;
}

export function ChatInterface({
  messages,
  isLoading,
  hasInteracted,
  onSendMessage,
  onClose,
}: ChatInterfaceProps) {
  // Auto-scroll functionality
  const { messagesEndRef, messagesContainerRef } = useAutoScroll([messages, isLoading]);

  // Memoize all messages (greeting + user messages)
  const allMessages = useMemo(() => [GREETING_MESSAGE, ...messages], [messages]);

  return (
    <div className="flex flex-col h-full min-h-0 bg-background">
      {/* Header */}
      <ChatHeader onClose={onClose} />

      {/* Messages */}
      <div
        ref={messagesContainerRef}
        className="flex-1 min-h-0 overflow-y-auto p-4 space-y-1"
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
      <ChatInput onSendMessage={onSendMessage} disabled={isLoading} />
    </div>
  );
}
