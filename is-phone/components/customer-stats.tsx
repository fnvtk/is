"use client"

import { Users } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function CustomerStats() {
  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-primary" />
          <div className="text-sm font-medium">今日获客</div>
          <div className="text-lg font-bold text-primary">128</div>
        </div>
      </div>
      <div className="flex gap-2">
        <Button className="flex-1" variant="default" size="sm">
          手动获客
        </Button>
        <Button className="flex-1" variant="outline" size="sm">
          AI自动获客
        </Button>
      </div>
    </Card>
  )
}

