import { ThunkAction, ThunkDispatch } from 'redux-thunk'

import { NotificationSchema, NotificationAT } from 'entities/notification'
import { TasksSchema, TasksAPI, TasksAT } from 'entities/task'
import { TodoListsSchema, TodolistAPI, TodoListAT } from 'entities/todolist'
import { AuthAPI, AuthSchema, AuthAT } from 'features/auth'

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

type ActionsType = TasksAT | TodoListAT | NotificationAT | AuthAT

export type AppDispatch = ThunkDispatch<StateSchema, any, ActionsType>

export type AppThunk<T = void, E = AppThunkExtra> = ThunkAction<T, StateSchema, E, ActionsType>
