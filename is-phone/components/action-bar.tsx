"use client"

import { CircleUser } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ActionBarProps {
  activeAction: string | null
  onActionSelect: (action: string) => void
}

export function ActionBar({ activeAction, onActionSelect }: ActionBarProps) {
  const tools = [
    {
      id: "auto-customer",
      icon: <CircleUser className="w-4 h-4" />,
      label: "自动开发客户",
    },
  ]

  return (
    <div className="w-full border-b p-2">
      {tools.map((tool) => (
        <Button
          key={tool.id}
          variant={activeAction === tool.id ? "default" : "outline"}
          className="flex items-center gap-1 whitespace-nowrap transition-colors"
          size="sm"
          onClick={() => onActionSelect(tool.id)}
        >
          {tool.icon}
          {tool.label}
        </Button>
      ))}
    </div>
  )
}

