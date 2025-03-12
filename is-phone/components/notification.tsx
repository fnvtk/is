"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

export type NotificationType = "success" | "error" | "info" | "warning"

interface NotificationProps {
  type?: NotificationType
  title: string
  message: string
  duration?: number
  onClose?: () => void
}

const typeStyles = {
  success: "bg-green-500",
  error: "bg-red-500",
  info: "bg-blue-500",
  warning: "bg-yellow-500",
}

export function Notification({ type = "info", title, message, duration = 3000, onClose }: NotificationProps) {
  const [isVisible, setIsVisible] = useState(true)
  const [isLeaving, setIsLeaving] = useState(false)

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        handleClose()
      }, duration)

      return () => clearTimeout(timer)
    }
  }, [duration])

  const handleClose = () => {
    setIsLeaving(true)
    setTimeout(() => {
      setIsVisible(false)
      onClose?.()
    }, 300)
  }

  if (!isVisible) return null

  return (
    <div
      className={cn(
        "fixed top-4 left-1/2 transform -translate-x-1/2 z-50",
        "max-w-sm w-full mx-4",
        "transition-all duration-300",
        isLeaving ? "opacity-0 -translate-y-2" : "opacity-100 translate-y-0",
      )}
    >
      <div className={cn("rounded-lg shadow-lg overflow-hidden", typeStyles[type])}>
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex-1">
            <h3 className="text-white font-semibold">{title}</h3>
            <p className="text-white/90 text-sm mt-1">{message}</p>
          </div>
          <button onClick={handleClose} className="p-1 rounded-full hover:bg-white/20 transition-colors">
            <X className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>
    </div>
  )
}

