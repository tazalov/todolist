import { createAsyncThunk } from '@reduxjs/toolkit'

import { DeleteTaskParams } from '../../../api/tasks.api'

import { ThunkConfig } from 'app/providers/store'
import { notificationActions, handleServerError, handleNetworkError } from 'entities/notification'
import { ResultCodes } from 'shared/api/types/todolist'
import { getCurrentLang } from 'shared/lib/i18n/getCurrentLang'

export const deleteTask = createAsyncThunk<DeleteTaskParams, DeleteTaskParams, ThunkConfig>(
  'entities/task/deleteTask',
  async (args, thunkAPI) => {
    const { extra, dispatch, rejectWithValue } = thunkAPI

    const currentLang = getCurrentLang()

    dispatch(notificationActions.setNotificationData({ status: 'loading' }))
    try {
      const response = await extra.tasksAPI.deleteTask(args)
      if (response.data.resultCode === ResultCodes.Success) {
        const successMsg = currentLang === 'en' ? 'Task deleted!' : `Задача удалена!`

        dispatch(notificationActions.setNotificationData({ status: 'succeed', success: successMsg }))
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
