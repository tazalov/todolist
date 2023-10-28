import { TasksSchema, TaskModelAPI, UpdatedTaskT } from '../types/TasksSchema'

import { StateSchema } from 'app/providers/store'

export const getSpecificTasks =
  (todoListId: string) =>
  (state: StateSchema): UpdatedTaskT[] =>
    state.tasks[todoListId]

export const getModelSpecificTask =
  (todoListId: string, taskId: string) =>
  (state: StateSchema): TaskModelAPI | undefined => {
    const task = state.tasks[todoListId].find((el) => el.id === taskId)
    return task
      ? {
          deadline: task.deadline,
          description: task.description,
          status: task.status,
          priority: task.priority,
          startDate: task.startDate,
          title: task.title,
        }
      : undefined
  }

export const getTasks = (state: StateSchema): TasksSchema => state.tasks
