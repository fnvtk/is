"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { ShoppingBag, MessageSquare, Users, Clock, BarChart3 } from "lucide-react"

export default function WorkspacePage() {
  return (
    <div className="container mx-auto px-4 pb-20">
      <header className="py-4">
        <h1 className="text-2xl font-bold">工作台</h1>
        <p className="text-muted-foreground">管理您的业务和客户</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <Link href="/supply-chain">
          <Card className="h-full hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <ShoppingBag className="mr-2 h-5 w-5 text-blue-500" />
                供应链采购
              </CardTitle>
              <CardDescription>管理产品采购和供应链</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">查看和管理产品采购、套餐组合和供应链相关业务</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/workspace/auto-like">
          <Card className="h-full hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <MessageSquare className="mr-2 h-5 w-5 text-green-500" />
                自动点赞
              </CardTitle>
              <CardDescription>管理自动点赞功能</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">设置自动点赞规则、时间和目标账户</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/workspace/auto-group">
          <Card className="h-full hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <Users className="mr-2 h-5 w-5 text-purple-500" />
                自动建群
              </CardTitle>
              <CardDescription>管理自动建群功能</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">设置自动建群规则、群组类型和成员管理</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/workspace/moments-sync">
          <Card className="h-full hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <Clock className="mr-2 h-5 w-5 text-orange-500" />
                朋友圈同步
              </CardTitle>
              <CardDescription>管理朋友圈同步功能</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">设置朋友圈内容同步、发布时间和目标账户</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/traffic-pool">
          <Card className="h-full hover:shadow-md transition-shadow col-span-1 md:col-span-2">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <BarChart3 className="mr-2 h-5 w-5 text-red-500" />
                流量池管理
              </CardTitle>
              <CardDescription>管理流量池和数据分析</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">查看流量数据、分析转化率和优化营销策略</p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  )
}

