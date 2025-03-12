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
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"

interface AutoReplyDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AutoReplyDialog({ open, onOpenChange }: AutoReplyDialogProps) {
  const [settings, setSettings] = useState({
    enabled: true,
    keywords: "你好,价格,联系方式",
    template: "您好！感谢您的咨询。\n我们的客服会尽快回复您。\n如需立即联系，请拨打电话：123-456-7890",
  })

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>自动回复设置</DialogTitle>
          <DialogDescription>配置关键词触发的自动回复内容</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="enabled">启用自动回复</Label>
            <Switch
              id="enabled"
              checked={settings.enabled}
              onCheckedChange={(checked) => setSettings({ ...settings, enabled: checked })}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="keywords">触发关键词（用逗号分隔）</Label>
            <Textarea
              id="keywords"
              value={settings.keywords}
              onChange={(e) => setSettings({ ...settings, keywords: e.target.value })}
              placeholder="输入关键词，用逗号分隔"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="template">回复模板</Label>
            <Textarea
              id="template"
              value={settings.template}
              onChange={(e) => setSettings({ ...settings, template: e.target.value })}
              placeholder="输入回复内容"
              rows={4}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            取消
          </Button>
          <Button onClick={() => onOpenChange(false)}>保存设置</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

