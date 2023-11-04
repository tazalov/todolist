import { createAsyncThunk } from '@reduxjs/toolkit'

import { TaskT } from '../../types/TasksSchema'

import { ThunkConfig } from 'app/providers/store'
import { notificationActions, handleServerError, handleNetworkError } from 'entities/notification'
import { ResultCodes } from 'shared/api/types/todolist'

interface CreateTaskParams {
  todoId: string
  title: string
}

export const createTask = createAsyncThunk<TaskT | void, CreateTaskParams, ThunkConfig>(
  'entities/task/createTask',
  async ({ todoId, title }, thunkAPI) => {
    const { extra, dispatch } = thunkAPI
    dispatch(notificationActions.setNotificationData({ status: 'loading' }))
    try {
      const response = await extra.tasksAPI.createTask(todoId, title)
      if (response.data.resultCode === ResultCodes.Success) {
        dispatch(notificationActions.setNotificationData({ status: 'succeed', success: `Task "${title}" created!` }))
        return response.data.data.item
      } else {
        handleServerError(response.data, dispatch)
      }
    } catch (e: any) {
      handleNetworkError(e.message, dispatch)
    }
  },
)
