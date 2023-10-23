import { AppThunk } from 'app/providers/store'
import { AddTask } from '../../actions/tasks.actions'
import { SetStatus, handleServerError, handleNetworkError } from 'entities/notification'
import { ResultCodes } from 'shared/api/types/todolist'

export const createTask =
  (todoListId: string, title: string): AppThunk =>
  async (dispatch, _, extra) => {
    const { tasksAPI } = extra
    dispatch(SetStatus('loading'))
    try {
      const response = await tasksAPI.createTask(todoListId, title)
      if (response.data.resultCode === ResultCodes.Success) {
        dispatch(AddTask(response.data.data.item))
        dispatch(SetStatus('succeed'))
      } else {
        handleServerError(response.data, dispatch)
      }
    } catch (e: any) {
      handleNetworkError(e.message, dispatch)
    }
  }
