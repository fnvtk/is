"use client"

import { useState } from "react"
import { Clock, Users, MessageSquare, Image } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Switch } from "@/components/ui/switch"

interface Task {
  id: string
  name: string
  type: "friend" | "message" | "moment"
  status: "running" | "paused" | "completed"
  progress: number
  target: number
  current: number
}

const initialTasks: Task[] = [
  {
    id: "1",
    name: "自动获客任务",
    type: "friend",
    status: "running",
    progress: 45,
    target: 100,
    current: 45,
  },
  {
    id: "2",
    name: "AI回复任务",
    type: "message",
    status: "paused",
    progress: 70,
    target: 200,
    current: 140,
  },
  {
    id: "3",
    name: "朋友圈同步",
    type: "moment",
    status: "running",
    progress: 30,
    target: 50,
    current: 15,
  },
]

export function TaskManager() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks)

  const toggleTask = (taskId: string) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === taskId) {
          return {
            ...task,
            status: task.status === "running" ? "paused" : "running",
          }
        }
        return task
      }),
    )
  }

  const getTaskIcon = (type: Task["type"]) => {
    switch (type) {
      case "friend":
        return <Users className="w-4 h-4" />
      case "message":
        return <MessageSquare className="w-4 h-4" />
      case "moment":
        return <Image className="w-4 h-4" />
      default:
        return null
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">运行中的任务</h2>
        <Button variant="outline" size="sm">
          <Clock className="w-4 h-4 mr-2" />
          任务历史
        </Button>
      </div>

      {tasks.map((task) => (
        <div key={task.id} className="bg-white rounded-xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              {getTaskIcon(task.type)}
              <span className="font-medium">{task.name}</span>
            </div>
            <Switch checked={task.status === "running"} onCheckedChange={() => toggleTask(task.id)} />
          </div>

          <div className="space-y-2">
            <Progress value={task.progress} />
            <div className="flex justify-between text-sm text-gray-500">
              <span>
                进度: {task.current}/{task.target}
              </span>
              <span>{task.progress}%</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

