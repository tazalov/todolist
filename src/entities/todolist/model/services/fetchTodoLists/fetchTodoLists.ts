import { SetTodoLists } from '../../actions/todolist.actions'

import { AppThunk } from 'app/providers/store'
import { notificationActions, handleNetworkError } from 'entities/notification'

export const fetchTodoLists = (): AppThunk => async (dispatch, _, extra) => {
  const { todolistAPI } = extra
  dispatch(notificationActions.setStatus('loading'))
  try {
    const response = await todolistAPI.getTodolists()
    dispatch(SetTodoLists(response.data))
    dispatch(notificationActions.setStatus('succeed'))
  } catch (e: any) {
    handleNetworkError(e.message, dispatch)
  }
}
