// 场景类型定义
export type ScenarioType = "social" | "material" | "api"
export type ScenarioChannel = "douyin" | "kuaishou" | "xiaohongshu" | "weibo" | "weixinqun" | "gongzhonghao"
export type ScenarioStatus = "running" | "paused" | "completed" | "failed"
export type MessageType = "text" | "image" | "video" | "file" | "miniprogram" | "link" | "group"
export type RemarkType = "phone" | "nickname" | "source"

// 基础信息接口
export interface ScenarioBase {
  id: string
  name: string
  channel: ScenarioChannel
  type: ScenarioType
  status: ScenarioStatus
  enabled: boolean
  createdAt: string
  updatedAt: string
  creator: string
}

// 场景设备和账号
export interface ScenarioDevice {
  id: string
  name: string
  status: "online" | "offline"
  lastActive: string
  boundAccounts: string[]
}

export interface ScenarioAccount {
  id: string
  nickname: string
  avatar: string
  status: "online" | "offline"
  deviceId?: string
  type: ScenarioChannel
  lastSync: string
}

// 获客计划配置
export interface AcquisitionPlanConfig {
  // 基础设置
  planName: string
  scenario: ScenarioChannel
  accounts: ScenarioAccount[]
  materials?: Material[]
  enabled: boolean

  // 好友申请设置
  remarkType: RemarkType
  remarkKeyword: string
  greeting: string
  addFriendTimeStart: string
  addFriendTimeEnd: string
  addFriendInterval: number // 分钟
  maxDailyFriends: number
  selectedDevices: string[]

  // 标签设置
  tags: Tag[]
  teamMembers: TeamMember[]
}

// 消息内容
export interface MessageContent {
  id: string
  type: MessageType
  content: string
  sendInterval?: number
  intervalUnit?: "seconds" | "minutes"
  title?: string
  description?: string
  address?: string
  coverImage?: string
  groupId?: string
}

// 消息计划
export interface MessagePlan {
  day: number // 0表示即时消息
  messages: MessageContent[]
}

// 素材
export interface Material {
  id: string
  name: string
  type: "poster" | "payment" | "video"
  preview: string
  content?: string
  size?: number
  createTime: string
  updateTime: string
}

// 标签
export interface Tag {
  id: string
  name: string
  color?: string
  description?: string
  count: number
  createTime: string
}

// 团队成员
export interface TeamMember {
  id: string
  name: string
  role: "leader" | "member"
  status: "active" | "inactive"
  permissions: string[]
  createTime: string
}

// 执行统计
export interface ScenarioStats {
  devices: number
  acquired: number
  added: number
  passRate: number
  trend: Array<{
    date: string
    customers: number
  }>
}

// 执行记录
export interface ExecutionRecord {
  id: string
  planId: string
  deviceId: string
  accountId: string
  action: "add_friend" | "send_message" | "join_group"
  status: "success" | "failed"
  errorMessage?: string
  createTime: string
}

// API 请求响应
export interface ApiResponse<T> {
  code: number
  message: string
  data: T
}

// 分页请求参数
export interface PaginationParams {
  page: number
  pageSize: number
  sortBy?: string
  sortOrder?: "asc" | "desc"
}

// 分页响应数据
export interface PaginatedResponse<T> {
  items: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

// 获客计划查询参数
export interface ScenarioQueryParams extends PaginationParams {
  channel?: ScenarioChannel
  status?: ScenarioStatus
  keyword?: string
  dateRange?: {
    start: string
    end: string
  }
  tags?: string[]
}

// API 路径
export const API_PATHS = {
  SCENARIOS: "/api/scenarios",
  DEVICES: "/api/devices",
  ACCOUNTS: "/api/accounts",
  MATERIALS: "/api/materials",
  TAGS: "/api/tags",
  TEAM: "/api/team",
  STATS: "/api/stats",
  EXECUTIONS: "/api/executions",
} as const

// WebSocket 事件
export enum WsEvent {
  DEVICE_STATUS = "device_status",
  EXECUTION_STATUS = "execution_status",
  STATS_UPDATE = "stats_update",
  ERROR = "error",
}

// WebSocket 消息
export interface WsMessage<T = any> {
  event: WsEvent
  data: T
  timestamp: number
}

