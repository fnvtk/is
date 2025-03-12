"use client"

import { BarChart3 } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface StatsMenuProps {
  onShowAnalytics: () => void
  onShowCustomers: () => void
  customerCount: number
}

export function StatsMenu({ onShowAnalytics, onShowCustomers, customerCount }: StatsMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <BarChart3 className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuItem onClick={onShowAnalytics} className="flex justify-between">
          <span>今日获客</span>
          <Badge variant="secondary">{customerCount}</Badge>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onShowCustomers}>客户列表</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

