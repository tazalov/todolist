import { todolist } from '../todolist'
import { TodolistT, ResponseT } from '../types/todolist'

export const todolistAPI = {
  updateTodolist(todolistId: string, title: string) {
    return todolist.put<ResponseT>(`todo-lists/${todolistId}`, { title })
  },
  getTodolists() {
    return todolist.get<TodolistT[]>(`todo-lists/`)
  },
  deleteTodolist(todolistId: string) {
    return todolist.delete<ResponseT>(`todo-lists/${todolistId}`)
  },
  createTodolist(title: string) {
    return todolist.post<ResponseT<{ item: TodolistT }>>(`todo-lists/`, { title })
  },
}
