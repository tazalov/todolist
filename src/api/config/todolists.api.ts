import { TodoListT } from 'entities/todolist'
import { todolist } from '../todolist'
import { BaseResponseT } from '../types/todolist'

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
