"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronRight, Gift, Star } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Step {
  title: string
  description: string
  icon: React.ReactNode
  action: string
}

const steps: Step[] = [
  {
    title: "绑定账号",
    description: "添加您的第一个微信账号，开启自动化之旅",
    icon: <Star className="w-6 h-6 text-yellow-500" />,
    action: "立即绑定",
  },
  {
    title: "设置自动回复",
    description: "配置智能回复模板，让AI助手帮您处理消息",
    icon: <ChevronRight className="w-6 h-6 text-blue-500" />,
    action: "去设置",
  },
  {
    title: "领取奖励",
    description: "完成新手任务即可获得500点免费流量",
    icon: <Gift className="w-6 h-6 text-pink-500" />,
    action: "领取奖励",
  },
]

export function WelcomeGuide() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      setIsVisible(false)
    }
  }

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl"
        >
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 mb-4">
            {steps[currentStep].icon}
          </div>

          <h2 className="text-xl font-semibold mb-2">{steps[currentStep].title}</h2>

          <p className="text-gray-600 mb-6">{steps[currentStep].description}</p>

          <div className="flex items-center justify-between">
            <div className="flex space-x-2">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full ${index === currentStep ? "bg-blue-500" : "bg-gray-200"}`}
                />
              ))}
            </div>

            <Button onClick={handleNext}>{steps[currentStep].action}</Button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

