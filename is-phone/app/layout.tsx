import type React from "react"
import type { Metadata } from "next"
import MobileConfig from "./mobile-config"
import "./globals.css"

export const metadata: Metadata = {
  title: "艺施AI助理",
  description: "艺施AI助理 - 您的智能营销助手",
  applicationName: "艺施AI助理",
  appleWebApp: {
    capable: true,
    title: "艺施AI助理",
    statusBarStyle: "black-translucent",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/app-icon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/app-icon.png" }],
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh">
      <body>
        <MobileConfig />
        {children}
      </body>
    </html>
  )
}



import './globals.css'