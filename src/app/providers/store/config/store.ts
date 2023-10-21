import { useDispatch } from 'react-redux'
import { applyMiddleware, combineReducers, compose, legacy_createStore } from 'redux'
import thunk from 'redux-thunk'
import { tasksReducer, tasksAPI } from 'entities/task'
import { todoListReducer, todolistAPI } from 'entities/todolist'
import { StateSchema, AppDispatch } from './StateSchema'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const createReduxStore = (initialState?: StateSchema) => {
  const reducers = {
    todoList: todoListReducer,
    tasks: tasksReducer,
  }

  const middleWares = [
    thunk.withExtraArgument({
      todolistAPI,
      tasksAPI,
    }),
  ]

  return legacy_createStore(
    combineReducers(reducers),
    initialState,
    composeEnhancers(applyMiddleware(...middleWares)),
  )
}

export const useAppDispatch = () => useDispatch<AppDispatch>()
