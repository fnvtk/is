"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
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
]

export function ContactsList() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>客户列表</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y">
          {mockContacts.map((contact) => (
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
      </CardContent>
    </Card>
  )
}

