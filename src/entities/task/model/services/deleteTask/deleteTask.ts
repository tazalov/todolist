import { AppThunk } from 'app/providers/store'
import { RemoveTask } from '../../actions/tasks.actions'
import { SetStatus, handleServerError, handleNetworkError } from 'entities/notification'
import { ResultCodes } from 'shared/api/types/todolist'

export const deleteTask =
  (todoListId: string, taskId: string): AppThunk =>
  async (dispatch, _, extra) => {
    const { tasksAPI } = extra
    dispatch(SetStatus('loading'))
    try {
      const response = await tasksAPI.deleteTask(todoListId, taskId)
      if (response.data.resultCode === ResultCodes.Success) {
        dispatch(RemoveTask(todoListId, taskId))
        dispatch(SetStatus('succeed'))
      } else {
        handleServerError(response.data, dispatch)
      }
    } catch (e: any) {
      handleNetworkError(e.message, dispatch)
    }
  }
