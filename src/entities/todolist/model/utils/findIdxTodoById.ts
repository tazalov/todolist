import { TodoListsSchema } from '../types/_TodolistsSchema'

export const findIdxTodoById = (taskState: TodoListsSchema, payloadTodoId: string) => {
  return taskState.items.findIndex((el) => el.id === payloadTodoId)
}
