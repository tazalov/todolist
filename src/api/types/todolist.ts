export interface TodolistT {
  id: string
  addedDate: string
  order: number
  title: string
}

export interface TaskT {
  description: string
  title: string
  completed: boolean
  status: number
  priority: number
  startDate: Date
  deadline: Date
  id: string
  todoListId: string
  order: number
  addedDate: Date
}

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
