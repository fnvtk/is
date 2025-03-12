import { AITypingEffect } from "../ai-typing-effect"
import { cn } from "@/lib/utils"
import { formatDistanceToNow } from "date-fns"
import { zhCN } from "date-fns/locale"

interface TextMessageProps {
  content: string
  isUser: boolean
  timestamp: string
  isTyping?: boolean
  onComplete?: () => void
}

export function TextMessage({ content, isUser, timestamp, isTyping = false, onComplete }: TextMessageProps) {
  const formattedTime = formatDistanceToNow(new Date(timestamp), {
    addSuffix: true,
    locale: zhCN,
  })

  return (
    <div className={cn("flex", isUser ? "justify-end" : "justify-start")}>
      <div className="max-w-[80%]">
        <div
          className={cn(
            "p-3 rounded-2xl",
            isUser ? "bg-[#2C73D2] text-white rounded-tr-none" : "bg-white text-[#333333] rounded-tl-none",
          )}
        >
          <p className="text-[15px] leading-relaxed">
            {isTyping ? <AITypingEffect text={content} onComplete={onComplete} /> : content}
          </p>
        </div>
        <div className={cn("text-xs text-gray-500 mt-1", isUser ? "text-right" : "text-left")}>{formattedTime}</div>
      </div>
    </div>
  )
}

