import { useDispatch } from 'react-redux'
import { applyMiddleware, combineReducers, compose, legacy_createStore } from 'redux'
import thunk from 'redux-thunk'
import { tasksReducer } from 'entities/task'
import { todoListReducer } from 'entities/todolist'
import { todolistAPI } from 'api/config/todolists.api'
import { tasksAPI } from 'api/config/tasks.api'
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
