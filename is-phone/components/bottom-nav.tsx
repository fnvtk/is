"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Users, MessageSquare, BarChart2, Settings } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  {
    href: "/",
    icon: Home,
    label: "首页",
  },
  {
    href: "/contacts",
    icon: Users,
    label: "客户",
  },
  {
    href: "/chat",
    icon: MessageSquare,
    label: "消息",
  },
  {
    href: "/analytics",
    icon: BarChart2,
    label: "数据",
  },
  {
    href: "/settings",
    icon: Settings,
    label: "设置",
  },
]

export function BottomNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 max-w-[420px] mx-auto h-16 bg-background border-t flex items-center justify-around px-4">
      {navItems.map(({ href, icon: Icon, label }) => {
        const isActive = pathname === href
        return (
          <Link
            key={href}
            href={href}
            className={cn(
              "flex flex-col items-center justify-center w-16 h-16",
              isActive ? "text-primary" : "text-muted-foreground",
            )}
          >
            <Icon className="h-5 w-5" />
            <span className="text-xs mt-1">{label}</span>
          </Link>
        )
      })}
    </nav>
  )
}

