import { TodoListsSchema } from 'entities/todolist'
import { TasksSchema } from 'entities/task'
import { ThunkAction, ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'
import { TodolistAPI } from 'api/config/todolists.api'
import { TasksAPI } from 'api/config/tasks.api'

export interface StateSchema {
  todoList: TodoListsSchema
  tasks: TasksSchema
}

type AppThunkExtra = {
  todolistAPI: TodolistAPI
  tasksAPI: TasksAPI
}

export type AppDispatch = ThunkDispatch<StateSchema, any, AnyAction>

export type AppThunk<T = void, E = AppThunkExtra> = ThunkAction<T, StateSchema, E, AnyAction>
