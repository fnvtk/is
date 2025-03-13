"use client"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, BarChart3, Users } from "lucide-react"
import { useRouter } from "next/navigation"
import BottomNav from "../components/BottomNav"

export default function DataCenterPage() {
  const router = useRouter()

  return (
    <div className="container mx-auto px-4 pb-20">
      <header className="py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">数据中心</h1>
        <Button variant="outline" size="sm">
          <Download className="h-4 w-4 mr-2" />
          导出数据
        </Button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <Card
          className="p-6 cursor-pointer hover:bg-gray-50 transition-all border-2 hover:border-blue-200 hover:shadow-md"
          onClick={() => router.push("/data-center/statistics")}
        >
          <div className="flex items-center gap-4">
            <div className="rounded-full p-3 bg-blue-100">
              <BarChart3 className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-medium">数据统计</h3>
              <p className="text-sm text-gray-500">查看业务数据分析和趋势</p>
            </div>
          </div>
        </Card>

        <Card
          className="p-6 cursor-pointer hover:bg-gray-50 transition-all border-2 hover:border-indigo-200 hover:shadow-md"
          onClick={() => router.push("/data-center/customers")}
        >
          <div className="flex items-center gap-4">
            <div className="rounded-full p-3 bg-indigo-100">
              <Users className="w-6 h-6 text-indigo-600" />
            </div>
            <div>
              <h3 className="text-lg font-medium">客户管理</h3>
              <p className="text-sm text-gray-500">管理微信客户和标签</p>
            </div>
          </div>
        </Card>
      </div>

      <BottomNav />
    </div>
  )
}

