import { RootStateT } from 'app/providers'
import { TodoListST } from '../types/todolist.reducer'

export const getTodoListsState = (state: RootStateT): TodoListST => state.todoList
