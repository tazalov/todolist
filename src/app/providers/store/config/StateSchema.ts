import { AnyAction } from 'redux'
import { ThunkAction, ThunkDispatch } from 'redux-thunk'

import { NotificationSchema } from 'entities/notification'
import { TasksSchema, TasksAPI } from 'entities/task'
import { TodoListsSchema, TodolistAPI } from 'entities/todolist'
import { AuthAPI, AuthSchema } from 'features/auth'

export interface StateSchema {
  todoList: TodoListsSchema
  tasks: TasksSchema
  notification: NotificationSchema
  auth: AuthSchema
}

export type AppThunkExtra = {
  todolistAPI: TodolistAPI
  tasksAPI: TasksAPI
  authAPI: AuthAPI
}

export type AppDispatch = ThunkDispatch<StateSchema, any, AnyAction>
//export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch']
export type AppThunk<T = void, E = AppThunkExtra> = ThunkAction<T, StateSchema, E, AnyAction>
