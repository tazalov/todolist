import { createSelector } from '@reduxjs/toolkit'

import { StateSchema } from 'app/providers/store'

export const _getItems = (state: StateSchema) => state.todoList?.items || []

export const getTodolistsItems = createSelector(_getItems, (items) => items)

export const getTodolistsIsLoading = (state: StateSchema) => state.todoList?.isLoading || false
