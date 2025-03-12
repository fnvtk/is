"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Video, Play } from "lucide-react"
import { getPageTutorials } from "@/lib/tutorials"
import type { TutorialVideo } from "@/types/tutorial"

export function AIAssistant() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [tutorials, setTutorials] = useState<TutorialVideo[]>([])
  const [selectedVideo, setSelectedVideo] = useState<TutorialVideo | null>(null)
  const [activeTab, setActiveTab] = useState("tutorials")

  useEffect(() => {
    // 获取当前页面的教程视频
    const pageTutorials = getPageTutorials(pathname)
    setTutorials(pageTutorials)
    setSelectedVideo(pageTutorials[0] || null)
  }, [pathname])

  const handleOpenDialog = () => {
    setIsOpen(true)
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <Button
          size="icon"
          className="fixed bottom-20 right-4 h-12 w-12 rounded-full shadow-lg bg-white hover:bg-gray-50 border z-50"
          onClick={handleOpenDialog}
        >
          <Video className="h-5 w-5 text-gray-600" />
        </Button>
        <DialogContent className="sm:max-w-[640px] p-0">
          <div className="border-b">
            <div className="flex">
              <button
                className={`px-4 py-2 text-sm font-medium ${
                  activeTab === "tutorials" ? "border-b-2 border-primary" : ""
                }`}
                onClick={() => setActiveTab("tutorials")}
              >
                教程视频
              </button>
              <button
                className={`px-4 py-2 text-sm font-medium ${
                  activeTab === "knowledge" ? "border-b-2 border-primary" : ""
                }`}
                onClick={() => setActiveTab("knowledge")}
              >
                知识库
              </button>
              <button
                className={`px-4 py-2 text-sm font-medium ${
                  activeTab === "moments" ? "border-b-2 border-primary" : ""
                }`}
                onClick={() => setActiveTab("moments")}
              >
                朋友圈内容生产
              </button>
            </div>
          </div>

          <ScrollArea className="h-[480px]">
            {activeTab === "tutorials" && (
              <div className="space-y-4">
                {selectedVideo ? (
                  <div>
                    <div className="aspect-video bg-gray-900 relative">
                      <img
                        src={selectedVideo.thumbnailUrl || "/placeholder.svg"}
                        alt={selectedVideo.title}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Button
                          size="icon"
                          variant="ghost"
                          className="w-16 h-16 rounded-full bg-white/10 hover:bg-white/20"
                        >
                          <Play className="h-8 w-8 text-white" />
                        </Button>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold">{selectedVideo.title}</h3>
                      <p className="text-sm text-gray-500 mt-1">{selectedVideo.description}</p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">暂无该页面的教程视频</div>
                )}

                {tutorials.length > 1 && (
                  <div className="p-4 border-t">
                    <h4 className="font-medium mb-4">更多教程视频</h4>
                    <div className="grid grid-cols-2 gap-4">
                      {tutorials
                        .filter((video) => video.id !== selectedVideo?.id)
                        .map((video) => (
                          <div
                            key={video.id}
                            className="cursor-pointer hover:opacity-80"
                            onClick={() => setSelectedVideo(video)}
                          >
                            <div className="aspect-video bg-gray-100 rounded-lg relative overflow-hidden">
                              <img
                                src={video.thumbnailUrl || "/placeholder.svg"}
                                alt={video.title}
                                className="absolute inset-0 w-full h-full object-cover"
                              />
                              <div className="absolute inset-0 flex items-center justify-center">
                                <Play className="h-6 w-6 text-white" />
                              </div>
                            </div>
                            <h5 className="text-sm font-medium mt-2">{video.title}</h5>
                          </div>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === "knowledge" && (
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-4">易思美业中台知识库</h3>
                <div className="space-y-4">
                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium mb-2">客户管理最佳实践</h4>
                    <p className="text-sm text-gray-500">了解如何有效管理和维护客户关系，提高客户满意度和忠诚度。</p>
                    <Button variant="link" className="text-sm p-0 h-auto mt-2">
                      查看详情
                    </Button>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium mb-2">AI营销技巧</h4>
                    <p className="text-sm text-gray-500">探索如何利用AI技术提升营销效果，自动化营销流程。</p>
                    <Button variant="link" className="text-sm p-0 h-auto mt-2">
                      查看详情
                    </Button>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium mb-2">朋友圈内容策略</h4>
                    <p className="text-sm text-gray-500">学习如何创建吸引人的朋友圈内容，提高互动率和转化率。</p>
                    <Button variant="link" className="text-sm p-0 h-auto mt-2">
                      查看详情
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "moments" && (
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-4">朋友圈内容生产</h3>
                <div className="space-y-4">
                  <div className="border rounded-lg p-4">
                    <div className="aspect-video bg-gray-100 rounded-lg mb-3">
                      <img src="/placeholder.svg" alt="朋友圈模板" className="w-full h-full object-cover rounded-lg" />
                    </div>
                    <h4 className="font-medium">产品促销模板</h4>
                    <p className="text-sm text-gray-500 mt-1">适用于新品发布、限时折扣等促销活动</p>
                    <div className="flex gap-2 mt-3">
                      <Button size="sm">加入项目</Button>
                      <Button size="sm" variant="outline">
                        预览
                      </Button>
                    </div>
                  </div>
                  <div className="border rounded-lg p-4">
                    <div className="aspect-video bg-gray-100 rounded-lg mb-3">
                      <img src="/placeholder.svg" alt="朋友圈模板" className="w-full h-full object-cover rounded-lg" />
                    </div>
                    <h4 className="font-medium">行业资讯模板</h4>
                    <p className="text-sm text-gray-500 mt-1">分享行业最新动态，建立专业形象</p>
                    <div className="flex gap-2 mt-3">
                      <Button size="sm">加入项目</Button>
                      <Button size="sm" variant="outline">
                        预览
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </>
  )
}

