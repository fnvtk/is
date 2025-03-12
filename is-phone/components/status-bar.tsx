"use client"

import { useEffect, useState } from "react"
import { Battery, Signal, Wifi } from "lucide-react"

export function StatusBar() {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="flex justify-between items-center px-4 py-2 text-sm bg-background text-foreground">
      <span>{time.toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit" })}</span>
      <div className="flex items-center gap-2">
        <Signal size={16} />
        <Wifi size={16} />
        <Battery size={16} />
      </div>
    </div>
  )
}

