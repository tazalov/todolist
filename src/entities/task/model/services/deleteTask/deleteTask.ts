import { createAsyncThunk } from '@reduxjs/toolkit'

import { DeleteTaskParams } from '../../../api/tasks.api'

import { ThunkConfig } from 'app/providers/store'
import { notificationActions, handleServerError, handleNetworkError } from 'entities/notification'
import { ResultCodes } from 'shared/api/types/todolist'

export const deleteTask = createAsyncThunk<DeleteTaskParams, DeleteTaskParams, ThunkConfig>(
  'entities/task/deleteTask',
  async (args, thunkAPI) => {
    const { extra, dispatch, rejectWithValue } = thunkAPI
    dispatch(notificationActions.setNotificationData({ status: 'loading' }))
    try {
      const response = await extra.tasksAPI.deleteTask(args)
      if (response.data.resultCode === ResultCodes.Success) {
        dispatch(notificationActions.setNotificationData({ status: 'succeed', success: 'Task deleted!' }))
      } else {
        handleServerError(response.data, dispatch)
        return rejectWithValue(null)
      }
      return args
    } catch (e) {
      handleNetworkError(e, dispatch)
      return rejectWithValue(null)
    }
  },
)
