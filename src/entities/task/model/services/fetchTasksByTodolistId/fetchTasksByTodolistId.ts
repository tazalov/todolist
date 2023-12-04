import { createAsyncThunk } from '@reduxjs/toolkit'

import { Task } from '../../types/TasksSchema'

import { ThunkConfig } from 'app/providers/store'
import { ItemsResponse } from 'shared/api/types/todolist'

interface FetchTasksReturn {
  todoId: string
  tasks: Task[]
}

export const fetchTasksByTodolistId = createAsyncThunk<FetchTasksReturn, string, ThunkConfig<ItemsResponse>>(
  'entities/task/fetchTasksByTodolistId',
  async (todoId, thunkAPI) => {
    const { extra, rejectWithValue } = thunkAPI
    const response = await extra.tasksAPI.getTasks(todoId)
    if (!response.data.error) {
      return {
        tasks: response.data.items,
        todoId,
      }
    } else {
      return rejectWithValue(response.data)
    }
  },
)
