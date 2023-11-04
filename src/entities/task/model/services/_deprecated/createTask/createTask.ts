import { taskActions } from '../../../slice/task.slice'

import { AppThunk } from 'app/providers/store'
import { notificationActions, handleServerError, handleNetworkError } from 'entities/notification'
import { ResultCodes } from 'shared/api/types/todolist'

export const createTask =
  (todoId: string, title: string): AppThunk =>
  async (dispatch, _, extra) => {
    const { tasksAPI } = extra
    dispatch(notificationActions.setStatus('loading'))
    try {
      const response = await tasksAPI.createTask(todoId, title)
      if (response.data.resultCode === ResultCodes.Success) {
        //dispatch(taskActions.addTask(response.data.data.item))
        dispatch(notificationActions.setStatus('succeed'))
      } else {
        handleServerError(response.data, dispatch)
      }
    } catch (e: any) {
      handleNetworkError(e.message, dispatch)
    }
  }
