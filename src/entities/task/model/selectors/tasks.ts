import { StateSchema } from 'app/providers/store'
import { TaskT, TasksSchema } from '../types/TasksSchema'

export const getSpecificTasks =
  (todoListId: string) =>
  (state: StateSchema): TaskT[] =>
    state.tasks[todoListId]

export const getSpecificTask =
  (todoListId: string, taskId: string) =>
  (state: StateSchema): TaskT | undefined => {
    return state.tasks[todoListId].find(el => el.id === taskId)
  }

export const getTasks = (state: StateSchema): TasksSchema => state.tasks
