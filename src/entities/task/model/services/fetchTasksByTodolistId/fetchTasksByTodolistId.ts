import { createAsyncThunk } from '@reduxjs/toolkit'

import { TaskT } from '../../types/TasksSchema'

import { ThunkConfig } from 'app/providers/store'
import { handleNetworkError } from 'entities/notification'

interface FetchTasksReturn {
  todoId: string
  tasks: TaskT[]
}

export const fetchTasksByTodolistId = createAsyncThunk<FetchTasksReturn | void, string, ThunkConfig>(
  'entities/task/fetchTasksByTodolistId',
  async (todoId, thunkAPI) => {
    const { extra, dispatch } = thunkAPI
    try {
      const response = await extra.tasksAPI.getTasks(todoId)
      if (!response.data.error) {
        return {
          tasks: response.data.items,
          todoId,
        }
      } else {
        handleNetworkError(response.data.error, dispatch)
      }
    } catch (e) {
      handleNetworkError((e as Error).message, dispatch)
    }
  },
)
