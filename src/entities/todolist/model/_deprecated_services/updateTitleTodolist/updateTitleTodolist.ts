import { changeTodoList } from '../../slice/todolist.slice'

import { AppThunk } from 'app/providers/store'
import { notificationActions, handleServerError, handleNetworkError } from 'entities/notification'
import { ResultCodes } from 'shared/api/types/todolist'

export const updateTitleTodolist =
  (todoId: string, title: string): AppThunk =>
  async (dispatch, _, extra) => {
    const { todolistAPI } = extra
    dispatch(notificationActions.setStatus('loading'))
    dispatch(changeTodoList({ todoId, model: { entityStatus: 'loading' } }))
    try {
      const response = await todolistAPI.updateTodolist(todoId, title)
      if (response.data.resultCode === ResultCodes.Success) {
        dispatch(changeTodoList({ todoId, model: { title, entityStatus: 'succeed' } }))
        dispatch(notificationActions.setStatus('succeed'))
      } else {
        handleServerError(response.data, dispatch)
        dispatch(changeTodoList({ todoId, model: { entityStatus: 'failed' } }))
      }
    } catch (e: any) {
      handleNetworkError(e.message, dispatch)
      dispatch(changeTodoList({ todoId, model: { entityStatus: 'failed' } }))
    }
  }
