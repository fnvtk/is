import Image from "next/image"
import { cn } from "@/lib/utils"
import { formatDistanceToNow } from "date-fns"
import { zhCN } from "date-fns/locale"

interface ImageMessageProps {
  imageUrl: string
  caption?: string
  isUser: boolean
  timestamp: string
  onImageClick?: () => void
}

export function ImageMessage({ imageUrl, caption, isUser, timestamp, onImageClick }: ImageMessageProps) {
  const formattedTime = formatDistanceToNow(new Date(timestamp), {
    addSuffix: true,
    locale: zhCN,
  })

  return (
    <div className={cn("flex", isUser ? "justify-end" : "justify-start")}>
      <div className="max-w-[80%]">
        <div className={cn("rounded-2xl overflow-hidden", isUser ? "rounded-tr-none" : "rounded-tl-none")}>
          <div className="relative cursor-pointer active:opacity-90 transition-opacity" onClick={onImageClick}>
            <Image
              src={imageUrl || "/placeholder.svg"}
              alt={caption || "图片消息"}
              width={240}
              height={240}
              className="object-cover"
            />
          </div>
          {caption && (
            <div className={cn("p-2 text-sm", isUser ? "bg-[#2C73D2] text-white" : "bg-white text-[#333333]")}>
              {caption}
            </div>
          )}
        </div>
        <div className={cn("text-xs text-gray-500 mt-1", isUser ? "text-right" : "text-left")}>{formattedTime}</div>
      </div>
    </div>
  )
}

