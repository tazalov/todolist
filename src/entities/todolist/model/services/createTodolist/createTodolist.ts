import { AppThunk } from 'app/providers/store'
import { AddTodoList } from '../../actions/todolist.actions'

export const createTodolist =
  (title: string): AppThunk =>
  async (dispatch, _, extra) => {
    const { todolistAPI } = extra
    const response = await todolistAPI.createTodolist(title)
    dispatch(AddTodoList(response.data.data.item))
  }
