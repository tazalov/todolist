import { TaskPriority } from '../types/TasksSchema'

export interface SelectMenuItems {
  name: string
  value: number
  bgc?: TaskPriority
}

export const editMenuPriorityItems: SelectMenuItems[] = [
  { name: 'Low', value: 0, bgc: TaskPriority.LOW },
  { name: 'Middle', value: 1, bgc: TaskPriority.MIDDLE },
  { name: 'High', value: 2, bgc: TaskPriority.HIGH },
  { name: 'Urgently', value: 3, bgc: TaskPriority.URGENTLY },
  { name: 'Later', value: 4, bgc: TaskPriority.LATER },
]

export const editMenuStatusItems: SelectMenuItems[] = [
  { name: 'New', value: 0 },
  { name: 'In progress', value: 1 },
  { name: 'Completed', value: 2 },
  { name: 'Draft', value: 3 },
]
