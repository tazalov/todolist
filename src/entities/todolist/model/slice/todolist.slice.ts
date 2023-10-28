import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { TodoListsSchema, TodoListT, UpdateModelTodoList } from '../types/TodolistsSchema'

import { clearCurrentState } from 'app/providers/store'

export const initialState: TodoListsSchema = []

const todolistSlice = createSlice({
  name: 'todoList',
  initialState,
  reducers: {
    setTodoLists: (_, action: PayloadAction<TodoListT[]>) => {
      return action.payload.map((el) => ({
        ...el,
        filter: 'all',
        entityStatus: 'idle',
      }))
    },
    addTodoList: (state, action: PayloadAction<TodoListT>) => {
      state.unshift({ ...action.payload, filter: 'all', entityStatus: 'idle' })
    },
    removeTodoList: (state, action: PayloadAction<string>) => {
      const idx = state.findIndex((el) => (el.id = action.payload))
      if (idx !== -1) {
        state.splice(idx, 1)
      }
    },
    changeTodoList: (state, action: PayloadAction<{ todoId: string; model: UpdateModelTodoList }>) => {
      const { todoId, model } = action.payload
      const idx = state.findIndex((el) => el.id === todoId)
      if (idx !== -1) {
        state[idx] = { ...state[idx], ...model }
      }
    },
  },
  extraReducers: (builder) => builder.addCase(clearCurrentState, () => initialState),
})

export const todoListReducer = todolistSlice.reducer
export const { setTodoLists, addTodoList, removeTodoList, changeTodoList } = todolistSlice.actions
