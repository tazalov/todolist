import { createAsyncThunk } from '@reduxjs/toolkit'

import { CreateTaskParams } from '../../../api/tasks.api'
import { Task } from '../../types/TasksSchema'

import { ThunkConfig } from 'app/providers/store'
import { ResultCodes, BaseResponse } from 'shared/api/types/todolist'

export const createTask = createAsyncThunk<Task, CreateTaskParams, ThunkConfig<BaseResponse>>(
  'entities/task/createTask',
  async (args, thunkAPI) => {
    const { extra, rejectWithValue } = thunkAPI

    const response = await extra.tasksAPI.createTask(args)
    if (response.data.resultCode === ResultCodes.Success) {
      return response.data.data.item
    } else {
      return rejectWithValue(response.data)
    }
  },
)
