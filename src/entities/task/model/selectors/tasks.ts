import { StateSchema } from 'app/providers/store'

export const items = (todoId: string) => (state: StateSchema) => state.tasks?.items[todoId] ?? []

export const itemWithModel = (todoId: string, taskId: string) => (state: StateSchema) => {
  const task = state.tasks?.items[todoId].find((el) => el.id === taskId)
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
}

export const isLoading = (state: StateSchema) => state.tasks?.isLoading || false
