import { TaskT, TaskModelAPI } from '../model/types/TasksSchema'
import { todolist } from 'shared/api/config/todolist'
import { BaseResponseT, ItemsResponseT } from 'shared/api/types/todolist'

export const tasksAPI = {
  getTasks(todolistId: string, count = 10, page = 1) {
    return todolist.get<ItemsResponseT<TaskT>>(`todo-lists/${todolistId}/tasks?count=${count}&page=${page}`)
  },
  createTask(todolistId: string, title: string) {
    return todolist.post<BaseResponseT<{ item: TaskT }>>(`todo-lists/${todolistId}/tasks`, {
      title,
    })
  },
  updateTask(todolistId: string, taskId: string, model: TaskModelAPI) {
    return todolist.put<BaseResponseT<{ item: TaskT }>>(`todo-lists/${todolistId}/tasks/${taskId}`, model)
  },
  deleteTask(todolistId: string, taskId: string) {
    return todolist.delete<BaseResponseT>(`todo-lists/${todolistId}/tasks/${taskId}`)
  },
}

export type TasksAPI = typeof tasksAPI
