import { TodoListsSchema, TodolistAPI, TodoListAT } from 'entities/todolist'
import { TasksSchema, TasksAPI, TasksAT } from 'entities/task'
import { ThunkAction, ThunkDispatch } from 'redux-thunk'
import { NotificationSchema, NotificationAT } from 'entities/notification'

export interface StateSchema {
  todoList: TodoListsSchema
  tasks: TasksSchema
  notification: NotificationSchema
}

export type AppThunkExtra = {
  todolistAPI: TodolistAPI
  tasksAPI: TasksAPI
}

type ActionsType = TasksAT | TodoListAT | NotificationAT

export type AppDispatch = ThunkDispatch<StateSchema, any, ActionsType>

export type AppThunk<T = void, E = AppThunkExtra> = ThunkAction<T, StateSchema, E, ActionsType>
