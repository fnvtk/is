"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChatList } from "@/components/chat/chat-list"

export function ChatTabs() {
  return (
    <Tabs defaultValue="chats" className="h-full flex flex-col">
      <TabsList className="grid grid-cols-3 w-full">
        <TabsTrigger value="chats">聊天</TabsTrigger>
        <TabsTrigger value="groups">群组</TabsTrigger>
        <TabsTrigger value="official">公众号</TabsTrigger>
      </TabsList>
      <TabsContent value="chats" className="flex-1 p-0">
        <ChatList />
      </TabsContent>
      <TabsContent value="groups" className="flex-1 p-4">
        <div className="text-center text-muted-foreground py-8">
          <p>群聊列表将在这里显示</p>
        </div>
      </TabsContent>
      <TabsContent value="official" className="flex-1 p-4">
        <div className="text-center text-muted-foreground py-8">
          <p>关注的公众号将在这里显示</p>
        </div>
      </TabsContent>
    </Tabs>
  )
}

