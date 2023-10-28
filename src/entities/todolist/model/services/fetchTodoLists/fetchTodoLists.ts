import { SetTodoLists } from '../../actions/todolist.actions'

import { AppThunk } from 'app/providers/store'
import { SetStatus, handleNetworkError } from 'entities/notification'

export const fetchTodoLists = (): AppThunk => async (dispatch, _, extra) => {
  const { todolistAPI } = extra
  dispatch(SetStatus('loading'))
  try {
    const response = await todolistAPI.getTodolists()
    dispatch(SetTodoLists(response.data))
    dispatch(SetStatus('succeed'))
  } catch (e: any) {
    handleNetworkError(e.message, dispatch)
  }
}
