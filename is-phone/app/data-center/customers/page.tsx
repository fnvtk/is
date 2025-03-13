"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Search, Filter, Plus, Star, MessageCircle, Clock, Tag } from "lucide-react"
import { useRouter } from "next/navigation"
import BottomNav from "../../components/BottomNav"

// 模拟客户数据
const customers = [
  {
    id: 1,
    name: "张小姐",
    avatar: "/placeholder.svg?height=40&width=40",
    wechatId: "zhangxiaojie123",
    tags: ["高价值", "活跃客户"],
    lastContact: "今天",
    status: "已成交",
  },
  {
    id: 2,
    name: "李先生",
    avatar: "/placeholder.svg?height=40&width=40",
    wechatId: "lixiansheng456",
    tags: ["潜在客户", "对价格敏感"],
    lastContact: "昨天",
    status: "跟进中",
  },
  {
    id: 3,
    name: "王女士",
    avatar: "/placeholder.svg?height=40&width=40",
    wechatId: "wangnvshi789",
    tags: ["新客户", "对产品感兴趣"],
    lastContact: "3天前",
    status: "初次接触",
  },
  {
    id: 4,
    name: "赵先生",
    avatar: "/placeholder.svg?height=40&width=40",
    wechatId: "zhaoxiansheng111",
    tags: ["高价值", "需要跟进"],
    lastContact: "1周前",
    status: "已报价",
  },
  {
    id: 5,
    name: "刘女士",
    avatar: "/placeholder.svg?height=40&width=40",
    wechatId: "liuvnvshi222",
    tags: ["回头客", "推荐人"],
    lastContact: "今天",
    status: "已成交",
  },
]

// 模拟标签数据
const tags = [
  { id: 1, name: "高价值", color: "bg-green-100 text-green-800" },
  { id: 2, name: "潜在客户", color: "bg-blue-100 text-blue-800" },
  { id: 3, name: "活跃客户", color: "bg-purple-100 text-purple-800" },
  { id: 4, name: "新客户", color: "bg-yellow-100 text-yellow-800" },
  { id: 5, name: "回头客", color: "bg-pink-100 text-pink-800" },
  { id: 6, name: "推荐人", color: "bg-indigo-100 text-indigo-800" },
  { id: 7, name: "对价格敏感", color: "bg-red-100 text-red-800" },
  { id: 8, name: "对产品感兴趣", color: "bg-cyan-100 text-cyan-800" },
  { id: 9, name: "需要跟进", color: "bg-amber-100 text-amber-800" },
]

export default function CustomersPage() {
  const router = useRouter()

  return (
    <div className="container mx-auto px-4 pb-20">
      <header className="py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold">客户管理</h1>
        </div>
        <Button size="sm">
          <Plus className="h-4 w-4 mr-2" />
          添加客户
        </Button>
      </header>

      <div className="flex items-center gap-2 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="搜索客户" className="pl-8" />
        </div>
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      <Tabs defaultValue="list" className="w-full">
        <TabsList className="grid grid-cols-2 mb-6">
          <TabsTrigger value="list">列表视图</TabsTrigger>
          <TabsTrigger value="tags">标签视图</TabsTrigger>
        </TabsList>

        <TabsContent value="list" className="space-y-4">
          {customers.map((customer) => (
            <Card key={customer.id} className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  <img
                    src={customer.avatar || "/placeholder.svg"}
                    alt={customer.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">{customer.name}</h3>
                    <Badge
                      className={
                        customer.status === "已成交"
                          ? "bg-green-100 text-green-800"
                          : customer.status === "跟进中"
                            ? "bg-blue-100 text-blue-800"
                            : customer.status === "已报价"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-gray-100 text-gray-800"
                      }
                    >
                      {customer.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-500">微信号: {customer.wechatId}</p>
                  <div className="flex items-center gap-2 mt-2">
                    {customer.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between mt-3 pt-3 border-t">
                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="h-3 w-3 mr-1" />
                  最近联系: {customer.lastContact}
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <MessageCircle className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Star className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Tag className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="tags" className="space-y-6">
          <div className="grid grid-cols-3 gap-2">
            {tags.map((tag) => (
              <Badge key={tag.id} className={`${tag.color} py-2 px-3 justify-center`}>
                {tag.name}
              </Badge>
            ))}
            <Button variant="outline" className="flex items-center justify-center">
              <Plus className="h-4 w-4 mr-1" />
              添加标签
            </Button>
          </div>

          <Card className="p-4">
            <h3 className="font-medium mb-4">按客户价值</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span>高价值</span>
                <Badge>2</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>中等价值</span>
                <Badge>5</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>低价值</span>
                <Badge>3</Badge>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <h3 className="font-medium mb-4">按互动状态</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span>活跃客户</span>
                <Badge>4</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>一般活跃</span>
                <Badge>3</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>不活跃</span>
                <Badge>3</Badge>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <h3 className="font-medium mb-4">按客户阶段</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span>初次接触</span>
                <Badge>2</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>跟进中</span>
                <Badge>3</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>已成交</span>
                <Badge>5</Badge>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      <BottomNav />
    </div>
  )
}

