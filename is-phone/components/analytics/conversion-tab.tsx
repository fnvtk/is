"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

const conversionData = [
  { name: "浏览", value: 4000 },
  { name: "点击", value: 3000 },
  { name: "注册", value: 2000 },
  { name: "添加好友", value: 1500 },
  { name: "互动", value: 1000 },
  { name: "转化", value: 500 },
]

const channelData = [
  { name: "朋友圈", value: 35 },
  { name: "群聊", value: 25 },
  { name: "搜索", value: 20 },
  { name: "扫码", value: 15 },
  { name: "其他", value: 5 },
]

export function ConversionTab() {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>转化漏斗</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={conversionData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>渠道转化率</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={channelData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>转化率指标</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { label: "浏览到点击", value: "75%", change: "+5%" },
              { label: "点击到注册", value: "66%", change: "+3%" },
              { label: "注册到添加好友", value: "75%", change: "+10%" },
              { label: "添加好友到互动", value: "66%", change: "-2%" },
              { label: "互动到转化", value: "50%", change: "+15%" },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="text-sm font-medium">{item.label}</div>
                <div className="flex items-center space-x-2">
                  <div className="text-sm font-bold">{item.value}</div>
                  <div className={`text-xs ${item.change.startsWith("+") ? "text-green-500" : "text-red-500"}`}>
                    {item.change}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

