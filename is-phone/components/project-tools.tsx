"use client"

import { Image, Bot, ThumbsUp, UserPlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface ProjectToolsProps {
  onToolClick: (tool: string) => void
}

export function ProjectTools({ onToolClick }: ProjectToolsProps) {
  const tools = [
    {
      id: "moments",
      icon: Image,
      label: "朋友圈同步",
    },
    {
      id: "aiCustomer",
      icon: Bot,
      label: "AI获客",
    },
    {
      id: "autoLike",
      icon: ThumbsUp,
      label: "点赞群发",
    },
    {
      id: "autoFriend",
      icon: UserPlus,
      label: "自动开发好友",
    },
  ]

  return (
    <Card className="p-4">
      <h2 className="text-lg font-semibold mb-4">项目工具</h2>
      <div className="grid grid-cols-4 gap-4">
        {tools.map((tool) => (
          <Button
            key={tool.id}
            variant="outline"
            className="flex flex-col items-center py-4 h-auto"
            onClick={() => onToolClick(tool.id)}
          >
            <tool.icon className="h-6 w-6 mb-2" />
            <span className="text-sm text-center">{tool.label}</span>
          </Button>
        ))}
      </div>
    </Card>
  )
}

