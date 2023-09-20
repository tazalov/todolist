export const AddTask = (todolistId: string, title: string) =>
  ({
    type: 'todolist/tasks/add',
    payload: { todolistId, title },
  }) as const

export const RemoveTask = (todolistId: string, taskId: string) =>
  ({
    type: 'todolist/tasks/remove',
    payload: { todolistId, taskId },
  }) as const

export const ChangeStatusTask = (todolistId: string, taskId: string, isDone: boolean) =>
  ({
    type: 'todolist/tasks/changeStatus',
    payload: { todolistId, taskId, isDone },
  }) as const

export const ChangeTitleTask = (todolistId: string, taskId: string, title: string) =>
  ({
    type: 'todolist/tasks/changeTitle',
    payload: { todolistId, taskId, title },
  }) as const
