import { AppThunk } from 'app/providers/store'
import { RemoveTodolist } from '../../actions/todolist.actions'

export const deleteTodolist =
  (todoListId: string): AppThunk =>
  async (dispatch, _, extra) => {
    const { todolistAPI } = extra
    const response = await todolistAPI.deleteTodolist(todoListId)
    dispatch(RemoveTodolist(todoListId))
  }
