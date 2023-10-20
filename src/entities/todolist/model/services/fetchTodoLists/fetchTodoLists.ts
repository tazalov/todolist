import { SetTodoLists } from '../../actions/todolist.actions'
import { AppThunk } from 'app/providers/store'

export const fetchTodoLists = (): AppThunk => async (dispatch, _, extra) => {
  const { todolistAPI } = extra
  const response = await todolistAPI.getTodolists()
  dispatch(SetTodoLists(response.data))
}
