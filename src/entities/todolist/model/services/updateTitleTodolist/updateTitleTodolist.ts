import { ChangeTodolist } from '../../actions/todolist.actions'

import { AppThunk } from 'app/providers/store'
import { notificationActions, handleServerError, handleNetworkError } from 'entities/notification'
import { ResultCodes } from 'shared/api/types/todolist'

export const updateTitleTodolist =
  (todoListId: string, title: string): AppThunk =>
  async (dispatch, _, extra) => {
    const { todolistAPI } = extra
    dispatch(notificationActions.setStatus('loading'))
    dispatch(ChangeTodolist(todoListId, { entityStatus: 'loading' }))
    try {
      const response = await todolistAPI.updateTodolist(todoListId, title)
      if (response.data.resultCode === ResultCodes.Success) {
        dispatch(ChangeTodolist(todoListId, { title, entityStatus: 'succeed' }))
        dispatch(notificationActions.setStatus('succeed'))
      } else {
        handleServerError(response.data, dispatch)
        dispatch(ChangeTodolist(todoListId, { entityStatus: 'failed' }))
      }
    } catch (e: any) {
      handleNetworkError(e.message, dispatch)
      dispatch(ChangeTodolist(todoListId, { entityStatus: 'failed' }))
    }
  }
