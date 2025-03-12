"use client"

import { useState } from "react"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Image,
  ThumbsUp,
  Settings,
  BarChart3,
  Users,
  ShoppingCart,
  MessageCircle,
  UsersRound,
  CircleUser,
  LogOut,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// 定义产品套餐
const packages = [
  {
    id: "2980",
    price: "2980",
    name: "基础护理套餐",
    discount: "8折",
    originalPrice: "3725",
    products: [
      {
        name: "头部疗愈焕醒SPA",
        price: 598,
        originalPrice: 718,
        duration: "60分钟",
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/61682UXAVT.jpg-tqc2hfTjNUq8KHcvYfa7owAFHkyt5e.jpeg",
      },
      {
        name: "暖油SPA",
        price: 618,
        originalPrice: 838,
        duration: "90分钟",
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/61682UXAVT.jpg-tqc2hfTjNUq8KHcvYfa7owAFHkyt5e.jpeg",
      },
      {
        name: "法儿AWF型颜紧致护理",
        price: 1580,
        originalPrice: 1896,
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1TGLGYdVcP.jpg-yr0fZvkALLFBooIUDzd5u2EnDF2L7p.jpeg",
      },
    ],
    savings: "745",
  },
  {
    id: "6980",
    price: "6980",
    name: "进阶塑形套餐",
    discount: "7折",
    originalPrice: "9971",
    products: [
      {
        name: "SPARF局部塑形",
        price: 658,
        originalPrice: 790,
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/M2F2pDf6f3.jpg-LfIoV2JSzXP19zPRTAdaKSw6BCHCzJ.jpeg",
      },
      {
        name: "法国LPG纤体塑形",
        price: 698,
        originalPrice: 838,
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/M2F2pDf6f3.jpg-LfIoV2JSzXP19zPRTAdaKSw6BCHCzJ.jpeg",
      },
      {
        name: "色仕完美胸部",
        price: 980,
        originalPrice: 1176,
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/sVggm1CMQF.jpg-zKDpeJlFgKFHathSfZ6gUseYDXqZPs.jpeg",
      },
      {
        name: "色仕黄搭胸部",
        price: 1880,
        originalPrice: 2256,
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/sVggm1CMQF.jpg-zKDpeJlFgKFHathSfZ6gUseYDXqZPs.jpeg",
      },
      {
        name: "容大私密韵姿",
        price: 2180,
        originalPrice: 2616,
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1TGLGYdVcP.jpg-yr0fZvkALLFBooIUDzd5u2EnDF2L7p.jpeg",
      },
    ],
    savings: "2991",
  },
  {
    id: "19800",
    price: "19800",
    name: "尊享美肤套餐",
    discount: "6折",
    originalPrice: "33000",
    badge: "最优惠",
    products: [
      {
        name: "法儿AWF型颜紧致护理",
        price: 1580,
        originalPrice: 1896,
        count: 3,
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1TGLGYdVcP.jpg-yr0fZvkALLFBooIUDzd5u2EnDF2L7p.jpeg",
      },
      {
        name: "色仕完美胸部",
        price: 980,
        originalPrice: 1176,
        count: 5,
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/sVggm1CMQF.jpg-zKDpeJlFgKFHathSfZ6gUseYDXqZPs.jpeg",
      },
      {
        name: "法国LPG纤体塑形",
        price: 698,
        originalPrice: 838,
        count: 10,
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/M2F2pDf6f3.jpg-LfIoV2JSzXP19zPRTAdaKSw6BCHCzJ.jpeg",
      },
    ],
    savings: "13200",
  },
]

interface SideMenuProps {
  isOpen: boolean
  onClose: () => void
  onMenuItemClick: (action: string) => void
}

export function SideMenu({ isOpen, onClose, onMenuItemClick }: SideMenuProps) {
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null)
  const [selectedTools, setSelectedTools] = useState<string[]>(["moments", "autoLike"])

  const handleItemClick = (id: string) => {
    if (id === "analytics" || id === "customers" || id === "supply" || id === "settings") {
      setActiveSection(id)
    } else if (
      id === "autoLike" ||
      id === "moments" ||
      id === "groupMessage" ||
      id === "autoGroup" ||
      id === "autoCustomer"
    ) {
      const newTools = selectedTools.includes(id) ? selectedTools.filter((tool) => tool !== id) : [...selectedTools, id]
      setSelectedTools(newTools)
    } else {
      onMenuItemClick(id)
    }
  }

  const handlePackageClick = (packageId: string) => {
    setSelectedPackage(packageId)
  }

  const handleBackFromPackage = () => {
    setSelectedPackage(null)
  }

  const renderPackageDetails = (pkg: (typeof packages)[0]) => (
    <div className="px-4 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">{pkg.name}</h3>
        <Button variant="ghost" size="sm" onClick={handleBackFromPackage}>
          返回
        </Button>
      </div>

      <Card className="p-6 bg-gradient-to-br from-amber-50 to-yellow-100 border-yellow-200">
        <div className="flex justify-between items-start">
          <div>
            <h4 className="text-sm text-yellow-700 font-medium">套餐价格</h4>
            <div className="flex items-baseline gap-2 mt-1">
              <p className="text-3xl font-bold text-yellow-600">¥{pkg.price}</p>
              <p className="text-sm text-yellow-600 line-through">¥{pkg.originalPrice}</p>
            </div>
          </div>
          <div className="bg-yellow-200 rounded-full px-3 py-2 flex items-center">
            <span className="font-medium text-yellow-700">{pkg.discount}</span>
          </div>
        </div>
        <div className="mt-2 text-sm text-yellow-600">预计节省: ¥{pkg.savings}</div>
      </Card>

      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <h4 className="font-medium text-gray-700">套餐内容</h4>
          <Badge variant="outline" className="bg-yellow-50">
            共{pkg.products.length}项服务
          </Badge>
        </div>
        {pkg.products.map((product, index) => (
          <Card key={index} className="p-4 border-l-4 border-l-yellow-400">
            <div className="flex items-start gap-3">
              <div className="w-16 h-16 rounded-lg overflow-hidden bg-yellow-50">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h5 className="font-medium">{product.name}</h5>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-red-500 font-medium">¥{product.price}</span>
                  <span className="text-sm text-gray-400 line-through">¥{product.originalPrice}</span>
                  {product.count && (
                    <Badge variant="outline" className="ml-auto">
                      ×{product.count}次
                    </Badge>
                  )}
                </div>
                {product.duration && <p className="text-sm text-gray-500 mt-1">{product.duration}</p>}
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-white mt-4">立即购买</Button>

      <p className="text-center text-sm text-gray-500 mt-2">订单将由操作人员处理，详情请联系客服</p>
    </div>
  )

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent side="right" className="w-[85%] max-w-[400px] p-0">
        <ScrollArea className="h-full py-6">
          {activeSection === "supply" ? (
            selectedPackage ? (
              renderPackageDetails(packages.find((p) => p.id === selectedPackage)!)
            ) : (
              <div className="px-4 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">供应链采购</h3>
                  <Button variant="ghost" size="sm" onClick={() => setActiveSection(null)}>
                    返回
                  </Button>
                </div>

                <div className="space-y-4">
                  {packages.map((pkg) => (
                    <Card
                      key={pkg.id}
                      className="p-5 cursor-pointer hover:bg-yellow-50 transition-colors border-yellow-200"
                      onClick={() => handlePackageClick(pkg.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="rounded-full p-3 bg-yellow-100">
                            <ShoppingCart className="w-6 h-6 text-yellow-600" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h5 className="font-medium text-lg">{pkg.name}</h5>
                              {pkg.badge && <Badge className="bg-yellow-200 text-yellow-800">{pkg.badge}</Badge>}
                            </div>
                            <div className="flex items-baseline gap-2 mt-1">
                              <span className="text-xl font-bold text-yellow-600">¥{pkg.price}</span>
                              <span className="text-sm text-gray-400 line-through">¥{pkg.originalPrice}</span>
                            </div>
                          </div>
                        </div>
                        <Badge className="bg-amber-100 text-amber-800 text-base px-3 py-1">{pkg.discount}</Badge>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )
          ) : activeSection === "settings" ? (
            <div className="px-4 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">系统设置</h3>
                <Button variant="ghost" size="sm" onClick={() => setActiveSection(null)}>
                  返回
                </Button>
              </div>

              <div className="space-y-4">
                <Card className="p-4">
                  <h4 className="font-medium mb-4">通知设置</h4>
                  <div className="space-y-2">
                    <Button variant="ghost" className="w-full justify-start">
                      消息提醒
                    </Button>
                    <Button variant="ghost" className="w-full justify-start">
                      声音设置
                    </Button>
                    <Button variant="ghost" className="w-full justify-start">
                      勿扰模式
                    </Button>
                  </div>
                </Card>

                <Card className="p-4">
                  <h4 className="font-medium mb-4">账号安全</h4>
                  <div className="space-y-2">
                    <Button variant="ghost" className="w-full justify-start">
                      修改密码
                    </Button>
                    <Button variant="ghost" className="w-full justify-start">
                      隐私设置
                    </Button>
                    <Button variant="ghost" className="w-full justify-start">
                      账号绑定
                    </Button>
                  </div>
                </Card>

                <Card className="p-4">
                  <h4 className="font-medium mb-4">通用</h4>
                  <div className="space-y-2">
                    <Button variant="ghost" className="w-full justify-start">
                      清除缓存
                    </Button>
                    <Button variant="ghost" className="w-full justify-start">
                      检查更新
                    </Button>
                    <Button variant="ghost" className="w-full justify-start">
                      关于我们
                    </Button>
                  </div>
                </Card>

                <Button variant="destructive" className="w-full mt-8" onClick={() => handleItemClick("logout")}>
                  <LogOut className="w-4 h-4 mr-2" />
                  退出登录
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="px-4">
                <h3 className="mb-4 text-lg font-semibold">艺施赋能</h3>
                <div className="grid grid-cols-3 gap-2">
                  <Card
                    className={cn(
                      "p-2 cursor-pointer transition-colors",
                      selectedTools.includes("autoLike") && "bg-pink-50 border-pink-200",
                    )}
                    onClick={() => handleItemClick("autoLike")}
                  >
                    <div className="flex flex-col items-center gap-1">
                      <div className="rounded-full p-2 bg-pink-100">
                        <ThumbsUp className="w-4 h-4 text-pink-500" />
                      </div>
                      <h4 className="text-xs font-medium">自动点赞</h4>
                    </div>
                  </Card>

                  <Card
                    className={cn(
                      "p-2 cursor-pointer transition-colors",
                      selectedTools.includes("moments") && "bg-purple-50 border-purple-200",
                    )}
                    onClick={() => handleItemClick("moments")}
                  >
                    <div className="flex flex-col items-center gap-1">
                      <div className="rounded-full p-2 bg-purple-100">
                        <Image className="w-4 h-4 text-purple-500" />
                      </div>
                      <h4 className="text-xs font-medium">朋友圈同步</h4>
                    </div>
                  </Card>

                  <Card
                    className={cn(
                      "p-2 cursor-pointer transition-colors",
                      selectedTools.includes("autoCustomer") && "bg-green-50 border-green-200",
                    )}
                    onClick={() => handleItemClick("autoCustomer")}
                  >
                    <div className="flex flex-col items-center gap-1">
                      <div className="rounded-full p-2 bg-green-100">
                        <CircleUser className="w-4 h-4 text-green-500" />
                      </div>
                      <h4 className="text-xs font-medium">自动开发客户</h4>
                    </div>
                  </Card>

                  <Card
                    className={cn(
                      "p-2 cursor-pointer transition-colors",
                      selectedTools.includes("groupMessage") && "bg-orange-50 border-orange-200",
                    )}
                    onClick={() => handleItemClick("groupMessage")}
                  >
                    <div className="flex flex-col items-center gap-1">
                      <div className="rounded-full p-2 bg-orange-100">
                        <MessageCircle className="w-4 h-4 text-orange-500" />
                      </div>
                      <h4 className="text-xs font-medium">群消息推送</h4>
                    </div>
                  </Card>

                  <Card
                    className={cn(
                      "p-2 cursor-pointer transition-colors",
                      selectedTools.includes("autoGroup") && "bg-indigo-50 border-indigo-200",
                    )}
                    onClick={() => handleItemClick("autoGroup")}
                  >
                    <div className="flex flex-col items-center gap-1">
                      <div className="rounded-full p-2 bg-indigo-100">
                        <UsersRound className="w-4 h-4 text-indigo-500" />
                      </div>
                      <h4 className="text-xs font-medium">自动建群</h4>
                    </div>
                  </Card>
                </div>
              </div>

              <div className="px-4">
                <h3 className="mb-4 text-lg font-semibold">业务中心</h3>
                <Card
                  className="p-4 cursor-pointer hover:bg-accent transition-colors"
                  onClick={() => handleItemClick("supply")}
                >
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg p-2 bg-yellow-100">
                      <ShoppingCart className="w-5 h-5 text-yellow-500" />
                    </div>
                    <div>
                      <h4 className="font-medium">供应链采购</h4>
                      <p className="text-sm text-muted-foreground">管理供应链业务</p>
                    </div>
                  </div>
                </Card>
              </div>

              <div className="px-4">
                <h3 className="mb-4 text-lg font-semibold">数据中心</h3>
                <div className="grid grid-cols-2 gap-4">
                  <Card
                    className="p-4 cursor-pointer hover:bg-accent transition-colors"
                    onClick={() => handleItemClick("analytics")}
                  >
                    <div className="flex items-center gap-2">
                      <div className="rounded-lg p-2 bg-blue-100">
                        <BarChart3 className="w-5 h-5 text-blue-500" />
                      </div>
                      <div>
                        <h4 className="font-medium text-sm">数据统计</h4>
                      </div>
                    </div>
                  </Card>

                  <Card
                    className="p-4 cursor-pointer hover:bg-accent transition-colors"
                    onClick={() => handleItemClick("customers")}
                  >
                    <div className="flex items-center gap-2">
                      <div className="rounded-lg p-2 bg-indigo-100">
                        <Users className="w-5 h-5 text-indigo-500" />
                      </div>
                      <div>
                        <h4 className="font-medium text-sm">客户管理</h4>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>

              <div className="px-4">
                <Card
                  className="p-4 cursor-pointer hover:bg-accent transition-colors"
                  onClick={() => handleItemClick("settings")}
                >
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg p-2 bg-gray-100">
                      <Settings className="w-5 h-5 text-gray-500" />
                    </div>
                    <div>
                      <h4 className="font-medium">系统设置</h4>
                      <p className="text-sm text-muted-foreground">管理系统配置</p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          )}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}

