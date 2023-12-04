import { createAsyncThunk } from '@reduxjs/toolkit'

import { DeleteTaskParams } from '../../../api/tasks.api'

import { ThunkConfig } from 'app/providers/store'
import { ResultCodes, BaseResponse } from 'shared/api/types/todolist'

export const deleteTask = createAsyncThunk<DeleteTaskParams, DeleteTaskParams, ThunkConfig<BaseResponse>>(
  'entities/task/deleteTask',
  async (args, thunkAPI) => {
    const { extra, rejectWithValue } = thunkAPI

    const response = await extra.tasksAPI.deleteTask(args)
    if (response.data.resultCode === ResultCodes.Success) {
      return args
    } else {
      return rejectWithValue(response.data)
    }
  },
)
