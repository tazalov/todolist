import { TaskPriority } from '../../types/TasksSchema'

export const tasksPriority = {
  [TaskPriority.LOW]: 'LOW',
  [TaskPriority.MIDDLE]: 'MIDDLE',
  [TaskPriority.HIGH]: 'HIGH',
  [TaskPriority.URGENTLY]: 'URGENTLY',
  [TaskPriority.LATER]: 'LATER',
}
