import { useEffect, useRef } from "react";

export function useAutoScroll(dependencies: any[]) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, dependencies);

  return { messagesEndRef, messagesContainerRef };
}
