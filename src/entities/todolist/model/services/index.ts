import { createTodolist } from './createTodolist/createTodolist'
import { deleteTodolist } from './deleteTodolist/deleteTodolist'
import { fetchTodoLists } from './fetchTodoLists/fetchTodoLists'
import { updateTitleTodolist } from './updateTitleTodolist/updateTitleTodolist'

import { actions } from '../slice/todolist.slice'

export const todoListActions = {
  fetchTodoLists,
  deleteTodolist,
  createTodolist,
  updateTitleTodolist,
  ...actions,
}
