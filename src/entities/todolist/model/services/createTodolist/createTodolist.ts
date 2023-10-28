import { AddTodoList } from '../../actions/todolist.actions'

import { AppThunk } from 'app/providers/store'
import { notificationActions, handleServerError, handleNetworkError } from 'entities/notification'
import { ResultCodes } from 'shared/api/types/todolist'

export const createTodolist =
  (title: string): AppThunk =>
  async (dispatch, _, extra) => {
    const { todolistAPI } = extra
    dispatch(notificationActions.setStatus('loading'))
    try {
      const response = await todolistAPI.createTodolist(title)
      if (response.data.resultCode === ResultCodes.Success) {
        dispatch(AddTodoList(response.data.data.item))
        dispatch(notificationActions.setStatus('succeed'))
      } else {
        handleServerError(response.data, dispatch)
      }
    } catch (e: any) {
      handleNetworkError(e.message, dispatch)
    }
  }
