"use client"

import type * as React from "react"
import { Toaster } from "@/components/ui/toaster"

export function NotificationsProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}
      <Toaster />
    </>
  )
}

