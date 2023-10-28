import { RemoveTask } from '../../actions/tasks.actions'

import { AppThunk } from 'app/providers/store'
import { notificationActions, handleServerError, handleNetworkError } from 'entities/notification'
import { ResultCodes } from 'shared/api/types/todolist'

export const deleteTask =
  (todoListId: string, taskId: string): AppThunk =>
  async (dispatch, _, extra) => {
    const { tasksAPI } = extra
    dispatch(notificationActions.setStatus('loading'))
    try {
      const response = await tasksAPI.deleteTask(todoListId, taskId)
      if (response.data.resultCode === ResultCodes.Success) {
        dispatch(RemoveTask(todoListId, taskId))
        dispatch(notificationActions.setStatus('succeed'))
      } else {
        handleServerError(response.data, dispatch)
      }
    } catch (e: any) {
      handleNetworkError(e.message, dispatch)
    }
  }
