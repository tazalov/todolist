export interface NotificationSchema {
  status: CurrentStatus
  error?: string
  success?: string
}

export interface NotificationData {
  error?: string
  success?: string
  status: CurrentStatus
}
