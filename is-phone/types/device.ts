export interface Device {
  id: string
  imei: string
  name: string
  status: "online" | "offline"
  wechatId: string
  usedInPlans: number
}

export interface DeviceResponse {
  code: number
  message: string
  data: {
    devices: Device[]
    total: number
  }
}

export interface DeviceSelectResponse {
  code: number
  message: string
  data: {
    success: boolean
    deviceIds: string[]
  }
}

