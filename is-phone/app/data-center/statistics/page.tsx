"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Download, Calendar, TrendingUp, Users, ShoppingCart, DollarSign } from "lucide-react"
import { useRouter } from "next/navigation"
import BottomNav from "../../components/BottomNav"

export default function StatisticsPage() {
  const router = useRouter()

  return (
    <div className="container mx-auto px-4 pb-20">
      <header className="py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold">数据统计</h1>
        </div>
        <Button variant="outline" size="sm">
          <Download className="h-4 w-4 mr-2" />
          导出数据
        </Button>
      </header>

      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            今日
          </Button>
          <Button variant="outline" size="sm">
            昨日
          </Button>
          <Button variant="outline" size="sm">
            本周
          </Button>
          <Button variant="outline" size="sm">
            本月
          </Button>
        </div>
        <Button variant="ghost" size="sm">
          <Calendar className="h-4 w-4 mr-2" />
          自定义
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <Users className="h-5 w-5 text-blue-500" />
            <h3 className="font-medium">客户数据</h3>
          </div>
          <div className="text-2xl font-bold">1,245</div>
          <div className="text-sm text-green-500 flex items-center mt-1">
            <TrendingUp className="h-3 w-3 mr-1" />
            较上期增长 12%
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <ShoppingCart className="h-5 w-5 text-purple-500" />
            <h3 className="font-medium">订单数据</h3>
          </div>
          <div className="text-2xl font-bold">328</div>
          <div className="text-sm text-green-500 flex items-center mt-1">
            <TrendingUp className="h-3 w-3 mr-1" />
            较上期增长 8%
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="h-5 w-5 text-yellow-500" />
            <h3 className="font-medium">销售额</h3>
          </div>
          <div className="text-2xl font-bold">¥89,652</div>
          <div className="text-sm text-green-500 flex items-center mt-1">
            <TrendingUp className="h-3 w-3 mr-1" />
            较上期增长 15%
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <Users className="h-5 w-5 text-green-500" />
            <h3 className="font-medium">转化率</h3>
          </div>
          <div className="text-2xl font-bold">32.5%</div>
          <div className="text-sm text-green-500 flex items-center mt-1">
            <TrendingUp className="h-3 w-3 mr-1" />
            较上期增长 5%
          </div>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger value="overview">概览</TabsTrigger>
          <TabsTrigger value="customers">客户</TabsTrigger>
          <TabsTrigger value="orders">订单</TabsTrigger>
          <TabsTrigger value="revenue">收入</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card className="p-4">
            <h3 className="font-medium mb-4">客户增长趋势</h3>
            <div className="h-40 bg-gray-100 rounded-md flex items-center justify-center">
              <p className="text-gray-500">客户增长趋势图表</p>
            </div>
          </Card>

          <Card className="p-4">
            <h3 className="font-medium mb-4">销售额趋势</h3>
            <div className="h-40 bg-gray-100 rounded-md flex items-center justify-center">
              <p className="text-gray-500">销售额趋势图表</p>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="customers" className="space-y-4">
          <Card className="p-4">
            <h3 className="font-medium mb-4">客户来源分布</h3>
            <div className="h-40 bg-gray-100 rounded-md flex items-center justify-center">
              <p className="text-gray-500">客户来源饼图</p>
            </div>
          </Card>

          <Card className="p-4">
            <h3 className="font-medium mb-4">客户活跃度</h3>
            <div className="h-40 bg-gray-100 rounded-md flex items-center justify-center">
              <p className="text-gray-500">客户活跃度图表</p>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="orders" className="space-y-4">
          <Card className="p-4">
            <h3 className="font-medium mb-4">订单类型分布</h3>
            <div className="h-40 bg-gray-100 rounded-md flex items-center justify-center">
              <p className="text-gray-500">订单类型分布图表</p>
            </div>
          </Card>

          <Card className="p-4">
            <h3 className="font-medium mb-4">订单完成率</h3>
            <div className="h-40 bg-gray-100 rounded-md flex items-center justify-center">
              <p className="text-gray-500">订单完成率图表</p>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="revenue" className="space-y-4">
          <Card className="p-4">
            <h3 className="font-medium mb-4">收入来源</h3>
            <div className="h-40 bg-gray-100 rounded-md flex items-center justify-center">
              <p className="text-gray-500">收入来源图表</p>
            </div>
          </Card>

          <Card className="p-4">
            <h3 className="font-medium mb-4">产品销售额排名</h3>
            <div className="h-40 bg-gray-100 rounded-md flex items-center justify-center">
              <p className="text-gray-500">产品销售额排名图表</p>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      <BottomNav />
    </div>
  )
}

