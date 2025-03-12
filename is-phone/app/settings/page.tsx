"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { User, Smartphone, Globe, HelpCircle, LogOut } from "lucide-react"
import BottomNav from "../components/BottomNav"

export default function SettingsPage() {
  return (
    <div className="container mx-auto px-4 pb-20">
      <header className="py-4">
        <h1 className="text-2xl font-bold">系统设置</h1>
      </header>

      <Tabs defaultValue="account" className="w-full">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="account">账户设置</TabsTrigger>
          <TabsTrigger value="notification">通知设置</TabsTrigger>
          <TabsTrigger value="security">安全设置</TabsTrigger>
        </TabsList>

        <TabsContent value="account">
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">个人信息</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-center mb-4">
                  <div className="relative">
                    <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center overflow-hidden">
                      <User className="h-12 w-12 text-muted-foreground" />
                    </div>
                    <Button size="sm" className="absolute bottom-0 right-0 rounded-full">
                      更换
                    </Button>
                  </div>
                </div>

                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">姓名</Label>
                    <Input id="name" placeholder="请输入姓名" defaultValue="艺施用户" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="phone">手机号</Label>
                    <Input id="phone" placeholder="请输入手机号" defaultValue="138****1234" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">邮箱</Label>
                    <Input id="email" type="email" placeholder="请输入邮箱" defaultValue="user@example.com" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">企业信息</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="company">企业名称</Label>
                    <Input id="company" placeholder="请输入企业名称" defaultValue="艺施美业" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="position">职位</Label>
                    <Input id="position" placeholder="请输入职位" defaultValue="店长" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="address">地址</Label>
                    <Textarea id="address" placeholder="请输入地址" defaultValue="北京市朝阳区" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="notification">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">通知设置</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">新订单通知</Label>
                    <p className="text-sm text-muted-foreground">接收新订单的推送通知</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">客户消息通知</Label>
                    <p className="text-sm text-muted-foreground">接收客户发送的消息通知</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">营销活动通知</Label>
                    <p className="text-sm text-muted-foreground">接收营销活动的推送通知</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">系统更新通知</Label>
                    <p className="text-sm text-muted-foreground">接收系统更新和维护的通知</p>
                  </div>
                  <Switch />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">账户安全</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="current-password">当前密码</Label>
                    <Input id="current-password" type="password" placeholder="请输入当前密码" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="new-password">新密码</Label>
                    <Input id="new-password" type="password" placeholder="请输入新密码" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="confirm-password">确认新密码</Label>
                    <Input id="confirm-password" type="password" placeholder="请再次输入新密码" />
                  </div>
                  <Button>修改密码</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">安全设置</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">双重认证</Label>
                      <p className="text-sm text-muted-foreground">启用双重认证以提高账户安全性</p>
                    </div>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">登录通知</Label>
                      <p className="text-sm text-muted-foreground">当有新设备登录时接收通知</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">自动锁定</Label>
                      <p className="text-sm text-muted-foreground">长时间未操作自动锁定账户</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-8">
        <Card>
          <CardContent className="p-4">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Smartphone className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">应用版本</p>
                  <p className="text-sm text-muted-foreground">v1.0.0</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Globe className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">官方网站</p>
                  <p className="text-sm text-muted-foreground">www.isbeaut.com</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <HelpCircle className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">帮助与支持</p>
                  <p className="text-sm text-muted-foreground">联系客服获取帮助</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 mb-20">
        <Button variant="destructive" className="w-full">
          <LogOut className="h-4 w-4 mr-2" />
          退出登录
        </Button>
      </div>

      <BottomNav />
    </div>
  )
}

