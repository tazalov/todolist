import { RootStateT } from 'app/providers'
import { TasksST } from '../types/tasks.reducer'

export const getTasksState = (state: RootStateT): TasksST => state.tasks
