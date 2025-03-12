"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Search,
  Filter,
  UserPlus,
  MoreHorizontal,
  Tag,
  Users,
  Activity,
  Download,
  Upload,
  MessageCircle,
  Clock,
  Settings,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function CustomerManagement() {
  const [activeTab, setActiveTab] = useState("wechat")
  const [viewMode, setViewMode] = useState("table")
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  const handleTagSelect = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag))
    } else {
      setSelectedTags([...selectedTags, tag])
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="relative w-full sm:w-auto">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="搜索客户..." className="pl-8 w-full sm:w-[250px]" />
        </div>
        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            筛选
          </Button>
          <Button variant="outline" size="sm">
            <Upload className="h-4 w-4 mr-2" />
            导入
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            导出
          </Button>
          <Button size="sm">
            <UserPlus className="h-4 w-4 mr-2" />
            添加客户
          </Button>
        </div>
      </div>

      <Tabs defaultValue="wechat" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="wechat">微信好友</TabsTrigger>
          <TabsTrigger value="groups">微信群组</TabsTrigger>
          <TabsTrigger value="others">其他客户</TabsTrigger>
        </TabsList>

        <TabsContent value="wechat">
          <Card className="mb-4">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium">微信好友管理</CardTitle>
              <CardDescription>管理您的微信好友、标签和互动数据</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <h3 className="text-sm font-medium mb-2">显示方式</h3>
                  <div className="flex gap-2">
                    <Button
                      variant={viewMode === "table" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setViewMode("table")}
                    >
                      <Users className="h-4 w-4 mr-2" />
                      列表视图
                    </Button>
                    <Button
                      variant={viewMode === "card" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setViewMode("card")}
                    >
                      <Tag className="h-4 w-4 mr-2" />
                      标签视图
                    </Button>
                  </div>
                </div>

                <div className="flex-1">
                  <h3 className="text-sm font-medium mb-2">客户标签管理</h3>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Settings className="h-4 w-4 mr-2" />
                        管理标签体系
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                      <DialogHeader>
                        <DialogTitle>标签管理</DialogTitle>
                      </DialogHeader>
                      <TagManagement />
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </CardContent>
          </Card>

          {viewMode === "table" ? (
            <WechatFriendTable />
          ) : (
            <WechatFriendTagView onTagSelect={handleTagSelect} selectedTags={selectedTags} />
          )}
        </TabsContent>

        <TabsContent value="groups">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium">微信群组管理</CardTitle>
              <CardDescription>管理您参与的微信群组和群成员</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center h-[200px] text-muted-foreground">
                <p>群组管理功能正在开发中...</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="others">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium">其他客户管理</CardTitle>
              <CardDescription>管理非微信渠道的客户</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center h-[200px] text-muted-foreground">
                <p>其他客户管理功能正在开发中...</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

interface WechatFriendTableProps {
  filter?: string
}

function WechatFriendTable({ filter }: WechatFriendTableProps) {
  // 模拟微信好友数据
  const friends = [
    {
      id: 1,
      name: "张女士",
      avatar: "/placeholder.svg?height=40&width=40",
      nickname: "小张",
      wechatId: "zhang123",
      tags: ["高价值", "活跃", "美容爱好者"],
      location: "上海",
      lastInteraction: "2023-12-15",
      interactionFrequency: "高",
      notes: "对皮肤护理产品感兴趣",
    },
    {
      id: 2,
      name: "李先生",
      avatar: "/placeholder.svg?height=40&width=40",
      nickname: "阿李",
      wechatId: "lixiansheng",
      tags: ["新客户", "健身爱好者"],
      location: "北京",
      lastInteraction: "2023-12-12",
      interactionFrequency: "中",
      notes: "最近咨询了SPA服务",
    },
    {
      id: 3,
      name: "王女士",
      avatar: "/placeholder.svg?height=40&width=40",
      nickname: "小王子",
      wechatId: "wang_queen",
      tags: ["VIP", "高价值", "护肤达人"],
      location: "广州",
      lastInteraction: "2023-12-18",
      interactionFrequency: "高",
      notes: "经常购买高端护肤产品",
    },
    {
      id: 4,
      name: "赵先生",
      avatar: "/placeholder.svg?height=40&width=40",
      nickname: "赵总",
      wechatId: "zhaozhao668",
      tags: ["沉睡客户", "曾经VIP"],
      location: "深圳",
      lastInteraction: "2023-10-05",
      interactionFrequency: "低",
      notes: "3个月未互动，需要跟进",
    },
    {
      id: 5,
      name: "刘女士",
      avatar: "/placeholder.svg?height=40&width=40",
      nickname: "刘小美",
      wechatId: "liuxiaomei",
      tags: ["活跃", "美妆爱好者"],
      location: "成都",
      lastInteraction: "2023-12-16",
      interactionFrequency: "高",
      notes: "喜欢尝试新品",
    },
  ]

  // 根据筛选条件过滤客户
  const filteredFriends = filter ? friends.filter((friend) => friend.tags.includes(filter)) : friends

  return (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>基本信息</TableHead>
              <TableHead>标签</TableHead>
              <TableHead>位置</TableHead>
              <TableHead>互动信息</TableHead>
              <TableHead className="text-right">操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredFriends.map((friend) => (
              <TableRow key={friend.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <img src={friend.avatar || "/placeholder.svg"} alt={friend.name} />
                    </Avatar>
                    <div>
                      <p className="font-medium">{friend.name}</p>
                      <p className="text-sm text-muted-foreground">{friend.nickname}</p>
                      <p className="text-xs text-muted-foreground">微信ID: {friend.wechatId}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {friend.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="bg-muted/50">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell>{friend.location}</TableCell>
                <TableCell>
                  <div>
                    <p className="text-sm">最近互动: {friend.lastInteraction}</p>
                    <p className="text-sm">
                      频率:
                      <Badge
                        variant="outline"
                        className={`ml-1 ${
                          friend.interactionFrequency === "高"
                            ? "bg-green-100 text-green-800"
                            : friend.interactionFrequency === "中"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-orange-100 text-orange-800"
                        }`}
                      >
                        {friend.interactionFrequency}
                      </Badge>
                    </p>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>操作</DropdownMenuLabel>
                      <DropdownMenuItem>
                        <Tag className="h-4 w-4 mr-2" />
                        添加标签
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <MessageCircle className="h-4 w-4 mr-2" />
                        发送消息
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Clock className="h-4 w-4 mr-2" />
                        查看互动历史
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Activity className="h-4 w-4 mr-2" />
                        查看消费记录
                      </DropdownMenuItem>
                      <DropdownMenuItem>编辑信息</DropdownMenuItem>
                      <DropdownMenuItem className="text-red-500">移除好友</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

function TagManagement() {
  const [tags, setTags] = useState([
    { id: 1, name: "高价值", color: "bg-green-100 text-green-800", count: 128 },
    { id: 2, name: "活跃", color: "bg-blue-100 text-blue-800", count: 356 },
    { id: 3, name: "新客户", color: "bg-purple-100 text-purple-800", count: 215 },
    { id: 4, name: "沉睡客户", color: "bg-orange-100 text-orange-800", count: 189 },
    { id: 5, name: "流失风险", color: "bg-red-100 text-red-800", count: 97 },
    { id: 6, name: "美容爱好者", color: "bg-pink-100 text-pink-800", count: 163 },
    { id: 7, name: "健身爱好者", color: "bg-indigo-100 text-indigo-800", count: 102 },
    { id: 8, name: "护肤达人", color: "bg-yellow-100 text-yellow-800", count: 87 },
    { id: 9, name: "美妆爱好者", color: "bg-purple-100 text-purple-800", count: 124 },
    { id: 10, name: "VIP", color: "bg-green-100 text-green-800", count: 56 },
  ])
  const [newTagName, setNewTagName] = useState("")

  const addTag = () => {
    if (newTagName.trim()) {
      setTags([
        ...tags,
        {
          id: tags.length + 1,
          name: newTagName.trim(),
          color: "bg-gray-100 text-gray-800",
          count: 0,
        },
      ])
      setNewTagName("")
    }
  }

  return (
    <div className="space-y-4 mt-2">
      <div className="flex gap-2">
        <Input placeholder="新标签名称" value={newTagName} onChange={(e) => setNewTagName(e.target.value)} />
        <Button onClick={addTag}>添加</Button>
      </div>

      <ScrollArea className="h-[300px]">
        <div className="space-y-2">
          {tags.map((tag) => (
            <div key={tag.id} className="flex items-center justify-between p-2 border rounded-md">
              <div className="flex items-center gap-2">
                <Badge className={tag.color}>{tag.name}</Badge>
                <span className="text-sm text-muted-foreground">{tag.count}位客户</span>
              </div>
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon">
                  <Tag className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="text-red-500">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}

interface WechatFriendTagViewProps {
  onTagSelect: (tag: string) => void
  selectedTags: string[]
}

function WechatFriendTagView({ onTagSelect, selectedTags }: WechatFriendTagViewProps) {
  const tagGroups = [
    {
      title: "客户价值",
      tags: [
        { name: "高价值", color: "bg-green-100 text-green-800", count: 128 },
        { name: "中等价值", color: "bg-blue-100 text-blue-800", count: 245 },
        { name: "低价值", color: "bg-gray-100 text-gray-800", count: 312 },
      ],
    },
    {
      title: "互动状态",
      tags: [
        { name: "活跃", color: "bg-blue-100 text-blue-800", count: 356 },
        { name: "一般", color: "bg-gray-100 text-gray-800", count: 523 },
        { name: "沉睡客户", color: "bg-orange-100 text-orange-800", count: 189 },
        { name: "流失风险", color: "bg-red-100 text-red-800", count: 97 },
      ],
    },
    {
      title: "客户阶段",
      tags: [
        { name: "新客户", color: "bg-purple-100 text-purple-800", count: 215 },
        { name: "意向客户", color: "bg-indigo-100 text-indigo-800", count: 156 },
        { name: "老客户", color: "bg-green-100 text-green-800", count: 324 },
        { name: "VIP", color: "bg-yellow-100 text-yellow-800", count: 56 },
      ],
    },
    {
      title: "兴趣偏好",
      tags: [
        { name: "美容爱好者", color: "bg-pink-100 text-pink-800", count: 163 },
        { name: "健身爱好者", color: "bg-indigo-100 text-indigo-800", count: 102 },
        { name: "护肤达人", color: "bg-yellow-100 text-yellow-800", count: 87 },
        { name: "美妆爱好者", color: "bg-purple-100 text-purple-800", count: 124 },
      ],
    },
  ]

  return (
    <div className="space-y-4">
      {selectedTags.length > 0 && (
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-wrap gap-2 items-center">
              <span className="font-medium">已选标签:</span>
              {selectedTags.map((tag, index) => (
                <Badge key={index} variant="secondary" className="flex items-center gap-1">
                  {tag}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4 ml-1 hover:bg-transparent"
                    onClick={() => onTagSelect(tag)}
                  >
                    <span className="text-xs">×</span>
                  </Button>
                </Badge>
              ))}
              <Button variant="outline" size="sm" onClick={() => onTagSelect("")} className="ml-auto">
                查看客户
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {tagGroups.map((group, groupIndex) => (
          <Card key={groupIndex}>
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium">{group.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {group.tags.map((tag, tagIndex) => (
                  <Button
                    key={tagIndex}
                    variant={selectedTags.includes(tag.name) ? "default" : "outline"}
                    size="sm"
                    className={selectedTags.includes(tag.name) ? "" : tag.color}
                    onClick={() => onTagSelect(tag.name)}
                  >
                    {tag.name}
                    <Badge variant="outline" className="ml-2 bg-white/80">
                      {tag.count}
                    </Badge>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedTags.length > 0 && <WechatFriendTable filter={selectedTags[0]} />}
    </div>
  )
}

