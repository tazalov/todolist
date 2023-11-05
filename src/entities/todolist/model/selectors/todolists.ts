import { StateSchema } from 'app/providers/store'

export const getTodolistsItems = (state: StateSchema) => state.todoList?.items ?? []

export const getTodolistsIsLoading = (state: StateSchema) => state.todoList?.isLoading ?? false
