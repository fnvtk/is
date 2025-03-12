"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Search, Filter } from "lucide-react"

interface ContactFiltersProps {
  onSearch: (query: string) => void
  onFilter: (filter: string) => void
}

export function ContactFilters({ onSearch, onFilter }: ContactFiltersProps) {
  return (
    <div className="flex items-center space-x-2 mb-4">
      <div className="relative flex-1">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search contacts..." className="pl-8" onChange={(e) => onSearch(e.target.value)} />
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => onFilter("all")}>All Contacts</DropdownMenuItem>
          <DropdownMenuItem onClick={() => onFilter("online")}>Online</DropdownMenuItem>
          <DropdownMenuItem onClick={() => onFilter("offline")}>Offline</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

