import { createAsyncThunk } from '@reduxjs/toolkit'

import { Task } from '../../types/TasksSchema'

import { ThunkConfig } from 'app/providers/store'
import { handleNetworkError } from 'entities/notification'

interface FetchTasksReturn {
  todoId: string
  tasks: Task[]
}

export const fetchTasksByTodolistId = createAsyncThunk<FetchTasksReturn, string, ThunkConfig>(
  'entities/task/fetchTasksByTodolistId',
  async (todoId, thunkAPI) => {
    const { extra, dispatch, rejectWithValue } = thunkAPI
    try {
      const response = await extra.tasksAPI.getTasks(todoId)
      if (!response.data.error) {
        return {
          tasks: response.data.items,
          todoId,
        }
      } else {
        handleNetworkError(response.data.error, dispatch)
        return rejectWithValue(null)
      }
    } catch (e) {
      handleNetworkError(e, dispatch)
      return rejectWithValue(null)
    }
  },
)
