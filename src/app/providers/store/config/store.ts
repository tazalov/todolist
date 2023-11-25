import { configureStore, ReducersMapObject, Reducer, CombinedState } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'

import { createReducerManager } from './reducerManager'
import { StateSchema } from './StateSchema'

import { notificationReducer } from 'entities/notification'
import { tasksAPI } from 'entities/task'
import { todolistAPI } from 'entities/todolist'
import { authAPI, authReducer } from 'features/auth'

/**
 * Function for create store (need for storybook too)
 * @param initialState - state for storybook (optional)
 * @param asyncReducers - async reducers obj for storybook (optional)
 */

export const createReduxStore = (initialState?: StateSchema, asyncReducers?: ReducersMapObject) => {
  const reducers = {
    ...asyncReducers,
    notification: notificationReducer,
    auth: authReducer,
  }

  const reducerManager = createReducerManager(reducers)

  const middleWares = [
    thunk.withExtraArgument({
      todolistAPI,
      tasksAPI,
      authAPI,
    }),
  ]
  const store = configureStore({
    reducer: reducerManager.reduce as Reducer<CombinedState<StateSchema>>,
    preloadedState: initialState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(middleWares),
  })

  //* for hook useStore
  // @ts-ignore
  store.reducerManager = reducerManager

  return store
}
