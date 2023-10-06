import { RootStateT } from 'app/providers/store'
import { TodoListST } from '../types/todolist.reducer'

export const getTodoListsState = (state: RootStateT): TodoListST => state.todoList
