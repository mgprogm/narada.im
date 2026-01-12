import { memo } from "react";
import { CHAT_RADIUS, CHAT_ANIMATIONS, MESSAGE_CONFIG } from "./chat-constants";

export const LoadingIndicator = memo(function LoadingIndicator() {
  return (
    <div
      className={`flex gap-1 items-center px-4 py-3 bg-secondary/50 ${CHAT_RADIUS.message} ${CHAT_RADIUS.messageTail.bot} ${MESSAGE_CONFIG.maxWidth.mobile} w-fit`}
    >
      <div
        className={`w-2 h-2 bg-foreground/60 rounded-full ${CHAT_ANIMATIONS.bounce} [animation-delay:-0.3s]`}
      />
      <div
        className={`w-2 h-2 bg-foreground/60 rounded-full ${CHAT_ANIMATIONS.bounce} [animation-delay:-0.15s]`}
      />
      <div
        className={`w-2 h-2 bg-foreground/60 rounded-full ${CHAT_ANIMATIONS.bounce}`}
      />
    </div>
  );
});
