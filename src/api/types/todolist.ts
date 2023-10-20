import { TaskStatus, TaskPriority } from '../../entities/task'

export type BaseResponseT<T = {}> = {
  resultCode: number
  messages: string[]
  fieldsErrors: string[]
  data: T
}

export type ItemsResponseT<T = {}> = {
  items: T[]
  totalCount: number
  error: string
}

export interface TaskModelAPI {
  description: string
  title: string
  status: TaskStatus
  priority: TaskPriority
  startDate: Date
  deadline: Date
}
