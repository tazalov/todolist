import { Task, TaskModelAPI } from '../model/types/TasksSchema'

import { todolist } from 'shared/api/config/todolist'
import { BaseResponse, ItemsResponse } from 'shared/api/types/todolist'

export interface CreateTaskParams {
  todoId: string
  title: string
}

export interface DeleteTaskParams {
  todoId: string
  taskId: string
}

export interface UpdateTaskParams extends DeleteTaskParams {
  model: TaskModelAPI
}

export const tasksAPI = {
  getTasks(todolistId: string, count = 10, page = 1) {
    return todolist.get<ItemsResponse<Task[]>>(`todo-lists/${todolistId}/tasks?count=${count}&page=${page}`)
  },
  createTask({ todoId, title }: CreateTaskParams) {
    return todolist.post<BaseResponse<{ item: Task }>>(`todo-lists/${todoId}/tasks`, {
      title,
    })
  },
  updateTask({ todoId, taskId, model }: UpdateTaskParams) {
    return todolist.put<BaseResponse<{ item: Task }>>(`todo-lists/${todoId}/tasks/${taskId}`, model)
  },
  deleteTask({ taskId, todoId }: DeleteTaskParams) {
    return todolist.delete<BaseResponse>(`todo-lists/${todoId}/tasks/${taskId}`)
  },
}

export type TasksAPI = typeof tasksAPI
