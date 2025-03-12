"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { UserPlus, X } from "lucide-react"

interface TeamMember {
  id: string
  name: string
  role: string
  status: "active" | "inactive"
}

interface TagSettingsProps {
  formData: any
  onChange: (data: any) => void
  onComplete: () => void
}

export function TagSettings({ formData, onChange, onComplete }: TagSettingsProps) {
  const router = useRouter()
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(formData.teamMembers || [])
  const [selectedRole, setSelectedRole] = useState("member")
  const [newMemberName, setNewMemberName] = useState("")

  const handleAddMember = () => {
    if (newMemberName.trim()) {
      const newMember: TeamMember = {
        id: Date.now().toString(),
        name: newMemberName,
        role: selectedRole,
        status: "active",
      }
      const updatedMembers = [...teamMembers, newMember]
      setTeamMembers(updatedMembers)
      onChange({ ...formData, teamMembers: updatedMembers })
      setNewMemberName("")
    }
  }

  const handleRemoveMember = (id: string) => {
    const updatedMembers = teamMembers.filter((member) => member.id !== id)
    setTeamMembers(updatedMembers)
    onChange({ ...formData, teamMembers: updatedMembers })
  }

  const handleToggleStatus = (id: string) => {
    const updatedMembers = teamMembers.map((member) => {
      if (member.id === id) {
        return {
          ...member,
          status: member.status === "active" ? "inactive" : "active",
        }
      }
      return member
    })
    setTeamMembers(updatedMembers)
    onChange({ ...formData, teamMembers: updatedMembers })
  }

  const handleComplete = () => {
    // 根据选择的标签确定跳转目标
    const targetPath = formData.tag ? `/scenarios/${formData.tag}` : "/scenarios"
    router.push(targetPath)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">打粉团队配置</h3>
      </div>

      <Card className="p-4">
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <Input
                value={newMemberName}
                onChange={(e) => setNewMemberName(e.target.value)}
                placeholder="输入成员名称"
              />
            </div>
            <Select value={selectedRole} onValueChange={setSelectedRole}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="选择角色" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="leader">组长</SelectItem>
                <SelectItem value="member">组员</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={handleAddMember}>
              <UserPlus className="h-4 w-4 mr-2" />
              添加成员
            </Button>
          </div>

          <div className="space-y-2">
            {teamMembers.map((member) => (
              <div key={member.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{member.name}</span>
                  <Badge variant="outline">{member.role === "leader" ? "组长" : "组员"}</Badge>
                  <Badge
                    variant={member.status === "active" ? "default" : "secondary"}
                    className="cursor-pointer"
                    onClick={() => handleToggleStatus(member.id)}
                  >
                    {member.status === "active" ? "已启用" : "已停用"}
                  </Badge>
                </div>
                <Button variant="ghost" size="sm" onClick={() => handleRemoveMember(member.id)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleComplete} className="w-24">
          完成
        </Button>
      </div>
    </div>
  )
}

