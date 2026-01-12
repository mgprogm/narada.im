import { useCallback } from "react";

interface UseChatAPIProps {
  onSuccess: (answer: string) => void;
  onError: (error: string) => void;
  setIsLoading: (loading: boolean) => void;
}

export function useChatAPI({ onSuccess, onError, setIsLoading }: UseChatAPIProps) {
  const sendMessage = useCallback(
    async (question: string) => {
      setIsLoading(true);

      try {
        const response = await fetch("/api/demo/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ question }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "เกิดข้อผิดพลาดในการตอบกลับค่ะ");
        }

        const data = await response.json();
        onSuccess(data.answer);
      } catch (error) {
        console.error("Error sending message:", error);
        const errorMessage =
          error instanceof Error
            ? error.message
            : "ขออภัยค่ะ ระบบขัดข้องชั่วคราว กรุณาลองใหม่อีกครั้งค่ะ";
        onError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    },
    [onSuccess, onError, setIsLoading]
  );

  return { sendMessage };
}
