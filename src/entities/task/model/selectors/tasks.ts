import { StateSchema } from 'app/providers/store'

export const getSpecificTasks = (todoId: string) => (state: StateSchema) => state.tasks?.items[todoId] ?? []

export const getModelSpecificTask = (todoId: string, taskId: string) => (state: StateSchema) => {
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

export const getTaskIsLoading = (state: StateSchema) => state.tasks?.isLoading || false
