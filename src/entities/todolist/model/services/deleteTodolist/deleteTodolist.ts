import { changeTodoList, removeTodoList } from '../../slice/todolist.slice'

import { AppThunk } from 'app/providers/store'
import { notificationActions, handleServerError, handleNetworkError } from 'entities/notification'
import { ResultCodes } from 'shared/api/types/todolist'

export const deleteTodolist =
  (todoId: string): AppThunk =>
  async (dispatch, _, extra) => {
    const { todolistAPI } = extra
    dispatch(notificationActions.setStatus('loading'))
    dispatch(changeTodoList({ todoId, model: { entityStatus: 'loading' } }))
    try {
      const response = await todolistAPI.deleteTodolist(todoId)
      if (response.data.resultCode === ResultCodes.Success) {
        dispatch(removeTodoList(todoId))
        dispatch(notificationActions.setStatus('succeed'))
      } else {
        handleServerError(response.data, dispatch)
      }
    } catch (e: any) {
      handleNetworkError(e.message, dispatch)
    }
  }
