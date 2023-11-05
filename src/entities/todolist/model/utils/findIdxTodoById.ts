import { TodoListsSchema } from '../types/TodolistsSchema'

export const findIdxTodoById = (taskState: TodoListsSchema, payloadTodoId: string) => {
  return taskState.items.findIndex((el) => el.id === payloadTodoId)
}
