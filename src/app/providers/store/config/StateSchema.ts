import { TodoListsSchema, TodolistAPI, TodoListAT } from 'entities/todolist'
import { TasksSchema, TasksAPI, TasksAT } from 'entities/task'
import { ThunkAction, ThunkDispatch } from 'redux-thunk'

export interface StateSchema {
  todoList: TodoListsSchema
  tasks: TasksSchema
}

export type AppThunkExtra = {
  todolistAPI: TodolistAPI
  tasksAPI: TasksAPI
}

type ActionsType = TasksAT | TodoListAT

export type AppDispatch = ThunkDispatch<StateSchema, any, ActionsType>

export type AppThunk<T = void, E = AppThunkExtra> = ThunkAction<T, StateSchema, E, ActionsType>
