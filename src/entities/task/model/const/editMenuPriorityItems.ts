import { TaskPriority, TaskStatus } from '../types/TasksSchema'

export interface SelectMenuItems {
  name: string
  value: number
  bgc?: TaskPriority | TaskStatus
}

export const editMenuPriorityItems: SelectMenuItems[] = [
  { name: 'Low', value: 0, bgc: TaskPriority.LOW },
  { name: 'Middle', value: 1, bgc: TaskPriority.MIDDLE },
  { name: 'High', value: 2, bgc: TaskPriority.HIGH },
  { name: 'Urgently', value: 3, bgc: TaskPriority.URGENTLY },
  { name: 'Later', value: 4, bgc: TaskPriority.LATER },
]

export const editMenuStatusItems: SelectMenuItems[] = [
  { name: 'New', value: 0, bgc: TaskStatus.NEW },
  { name: 'In progress', value: 1, bgc: TaskStatus.IN_PROGRESS },
  { name: 'Completed', value: 2, bgc: TaskStatus.COMPLETED },
  { name: 'Draft', value: 3, bgc: TaskStatus.DRAFT },
]
