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
import { ImagePlus } from "lucide-react"

interface MomentsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function MomentsDialog({ open, onOpenChange }: MomentsDialogProps) {
  const [content, setContent] = useState({
    text: "",
    images: [] as string[],
  })

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>发布朋友圈</DialogTitle>
          <DialogDescription>编辑并发布朋友圈内容</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="content">内容</Label>
            <Textarea
              id="content"
              value={content.text}
              onChange={(e) => setContent({ ...content, text: e.target.value })}
              placeholder="分享新鲜事..."
              rows={4}
            />
          </div>
          <div className="grid gap-2">
            <Label>图片</Label>
            <div className="grid grid-cols-3 gap-2">
              {content.images.map((image, index) => (
                <div key={index} className="aspect-square rounded-lg bg-muted flex items-center justify-center">
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`Upload ${index + 1}`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              ))}
              <Button variant="outline" className="aspect-square flex flex-col items-center justify-center gap-1">
                <ImagePlus className="h-8 w-8" />
                <span className="text-xs">添加图片</span>
              </Button>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            取消
          </Button>
          <Button onClick={() => onOpenChange(false)}>发布</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

