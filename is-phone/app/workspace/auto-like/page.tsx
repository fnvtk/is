"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, Clock, Users, ThumbsUp, ArrowLeft, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

interface UserProfile {
  id: string
  name: string
  avatar: string
}

export default function AutoLikePage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [selectedUsers, setSelectedUsers] = useState<string[]>([])
  const [isRunning, setIsRunning] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)
  const [contentText, setContentText] = useState("")
  const [contentType, setContentType] = useState("")
  const [progress, setProgress] = useState(0)
  const [likeInterval, setLikeInterval] = useState("5")
  const [maxLikesPerDay, setMaxLikesPerDay] = useState("50")
  const [likeOldContent, setLikeOldContent] = useState(false)
  const [userGroup, setUserGroup] = useState("all")
  const [deviceCount, setDeviceCount] = useState(10) // 默认设备数量

  // 计算Y轴最大值
  const yAxisMax = deviceCount * 20

  const [trendData] = useState([
    { date: "周一", customers: Math.floor(Math.random() * yAxisMax * 0.8) },
    { date: "周二", customers: Math.floor(Math.random() * yAxisMax * 0.8) },
    { date: "周三", customers: Math.floor(Math.random() * yAxisMax * 0.8) },
    { date: "周四", customers: Math.floor(Math.random() * yAxisMax * 0.8) },
    { date: "周五", customers: Math.floor(Math.random() * yAxisMax * 0.8) },
    { date: "周六", customers: Math.floor(Math.random() * yAxisMax * 0.8) },
    { date: "周日", customers: Math.floor(Math.random() * yAxisMax * 0.8) },
  ])

  // 模拟获取设备数量
  useEffect(() => {
    // 这里应该是实际的API调用
    const fetchDeviceCount = async () => {
      // 模拟API调用
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setDeviceCount(10) // 设置实际的设备数量
    }

    fetchDeviceCount()
  }, [])

  // Mock data
  const userProfiles: UserProfile[] = Array.from({ length: 10 }, (_, i) => ({
    id: `${i + 1}`,
    name: `用户${i + 1}`,
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`,
  }))

  const handleStart = () => {
    setIsRunning(true)
    // 模拟进度更新
    let currentProgress = 0
    const interval = setInterval(() => {
      currentProgress += 10
      setProgress(currentProgress)
      if (currentProgress >= 100) {
        clearInterval(interval)
        setIsRunning(false)
        setIsCompleted(true)
      }
    }, 500)
  }

  const handleRerun = () => {
    setStep(1)
    setSelectedUsers([])
    setIsCompleted(false)
    setProgress(0)
    setContentText("")
    setContentType("")
  }

  return (
    <div className="flex-1 bg-white min-h-screen">
      <header className="sticky top-0 z-10 bg-white border-b">
        <div className="flex items-center p-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <h1 className="ml-2 text-lg font-medium">自动点赞</h1>
        </div>
      </header>

      <div className="p-4">
        {step === 1 && (
          <Card className="p-6">
            <div className="space-y-6">
              <div>
                <Label className="text-lg font-medium">第一步：选择要点赞的内容</Label>
                <div className="mt-4">
                  <Label>添加文本内容</Label>
                  <Textarea
                    value={contentText}
                    onChange={(e) => setContentText(e.target.value)}
                    placeholder="请输入要点赞的文本内容，每条文本用回车分隔"
                    className="mt-2 min-h-[160px]"
                  />
                </div>
              </div>

              <div>
                <Label>附件类型选择</Label>
                <div className="grid grid-cols-4 gap-4 mt-2">
                  {["图片", "视频", "链接", "小程序"].map((type) => (
                    <Button
                      key={type}
                      variant={contentType === type ? "default" : "outline"}
                      onClick={() => setContentType(type)}
                      className="h-12"
                    >
                      {type}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <Label>点赞设置</Label>
                <div className="space-y-4 mt-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="likeInterval">点赞间隔（分钟）</Label>
                    <Input
                      id="likeInterval"
                      type="number"
                      value={likeInterval}
                      onChange={(e) => setLikeInterval(e.target.value)}
                      className="w-20"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="maxLikesPerDay">每日最大点赞数</Label>
                    <Input
                      id="maxLikesPerDay"
                      type="number"
                      value={maxLikesPerDay}
                      onChange={(e) => setMaxLikesPerDay(e.target.value)}
                      className="w-20"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="likeOldContent">点赞历史内容</Label>
                    <Switch id="likeOldContent" checked={likeOldContent} onCheckedChange={setLikeOldContent} />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="userGroup">用户群体</Label>
                    <Select value={userGroup} onValueChange={setUserGroup}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="选择用户群体" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">所有用户</SelectItem>
                        <SelectItem value="active">活跃用户</SelectItem>
                        <SelectItem value="new">新用户</SelectItem>
                        <SelectItem value="inactive">不活跃用户</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <Button className="w-full h-12 text-base" onClick={() => setStep(2)} disabled={!contentText.trim()}>
                下一步
              </Button>
            </div>
          </Card>
        )}

        {step === 2 && (
          <Card className="p-6">
            <div className="space-y-6">
              <h2 className="text-lg font-medium">预览设置</h2>
              <div className="space-y-4">
                <div>
                  <Label className="font-medium">点赞内容</Label>
                  <p className="mt-1 text-sm text-gray-600">{contentText}</p>
                </div>
                <div>
                  <Label className="font-medium">附件类型</Label>
                  <p className="mt-1 text-sm text-gray-600">{contentType || "无"}</p>
                </div>
                <div>
                  <Label className="font-medium">点赞设置</Label>
                  <div className="mt-1 space-y-2">
                    <p className="text-sm text-gray-600">点赞间隔：{likeInterval} 分钟</p>
                    <p className="text-sm text-gray-600">每日最大点赞数：{maxLikesPerDay}</p>
                    <p className="text-sm text-gray-600">点赞历史内容：{likeOldContent ? "是" : "否"}</p>
                    <p className="text-sm text-gray-600">
                      用户群体��
                      {userGroup === "all"
                        ? "所有用户"
                        : userGroup === "active"
                          ? "活跃用户"
                          : userGroup === "new"
                            ? "新用户"
                            : "不活跃用户"}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setStep(1)}>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  上一步
                </Button>
                <Button onClick={() => setStep(3)}>
                  开始任务
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </Card>
        )}

        {step === 3 && !isCompleted && (
          <Card className="p-6">
            <div className="text-center space-y-6">
              <div className="h-40 mb-6">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={trendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis domain={[0, yAxisMax]} /> {/* 使用计算的最大值 */}
                    <Tooltip />
                    <Line type="monotone" dataKey="customers" stroke="#3b82f6" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <h2 className="text-lg font-medium">任务执行中</h2>
              <div className="w-32 h-32 mx-auto relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-2xl font-bold">{progress}%</div>
                </div>
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    className="text-gray-100"
                    strokeWidth="8"
                    stroke="currentColor"
                    fill="transparent"
                    r="58"
                    cx="64"
                    cy="64"
                  />
                  <circle
                    className="text-blue-500"
                    strokeWidth="8"
                    strokeDasharray={364.4}
                    strokeDashoffset={364.4 * (1 - progress / 100)}
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="transparent"
                    r="58"
                    cx="64"
                    cy="64"
                  />
                </svg>
              </div>
              <div className="space-y-2">
                <Button className="w-full h-12" onClick={() => setIsRunning(!isRunning)}>
                  {isRunning ? "暂停任务" : "继续任务"}
                </Button>
                <Button variant="outline" className="w-full h-12" onClick={() => setStep(1)}>
                  结束任务
                </Button>
              </div>
            </div>
          </Card>
        )}

        {isCompleted && (
          <Card className="p-6">
            <div className="text-center space-y-6">
              <h2 className="text-lg font-medium">完成点赞</h2>
              <div className="w-32 h-32 mx-auto flex items-center justify-center">
                <div className="w-20 h-20 rounded-full border-4 border-green-500 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-12 h-12 text-green-500 fill-current">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                  </svg>
                </div>
              </div>
              <div className="text-sm text-gray-500 space-y-2">
                <p>1. 优先为活跃用户点赞</p>
                <p>2. 避免重复点赞同一内容</p>
                <p>3. 点赞间隔为随机时间，更自然</p>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="flex items-center">
                    <Clock className="w-5 h-5 mr-2" />
                    点赞间隔
                  </span>
                  <span>{likeInterval} 分钟</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center">
                    <ThumbsUp className="w-5 h-5 mr-2" />
                    每日点赞数
                  </span>
                  <span>{maxLikesPerDay}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center">
                    <Users className="w-5 h-5 mr-2" />
                    目标用户群体
                  </span>
                  <span>
                    {userGroup === "all"
                      ? "所有用户"
                      : userGroup === "active"
                        ? "活跃用户"
                        : userGroup === "new"
                          ? "新用户"
                          : "不活跃用户"}
                  </span>
                </div>
              </div>
              <Button className="w-full h-12" onClick={handleRerun}>
                再次点赞
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}

