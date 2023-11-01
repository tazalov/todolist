import { StateSchema } from 'app/providers/store'

export const getSpecificTasks = (todoId: string) => (state: StateSchema) => state.tasks?.[todoId]

export const getModelSpecificTask = (todoId: string, taskId: string) => (state: StateSchema) => {
  const task = state.tasks?.[todoId].find((el) => el.id === taskId)
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

export const getTasks = (state: StateSchema) => state.tasks
