import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Play, Pause, XCircle } from "lucide-react"

interface Task {
  id: string
  title: string
  progress: number
  status: "running" | "paused" | "completed"
}

const tasks: Task[] = [
  {
    id: "1",
    title: "自动加好友任务",
    progress: 45,
    status: "running",
  },
  {
    id: "2",
    title: "朋友圈定时发布",
    progress: 80,
    status: "running",
  },
]

export function TaskManager() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">运行中的任务</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {tasks.map((task) => (
          <div key={task.id} className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">{task.title}</span>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon">
                  {task.status === "running" ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </Button>
                <Button variant="ghost" size="icon">
                  <XCircle className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <Progress value={task.progress} />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>进度: {task.progress}%</span>
              <span>{task.status === "running" ? "运行中" : "已暂停"}</span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

