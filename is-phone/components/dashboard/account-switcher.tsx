"use client"

import { useState } from "react"
import { ChevronDown, Plus, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface Account {
  id: string
  name: string
  avatar?: string
  status: "online" | "offline"
}

const accounts: Account[] = [
  {
    id: "1",
    name: "微信号1",
    avatar: "/placeholder.svg",
    status: "online",
  },
  {
    id: "2",
    name: "微信号2",
    avatar: "/placeholder.svg",
    status: "offline",
  },
]

export function AccountSwitcher() {
  const [selectedAccount, setSelectedAccount] = useState<Account>(accounts[0])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="w-full justify-start">
          <Avatar className="h-6 w-6 mr-2">
            <AvatarImage src={selectedAccount.avatar} />
            <AvatarFallback>{selectedAccount.name[0]}</AvatarFallback>
          </Avatar>
          {selectedAccount.name}
          <ChevronDown className="ml-auto h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        {accounts.map((account) => (
          <DropdownMenuItem key={account.id} onClick={() => setSelectedAccount(account)} className="flex items-center">
            <Avatar className="h-6 w-6 mr-2">
              <AvatarImage src={account.avatar} />
              <AvatarFallback>{account.name[0]}</AvatarFallback>
            </Avatar>
            <span className="flex-1">{account.name}</span>
            <span className={`w-2 h-2 rounded-full ${account.status === "online" ? "bg-green-500" : "bg-gray-300"}`} />
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Plus className="mr-2 h-4 w-4" />
          添加账号
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Settings className="mr-2 h-4 w-4" />
          账号设置
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

