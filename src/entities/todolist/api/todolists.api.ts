import { Todo } from '../model/types/TodolistsSchema'

import { todolist } from 'shared/api/config/todolist'
import { BaseResponse } from 'shared/api/types/todolist'

interface UpdateTodolistParams {
  todoId: string
  title: string
}

export const todolistAPI = {
  updateTodolist({ todoId, title }: UpdateTodolistParams) {
    return todolist.put<BaseResponse>(`todo-lists/${todoId}`, { title })
  },
  getTodolists() {
    return todolist.get<Todo[]>(`todo-lists/`)
  },
  deleteTodolist(todolistId: string) {
    return todolist.delete<BaseResponse>(`todo-lists/${todolistId}`)
  },
  createTodolist(title: string) {
    return todolist.post<BaseResponse<{ item: Todo }>>(`todo-lists/`, { title })
  },
}

export type TodolistAPI = typeof todolistAPI
