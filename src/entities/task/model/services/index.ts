import { createTask } from './createTask/createTask'
import { deleteTask } from './deleteTask/deleteTask'
import { fetchTasksByTodolistId } from './fetchTasksByTodolistId/fetchTasksByTodolistId'
import { updateTask } from './updateTask/updateTask'

export const taskThunks = { createTask, deleteTask, fetchTasksByTodolistId, updateTask }
