"use client"

import { useState, useRef } from "react"
import { Menu, Mic, Plus, Search, Image, Paperclip, CircleUser, BookOpen } from "lucide-react"
import { ChatMessage } from "@/components/chat-message"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SideMenu } from "@/components/side-menu"
import { cn } from "@/lib/utils"

export default function Home() {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false)
  const [activeActions, setActiveActions] = useState<string[]>(["content-library"])
  const [showAttachmentOptions, setShowAttachmentOptions] = useState(false)
  const [messages, setMessages] = useState([
    {
      id: "1",
      type: "text",
      content:
        "欢迎使用艺施AI助手，我可以帮您管理客户关系、自动回复消息、创建朋友圈内容，自动点赞开发客户。请问有什么可以帮你的？",
      isUser: false,
      timestamp: new Date(Date.now() - 3600000).toISOString(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isRecording, setIsRecording] = useState(false)
  const longPressTimer = useRef<NodeJS.Timeout>()

  const handleVoiceInputStart = () => {
    setIsRecording(true)
  }

  const handleVoiceInputEnd = () => {
    setIsRecording(false)
  }

  const handleInputLongPress = () => {
    longPressTimer.current = setTimeout(() => {
      setShowAttachmentOptions(true)
    }, 1000)
  }

  const handleInputPressEnd = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current)
    }
  }

  const handleActionSelect = (action: string) => {
    setActiveActions((prev) => (prev.includes(action) ? prev.filter((a) => a !== action) : [...prev, action]))
  }

  const handleMenuItemClick = (action: string) => {
    console.log("Menu item clicked:", action)
  }

  const sendMessage = () => {
    if (inputValue.trim()) {
      const newMessage = {
        id: Date.now().toString(),
        type: "text",
        content: inputValue,
        isUser: true,
        timestamp: new Date().toISOString(),
      }
      setMessages([...messages, newMessage])
      setInputValue("")

      setTimeout(() => {
        const aiResponse = {
          id: (Date.now() + 1).toString(),
          type: "text",
          content: "我理解您的需求。让我为您详细介绍一下相关功能和设置步骤...",
          isUser: false,
          timestamp: new Date().toISOString(),
        }
        setMessages((prev) => [...prev, aiResponse])
      }, 1000)
    }
  }

  return (
    <div className="flex flex-col min-h-screen max-w-[420px] mx-auto bg-background safe-area">
      <header className="sticky top-0 z-10 bg-background/70 backdrop-blur-md">
        <div className="flex items-center justify-between px-4 h-11">
          <h1 className="text-lg font-semibold">艺施AI助理</h1>
          <Button variant="ghost" size="icon" onClick={() => setIsSideMenuOpen(true)}>
            <Menu className="h-5 w-5" />
          </Button>
        </div>
        <div className="px-4 py-2">
          <div className="ios-search-bar">
            <Search className="w-4 h-4" />
            <input
              type="text"
              placeholder="搜索消息"
              className="bg-transparent flex-1 outline-none text-sm placeholder:text-muted-foreground"
            />
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto">
        <div className="px-4 py-4 space-y-4">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
        </div>
      </main>

      <div className="sticky bottom-0 left-0 right-0 bg-background/70 backdrop-blur-md border-t">
        <div className="px-4 pt-2 pb-1">
          <div className="flex gap-2 mb-2">
            <Button
              variant={activeActions.includes("content-library") ? "default" : "outline"}
              className="flex items-center gap-1 flex-1 justify-center py-2"
              onClick={() => handleActionSelect("content-library")}
            >
              <BookOpen className="w-4 h-4" />
              艺施内容库
            </Button>

            <Button
              variant={activeActions.includes("auto-customer") ? "default" : "outline"}
              className="flex items-center gap-1 flex-1 justify-center py-2"
              onClick={() => handleActionSelect("auto-customer")}
            >
              <CircleUser className="w-4 h-4" />
              自动开发客户
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="shrink-0"
              onClick={() => setShowAttachmentOptions(!showAttachmentOptions)}
            >
              <Plus className="h-5 w-5" />
            </Button>
            {showAttachmentOptions && (
              <div className="absolute bottom-14 left-4 bg-white rounded-lg shadow-lg p-2 flex gap-2">
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <Image className="h-4 w-4" />
                  <span>图片</span>
                </Button>
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <Paperclip className="h-4 w-4" />
                  <span>附件</span>
                </Button>
              </div>
            )}
            <div className="flex-1 relative">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="发消息、输入@或/选择技能"
                className="ios-input pr-10"
                onMouseDown={() => handleInputLongPress()}
                onMouseUp={() => handleInputPressEnd()}
                onTouchStart={() => handleInputLongPress()}
                onTouchEnd={() => handleInputPressEnd()}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault()
                    sendMessage()
                  }
                }}
              />
              {inputValue && (
                <Button onClick={sendMessage} className="absolute right-1 top-1/2 -translate-y-1/2 ios-button h-7 px-3">
                  发送
                </Button>
              )}
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="shrink-0"
              onMouseDown={handleVoiceInputStart}
              onMouseUp={handleVoiceInputEnd}
              onTouchStart={handleVoiceInputStart}
              onTouchEnd={handleVoiceInputEnd}
            >
              <Mic className={cn("h-5 w-5", isRecording && "text-red-500 animate-pulse")} />
            </Button>
          </div>
        </div>
      </div>

      <SideMenu
        isOpen={isSideMenuOpen}
        onClose={() => setIsSideMenuOpen(false)}
        onMenuItemClick={handleMenuItemClick}
      />
    </div>
  )
}

