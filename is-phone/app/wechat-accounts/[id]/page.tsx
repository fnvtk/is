"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, Smartphone, MessageCircle, Users, Activity, ArrowRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

interface WechatAccountDetail {
  id: string
  avatar: string
  nickname: string
  wechatId: string
  deviceId: string
  deviceName: string
  friendCount: number
  todayAdded: number
  status: "normal" | "abnormal"
  lastActive: string
  messageCount: number
  activeRate: number
  weeklyStats: {
    date: string
    friends: number
    messages: number
  }[]
}

export default function WechatAccountDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [account, setAccount] = useState<WechatAccountDetail | null>(null)

  useEffect(() => {
    // 模拟API调用获取账号详情
    const fetchAccount = async () => {
      // 这里应该是实际的API调用
      const mockAccount: WechatAccountDetail = {
        id: params.id,
        avatar:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/img_v3_02jn_e7fcc2a4-3560-478d-911a-4ccd69c6392g.jpg-a8zVtwxMuSrPWN9dfWH93EBY0yM3Dh.jpeg", // Using the provided avatar
        nickname: "卡若-25vig",
        wechatId: `wxid_${Math.random().toString(36).substr(2, 8)}`,
        deviceId: "device-1",
        deviceName: "设备1",
        friendCount: Math.floor(Math.random() * (6300 - 520)) + 520, // Random between 520-6300
        todayAdded: 23,
        status: "normal",
        lastActive: new Date().toLocaleString(),
        messageCount: 1234,
        activeRate: 87,
        weeklyStats: Array.from({ length: 7 }, (_, i) => ({
          date: `Day ${i + 1}`,
          friends: Math.floor(Math.random() * 50) + 50,
          messages: Math.floor(Math.random() * 100) + 100,
        })),
      }
      setAccount(mockAccount)
    }

    fetchAccount()
  }, [params.id])

  if (!account) {
    return <div>加载中...</div>
  }

  return (
    <div className="flex-1 bg-gradient-to-b from-blue-50 to-white min-h-screen pb-16">
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm border-b">
        <div className="flex items-center p-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <h1 className="ml-2 text-lg font-medium">账号详情</h1>
        </div>
      </header>

      <div className="p-4 space-y-4">
        <Card className="p-6">
          <div className="flex items-center space-x-4">
            <Avatar className="h-16 w-16 ring-4 ring-offset-2 ring-blue-500/20">
              <AvatarImage src={account.avatar} />
              <AvatarFallback>{account.nickname[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <h2 className="text-xl font-semibold">{account.nickname}</h2>
                <Badge variant={account.status === "normal" ? "success" : "destructive"}>
                  {account.status === "normal" ? "正常" : "异常"}
                </Badge>
              </div>
              <p className="text-sm text-gray-500 mt-1">微信号：{account.wechatId}</p>
              <Button variant="outline" className="mt-2" onClick={() => router.push(`/devices/${account.deviceId}`)}>
                <Smartphone className="w-4 h-4 mr-2" />
                {account.deviceName}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-2 gap-4">
          <Card className="p-4">
            <div className="flex items-center space-x-2 text-gray-500 mb-1">
              <Users className="w-4 h-4" />
              <span className="text-sm">好友数量</span>
            </div>
            <div className="text-2xl font-bold text-blue-600">{account.friendCount}</div>
            <div className="text-sm text-green-600 mt-1">今日新增：+{account.todayAdded}</div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center space-x-2 text-gray-500 mb-1">
              <MessageCircle className="w-4 h-4" />
              <span className="text-sm">消息数量</span>
            </div>
            <div className="text-2xl font-bold text-blue-600">{account.messageCount}</div>
          </Card>
        </div>

        <Card className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2 text-gray-500">
              <Activity className="w-4 h-4" />
              <span className="text-sm">活跃度趋势</span>
            </div>
            <Badge variant="outline">{account.activeRate}% 活跃</Badge>
          </div>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={account.weeklyStats}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="friends" name="好友数" stroke="#3b82f6" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="messages" name="消息数" stroke="#10b981" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-4">
          <div className="text-sm text-gray-500">最后活跃时间</div>
          <div className="text-lg font-medium mt-1">{account.lastActive}</div>
        </Card>
      </div>
    </div>
  )
}

