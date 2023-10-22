import { Status } from '../types/NotificationSchema'

export const SetStatus = (status: Status) =>
  ({
    type: 'todolist/notification/status/set',
    payload: { status },
  }) as const

export const SetError = (error: string | null) =>
  ({
    type: 'todolist/notification/error/set',
    payload: { error },
  }) as const
