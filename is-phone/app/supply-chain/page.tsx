"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Link from "next/link"
import { ShoppingCart, Settings, Gift, Crown, Star, Info } from "lucide-react"

export default function SupplyChainPage() {
  const [selectedOptions, setSelectedOptions] = useState({
    contentLibrary: false,
    autoCustomerDev: false,
  })

  const handleOptionChange = (option: "contentLibrary" | "autoCustomerDev") => {
    setSelectedOptions((prev) => ({
      ...prev,
      [option]: !prev[option],
    }))
  }

  // 计算基础套餐总价和折扣
  const basicPackageOriginalPrice = 3796 // 1296 + 718 + 718 + 478 + 586
  const basicPackagePrice = 2980
  const basicPackageEarning = basicPackageOriginalPrice - basicPackagePrice

  // 计算进阶套餐总价和折扣
  const proPackageOriginalPrice = 11276 // 4776 + 2616 + 2256 + 838 + 790
  const proPackagePrice = 6980
  const proPackageEarning = proPackageOriginalPrice - proPackagePrice

  // 计算尊享套餐总价和折扣
  const premiumPackageOriginalPrice = 23648 // 所有产品原价总和
  const premiumPackagePrice = 19800
  const premiumPackageEarning = premiumPackageOriginalPrice - premiumPackagePrice

  return (
    <div className="container mx-auto px-4 pb-20">
      <header className="py-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">艺施供应链采购</h1>
        <div className="flex items-center gap-2">
          <Link href="/settings">
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </header>

      <div className="bg-yellow-50 p-4 rounded-lg mb-6 text-sm text-yellow-700 border border-yellow-200 flex items-start gap-3">
        <Info className="h-5 w-5 flex-shrink-0 mt-0.5" />
        <div>
          <p className="font-medium">注意：当前显示的是测试数据</p>
          <p>实际产品信息以正式上线后为准。价格和产品可能会有变动。</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 mt-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>采购选项</span>
            </CardTitle>
            <CardDescription>选择您需要的附加服务</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="contentLibrary"
                checked={selectedOptions.contentLibrary}
                onCheckedChange={() => handleOptionChange("contentLibrary")}
              />
              <Label htmlFor="contentLibrary" className="font-medium">
                艺施内容库
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="autoCustomerDev"
                checked={selectedOptions.autoCustomerDev}
                onCheckedChange={() => handleOptionChange("autoCustomerDev")}
              />
              <Label htmlFor="autoCustomerDev" className="font-medium">
                自动开发客户
              </Label>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="package1" className="w-full">
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="package1">基础套餐</TabsTrigger>
            <TabsTrigger value="package2">进阶套餐</TabsTrigger>
            <TabsTrigger value="package3">尊享套餐</TabsTrigger>
          </TabsList>

          <TabsContent value="package1">
            <Card>
              <CardHeader className="bg-gradient-to-r from-amber-100 to-amber-200 rounded-t-lg">
                <CardTitle className="flex justify-between items-center">
                  <span className="flex items-center">
                    <span className="bg-amber-500 p-1.5 rounded-full mr-2">
                      <Gift className="h-4 w-4 text-white" />
                    </span>
                    基础套餐
                  </span>
                  <Badge className="bg-red-500 text-white text-lg py-1.5 px-3">¥{basicPackagePrice}</Badge>
                </CardTitle>
                <CardDescription>适合初次尝试的商家，包含基础产品组合</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <ProductItem
                    name="法儿曼原修复护理-眼部"
                    price={1080}
                    originalPrice={1296}
                    image="/placeholder.svg?height=80&width=80"
                  />
                  <ProductItem
                    name="色仕丰七激活疗程-单次"
                    price={598}
                    originalPrice={718}
                    image="/placeholder.svg?height=80&width=80"
                  />
                  <ProductItem
                    name="容大私密韵姿"
                    price={598}
                    originalPrice={718}
                    image="/placeholder.svg?height=80&width=80"
                  />
                  <ProductItem
                    name="法儿曼DNA活细胞护理-眼部"
                    price={398}
                    originalPrice={478}
                    image="/placeholder.svg?height=80&width=80"
                  />
                  <ProductItem
                    name="淳·超级肩颈SPA（60分钟）"
                    price={398}
                    originalPrice={586}
                    image="/placeholder.svg?height=80&width=80"
                  />

                  <div className="pt-4 space-y-3 border-t mt-6">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500">原价总计: </span>
                      <span className="text-gray-500 line-through">¥{basicPackageOriginalPrice}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500">套餐价格: </span>
                      <span className="text-red-500 font-bold">¥{basicPackagePrice}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500">预计可赚: </span>
                      <span className="text-green-500 font-bold">赚¥{basicPackageEarning}</span>
                    </div>
                    <Button className="w-full bg-red-500 hover:bg-red-600 mt-2">
                      <ShoppingCart className="mr-2 h-4 w-4" /> 立即购买
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="package2">
            <Card>
              <CardHeader className="bg-gradient-to-r from-blue-100 to-blue-200 rounded-t-lg">
                <CardTitle className="flex justify-between items-center">
                  <span className="flex items-center">
                    <span className="bg-blue-500 p-1.5 rounded-full mr-2">
                      <Star className="h-4 w-4 text-white" />
                    </span>
                    进阶套餐
                  </span>
                  <Badge className="bg-red-500 text-white text-lg py-1.5 px-3">¥{proPackagePrice}</Badge>
                </CardTitle>
                <CardDescription>适合有一定经验的商家，包含更多高价值产品</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <ProductItem
                    name="安格安晴私订眼护"
                    price={3980}
                    originalPrice={4776}
                    image="/placeholder.svg?height=80&width=80"
                  />
                  <ProductItem
                    name="法儿曼胶原修复护理-面部"
                    price={2180}
                    originalPrice={2616}
                    image="/placeholder.svg?height=80&width=80"
                  />
                  <ProductItem
                    name="色仕黄搭胸部"
                    price={1880}
                    originalPrice={2256}
                    image="/placeholder.svg?height=80&width=80"
                  />
                  <ProductItem
                    name="法国LPG纤体塑形"
                    price={698}
                    originalPrice={838}
                    image="/placeholder.svg?height=80&width=80"
                  />
                  <ProductItem
                    name="SPARF局部塑形"
                    price={658}
                    originalPrice={790}
                    image="/placeholder.svg?height=80&width=80"
                  />

                  <div className="pt-4 space-y-3 border-t mt-6">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500">原价总计: </span>
                      <span className="text-gray-500 line-through">¥{proPackageOriginalPrice}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500">套餐价格: </span>
                      <span className="text-red-500 font-bold">¥{proPackagePrice}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500">预计可赚: </span>
                      <span className="text-green-500 font-bold">赚¥{proPackageEarning}</span>
                    </div>
                    <Button className="w-full bg-red-500 hover:bg-red-600 mt-2">
                      <ShoppingCart className="mr-2 h-4 w-4" /> 立即购买
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="package3">
            <Card>
              <CardHeader className="bg-gradient-to-r from-purple-100 to-purple-200 rounded-t-lg">
                <CardTitle className="flex justify-between items-center">
                  <span className="flex items-center">
                    <span className="bg-purple-500 p-1.5 rounded-full mr-2">
                      <Crown className="h-4 w-4 text-white" />
                    </span>
                    尊享套餐
                  </span>
                  <Badge className="bg-red-500 text-white text-lg py-1.5 px-3">¥{premiumPackagePrice}</Badge>
                </CardTitle>
                <CardDescription>适合高端商家，包含全系列高价值产品组合</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <ProductItem
                    name="法儿曼胶原修复护理-全套"
                    price={3780}
                    originalPrice={4536}
                    image="/placeholder.svg?height=80&width=80"
                  />
                  <ProductItem
                    name="安格安晴私订眼护"
                    price={3980}
                    originalPrice={4776}
                    image="/placeholder.svg?height=80&width=80"
                  />
                  <ProductItem
                    name="安格安晴时光青春"
                    price={2180}
                    originalPrice={2616}
                    image="/placeholder.svg?height=80&width=80"
                  />
                  <ProductItem
                    name="色仕黄搭胸部"
                    price={1880}
                    originalPrice={2256}
                    image="/placeholder.svg?height=80&width=80"
                  />
                  <ProductItem
                    name="法儿曼原修复护理-眼部"
                    price={1080}
                    originalPrice={1296}
                    image="/placeholder.svg?height=80&width=80"
                  />

                  <div className="flex items-center justify-center py-2">
                    <Badge variant="outline" className="cursor-pointer">
                      查看更多产品 (共15件产品)
                    </Badge>
                  </div>

                  <div className="pt-4 space-y-3 border-t mt-6">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500">原价总计: </span>
                      <span className="text-gray-500 line-through">¥{premiumPackageOriginalPrice}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500">套餐价格: </span>
                      <span className="text-red-500 font-bold">¥{premiumPackagePrice}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500">预计可赚: </span>
                      <span className="text-green-500 font-bold">赚¥{premiumPackageEarning}</span>
                    </div>
                    <Button className="w-full bg-red-500 hover:bg-red-600 mt-2">
                      <ShoppingCart className="mr-2 h-4 w-4" /> 立即购买
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

interface ProductItemProps {
  name: string
  price: number
  originalPrice: number
  image: string
}

function ProductItem({ name, price, originalPrice, image }: ProductItemProps) {
  return (
    <div className="flex items-center space-x-4 border-b pb-4">
      <div className="flex-shrink-0">
        <Image
          src={image || "/placeholder.svg"}
          alt={name}
          width={80}
          height={80}
          className="rounded-md object-cover"
        />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 truncate">{name}</p>
        <div className="flex items-center mt-1">
          <span className="text-red-500 font-bold">¥{price.toFixed(2)}</span>
          <span className="ml-2 text-gray-500 text-sm line-through">¥{originalPrice.toFixed(2)}</span>
          <span className="ml-2 text-green-500 text-xs">省¥{(originalPrice - price).toFixed(2)}</span>
        </div>
      </div>
    </div>
  )
}

