"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

const data = [
  { name: "Jan", users: 400, newContacts: 240, messages: 1240 },
  { name: "Feb", users: 300, newContacts: 139, messages: 980 },
  { name: "Mar", users: 200, newContacts: 980, messages: 1600 },
  { name: "Apr", users: 278, newContacts: 390, messages: 1700 },
  { name: "May", users: 189, newContacts: 480, messages: 1200 },
  { name: "Jun", users: 239, newContacts: 380, messages: 1400 },
  { name: "Jul", users: 349, newContacts: 430, messages: 1800 },
]

const stats = [
  { title: "总用户数", value: "12,345", change: "+12%" },
  { title: "活跃用户", value: "5,678", change: "+8%" },
  { title: "消息总数", value: "45,678", change: "+23%" },
  { title: "新增好友", value: "2,345", change: "+15%" },
]

export function OverviewTab() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-semibold">数据分析概览</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-muted-foreground"
              >
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                <span className={stat.change.startsWith("+") ? "text-green-500" : "text-red-500"}>{stat.change}</span>{" "}
                相比上月
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>总体趋势</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="users" stroke="#8884d8" activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="newContacts" stroke="#82ca9d" />
              <Line type="monotone" dataKey="messages" stroke="#ffc658" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}

