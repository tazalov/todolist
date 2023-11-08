import { ReducersMapObject, CombinedState, Reducer } from '@reduxjs/toolkit'
import { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore'
import { AnyAction } from 'redux'
import { ThunkDispatch } from 'redux-thunk'

import { NotificationSchema } from 'entities/notification'
import { TasksSchema, TasksAPI } from 'entities/task'
import { TodoListsSchema, TodolistAPI } from 'entities/todolist'
import { AuthAPI, AuthSchema } from 'features/auth'

//* ? - асинхронные редюсеры
export interface StateSchema {
  todoList?: TodoListsSchema
  tasks?: TasksSchema
  notification: NotificationSchema
  auth: AuthSchema
}

//* тип для ключей наших редюсеров, нужен для менеджера
export type KeysReducers = keyof StateSchema

//* сами описали тип для возвращаемого объекта нашего менеджера
export interface ReducerManager {
  getReducerMap: () => ReducersMapObject<StateSchema>
  reduce: (state: StateSchema, action: AnyAction) => CombinedState<StateSchema>
  add: (key: KeysReducers, reducer: Reducer) => void
  remove: (key: KeysReducers) => void
}

//* прописали тип для нашего строа, в который добавили менеджера, нужен для вызова useStore
export interface StoreWithManager extends ToolkitStore<StateSchema> {
  reducerManager: ReducerManager
}

export type AppThunkExtra = {
  todolistAPI: TodolistAPI
  tasksAPI: TasksAPI
  authAPI: AuthAPI
}

export interface ThunkConfig<T = undefined> {
  rejectValue: T
  extra: AppThunkExtra
  state: StateSchema
}

export type AppDispatch = ThunkDispatch<StateSchema, any, AnyAction>
