import { TaskT } from '../types/TasksSchema'

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

export const ChangeTask = (taskId: string, task: TaskT) =>
  ({
    type: 'todolist/tasks/change',
    payload: { taskId, task },
  }) as const
