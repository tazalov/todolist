import { createSelector } from '@reduxjs/toolkit'

import { StateSchema } from 'app/providers/store'

const _items = (state: StateSchema) => state.todoList?.items || []

const items = createSelector(_items, (items) => items)

const isLoading = (state: StateSchema) => state.todoList?.isLoading || false

export const todolistSelectors = {
  items,
  isLoading,
}
