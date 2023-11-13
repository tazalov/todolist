import { createSelector } from '@reduxjs/toolkit'

import { StateSchema } from 'app/providers/store'

const items = (state: StateSchema) => state.tasks?.items || {}

const itemsByTodoId = (todoId: string) => createSelector(items, (items) => items[todoId] || [])

const itemModelById = (todoId: string, taskId: string) =>
  createSelector(items, (items) => {
    const task = items[todoId].find((el) => el.id === taskId)
    return task
      ? {
          deadline: task.deadline,
          description: task.description,
          status: task.status,
          priority: task.priority,
          startDate: task.startDate,
          title: task.title,
        }
      : undefined
  })

const isLoading = (state: StateSchema) => state.tasks?.isLoading || false

export const taskSelectors = {
  itemsByTodoId,
  itemModelById,
  isLoading,
}
