"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { ChatList } from "@/components/chat/chat-list"
import { ChatTabs } from "@/components/chat/chat-tabs"

export default function ChatPage() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="flex flex-col h-screen max-w-[420px] mx-auto bg-background">
      <header className="sticky top-0 z-10 bg-background border-b p-4">
        <h1 className="text-xl font-semibold mb-4">消息中心</h1>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="搜索聊天..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
      </header>

      <ChatTabs className="px-4 mt-2" />

      <main className="flex-1 overflow-auto">
        <ChatList searchQuery={searchQuery} />
      </main>
    </div>
  )
}

