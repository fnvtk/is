"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { OverviewTab } from "@/components/analytics/overview-tab"
import { ConversionTab } from "@/components/analytics/conversion-tab"
import { TrafficTab } from "@/components/analytics/traffic-tab"

export default function AnalyticsPage() {
  return (
    <div className="flex flex-col h-screen max-w-[420px] mx-auto bg-background">
      <header className="sticky top-0 z-10 bg-background border-b p-4">
        <h1 className="text-xl font-semibold">数据分析</h1>
      </header>

      <Tabs defaultValue="overview" className="flex-1">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">概览</TabsTrigger>
          <TabsTrigger value="conversion">转化</TabsTrigger>
          <TabsTrigger value="traffic">流量</TabsTrigger>
        </TabsList>
        <div className="flex-1 overflow-auto">
          <TabsContent value="overview" className="m-0">
            <OverviewTab />
          </TabsContent>
          <TabsContent value="conversion" className="m-0">
            <ConversionTab />
          </TabsContent>
          <TabsContent value="traffic" className="m-0">
            <TrafficTab />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}

