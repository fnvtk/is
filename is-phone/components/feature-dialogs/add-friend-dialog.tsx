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
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"

interface AddFriendDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AddFriendDialog({ open, onOpenChange }: AddFriendDialogProps) {
  const [settings, setSettings] = useState({
    dailyLimit: 100,
    interval: 60,
    autoReply: true,
    replyMessage: "你好，很高兴认识你！",
  })

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>自动加好友设置</DialogTitle>
          <DialogDescription>配置自动加好友的相关参数，包括每日上限、时间间隔等</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="dailyLimit">每日添加上限</Label>
            <Input
              id="dailyLimit"
              type="number"
              value={settings.dailyLimit}
              onChange={(e) => setSettings({ ...settings, dailyLimit: Number.parseInt(e.target.value) })}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="interval">时间间隔（秒）</Label>
            <Input
              id="interval"
              type="number"
              value={settings.interval}
              onChange={(e) => setSettings({ ...settings, interval: Number.parseInt(e.target.value) })}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="autoReply">自动回复</Label>
            <Switch
              id="autoReply"
              checked={settings.autoReply}
              onCheckedChange={(checked) => setSettings({ ...settings, autoReply: checked })}
            />
          </div>
          {settings.autoReply && (
            <div className="grid gap-2">
              <Label htmlFor="replyMessage">回复内容</Label>
              <Input
                id="replyMessage"
                value={settings.replyMessage}
                onChange={(e) => setSettings({ ...settings, replyMessage: e.target.value })}
              />
            </div>
          )}
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

