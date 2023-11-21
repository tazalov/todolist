//import { createSelector } from '@reduxjs/toolkit'

import { StateSchema } from 'app/providers/store'

/*const _items = (state: StateSchema) => state.todoList?.items || []

const items = createSelector(_items, (items) => items)*/

export const getTodolistLoading = (state: StateSchema) => state.todoList?.isLoading || false
