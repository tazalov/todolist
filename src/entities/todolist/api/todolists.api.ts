import { TodoListT } from '../model/types/TodolistsSchema'

import { todolist } from 'shared/api/config/todolist'
import { BaseResponseT } from 'shared/api/types/todolist'

export const todolistAPI = {
  updateTodolist(todolistId: string, title: string) {
    return todolist.put<BaseResponseT>(`todo-lists/${todolistId}`, { title })
  },
  getTodolists() {
    return todolist.get<TodoListT[]>(`todo-lists/`)
  },
  deleteTodolist(todolistId: string) {
    return todolist.delete<BaseResponseT>(`todo-lists/${todolistId}`)
  },
  createTodolist(title: string) {
    return todolist.post<BaseResponseT<{ item: TodoListT }>>(`todo-lists/`, { title })
  },
}

export type TodolistAPI = typeof todolistAPI
