import { TaskStatus, TaskT } from '../types/TasksSchema'

export const SetTasks = (todolistId: string, tasks: TaskT[]) =>
  ({
    type: 'todolist/tasks/set',
    payload: { todolistId, tasks },
  }) as const

export const AddTask = (task: TaskT) =>
  ({
    type: 'todolist/tasks/add',
    payload: { task },
  }) as const

export const RemoveTask = (todolistId: string, taskId: string) =>
  ({
    type: 'todolist/tasks/remove',
    payload: { todolistId, taskId },
  }) as const

export const ChangeStatusTask = (todolistId: string, taskId: string, status: TaskStatus) =>
  ({
    type: 'todolist/tasks/changeStatus',
    payload: { todolistId, taskId, status },
  }) as const

export const ChangeTitleTask = (todolistId: string, taskId: string, title: string) =>
  ({
    type: 'todolist/tasks/changeTitle',
    payload: { todolistId, taskId, title },
  }) as const
