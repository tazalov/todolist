import { useDispatch } from 'react-redux'
import { applyMiddleware, combineReducers, compose, legacy_createStore } from 'redux'
import thunk, { ThunkDispatch, ThunkAction } from 'redux-thunk'
import { tasksReducer } from 'entities/task'
import { todoListReducer } from 'entities/todolist'
import { todolistAPI, TodolistAPI } from 'api/config/todolists.api'
import { tasksAPI, TasksAPI } from 'api/config/tasks.api'

export const rootReducer = combineReducers({
  todoList: todoListReducer,
  tasks: tasksReducer,
})

const middleWares = [
  thunk.withExtraArgument({
    todolistAPI,
    tasksAPI,
  }),
]

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store = legacy_createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middleWares)),
)

type RootReducer = typeof rootReducer
type AppAction = ReturnType<typeof store.dispatch>
type AppDispatch = ThunkDispatch<StateSchema, any, AppAction>
type AppThunkExtra = {
  todolistAPI: TodolistAPI
  tasksAPI: TasksAPI
}

export type StateSchema = ReturnType<RootReducer>
export type AppThunk<T = void, E = AppThunkExtra> = ThunkAction<T, StateSchema, E, AppAction>

export const useAppDispatch = () => useDispatch<AppDispatch>()
