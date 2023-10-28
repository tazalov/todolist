import { useDispatch } from 'react-redux'
import { applyMiddleware, combineReducers, compose, legacy_createStore } from 'redux'
import thunk from 'redux-thunk'

import { StateSchema, AppDispatch } from './StateSchema'

import { notificationReducer } from 'entities/notification'
import { tasksReducer, tasksAPI } from 'entities/task'
import { todoListReducer, todolistAPI } from 'entities/todolist'
import { authAPI, authReducer } from 'features/auth'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const createReduxStore = (initialState?: StateSchema) => {
  const reducers = {
    todoList: todoListReducer,
    tasks: tasksReducer,
    notification: notificationReducer,
    auth: authReducer,
  }

  const middleWares = [
    thunk.withExtraArgument({
      todolistAPI,
      tasksAPI,
      authAPI,
    }),
  ]

  return legacy_createStore(combineReducers(reducers), initialState, composeEnhancers(applyMiddleware(...middleWares)))
}

export const useAppDispatch = () => useDispatch<AppDispatch>()
