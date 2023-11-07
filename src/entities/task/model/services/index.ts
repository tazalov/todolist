import { createTask } from './createTask/createTask'
import { deleteTask } from './deleteTask/deleteTask'
import { fetchTasksByTodolistId } from './fetchTasksByTodolistId/fetchTasksByTodolistId'
import { updateTask } from './updateTask/updateTask'

export const taskActions = { createTask, deleteTask, fetchTasksByTodolistId, updateTask }
