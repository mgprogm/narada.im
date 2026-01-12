import { memo } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CHAT_COLORS, CHAT_RADIUS, CHAT_ANIMATIONS } from "./chat-constants";

interface ChatHeaderProps {
  onClose: () => void;
}

export const ChatHeader = memo(function ChatHeader({ onClose }: ChatHeaderProps) {
  return (
    <div
      className={`flex items-center justify-between p-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 ${CHAT_RADIUS.header}`}
    >
      <div className="flex items-center gap-3">
        {/* Avatar */}
        <div
          className={`flex items-center justify-center w-10 h-10 rounded-full ${CHAT_COLORS.brand.gradient} text-white font-bold text-xl relative overflow-hidden`}
        >
          <div
            className={`absolute inset-0 ${CHAT_COLORS.brand.gradientAnimated} ${CHAT_ANIMATIONS.gradient}`}
          />
          <span className="relative z-10">N</span>
        </div>

        {/* Info */}
        <div>
          <h3 className="font-semibold text-sm">Narada</h3>
          <p className="text-xs text-muted-foreground">AI Assistant</p>
        </div>
      </div>

      {/* Close Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={onClose}
        aria-label="ปิดแชทบอท"
        className={CHAT_RADIUS.circle}
      >
        <X className="h-5 w-5" />
      </Button>
    </div>
  );
});
