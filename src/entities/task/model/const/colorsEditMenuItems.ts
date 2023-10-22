import { TaskStatus } from '../types/TasksSchema'
import { TaskPriority } from '../types/TasksSchema'

export const tasksStatus = {
  [TaskStatus.NEW]: 'NEW',
  [TaskStatus.IN_PROGRESS]: 'IN_PROGRESS',
  [TaskStatus.COMPLETED]: 'COMPLETED',
  [TaskStatus.DRAFT]: 'DRAFT',
}

export const tasksPriority = {
  [TaskPriority.LOW]: 'LOW',
  [TaskPriority.MIDDLE]: 'MIDDLE',
  [TaskPriority.HIGH]: 'HIGH',
  [TaskPriority.URGENTLY]: 'URGENTLY',
  [TaskPriority.LATER]: 'LATER',
}
