import { StateSchema } from 'app/providers/store'
import { TaskT, TasksSchema } from '../types/TasksSchema'
import { TaskModelAPI } from 'api/types/todolist'

export const getSpecificTasks =
  (todoListId: string) =>
  (state: StateSchema): TaskT[] =>
    state.tasks[todoListId]

export const getModelSpecificTask =
  (todoListId: string, taskId: string) =>
  (state: StateSchema): TaskModelAPI | undefined => {
    const task = state.tasks[todoListId].find(el => el.id === taskId)
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
