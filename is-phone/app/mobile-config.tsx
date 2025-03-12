"use client"

import { useEffect } from "react"

export default function MobileConfig() {
  useEffect(() => {
    // 添加移动端视口设置
    const meta = document.createElement("meta")
    meta.name = "viewport"
    meta.content = "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
    document.head.appendChild(meta)

    // 添加移动端状态栏颜色设置（iOS）
    const metaAppleStatusBar = document.createElement("meta")
    metaAppleStatusBar.name = "apple-mobile-web-app-status-bar-style"
    metaAppleStatusBar.content = "black-translucent"
    document.head.appendChild(metaAppleStatusBar)

    // 添加移动端全屏应用设置（iOS）
    const metaAppleFullscreen = document.createElement("meta")
    metaAppleFullscreen.name = "apple-mobile-web-app-capable"
    metaAppleFullscreen.content = "yes"
    document.head.appendChild(metaAppleFullscreen)

    // 添加移动端应用名称（iOS）
    const metaAppleName = document.createElement("meta")
    metaAppleName.name = "apple-mobile-web-app-title"
    metaAppleName.content = "艺施AI助理"
    document.head.appendChild(metaAppleName)

    // 添加移动端主题颜色
    const metaThemeColor = document.createElement("meta")
    metaThemeColor.name = "theme-color"
    metaThemeColor.content = "#000000"
    document.head.appendChild(metaThemeColor)

    // 添加移动端应用图标（iOS）
    const linkAppleIcon = document.createElement("link")
    linkAppleIcon.rel = "apple-touch-icon"
    linkAppleIcon.href = "/app-icon.png"
    document.head.appendChild(linkAppleIcon)

    // 添加移动端启动画面（iOS）
    const linkAppleSplash = document.createElement("link")
    linkAppleSplash.rel = "apple-touch-startup-image"
    linkAppleSplash.href = "/splash-screen.png"
    document.head.appendChild(linkAppleSplash)

    // 添加移动端应用清单（Android）
    const linkManifest = document.createElement("link")
    linkManifest.rel = "manifest"
    linkManifest.href = "/manifest.json"
    document.head.appendChild(linkManifest)

    // 禁用双击缩放
    document.addEventListener(
      "touchstart",
      (event) => {
        if (event.touches.length > 1) {
          event.preventDefault()
        }
      },
      { passive: false },
    )

    let lastTouchEnd = 0
    document.addEventListener(
      "touchend",
      (event) => {
        const now = Date.now()
        if (now - lastTouchEnd <= 300) {
          event.preventDefault()
        }
        lastTouchEnd = now
      },
      { passive: false },
    )
  }, [])

  return null
}

