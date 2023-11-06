import { StateSchema } from 'app/providers/store'

export const getTasksItems = (todoId: string) => (state: StateSchema) => state.tasks?.items[todoId] ?? []

export const getTasksItemModel = (todoId: string, taskId: string) => (state: StateSchema) => {
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

export const getTasksIsLoading = (state: StateSchema) => state.tasks?.isLoading || false
