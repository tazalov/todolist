import { AppThunk } from 'app/providers/store/config/store'
import { AddTodoList } from '../../actions/todolist.actions'

export const createTodolist =
  (title: string): AppThunk =>
  async (dispath, _, extra) => {
    const { todolistAPI } = extra
    const response = await todolistAPI.createTodolist(title)
    dispath(AddTodoList(response.data.data.item))
  }
