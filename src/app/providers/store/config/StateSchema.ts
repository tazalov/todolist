import { TodoListsSchema, TodolistAPI } from 'entities/todolist'
import { TasksSchema, TasksAPI } from 'entities/task'
import { ThunkAction, ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'

export interface StateSchema {
  todoList: TodoListsSchema
  tasks: TasksSchema
}

export type AppThunkExtra = {
  todolistAPI: TodolistAPI
  tasksAPI: TasksAPI
}

export type AppDispatch = ThunkDispatch<StateSchema, any, AnyAction>

export type AppThunk<T = void, E = AppThunkExtra> = ThunkAction<T, StateSchema, E, AnyAction>
