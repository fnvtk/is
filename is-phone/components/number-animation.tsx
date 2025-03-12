"use client"

import { useState, useEffect } from "react"

interface NumberAnimationProps {
  value: number
  duration?: number
  formatValue?: (value: number) => string
}

export function NumberAnimation({
  value,
  duration = 1000,
  formatValue = (val) => val.toString(),
}: NumberAnimationProps) {
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    const startValue = displayValue
    const endValue = value
    const startTime = performance.now()

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)

      const currentValue = startValue + (endValue - startValue) * easeOutQuart
      setDisplayValue(Math.round(currentValue))

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [value, duration, displayValue])

  return <span>{formatValue(displayValue)}</span>
}

