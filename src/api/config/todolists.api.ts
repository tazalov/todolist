import { todolist } from '../todolist'
import { TodolistT, BaseResponseT } from '../types/todolist'

export const todolistAPI = {
  updateTodolist(todolistId: string, title: string) {
    return todolist.put<BaseResponseT>(`todo-lists/${todolistId}`, { title })
  },
  getTodolists() {
    return todolist.get<TodolistT[]>(`todo-lists/`)
  },
  deleteTodolist(todolistId: string) {
    return todolist.delete<BaseResponseT>(`todo-lists/${todolistId}`)
  },
  createTodolist(title: string) {
    return todolist.post<BaseResponseT<{ item: TodolistT }>>(`todo-lists/`, { title })
  },
}
