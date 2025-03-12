"use client"

import { useTheme } from "@/components/theme-provider"
import { Moon, Sun } from "lucide-react"

export function DarkModeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="w-12 h-6 rounded-full bg-gray-200 dark:bg-gray-700 relative transition-colors"
    >
      <div
        className={`absolute top-1 w-4 h-4 rounded-full transition-transform ${
          theme === "dark" ? "translate-x-7 bg-blue-500" : "translate-x-1 bg-yellow-500"
        }`}
      >
        {theme === "dark" ? (
          <Moon size={12} className="text-white m-auto" />
        ) : (
          <Sun size={12} className="text-white m-auto" />
        )}
      </div>
    </button>
  )
}

