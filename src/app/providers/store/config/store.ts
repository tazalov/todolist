import { useDispatch } from 'react-redux'
import { applyMiddleware, combineReducers, compose, legacy_createStore } from 'redux'
import { tasksReducer } from '../../../../entities/task/model/reducer/tasks.reducer'
import { todoListReducer } from '../../../../entities/todolist/model/reducer/todolist.reducer'

export const rootReducer = combineReducers({
  tasks: tasksReducer,
  todoList: todoListReducer,
})

type RootReducerT = typeof rootReducer

export type StateSchema = ReturnType<RootReducerT>
export type AppDispatch = typeof store.dispatch

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
export const store = legacy_createStore(rootReducer, composeEnhancers(applyMiddleware()))

export const useAppDispatch: () => AppDispatch = useDispatch
