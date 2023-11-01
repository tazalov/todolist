import { configureStore, ReducersMapObject, Reducer, CombinedState } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'

import { createReducerManager } from './reducerManager'
import { StateSchema } from './StateSchema'

import { notificationReducer } from 'entities/notification'
import { tasksAPI } from 'entities/task'
import { todolistAPI } from 'entities/todolist'
import { authAPI, authReducer } from 'features/auth'

/*
 * функция нужна, чтобы не дублировать логику для построения стора для сторибука, туда же можно подключить редюсеры,
 * которые для основного приложения мы подключали асинхронно
 */

export const createReduxStore = (initialState?: StateSchema, asyncReducers?: ReducersMapObject) => {
  //* создаем наш набор СИНХРОННЫХ редюсеров
  //? asyncReducers для сторибука
  const reducers = {
    ...asyncReducers,
    notification: notificationReducer,
    auth: authReducer,
  }

  //* создали нашего красавчика и передали в него синхронные редюсеры
  const reducerManager = createReducerManager(reducers)

  //* создаем массив с нужными мидлваринами
  const middleWares = [
    thunk.withExtraArgument({
      todolistAPI,
      tasksAPI,
      authAPI,
    }),
  ]

  //* создаем наш стор, как обычно, но передаем в него метод reduce из нашего красавчика
  const store = configureStore({
    reducer: reducerManager.reduce as Reducer<CombinedState<StateSchema>>,
    preloadedState: initialState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(...middleWares),
  })

  //* для более удобного вызова через хук useStore
  // @ts-ignore
  store.reducerManager = reducerManager

  return store
}

//! далее идем в shared в либах есть jsx модуль для подключения редюсеров
