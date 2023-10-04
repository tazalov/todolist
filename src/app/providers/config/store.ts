import { useDispatch } from 'react-redux'
import { applyMiddleware, combineReducers, compose, legacy_createStore } from 'redux'
import { todoListReducer } from 'entities/todolist/model/reducer/todolist.reducer'
import { tasksReducer } from 'entities/task/model/reducer/tasks.reducer'

export const rootReducer = combineReducers({
  todoList: todoListReducer,
  tasks: tasksReducer,
})

type RootReducerT = typeof rootReducer

export type RootStateT = ReturnType<RootReducerT>
export type AppDispatch = typeof store.dispatch

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
export const store = legacy_createStore(rootReducer, composeEnhancers(applyMiddleware()))

export const useAppDispatch: () => AppDispatch = useDispatch
