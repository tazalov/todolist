import { RootStateT } from 'app/providers/store'
import { TaskT } from '../types/tasks.reducer'

export const getSpecificTasks =
  (todoListId: string) =>
  (state: RootStateT): TaskT[] =>
    state.tasks[todoListId]
