import { TasksSchema } from '../types/TasksSchema'

export const findIdxTaskByTodoId = (taskState: TasksSchema, todoId: string, taskId: string) => {
  return taskState.items[todoId].findIndex((el) => el.id === taskId)
}
