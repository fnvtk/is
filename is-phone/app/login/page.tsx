"use client"

import type React from "react"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { useRouter } from "next/navigation"
import { Phone } from "lucide-react"
import { WeChatIcon, AppleIcon } from "@/components/ui/icons"
import { useToast } from "@/components/ui/use-toast"

export default function LoginPage() {
  const [activeTab, setActiveTab] = useState<"verification" | "password">("verification")
  const [phone, setPhone] = useState("")
  const [code, setCode] = useState("")
  const [password, setPassword] = useState("")
  const [agreeToTerms, setAgreeToTerms] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isSendingCode, setIsSendingCode] = useState(false)

  const router = useRouter()
  const { toast } = useToast()

  const handleSendVerificationCode = async () => {
    if (!phone) {
      toast({
        variant: "destructive",
        title: "请输入手机号",
        description: "发送验证码需要手机号",
      })
      return
    }

    setIsSendingCode(true)
    try {
      // 模拟发送验证码
      await new Promise((resolve) => setTimeout(resolve, 1000))
      toast({
        title: "验证码已发送",
        description: "请查看手机短信",
      })
    } catch (error) {
      toast({
        variant: "destructive",
        title: "发送失败",
        description: "请稍后重试",
      })
    } finally {
      setIsSendingCode(false)
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!phone) {
      toast({
        variant: "destructive",
        title: "请输入手机号",
        description: "手机号不能为空",
      })
      return
    }

    if (!agreeToTerms) {
      toast({
        variant: "destructive",
        title: "请同意用户协议",
        description: "需要同意用户协议和隐私政策才能继续",
      })
      return
    }

    if (activeTab === "verification" && !code) {
      toast({
        variant: "destructive",
        title: "请输入验证码",
        description: "验证码不能为空",
      })
      return
    }

    if (activeTab === "password" && !password) {
      toast({
        variant: "destructive",
        title: "请输入密码",
        description: "密码不能为空",
      })
      return
    }

    setIsLoading(true)
    try {
      // 模拟登录请求
      await new Promise((resolve) => setTimeout(resolve, 1500))
      router.push("/")
    } catch (error) {
      toast({
        variant: "destructive",
        title: "登录失败",
        description: "请稍后重试",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white flex flex-col items-center px-4 py-8">
      <div className="w-full max-w-md space-y-6">
        <Tabs
          defaultValue="verification"
          value={activeTab}
          onValueChange={(v) => setActiveTab(v as "verification" | "password")}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="verification" className="text-base">
              验证码登录
            </TabsTrigger>
            <TabsTrigger value="password" className="text-base">
              密码登录
            </TabsTrigger>
          </TabsList>

          <div className="mt-8">
            <p className="text-gray-600 mb-6">你所在地区仅支持 手机号 / 微信 / Apple 登录</p>

            <form onSubmit={handleLogin} className="space-y-6">
              <div className="relative">
                <Input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="请输入手机号"
                  className="pl-20 h-12"
                  disabled={isLoading}
                />
                <div className="absolute left-0 top-0 bottom-0 flex items-center px-3 border-r">
                  <Phone className="h-4 w-4 text-gray-500 mr-1" />
                  <span className="text-gray-500">+86</span>
                </div>
              </div>

              <TabsContent value="verification" className="m-0">
                <div className="flex gap-3">
                  <Input
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="请输入验证码"
                    className="h-12"
                    disabled={isLoading}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    className="w-32 h-12"
                    onClick={handleSendVerificationCode}
                    disabled={isLoading || isSendingCode}
                  >
                    {isSendingCode ? "发送中..." : "发送验证码"}
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="password" className="m-0">
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="请输入密码"
                  className="h-12"
                  disabled={isLoading}
                />
              </TabsContent>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  checked={agreeToTerms}
                  onCheckedChange={(checked) => setAgreeToTerms(checked as boolean)}
                  disabled={isLoading}
                />
                <label htmlFor="terms" className="text-sm text-gray-600">
                  已阅读并同意
                  <a href="#" className="text-blue-500 mx-1">
                    用户协议
                  </a>
                  与
                  <a href="#" className="text-blue-500 ml-1">
                    隐私政策
                  </a>
                </label>
              </div>

              <Button type="submit" className="w-full h-12" disabled={isLoading}>
                {isLoading ? "登录中..." : "登录"}
              </Button>
            </form>

            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t"></span>
              </div>
              <div className="relative flex justify-center text-sm uppercase">
                <span className="bg-white px-2 text-gray-500">或</span>
              </div>
            </div>

            <div className="space-y-4">
              <Button
                type="button"
                variant="outline"
                className="w-full h-12"
                disabled={isLoading}
                onClick={() => {
                  // Handle WeChat login
                }}
              >
                <WeChatIcon className="w-5 h-5 mr-2 text-[#07C160]" />
                使用微信登录
              </Button>

              <Button
                type="button"
                variant="outline"
                className="w-full h-12"
                disabled={isLoading}
                onClick={() => {
                  // Handle Apple login
                }}
              >
                <AppleIcon className="w-5 h-5 mr-2" />
                使用 Apple 登录
              </Button>
            </div>

            <div className="mt-8 text-center">
              <Button variant="link" className="text-gray-500">
                联系我们
              </Button>
            </div>
          </div>
        </Tabs>
      </div>
    </div>
  )
}

