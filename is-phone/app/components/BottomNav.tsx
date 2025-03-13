"use client"

import { useState } from "react"
import { Home, BarChart2, User, Menu } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { SideMenu } from "@/components/side-menu"

export default function BottomNav() {
  const pathname = usePathname()
  const router = useRouter()
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false)

  const isActive = (path: string) => {
    return pathname === path
  }

  const handleNavigation = (path: string) => {
    router.push(path)
  }

  const handleSideMenuItemClick = (action: string) => {
    // Handle side menu item clicks
    if (action === "logout") {
      // Handle logout
      router.push("/login")
    }
    setIsSideMenuOpen(false)
  }

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-10">
        <div className="flex justify-around items-center h-16">
          <button
            onClick={() => handleNavigation("/")}
            className={cn(
              "flex flex-col items-center justify-center w-full h-full",
              isActive("/") ? "text-blue-500" : "text-gray-500",
            )}
          >
            <Home className="h-5 w-5" />
            <span className="text-xs mt-1">首页</span>
          </button>

          <button
            onClick={() => handleNavigation("/data-center")}
            className={cn(
              "flex flex-col items-center justify-center w-full h-full",
              isActive("/data-center") ? "text-blue-500" : "text-gray-500",
            )}
          >
            <BarChart2 className="h-5 w-5" />
            <span className="text-xs mt-1">数据</span>
          </button>

          <button
            onClick={() => handleNavigation("/profile")}
            className={cn(
              "flex flex-col items-center justify-center w-full h-full",
              isActive("/profile") ? "text-blue-500" : "text-gray-500",
            )}
          >
            <User className="h-5 w-5" />
            <span className="text-xs mt-1">我的</span>
          </button>

          <button
            onClick={() => setIsSideMenuOpen(true)}
            className="flex flex-col items-center justify-center w-full h-full text-gray-500"
          >
            <Menu className="h-5 w-5" />
            <span className="text-xs mt-1">更多</span>
          </button>
        </div>
      </div>

      <SideMenu
        isOpen={isSideMenuOpen}
        onClose={() => setIsSideMenuOpen(false)}
        onMenuItemClick={handleSideMenuItemClick}
      />
    </>
  )
}

