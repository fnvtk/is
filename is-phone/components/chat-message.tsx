import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { zhCN } from "date-fns/locale"

interface Message {
  id: string
  type: string
  content: string
  isUser: boolean
  timestamp: string
}

interface ChatMessageProps {
  message: Message
}

export function ChatMessage({ message }: ChatMessageProps) {
  const formattedTime = format(new Date(message.timestamp), "HH:mm", { locale: zhCN })

  return (
    <div className={cn("flex gap-2", message.isUser ? "flex-row-reverse" : "flex-row")}>
      <div className={cn("flex flex-col max-w-[70%] gap-1", message.isUser ? "items-end" : "items-start")}>
        <div
          className={cn(
            "px-4 py-2 rounded-2xl",
            message.isUser
              ? "bg-primary text-primary-foreground rounded-tr-sm"
              : "bg-secondary text-secondary-foreground rounded-tl-sm",
          )}
        >
          <p className="text-[15px] leading-5">{message.content}</p>
        </div>
        <span className="text-xs text-muted-foreground px-2">{formattedTime}</span>
      </div>
    </div>
  )
}

