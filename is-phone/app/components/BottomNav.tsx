"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, ShoppingBag, BarChart2, Settings } from "lucide-react"

export default function BottomNav() {
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="flex justify-around items-center h-16">
        <Link
          href="/"
          className={`flex flex-col items-center justify-center w-full h-full ${isActive("/") ? "text-primary" : "text-gray-500"}`}
        >
          <Home className="h-5 w-5" />
          <span className="text-xs mt-1">首页</span>
        </Link>

        <Link
          href="/supply-chain"
          className={`flex flex-col items-center justify-center w-full h-full ${isActive("/supply-chain") ? "text-primary" : "text-gray-500"}`}
        >
          <ShoppingBag className="h-5 w-5" />
          <span className="text-xs mt-1">采购中心</span>
        </Link>

        <Link
          href="/data-center"
          className={`flex flex-col items-center justify-center w-full h-full ${isActive("/data-center") ? "text-primary" : "text-gray-500"}`}
        >
          <BarChart2 className="h-5 w-5" />
          <span className="text-xs mt-1">数据中心</span>
        </Link>

        <Link
          href="/settings"
          className={`flex flex-col items-center justify-center w-full h-full ${isActive("/settings") ? "text-primary" : "text-gray-500"}`}
        >
          <Settings className="h-5 w-5" />
          <span className="text-xs mt-1">设置</span>
        </Link>
      </div>
    </div>
  )
}

