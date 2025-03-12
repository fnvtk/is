"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Contact {
  id: string
  name: string
  avatar?: string
  status: "online" | "offline" | "away"
  lastSeen?: string
}

interface ContactListProps {
  contacts: Contact[]
  onSelect?: (contact: Contact) => void
}

export function ContactList({ contacts, onSelect }: ContactListProps) {
  return (
    <ScrollArea className="h-[400px] w-full rounded-md border">
      <div className="p-4">
        {contacts.map((contact) => (
          <div
            key={contact.id}
            className="flex items-center justify-between space-x-4 rounded-md p-2 hover:bg-muted/50 cursor-pointer"
            onClick={() => onSelect?.(contact)}
          >
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src={contact.avatar} />
                <AvatarFallback>{contact.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium leading-none">{contact.name}</p>
                {contact.lastSeen && <p className="text-sm text-muted-foreground">Last seen: {contact.lastSeen}</p>}
              </div>
            </div>
            <Badge
              variant={contact.status === "online" ? "default" : contact.status === "away" ? "secondary" : "outline"}
            >
              {contact.status}
            </Badge>
          </div>
        ))}
      </div>
    </ScrollArea>
  )
}

