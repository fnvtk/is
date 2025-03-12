"use client"

import { Card } from "@/components/ui/card"
import { LineChart, BarChart, PieChart } from "lucide-react"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface AnalyticsPanelProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AnalyticsPanel({ open, onOpenChange }: AnalyticsPanelProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-[90%] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle>数据分析</SheetTitle>
        </SheetHeader>

        <Tabs defaultValue="overview" className="mt-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">概览</TabsTrigger>
            <TabsTrigger value="conversion">转化</TabsTrigger>
            <TabsTrigger value="traffic">流量</TabsTrigger>
          </TabsList>
          <div className="mt-4 space-y-4">
            <TabsContent value="overview" className="space-y-4">
              <Card className="p-4">
                <h4 className="font-medium mb-2">总体数据</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-2xl font-bold">1,234</p>
                    <p className="text-sm text-muted-foreground">总客户数</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold">89%</p>
                    <p className="text-sm text-muted-foreground">转化率</p>
                  </div>
                </div>
              </Card>
              <Card className="p-4">
                <h4 className="font-medium mb-2">趋势图表</h4>
                <div className="h-[200px] flex items-center justify-center border rounded">
                  <LineChart className="h-8 w-8 text-muted-foreground" />
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="conversion" className="space-y-4">
              <Card className="p-4">
                <h4 className="font-medium mb-2">转化漏斗</h4>
                <div className="h-[200px] flex items-center justify-center border rounded">
                  <BarChart className="h-8 w-8 text-muted-foreground" />
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="traffic" className="space-y-4">
              <Card className="p-4">
                <h4 className="font-medium mb-2">流量来源</h4>
                <div className="h-[200px] flex items-center justify-center border rounded">
                  <PieChart className="h-8 w-8 text-muted-foreground" />
                </div>
              </Card>
            </TabsContent>
          </div>
        </Tabs>
      </SheetContent>
    </Sheet>
  )
}

