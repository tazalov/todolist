import { TodoT } from '../model/types/TodolistsSchema'

import { todolist } from 'shared/api/config/todolist'
import { BaseResponseT } from 'shared/api/types/todolist'

interface UpdateTodolistParams {
  todoId: string
  title: string
}

export const todolistAPI = {
  updateTodolist({ todoId, title }: UpdateTodolistParams) {
    return todolist.put<BaseResponseT>(`todo-lists/${todoId}`, { title })
  },
  getTodolists() {
    return todolist.get<TodoT[]>(`todo-lists/`)
  },
  deleteTodolist(todolistId: string) {
    return todolist.delete<BaseResponseT>(`todo-lists/${todolistId}`)
  },
  createTodolist(title: string) {
    return todolist.post<BaseResponseT<{ item: TodoT }>>(`todo-lists/`, { title })
  },
}

export type TodolistAPI = typeof todolistAPI
