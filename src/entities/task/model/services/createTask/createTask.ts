import { createAsyncThunk } from '@reduxjs/toolkit'

import { CreateTaskParams } from '../../../api/tasks.api'
import { TaskT } from '../../types/TasksSchema'

import { ThunkConfig } from 'app/providers/store'
import { notificationActions, handleServerError, handleNetworkError } from 'entities/notification'
import { ResultCodes } from 'shared/api/types/todolist'
import { getCurrentLang } from 'shared/lib/i18n/getCurrentLang'

export const createTask = createAsyncThunk<TaskT, CreateTaskParams, ThunkConfig>(
  'entities/task/createTask',
  async (args, thunkAPI) => {
    const { extra, dispatch, rejectWithValue } = thunkAPI

    const currentLang = getCurrentLang()

    dispatch(notificationActions.setNotificationData({ status: 'loading' }))

    try {
      const response = await extra.tasksAPI.createTask(args)
      if (response.data.resultCode === ResultCodes.Success) {
        const successMsg = currentLang === 'en' ? `Task "${args.title}" created!` : `Задача "${args.title}" создана!`

        dispatch(notificationActions.setNotificationData({ status: 'succeed', success: successMsg }))

        return response.data.data.item
      } else {
        handleServerError(response.data, dispatch)
        return rejectWithValue(null)
      }
    } catch (e) {
      handleNetworkError(e, dispatch)
      return rejectWithValue(null)
    }
  },
)
