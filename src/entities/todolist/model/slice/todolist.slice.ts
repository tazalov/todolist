import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { createTodolist } from '../services/createTodolist/createTodolist'
import { deleteTodolist } from '../services/deleteTodolist/deleteTodolist'
import { fetchTodoLists } from '../services/fetchTodoLists/fetchTodoLists'
import { updateTitleTodolist } from '../services/updateTitleTodolist/updateTitleTodolist'
import { TodoListsSchema, TodoListT, UpdateModelTodoList } from '../types/TodolistsSchema'

import { findIdxTodoById } from '../utils/findIdxTodoById'

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
      })
      .addCase(deleteTodolist.fulfilled, (state, { payload: todoId }) => {
        if (todoId) {
          const idx = findIdxTodoById(state, todoId)
          if (idx !== -1) {
            state.items.splice(idx, 1)
          }
        }
      })
      .addCase(createTodolist.fulfilled, (state, { payload: todoList }) => {
        if (todoList) {
          state.items.unshift({ ...todoList, filter: 'all', entityStatus: 'idle' })
        }
      })
      .addCase(updateTitleTodolist.pending, (state, { meta }) => {
        const { arg } = meta
        const idx = findIdxTodoById(state, arg.todoId)
        if (idx !== -1) {
          state.items[idx] = { ...state.items[idx], entityStatus: 'loading' }
        }
      })
      .addCase(updateTitleTodolist.fulfilled, (state, { payload }) => {
        const { todoId, model } = payload
        const idx = findIdxTodoById(state, todoId)
        if (idx !== -1) {
          state.items[idx] = { ...state.items[idx], ...model }
        }
      })
      .addCase(updateTitleTodolist.rejected, (state, { payload: todoId }) => {
        if (todoId) {
          const idx = findIdxTodoById(state, todoId)
          if (idx !== -1) {
            state.items[idx] = { ...state.items[idx], entityStatus: 'failed' }
          }
        }
      }),
})

export const { reducer: todoListReducer, actions } = todolistSlice
