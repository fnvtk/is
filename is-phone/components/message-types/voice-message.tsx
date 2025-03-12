"use client"

import { useState, useRef } from "react"
import { Play, Pause, Mic } from "lucide-react"
import { cn } from "@/lib/utils"
import { formatDistanceToNow } from "date-fns"
import { zhCN } from "date-fns/locale"

interface VoiceMessageProps {
  audioUrl: string
  duration: number
  isUser: boolean
  timestamp: string
}

export function VoiceMessage({ audioUrl, duration, isUser, timestamp }: VoiceMessageProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const audioRef = useRef<HTMLAudioElement>(null)

  const formattedTime = formatDistanceToNow(new Date(timestamp), {
    addSuffix: true,
    locale: zhCN,
  })

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = Math.floor(seconds % 60)
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime)
    }
  }

  const handleEnded = () => {
    setIsPlaying(false)
    setCurrentTime(0)
  }

  return (
    <div className={cn("flex", isUser ? "justify-end" : "justify-start")}>
      <div className="max-w-[80%]">
        <div
          className={cn(
            "flex items-center space-x-2 p-3 rounded-2xl min-w-[160px]",
            isUser ? "bg-[#2C73D2] text-white rounded-tr-none" : "bg-white text-[#333333] rounded-tl-none",
          )}
        >
          <button
            onClick={togglePlay}
            className={cn(
              "w-8 h-8 flex items-center justify-center rounded-full",
              isUser ? "bg-white/20" : "bg-gray-100",
            )}
          >
            {isPlaying ? <Pause size={16} /> : <Play size={16} />}
          </button>

          <div className="flex-1">
            <div className="relative h-1 bg-gray-200 rounded-full">
              <div
                className={cn("absolute left-0 top-0 h-full rounded-full", isUser ? "bg-white" : "bg-blue-500")}
                style={{ width: `${(currentTime / duration) * 100}%` }}
              />
            </div>
          </div>

          <div className="flex items-center space-x-1 text-sm">
            <Mic size={14} />
            <span>{formatDuration(currentTime)}</span>
          </div>
        </div>

        <div className={cn("text-xs text-gray-500 mt-1", isUser ? "text-right" : "text-left")}>{formattedTime}</div>

        <audio ref={audioRef} src={audioUrl} onTimeUpdate={handleTimeUpdate} onEnded={handleEnded} className="hidden" />
      </div>
    </div>
  )
}

