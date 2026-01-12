import { useState, useCallback } from "react";
import { Message } from "./MessageBubble";

export function useChatMessages() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  const addUserMessage = useCallback((content: string): Message => {
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    return userMessage;
  }, []);

  const addBotMessage = useCallback((content: string): Message => {
    const botMessage: Message = {
      id: `bot-${Date.now()}`,
      role: "bot",
      content,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, botMessage]);
    return botMessage;
  }, []);

  const markAsInteracted = useCallback(() => {
    setHasInteracted(true);
  }, []);

  return {
    messages,
    isLoading,
    setIsLoading,
    hasInteracted,
    addUserMessage,
    addBotMessage,
    markAsInteracted,
  };
}
