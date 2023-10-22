import { SetTodoLists } from '../../actions/todolist.actions'
import { AppThunk } from 'app/providers/store'
import { SetStatus } from 'entities/notification'

export const fetchTodoLists = (): AppThunk => async (dispatch, _, extra) => {
  const { todolistAPI } = extra
  dispatch(SetStatus('loading'))
  const response = await todolistAPI.getTodolists()
  dispatch(SetTodoLists(response.data))
  dispatch(SetStatus('succeed'))
}
