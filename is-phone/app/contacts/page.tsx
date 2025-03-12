"use client"

import { useState } from "react"
import { Search, Filter, ArrowLeft } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

interface Contact {
  id: string
  name: string
  avatar: string
  wechatId: string
  tags: string[]
  lastInteraction: string
  purchaseCount: number
}

const mockContacts: Contact[] = [
  {
    id: "1",
    name: "张三",
    avatar: "/placeholder.svg",
    wechatId: "zhangsan888",
    tags: ["高意向", "已购买"],
    lastInteraction: "2024-02-28",
    purchaseCount: 3,
  },
  {
    id: "2",
    name: "李四",
    avatar: "/placeholder.svg",
    wechatId: "lisi666",
    tags: ["新客户"],
    lastInteraction: "2024-02-27",
    purchaseCount: 0,
  },
  // 更多联系人...
]

export default function ContactsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [contacts] = useState<Contact[]>(mockContacts)

  return (
    <div className="flex flex-col h-screen max-w-[420px] mx-auto bg-background">
      <header className="sticky top-0 z-10 bg-background border-b p-4">
        <div className="flex items-center gap-2 mb-4">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-semibold">客户列表</h1>
        </div>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="搜索客户..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </header>

      <main className="flex-1 overflow-auto">
        <div className="divide-y">
          {contacts.map((contact) => (
            <div key={contact.id} className="p-4 flex items-center gap-4">
              <Avatar className="h-12 w-12">
                <img src={contact.avatar || "/placeholder.svg"} alt={contact.name} />
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-medium">{contact.name}</h3>
                  <span className="text-sm text-muted-foreground">({contact.wechatId})</span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  {contact.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                  <span>最近互动: {contact.lastInteraction}</span>
                  <span>成交次数: {contact.purchaseCount}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

