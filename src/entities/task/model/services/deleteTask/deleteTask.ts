import { createAsyncThunk } from '@reduxjs/toolkit'

import { ThunkConfig } from 'app/providers/store'
import { notificationActions, handleServerError, handleNetworkError } from 'entities/notification'
import { ResultCodes } from 'shared/api/types/todolist'

interface DeleteTaskParams {
  todoId: string
  taskId: string
}

export const deleteTask = createAsyncThunk<DeleteTaskParams | void, DeleteTaskParams, ThunkConfig>(
  'entities/task/deleteTask',
  async ({ todoId, taskId }, thunkAPI) => {
    const { extra, dispatch } = thunkAPI
    dispatch(notificationActions.setNotificationData({ status: 'loading' }))
    try {
      const response = await extra.tasksAPI.deleteTask(todoId, taskId)
      if (response.data.resultCode === ResultCodes.Success) {
        dispatch(notificationActions.setNotificationData({ status: 'succeed', success: 'Task deleted!' }))
      } else {
        handleServerError(response.data, dispatch)
      }
      return { todoId, taskId }
    } catch (e: any) {
      handleNetworkError(e.message, dispatch)
    }
  },
)
