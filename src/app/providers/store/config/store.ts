import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import { combineReducers } from 'redux'
import thunk from 'redux-thunk'

import { StateSchema, AppDispatch } from './StateSchema'

import { notificationReducer } from 'entities/notification'
import { tasksReducer, tasksAPI } from 'entities/task'
import { todoListReducer, todolistAPI } from 'entities/todolist'
import { authAPI, authReducer } from 'features/auth'

export const createReduxStore = (initialState?: StateSchema) => {
  const reducer = combineReducers({
    todoList: todoListReducer,
    tasks: tasksReducer,
    notification: notificationReducer,
    auth: authReducer,
  })

  const middleWares = [
    thunk.withExtraArgument({
      todolistAPI,
      tasksAPI,
      authAPI,
    }),
  ]

  return configureStore({
    reducer,
    preloadedState: initialState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(...middleWares),
  })
}

export const useAppDispatch = () => useDispatch<AppDispatch>()
