export type Status = 'idle' | 'loading' | 'succeed' | 'failed'

export interface NotificationSchema {
  status: Status
  error: string | null
}
