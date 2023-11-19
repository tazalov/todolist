import { createAsyncThunk } from '@reduxjs/toolkit'

import { CreateTaskParams } from '../../../api/tasks.api'
import { TaskT } from '../../types/TasksSchema'

import { ThunkConfig } from 'app/providers/store'
import { notificationActions, handleServerError, handleNetworkError } from 'entities/notification'
import { ResultCodes } from 'shared/api/types/todolist'

export const createTask = createAsyncThunk<TaskT, CreateTaskParams, ThunkConfig>(
  'entities/task/createTask',
  async (args, thunkAPI) => {
    const { extra, dispatch, rejectWithValue } = thunkAPI
    dispatch(notificationActions.setNotificationData({ status: 'loading' }))
    try {
      const response = await extra.tasksAPI.createTask(args)
      if (response.data.resultCode === ResultCodes.Success) {
        dispatch(
          notificationActions.setNotificationData({ status: 'succeed', success: `Task "${args.title}" created!` }),
        )
        return response.data.data.item
      } else {
        handleServerError(response.data, dispatch)
        return rejectWithValue(null)
      }
    } catch (e: any) {
      handleNetworkError(e.message, dispatch)
      return rejectWithValue(null)
    }
  },
)
