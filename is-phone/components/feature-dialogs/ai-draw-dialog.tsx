"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface AIDrawDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const styles = [
  { value: "friend-acquisition", label: "智能获客" },
  { value: "auto-like", label: "好友点赞" },
  { value: "auto-friend", label: "自动开发好友" },
  { value: "drawing", label: "AI绘图" },
]

export function AIDrawDialog({ open, onOpenChange }: AIDrawDialogProps) {
  const [drawing, setDrawing] = useState({
    prompt: "",
    style: "realistic",
    generating: false,
  })

  const handleGenerate = () => {
    setDrawing({ ...drawing, generating: true })
    // 模拟生成过程
    setTimeout(() => {
      setDrawing({ ...drawing, generating: false })
      onOpenChange(false)
    }, 2000)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>AI获客</DialogTitle>
          <DialogDescription>使用AI技术帮助您获取更多客户资源</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="prompt">图片描述</Label>
            <Textarea
              id="prompt"
              value={drawing.prompt}
              onChange={(e) => setDrawing({ ...drawing, prompt: e.target.value })}
              placeholder="例如：一只可爱的卡通猫咪，戴着墨镜"
              rows={4}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="style">风格选择</Label>
            <Select value={drawing.style} onValueChange={(value) => setDrawing({ ...drawing, style: value })}>
              <SelectTrigger>
                <SelectValue placeholder="选择绘画风格" />
              </SelectTrigger>
              <SelectContent>
                {styles.map((style) => (
                  <SelectItem key={style.value} value={style.value}>
                    {style.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            取消
          </Button>
          <Button onClick={handleGenerate} disabled={!drawing.prompt || drawing.generating}>
            {drawing.generating ? "生成中..." : "开始生成"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

