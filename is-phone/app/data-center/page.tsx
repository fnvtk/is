"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import BottomNav from "../components/BottomNav"
import DataStatistics from "./components/data-statistics"
import CustomerManagement from "./components/customer-management"

export default function DataCenterPage() {
  const [activeTab, setActiveTab] = useState("statistics")

  return (
    <div className="container mx-auto px-4 pb-20">
      <header className="py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">数据中心</h1>
        <Button variant="outline" size="sm">
          <Download className="h-4 w-4 mr-2" />
          导出数据
        </Button>
      </header>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 mb-4">
          <TabsTrigger value="statistics">数据统计</TabsTrigger>
          <TabsTrigger value="customers">客户管理</TabsTrigger>
        </TabsList>

        <TabsContent value="statistics">
          <DataStatistics />
        </TabsContent>

        <TabsContent value="customers">
          <CustomerManagement />
        </TabsContent>
      </Tabs>

      <BottomNav />
    </div>
  )
}

