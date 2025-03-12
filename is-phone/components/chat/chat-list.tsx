"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"

type ChatItem = {
  id: string
  name: string
  avatar: string
  lastMessage: string
  time: string
  unread: number
  online: boolean
}

const chatData: ChatItem[] = [
  {
    id: "1",
    name: "张三",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "好的，我们明天见！",
    time: "刚刚",
    unread: 3,
    online: true,
  },
  {
    id: "2",
    name: "李四",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "请问这个产品有什么特点？",
    time: "5分钟前",
    unread: 0,
    online: true,
  },
  {
    id: "3",
    name: "王五",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "我已经收到货了，谢谢！",
    time: "30分钟前",
    unread: 0,
    online: false,
  },
  {
    id: "4",
    name: "赵六",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "这个价格能再优惠一点吗？",
    time: "1小时前",
    unread: 1,
    online: true,
  },
  {
    id: "5",
    name: "钱七",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "我想了解一下你们的服务",
    time: "3小时前",
    unread: 0,
    online: false,
  },
  {
    id: "6",
    name: "孙八",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "好的，我会考虑的",
    time: "昨天",
    unread: 0,
    online: false,
  },
  {
    id: "7",
    name: "周九",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "谢谢你的推荐",
    time: "昨天",
    unread: 0,
    online: true,
  },
  {
    id: "8",
    name: "吴十",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "我们可以约个时间详细聊聊",
    time: "2天前",
    unread: 0,
    online: false,
  },
]

export function ChatList() {
  const [search, setSearch] = useState("")
  const [selectedChat, setSelectedChat] = useState<string | null>(null)

  const filteredChats = chatData.filter(
    (chat) =>
      chat.name.toLowerCase().includes(search.toLowerCase()) ||
      chat.lastMessage.toLowerCase().includes(search.toLowerCase()),
  )

  return (
    <div className="flex flex-col h-full">
      <div className="p-4">
        <Input
          placeholder="搜索聊天..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full"
        />
      </div>
      <ScrollArea className="flex-1">
        <div className="space-y-1 p-2">
          {filteredChats.map((chat) => (
            <div
              key={chat.id}
              className={`flex items-center space-x-4 rounded-lg p-2 cursor-pointer ${
                selectedChat === chat.id ? "bg-accent" : "hover:bg-accent/50"
              }`}
              onClick={() => setSelectedChat(chat.id)}
            >
              <div className="relative">
                <Avatar>
                  <AvatarImage src={chat.avatar} alt={chat.name} />
                  <AvatarFallback>{chat.name.slice(0, 2)}</AvatarFallback>
                </Avatar>
                {chat.online && (
                  <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-500 ring-2 ring-background"></span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center">
                  <p className="text-sm font-medium truncate">{chat.name}</p>
                  <p className="text-xs text-muted-foreground">{chat.time}</p>
                </div>
                <p className="text-xs text-muted-foreground truncate">{chat.lastMessage}</p>
              </div>
              {chat.unread > 0 && (
                <Badge variant="destructive" className="h-5 w-5 rounded-full p-0 flex items-center justify-center">
                  {chat.unread}
                </Badge>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}

