import { ReducersMapObject, CombinedState, Reducer } from '@reduxjs/toolkit'
import { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore'
import { AnyAction } from 'redux'
import { ThunkDispatch } from 'redux-thunk'

import { NotificationSchema } from 'entities/notification'
import { TasksSchema, TasksAPI } from 'entities/task'
import { TodoListsSchema, TodolistAPI } from 'entities/todolist'
import { AuthAPI, AuthSchema } from 'features/auth'

//* ? - async reducers
export interface StateSchema {
  todoList?: TodoListsSchema
  tasks?: TasksSchema
  notification: NotificationSchema
  auth: AuthSchema
}

export type KeysReducers = keyof StateSchema

export interface ReducerManager {
  getReducerMap: () => ReducersMapObject<StateSchema>
  reduce: (state: StateSchema, action: AnyAction) => CombinedState<StateSchema>
  add: (key: KeysReducers, reducer: Reducer) => void
  remove: (key: KeysReducers) => void
}

export interface StoreWithManager extends ToolkitStore<StateSchema> {
  reducerManager: ReducerManager
}

export type AppThunkExtra = {
  todolistAPI: TodolistAPI
  tasksAPI: TasksAPI
  authAPI: AuthAPI
}

export type AppDispatch = ThunkDispatch<StateSchema, any, AnyAction>

export interface ThunkConfig<T = null> {
  rejectValue: T
  extra: AppThunkExtra
  state: StateSchema
  dispatch: AppDispatch
}
