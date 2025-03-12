"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, MessageCircle, Heart, Image, Video, FileText, ShoppingBag, Clock } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function WechatInteractionHistory({ customerId }: { customerId: string }) {
  const [timeRange, setTimeRange] = useState("all")

  // 模拟互动历史数据
  const interactions = [
    {
      id: 1,
      type: "message",
      content: "您好，我想咨询一下法儿曼胶原修复系列的产品效果...",
      time: "2023-12-15 14:23",
      incoming: true,
    },
    {
      id: 2,
      type: "message",
      content: "您好，法儿曼胶原修复系列主要针对肌肤老化问题，能够有效提升胶原蛋白...",
      time: "2023-12-15 14:25",
      incoming: false,
    },
    {
      id: 3,
      type: "image",
      content: "/placeholder.svg?height=80&width=80",
      time: "2023-12-15 14:26",
      incoming: false,
      caption: "法儿曼胶原修复系列产品图",
    },
    {
      id: 4,
      type: "message",
      content: "这套产品效果真的不错，我想了解一下价格...",
      time: "2023-12-15 14:28",
      incoming: true,
    },
    {
      id: 5,
      type: "order",
      content: "法儿曼胶原修复护理-全套",
      price: "¥2,980",
      time: "2023-12-15 15:02",
      status: "已支付",
    },
    {
      id: 6,
      type: "moments",
      content: "分享了一篇朋友圈",
      time: "2023-12-16 09:15",
      reaction: "liked",
    },
    {
      id: 7,
      type: "message",
      content: "产品已经收到，包装很精美，期待使用效果！",
      time: "2023-12-18 10:23",
      incoming: true,
    },
    {
      id: 8,
      type: "message",
      content: "谢谢您的支持！请按照说明使用，有任何问题随时联系我。",
      time: "2023-12-18 10:25",
      incoming: false,
    },
  ]

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-base font-medium">张女士 - 互动历史</CardTitle>
              <CardDescription>查看所有历史互动记录</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              <Calendar className="h-4 w-4 mr-2" />
              选择日期
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" onValueChange={setTimeRange}>
            <TabsList className="grid grid-cols-4 mb-4">
              <TabsTrigger value="all">全部</TabsTrigger>
              <TabsTrigger value="messages">消息</TabsTrigger>
              <TabsTrigger value="moments">朋友圈</TabsTrigger>
              <TabsTrigger value="orders">订单</TabsTrigger>
            </TabsList>

            <ScrollArea className="h-[400px]">
              <div className="space-y-4 pr-4">
                {interactions.map((interaction) => (
                  <InteractionItem key={interaction.id} interaction={interaction} />
                ))}
              </div>
            </ScrollArea>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

interface InteractionItemProps {
  interaction: any
}

function InteractionItem({ interaction }: InteractionItemProps) {
  const getIcon = () => {
    switch (interaction.type) {
      case "message":
        return <MessageCircle className="h-4 w-4" />
      case "image":
        return <Image className="h-4 w-4" />
      case "video":
        return <Video className="h-4 w-4" />
      case "file":
        return <FileText className="h-4 w-4" />
      case "order":
        return <ShoppingBag className="h-4 w-4" />
      case "moments":
        return <Heart className="h-4 w-4" />
      default:
        return <MessageCircle className="h-4 w-4" />
    }
  }

  return (
    <div className="flex gap-3">
      <div className="flex flex-col items-center">
        <div className="bg-primary/10 p-1.5 rounded-full text-primary">{getIcon()}</div>
        <div className="w-px h-full bg-border mt-2"></div>
      </div>

      <div className="flex-1">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-muted/50">
              {interaction.type === "message"
                ? interaction.incoming
                  ? "客户消息"
                  : "我的回复"
                : interaction.type === "order"
                  ? "订单记录"
                  : interaction.type === "moments"
                    ? "朋友圈互动"
                    : interaction.type.charAt(0).toUpperCase() + interaction.type.slice(1)}
            </Badge>
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="h-3 w-3" />
            {interaction.time}
          </div>
        </div>

        {interaction.type === "message" && (
          <Card>
            <CardContent className={`p-3 ${interaction.incoming ? "bg-muted/20" : "bg-primary/10"}`}>
              <p className="text-sm">{interaction.content}</p>
            </CardContent>
          </Card>
        )}

        {interaction.type === "image" && (
          <Card>
            <CardContent className="p-3">
              <img src={interaction.content || "/placeholder.svg"} alt={interaction.caption} className="rounded-md" />
              {interaction.caption && <p className="text-xs text-muted-foreground mt-1">{interaction.caption}</p>}
            </CardContent>
          </Card>
        )}

        {interaction.type === "order" && (
          <Card>
            <CardContent className="p-3">
              <div className="flex justify-between">
                <div>
                  <p className="text-sm font-medium">{interaction.content}</p>
                  <p className="text-xs text-muted-foreground">状态: {interaction.status}</p>
                </div>
                <p className="text-sm font-medium">{interaction.price}</p>
              </div>
            </CardContent>
          </Card>
        )}

        {interaction.type === "moments" && (
          <Card>
            <CardContent className="p-3 bg-muted/20">
              <div className="flex items-center justify-between">
                <p className="text-sm">{interaction.content}</p>
                {interaction.reaction === "liked" && <Heart className="h-4 w-4 text-red-500" fill="currentColor" />}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

