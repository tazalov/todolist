import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { fetchTodoLists } from '../services/fetchTodoLists/fetchTodoLists'
import { TodoListsSchema, TodoListT, UpdateModelTodoList } from '../types/TodolistsSchema'

import { clearCurrentState } from 'app/providers/store'

export const initialState: TodoListsSchema = {
  items: [],
  isLoading: false,
}

const todolistSlice = createSlice({
  name: 'todoList',
  initialState,
  reducers: {
    setTodoLists: (state, action: PayloadAction<TodoListT[]>) => {
      state.items = action.payload.map((el) => ({
        ...el,
        filter: 'all',
        entityStatus: 'idle',
      }))
    },
    addTodoList: (state, action: PayloadAction<TodoListT>) => {
      state.items.unshift({ ...action.payload, filter: 'all', entityStatus: 'idle' })
    },
    removeTodoList: (state, action: PayloadAction<string>) => {
      const idx = state.items.findIndex((el) => (el.id = action.payload))
      if (idx !== -1) {
        state.items.splice(idx, 1)
      }
    },
    changeTodoList: (state, action: PayloadAction<{ todoId: string; model: UpdateModelTodoList }>) => {
      const { todoId, model } = action.payload
      const idx = state.items.findIndex((el) => el.id === todoId)
      if (idx !== -1) {
        state.items[idx] = { ...state.items[idx], ...model }
      }
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(clearCurrentState, () => initialState)
      .addCase(fetchTodoLists.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchTodoLists.fulfilled, (state, { payload }) => {
        state.items = payload.map((el) => ({
          ...el,
          filter: 'all',
          entityStatus: 'idle',
        }))
        state.isLoading = false
      })
      .addCase(fetchTodoLists.rejected, (state) => {
        state.isLoading = false
      }),
})

export const todoListReducer = todolistSlice.reducer
export const { setTodoLists, addTodoList, removeTodoList, changeTodoList } = todolistSlice.actions
