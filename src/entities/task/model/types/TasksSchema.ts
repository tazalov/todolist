export interface Task {
  description: string
  title: string
  status: TaskStatus
  priority: TaskPriority
  startDate: Date
  deadline: Date
  id: string
  todoListId: string
  order: number
  addedDate: Date
}

export interface UpdatedTask extends Task {
  entityStatus: CurrentStatus
}

export type TasksItems = Record<string, UpdatedTask[]>

export interface TasksSchema {
  items: TasksItems
  isLoading: boolean
}

export enum TaskStatus {
  NEW = 0,
  IN_PROGRESS = 1,
  COMPLETED = 2,
  DRAFT = 3,
}

export enum TaskPriority {
  LOW = 0,
  MIDDLE = 1,
  HIGH = 2,
  URGENTLY = 3,
  LATER = 4,
}

export interface TaskModelAPI {
  description: string
  title: string
  status: TaskStatus
  priority: TaskPriority
  startDate: Date
  deadline: Date
}

export type TaskModel = Partial<TaskModelAPI>
