import { createTodolist } from './createTodolist/createTodolist'
import { deleteTodolist } from './deleteTodolist/deleteTodolist'
import { fetchTodoLists } from './fetchTodoLists/fetchTodoLists'
import { updateTitleTodolist } from './updateTitleTodolist/updateTitleTodolist'

export const todoListThunks = {
  fetchTodoLists,
  deleteTodolist,
  createTodolist,
  updateTitleTodolist,
}
