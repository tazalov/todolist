import { EntityState } from '@reduxjs/toolkit'

export type Filter = 'all' | 'active' | 'completed'

export interface Todo {
  id: string
  addedDate: Date
  order: number
  title: string
}

export interface UpdatedTodo extends Todo {
  filter: Filter
  entityStatus: CurrentStatus
}

export interface UpdateModelTodo {
  title?: string
  filter?: Filter
  entityStatus?: CurrentStatus
}

export interface TodoListsSchema extends EntityState<UpdatedTodo> {
  isLoading: boolean
}
