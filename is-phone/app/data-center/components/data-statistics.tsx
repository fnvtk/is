"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart,
  LineChart,
  PieChart,
  Users,
  ShoppingBag,
  Calendar,
  MessageCircle,
  UserPlus,
  Activity,
  Target,
} from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"

export default function DataStatistics() {
  const [timeRange, setTimeRange] = useState("week")

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-xl font-semibold">数据概览</h2>
        <div className="flex items-center gap-2">
          <Select defaultValue={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="选择时间范围" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">今日</SelectItem>
              <SelectItem value="yesterday">昨日</SelectItem>
              <SelectItem value="week">本周</SelectItem>
              <SelectItem value="last_week">上周</SelectItem>
              <SelectItem value="month">本月</SelectItem>
              <SelectItem value="quarter">本季度</SelectItem>
              <SelectItem value="year">本年度</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            自定义
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard title="总客户数" value="1,285" change="+12.5%" icon={<Users className="h-4 w-4" />} positive={true} />
        <StatCard title="新增客户" value="128" change="+8.2%" icon={<UserPlus className="h-4 w-4" />} positive={true} />
        <StatCard
          title="互动次数"
          value="3,562"
          change="+21.3%"
          icon={<MessageCircle className="h-4 w-4" />}
          positive={true}
        />
        <StatCard title="转化率" value="28.6%" change="+3.2%" icon={<Target className="h-4 w-4" />} positive={true} />
      </div>

      <Tabs defaultValue="customer" className="w-full">
        <TabsList className="grid grid-cols-4 mb-4">
          <TabsTrigger value="customer">客户分析</TabsTrigger>
          <TabsTrigger value="interaction">互动分析</TabsTrigger>
          <TabsTrigger value="conversion">转化分析</TabsTrigger>
          <TabsTrigger value="revenue">收入分析</TabsTrigger>
        </TabsList>

        <TabsContent value="customer">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium">客户增长趋势</CardTitle>
                <CardDescription>近期客户增长数据</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[250px] flex items-center justify-center bg-muted/20 rounded-md">
                  <div className="text-center">
                    <LineChart className="h-10 w-10 mx-auto text-muted-foreground" />
                    <p className="mt-2 text-sm text-muted-foreground">客户增长趋势图表</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 mt-4">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">总客户</p>
                    <p className="text-xl font-bold">1,285</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">新增客户</p>
                    <p className="text-xl font-bold">128</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">流失客户</p>
                    <p className="text-xl font-bold">23</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium">客户来源分布</CardTitle>
                <CardDescription>不同渠道客户占比</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[250px] flex items-center justify-center bg-muted/20 rounded-md">
                  <div className="text-center">
                    <PieChart className="h-10 w-10 mx-auto text-muted-foreground" />
                    <p className="mt-2 text-sm text-muted-foreground">客户来源分布图表</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <SourceItem color="bg-blue-500" name="朋友推荐" percentage="42%" />
                  <SourceItem color="bg-green-500" name="微信搜索" percentage="28%" />
                  <SourceItem color="bg-purple-500" name="微信群" percentage="18%" />
                  <SourceItem color="bg-orange-500" name="其他渠道" percentage="12%" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="interaction">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium">互动频率分析</CardTitle>
                <CardDescription>客户互动频次统计</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[250px] flex items-center justify-center bg-muted/20 rounded-md">
                  <div className="text-center">
                    <BarChart className="h-10 w-10 mx-auto text-muted-foreground" />
                    <p className="mt-2 text-sm text-muted-foreground">互动频率分析图表</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 mt-4">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">高频互动</p>
                    <p className="text-xl font-bold">286</p>
                    <p className="text-xs text-muted-foreground">每周多次互动</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">中频互动</p>
                    <p className="text-xl font-bold">512</p>
                    <p className="text-xs text-muted-foreground">每月多次互动</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">低频互动</p>
                    <p className="text-xl font-bold">487</p>
                    <p className="text-xs text-muted-foreground">偶尔互动</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium">互动内容分析</CardTitle>
                <CardDescription>客户互动内容类型占比</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[250px] flex items-center justify-center bg-muted/20 rounded-md">
                  <div className="text-center">
                    <PieChart className="h-10 w-10 mx-auto text-muted-foreground" />
                    <p className="mt-2 text-sm text-muted-foreground">互动内容分析图表</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <InteractionItem icon={<MessageCircle className="h-4 w-4" />} name="文字消息" count="2,156" />
                  <InteractionItem icon={<Activity className="h-4 w-4" />} name="朋友圈互动" count="865" />
                  <InteractionItem icon={<Users className="h-4 w-4" />} name="群聊互动" count="542" />
                  <InteractionItem icon={<ShoppingBag className="h-4 w-4" />} name="产品咨询" count="421" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="conversion">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium">转化漏斗</CardTitle>
                <CardDescription>客户转化路径分析</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[250px] flex items-center justify-center bg-muted/20 rounded-md">
                  <div className="text-center">
                    <BarChart className="h-10 w-10 mx-auto text-muted-foreground" />
                    <p className="mt-2 text-sm text-muted-foreground">转化漏斗图表</p>
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-4 mt-4">
                  <StageItem stage="互动" count="3,256" percentage="100%" />
                  <StageItem stage="咨询" count="1,856" percentage="57%" />
                  <StageItem stage="意向" count="845" percentage="26%" />
                  <StageItem stage="成交" count="386" percentage="12%" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium">转化效率</CardTitle>
                <CardDescription>各阶段转化率分析</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[250px] flex items-center justify-center bg-muted/20 rounded-md">
                  <div className="text-center">
                    <LineChart className="h-10 w-10 mx-auto text-muted-foreground" />
                    <p className="mt-2 text-sm text-muted-foreground">转化效率图表</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 mt-4">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">互动→咨询</p>
                    <p className="text-xl font-bold">57%</p>
                    <p className="text-xs text-green-500">+5.2% 较上期</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">咨询→意向</p>
                    <p className="text-xl font-bold">45.5%</p>
                    <p className="text-xs text-green-500">+3.8% 较上期</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">意向→成交</p>
                    <p className="text-xl font-bold">45.7%</p>
                    <p className="text-xs text-green-500">+4.2% 较上期</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="revenue">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium">收入趋势</CardTitle>
                <CardDescription>近期销售额和趋势</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[250px] flex items-center justify-center bg-muted/20 rounded-md">
                  <div className="text-center">
                    <LineChart className="h-10 w-10 mx-auto text-muted-foreground" />
                    <p className="mt-2 text-sm text-muted-foreground">收入趋势图表</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">总收入</p>
                    <p className="text-2xl font-bold">¥258,456</p>
                    <p className="text-xs text-green-500">+22.5% 较上期</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">客单价</p>
                    <p className="text-2xl font-bold">¥2,856</p>
                    <p className="text-xs text-green-500">+5.8% 较上期</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium">产品销售分布</CardTitle>
                <CardDescription>各产品系列销售占比</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[250px] flex items-center justify-center bg-muted/20 rounded-md">
                  <div className="text-center">
                    <PieChart className="h-10 w-10 mx-auto text-muted-foreground" />
                    <p className="mt-2 text-sm text-muted-foreground">产品销售分布图表</p>
                  </div>
                </div>
                <div className="space-y-3 mt-4">
                  <ProductSaleItem name="法儿曼胶原修复系列" percentage="42%" sales="¥108,551" color="bg-blue-500" />
                  <ProductSaleItem name="安格安晴眼部系列" percentage="23%" sales="¥59,444" color="bg-green-500" />
                  <ProductSaleItem name="色仕黄搭胸部系列" percentage="18%" sales="¥46,522" color="bg-purple-500" />
                  <ProductSaleItem name="头部疗愈SPA系列" percentage="17%" sales="¥43,939" color="bg-orange-500" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

interface StatCardProps {
  title: string
  value: string
  change: string
  icon: React.ReactNode
  positive: boolean
}

function StatCard({ title, value, change, icon, positive }: StatCardProps) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground text-sm">{title}</span>
          <span className="bg-primary/10 p-1 rounded-full text-primary">{icon}</span>
        </div>
        <div className="mt-2">
          <p className="text-xl font-bold">{value}</p>
          <p className={`text-xs ${positive ? "text-green-500" : "text-red-500"}`}>{change} 较上期</p>
        </div>
      </CardContent>
    </Card>
  )
}

interface SourceItemProps {
  color: string
  name: string
  percentage: string
}

function SourceItem({ color, name, percentage }: SourceItemProps) {
  return (
    <div className="flex items-center gap-2">
      <div className={`w-3 h-3 rounded-full ${color}`}></div>
      <span className="text-sm">{name}</span>
      <span className="text-sm font-medium ml-auto">{percentage}</span>
    </div>
  )
}

interface InteractionItemProps {
  icon: React.ReactNode
  name: string
  count: string
}

function InteractionItem({ icon, name, count }: InteractionItemProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="bg-primary/10 p-1 rounded-full text-primary">{icon}</span>
      <span className="text-sm">{name}</span>
      <span className="text-sm font-medium ml-auto">{count}</span>
    </div>
  )
}

interface StageItemProps {
  stage: string
  count: string
  percentage: string
}

function StageItem({ stage, count, percentage }: StageItemProps) {
  return (
    <div className="text-center">
      <p className="text-sm font-medium">{stage}</p>
      <p className="text-base font-bold">{count}</p>
      <p className="text-xs text-muted-foreground">{percentage}</p>
    </div>
  )
}

interface ProductSaleItemProps {
  name: string
  percentage: string
  sales: string
  color: string
}

function ProductSaleItem({ name, percentage, sales, color }: ProductSaleItemProps) {
  return (
    <div className="flex items-center gap-2">
      <div className={`w-3 h-3 rounded-full ${color}`}></div>
      <div>
        <p className="text-sm font-medium">{name}</p>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span>{percentage}</span>
          <span>{sales}</span>
        </div>
      </div>
    </div>
  )
}

