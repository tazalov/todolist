import { AppThunk } from 'app/providers/store'
import { ChangeTodolist } from '../../actions/todolist.actions'

export const updateTitleTodolist =
  (todoListId: string, title: string): AppThunk =>
  async (dispatch, _, extra) => {
    const { todolistAPI } = extra
    const response = await todolistAPI.updateTodolist(todoListId, title)
    dispatch(ChangeTodolist(todoListId, { title }))
  }
