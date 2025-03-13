"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, User, Users } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"

interface WechatFriend {
  id: string
  nickname: string
  wechatId: string
  avatar: string
  gender: "male" | "female"
  customer: string
  tags?: string[]
}

interface WechatFriendSelectorProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  selectedFriends: WechatFriend[]
  onSelect: (friends: WechatFriend[]) => void
}

export function WechatFriendSelector({ open, onOpenChange, selectedFriends, onSelect }: WechatFriendSelectorProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [friends, setFriends] = useState<WechatFriend[]>([])
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("all")

  useEffect(() => {
    if (open) {
      fetchFriends()
    }
  }, [open])

  const fetchFriends = async () => {
    setLoading(true)
    // 模拟从API获取好友列表
    await new Promise((resolve) => setTimeout(resolve, 1000))
    const mockFriends = Array.from({ length: 20 }, (_, i) => ({
      id: `friend-${i}`,
      nickname: `好友${i + 1}`,
      wechatId: `wxid_${Math.random().toString(36).substr(2, 8)}`,
      avatar: `/placeholder.svg?height=40&width=40&text=${i + 1}`,
      gender: Math.random() > 0.5 ? "male" : "female",
      customer: `客户${i + 1}`,
      tags: i % 3 === 0 ? ["重要客户", "已跟进"] : i % 3 === 1 ? ["潜在客户"] : [],
    }))
    setFriends(mockFriends)
    setLoading(false)
  }

  const filteredFriends = friends.filter(
    (friend) =>
      (activeTab === "all" ||
        (activeTab === "important" && friend.tags?.includes("重要客户")) ||
        (activeTab === "potential" && friend.tags?.includes("潜在客户"))) &&
      (friend.nickname.toLowerCase().includes(searchQuery.toLowerCase()) ||
        friend.wechatId.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-bold">选择微信好友</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="all" className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>全部好友</span>
            </TabsTrigger>
            <TabsTrigger value="important" className="flex items-center gap-1">
              <span>重要客户</span>
            </TabsTrigger>
            <TabsTrigger value="potential" className="flex items-center gap-1">
              <span>潜在客户</span>
            </TabsTrigger>
          </TabsList>

          <div className="relative mb-4">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              placeholder="搜索好友"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>

          <TabsContent value="all" className="m-0">
            <div className="flex justify-between items-center mb-2 px-1">
              <span className="text-sm text-gray-500">共 {filteredFriends.length} 位好友</span>
              <span className="text-sm text-gray-500">已选择 {selectedFriends.length} 位</span>
            </div>

            <ScrollArea className="h-[350px] rounded-md border p-2">
              {loading ? (
                <div className="flex justify-center items-center h-full">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
              ) : filteredFriends.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-500">
                  <User className="h-12 w-12 mb-2" />
                  <p>未找到匹配的好友</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {filteredFriends.map((friend) => (
                    <div
                      key={friend.id}
                      className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                        selectedFriends.some((f) => f.id === friend.id)
                          ? "bg-primary/10 border border-primary/30"
                          : "hover:bg-gray-100 border border-transparent"
                      }`}
                    >
                      <Checkbox
                        checked={selectedFriends.some((f) => f.id === friend.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            onSelect([...selectedFriends, friend])
                          } else {
                            onSelect(selectedFriends.filter((f) => f.id !== friend.id))
                          }
                        }}
                        className="h-5 w-5"
                      />
                      <Avatar className="h-10 w-10 border">
                        <AvatarImage src={friend.avatar} />
                        <AvatarFallback>{friend.nickname[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="font-medium flex items-center gap-2">
                          {friend.nickname}
                          {friend.gender === "male" ? (
                            <span className="text-blue-500 text-xs">♂</span>
                          ) : (
                            <span className="text-pink-500 text-xs">♀</span>
                          )}
                        </div>
                        <div className="text-sm text-gray-500 flex flex-col">
                          <span>{friend.wechatId}</span>
                          <span>归属: {friend.customer}</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1 justify-end">
                        {friend.tags?.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>
          </TabsContent>

          <TabsContent value="important" className="m-0">
            <ScrollArea className="h-[350px] rounded-md border p-2">
              {/* 内容与 all 选项卡相同，由 filteredFriends 过滤 */}
              {filteredFriends.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-500">
                  <p>暂无重要客户</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {filteredFriends.map((friend) => (
                    <div
                      key={friend.id}
                      className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                        selectedFriends.some((f) => f.id === friend.id)
                          ? "bg-primary/10 border border-primary/30"
                          : "hover:bg-gray-100 border border-transparent"
                      }`}
                    >
                      <Checkbox
                        checked={selectedFriends.some((f) => f.id === friend.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            onSelect([...selectedFriends, friend])
                          } else {
                            onSelect(selectedFriends.filter((f) => f.id !== friend.id))
                          }
                        }}
                        className="h-5 w-5"
                      />
                      <Avatar className="h-10 w-10 border">
                        <AvatarImage src={friend.avatar} />
                        <AvatarFallback>{friend.nickname[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="font-medium flex items-center gap-2">
                          {friend.nickname}
                          {friend.gender === "male" ? (
                            <span className="text-blue-500 text-xs">♂</span>
                          ) : (
                            <span className="text-pink-500 text-xs">♀</span>
                          )}
                        </div>
                        <div className="text-sm text-gray-500 flex flex-col">
                          <span>{friend.wechatId}</span>
                          <span>归属: {friend.customer}</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1 justify-end">
                        {friend.tags?.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>
          </TabsContent>

          <TabsContent value="potential" className="m-0">
            <ScrollArea className="h-[350px] rounded-md border p-2">
              {/* 内容与 all 选项卡相同，由 filteredFriends 过滤 */}
              {filteredFriends.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-500">
                  <p>暂无潜在客户</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {filteredFriends.map((friend) => (
                    <div
                      key={friend.id}
                      className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                        selectedFriends.some((f) => f.id === friend.id)
                          ? "bg-primary/10 border border-primary/30"
                          : "hover:bg-gray-100 border border-transparent"
                      }`}
                    >
                      <Checkbox
                        checked={selectedFriends.some((f) => f.id === friend.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            onSelect([...selectedFriends, friend])
                          } else {
                            onSelect(selectedFriends.filter((f) => f.id !== friend.id))
                          }
                        }}
                        className="h-5 w-5"
                      />
                      <Avatar className="h-10 w-10 border">
                        <AvatarImage src={friend.avatar} />
                        <AvatarFallback>{friend.nickname[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="font-medium flex items-center gap-2">
                          {friend.nickname}
                          {friend.gender === "male" ? (
                            <span className="text-blue-500 text-xs">♂</span>
                          ) : (
                            <span className="text-pink-500 text-xs">♀</span>
                          )}
                        </div>
                        <div className="text-sm text-gray-500 flex flex-col">
                          <span>{friend.wechatId}</span>
                          <span>归属: {friend.customer}</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1 justify-end">
                        {friend.tags?.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>
          </TabsContent>
        </Tabs>

        <div className="flex justify-between space-x-2 mt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            取消
          </Button>
          <Button onClick={() => onOpenChange(false)}>确定 ({selectedFriends.length})</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

