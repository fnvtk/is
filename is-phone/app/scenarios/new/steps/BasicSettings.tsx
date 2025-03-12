"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { QrCode, X, ChevronDown, Plus, Maximize2 } from "lucide-react"

const scenarios = [
  { id: "haibao", name: "海报", type: "material" },
  { id: "order", name: "订单", type: "api" },
  { id: "douyin", name: "抖音", type: "social" },
  { id: "xiaohongshu", name: "小红书", type: "social" },
  { id: "gongzhonghao", name: "公众号", type: "social" },
  { id: "payment", name: "支付码", type: "material" },
  { id: "weixinqun", name: "微信群", type: "social" },
  { id: "api", name: "API", type: "api" },
]

interface Account {
  id: string
  nickname: string
  avatar: string
}

interface Material {
  id: string
  name: string
  type: "poster" | "payment"
  preview: string
}

interface BasicSettingsProps {
  formData: any
  onChange: (data: any) => void
  onNext?: () => void
}

const posterTemplates = [
  {
    id: "poster-1",
    name: "点击领取",
    preview:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E7%82%B9%E5%87%BB%E9%A2%86%E5%8F%961-tipd1HI7da6qooY5NkhxQnXBnT5LGU.gif",
  },
  {
    id: "poster-2",
    name: "点击合作",
    preview:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E7%82%B9%E5%87%BB%E5%90%88%E4%BD%9C-LPlMdgxtvhqCSr4IM1bZFEFDBF3ztI.gif",
  },
  {
    id: "poster-3",
    name: "点击咨询",
    preview:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E7%82%B9%E5%87%BB%E5%92%A8%E8%AF%A2-FTiyAMAPop2g9LvjLOLDz0VwPg3KVu.gif",
  },
  {
    id: "poster-4",
    name: "点击签到",
    preview:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E7%82%B9%E5%87%BB%E7%AD%BE%E5%88%B0-94TZIkjLldb4P2jTVlI6MkSDg0NbXi.gif",
  },
  {
    id: "poster-5",
    name: "点击了解",
    preview:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E7%82%B9%E5%87%BB%E4%BA%86%E8%A7%A3-6GCl7mQVdO4WIiykJyweSubLsTwj71.gif",
  },
  {
    id: "poster-6",
    name: "点击报名",
    preview:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E7%82%B9%E5%87%BB%E6%8A%A5%E5%90%8D-Mj0nnva0BiASeDAIhNNaRRAbjPgjEj.gif",
  },
]

const generateRandomAccounts = (count: number): Account[] => {
  return Array.from({ length: count }, (_, index) => ({
    id: `account-${index + 1}`,
    nickname: `账号-${Math.random().toString(36).substring(2, 7)}`,
    avatar: `/placeholder.svg?height=40&width=40&text=${index + 1}`,
  }))
}

const generatePosterMaterials = (): Material[] => {
  return posterTemplates.map((template, index) => ({
    id: template.id,
    name: template.name,
    type: "poster",
    preview: template.preview,
  }))
}

export function BasicSettings({ formData, onChange, onNext }: BasicSettingsProps) {
  const [isAccountDialogOpen, setIsAccountDialogOpen] = useState(false)
  const [isMaterialDialogOpen, setIsMaterialDialogOpen] = useState(false)
  const [isQRCodeOpen, setIsQRCodeOpen] = useState(false)
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const [previewImage, setPreviewImage] = useState("")
  const [accounts] = useState<Account[]>(generateRandomAccounts(50))
  const [materials] = useState<Material[]>(generatePosterMaterials())
  const [selectedAccounts, setSelectedAccounts] = useState<Account[]>(
    formData.accounts?.length > 0 ? formData.accounts : [],
  )
  const [selectedMaterials, setSelectedMaterials] = useState<Material[]>(
    formData.materials?.length > 0 ? formData.materials : [],
  )
  const [showAllScenarios, setShowAllScenarios] = useState(false)

  useEffect(() => {
    if (!formData.planName) {
      if (formData.materials?.length > 0) {
        const today = new Date().toLocaleDateString("zh-CN").replace(/\//g, "")
        onChange({ ...formData, planName: `海报${today}` })
      } else {
        onChange({ ...formData, planName: "场景" })
      }
    }
  }, [formData, formData.materials, onChange])

  const handleScenarioSelect = (scenarioId: string) => {
    onChange({ ...formData, scenario: scenarioId })
  }

  const handleAccountSelect = (account: Account) => {
    const updatedAccounts = [...selectedAccounts, account]
    setSelectedAccounts(updatedAccounts)
    onChange({ ...formData, accounts: updatedAccounts })
  }

  const handleMaterialSelect = (material: Material) => {
    const updatedMaterials = [material]
    setSelectedMaterials(updatedMaterials)
    onChange({ ...formData, materials: updatedMaterials })
    setIsMaterialDialogOpen(false)

    // 更新计划名称
    const today = new Date().toLocaleDateString("zh-CN").replace(/\//g, "")
    onChange({ ...formData, planName: `海报${today}`, materials: updatedMaterials })
  }

  const handleRemoveAccount = (accountId: string) => {
    const updatedAccounts = selectedAccounts.filter((a) => a.id !== accountId)
    setSelectedAccounts(updatedAccounts)
    onChange({ ...formData, accounts: updatedAccounts })
  }

  const handleRemoveMaterial = (materialId: string) => {
    const updatedMaterials = selectedMaterials.filter((m) => m.id !== materialId)
    setSelectedMaterials(updatedMaterials)
    onChange({ ...formData, materials: updatedMaterials })
  }

  const handlePreviewImage = (imageUrl: string) => {
    setPreviewImage(imageUrl)
    setIsPreviewOpen(true)
  }

  const displayedScenarios = showAllScenarios ? scenarios : scenarios.slice(0, 3)

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div>
          <Label className="text-base mb-4 block">获客场景</Label>
          <div className="grid grid-cols-3 gap-2">
            {displayedScenarios.map((scenario) => (
              <button
                key={scenario.id}
                className={`p-2 rounded-lg text-center transition-all ${
                  formData.scenario === scenario.id
                    ? "bg-blue-100 text-blue-600 font-medium"
                    : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                }`}
                onClick={() => handleScenarioSelect(scenario.id)}
              >
                {scenario.name}
              </button>
            ))}
          </div>
          {!showAllScenarios && (
            <Button variant="ghost" className="mt-2 w-full text-blue-600" onClick={() => setShowAllScenarios(true)}>
              展开更多选项 <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>

        <div>
          <Label htmlFor="planName">计划名称</Label>
          <Input
            id="planName"
            value={formData.planName}
            onChange={(e) => onChange({ ...formData, planName: e.target.value })}
            placeholder="请输入计划名称"
            className="mt-2"
          />
        </div>

        {formData.scenario && (
          <>
            {scenarios.find((s) => s.id === formData.scenario)?.type === "social" && (
              <div>
                <Label>绑定账号</Label>
                <div className="flex gap-2 mt-2">
                  <Button
                    variant="outline"
                    className="flex-1 justify-start"
                    onClick={() => setIsAccountDialogOpen(true)}
                  >
                    {selectedAccounts.length > 0 ? `已选择 ${selectedAccounts.length} 个账号` : "选择账号"}
                  </Button>
                  <Button variant="outline" size="icon" onClick={() => setIsQRCodeOpen(true)}>
                    <QrCode className="h-4 w-4" />
                  </Button>
                </div>
                {selectedAccounts.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {selectedAccounts.map((account) => (
                      <div key={account.id} className="flex items-center bg-gray-100 rounded-full px-3 py-1">
                        <img
                          src={account.avatar || "/placeholder.svg"}
                          alt={account.nickname}
                          className="w-4 h-4 rounded-full mr-2"
                        />
                        <span className="text-sm">{account.nickname}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="ml-2 p-0"
                          onClick={() => handleRemoveAccount(account.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {scenarios.find((s) => s.id === formData.scenario)?.type === "material" && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <Label>选择海报</Label>
                  <Button variant="outline" onClick={() => setIsMaterialDialogOpen(true)}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                {/* 海报展示区域 */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {materials.map((material) => (
                    <div
                      key={material.id}
                      className={`relative cursor-pointer rounded-lg overflow-hidden group ${
                        selectedMaterials.find((m) => m.id === material.id)
                          ? "ring-2 ring-blue-600"
                          : "hover:ring-2 hover:ring-blue-600"
                      }`}
                      onClick={() => handleMaterialSelect(material)}
                    >
                      <img
                        src={material.preview || "/placeholder.svg"}
                        alt={material.name}
                        className="w-full aspect-[9/16] object-cover"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={(e) => {
                            e.stopPropagation()
                            handlePreviewImage(material.preview)
                          }}
                        >
                          <Maximize2 className="h-4 w-4 text-white" />
                        </Button>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-2 bg-black/50 text-white">
                        <div className="text-sm truncate">{material.name}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {selectedMaterials.length > 0 && (
                  <div className="mt-4">
                    <Label>已选择的海报</Label>
                    <div className="mt-2">
                      <div className="relative w-full max-w-[200px]">
                        <img
                          src={selectedMaterials[0].preview || "/placeholder.svg"}
                          alt={selectedMaterials[0].name}
                          className="w-full aspect-[9/16] object-cover rounded-lg cursor-pointer"
                          onClick={() => handlePreviewImage(selectedMaterials[0].preview)}
                        />
                        <Button
                          variant="secondary"
                          size="sm"
                          className="absolute top-2 right-2"
                          onClick={() => handleRemoveMaterial(selectedMaterials[0].id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </>
        )}

        <div className="flex items-center justify-between">
          <Label htmlFor="enabled">是否启用</Label>
          <Switch
            id="enabled"
            checked={formData.enabled}
            onCheckedChange={(checked) => onChange({ ...formData, enabled: checked })}
          />
        </div>

        <Button className="w-full h-12 text-base" onClick={onNext}>
          下一步
        </Button>
      </div>

      {/* 账号选择对话框 */}
      <Dialog open={isAccountDialogOpen} onOpenChange={setIsAccountDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>选择账号</DialogTitle>
          </DialogHeader>
          <div className="mt-4 max-h-[400px] overflow-y-auto">
            <div className="space-y-2">
              {accounts.map((account) => (
                <div
                  key={account.id}
                  className="flex items-center space-x-3 p-3 hover:bg-gray-100 rounded-lg cursor-pointer"
                  onClick={() => handleAccountSelect(account)}
                >
                  <img src={account.avatar || "/placeholder.svg"} alt="" className="w-10 h-10 rounded-full" />
                  <span className="flex-1">{account.nickname}</span>
                  {selectedAccounts.find((a) => a.id === account.id) && (
                    <div className="w-4 h-4 rounded-full bg-blue-600" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* 二维码对话框 */}
      <Dialog open={isQRCodeOpen} onOpenChange={setIsQRCodeOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>绑定账号</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center p-6">
            <div className="w-64 h-64 bg-gray-100 rounded-lg flex items-center justify-center">
              <img src="/placeholder.svg?height=256&width=256" alt="二维码" className="w-full h-full" />
            </div>
            <p className="mt-4 text-sm text-gray-600">请用相应的APP扫码</p>
          </div>
        </DialogContent>
      </Dialog>

      {/* 图片预览对话框 */}
      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="sm:max-w-3xl">
          <DialogHeader>
            <DialogTitle>海报预览</DialogTitle>
          </DialogHeader>
          <div className="flex justify-center items-center p-4">
            <img src={previewImage || "/placeholder.svg"} alt="预览" className="max-h-[80vh] object-contain" />
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  )
}

