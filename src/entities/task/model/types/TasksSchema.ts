export interface TaskT {
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

export interface UpdatedTaskT extends TaskT {
  entityStatus: CurrentStatus
}

export interface TasksSchema {
  [todolistId: string]: UpdatedTaskT[]
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

export interface TaskModel {
  description?: string
  title?: string
  status?: TaskStatus
  priority?: TaskPriority
  startDate?: Date
  deadline?: Date
}

export interface TaskModelAPI {
  description: string
  title: string
  status: TaskStatus
  priority: TaskPriority
  startDate: Date
  deadline: Date
}
