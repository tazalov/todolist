import { createSlice, PayloadAction, createEntityAdapter, isRejected, isPending } from '@reduxjs/toolkit'

import { createTodolist } from '../services/createTodolist/createTodolist'
import { deleteTodolist } from '../services/deleteTodolist/deleteTodolist'
import { fetchTodoLists } from '../services/fetchTodoLists/fetchTodoLists'
import { updateTitleTodolist } from '../services/updateTitleTodolist/updateTitleTodolist'
import { Todo, UpdateModelTodo, UpdatedTodo, Filter, TodoListsSchema } from '../types/TodolistsSchema'

import { clearCurrentState, StateSchema } from 'app/providers/store'

const adapter = createEntityAdapter<UpdatedTodo>({
  selectId: (todolist) => todolist.id,
  sortComparer: (a, b) => a.order - b.order,
})

export const selectorsTodo = adapter.getSelectors<StateSchema>((state) => state.todoList || adapter.getInitialState())

const slice = createSlice({
  name: 'todolist',
  initialState: adapter.getInitialState<TodoListsSchema>({
    ids: [],
    entities: {},
    isLoading: false,
  }),
  reducers: {
    setTodoLists: (state, action: PayloadAction<Todo[]>) => {
      const todoLists = action.payload.map((el) => ({
        ...el,
        filter: 'all' as Filter,
        entityStatus: 'idle' as CurrentStatus,
      }))
      adapter.setAll(state, todoLists)
    },
    addTodoList: (state, action: PayloadAction<Todo>) => {
      adapter.addOne(state, {
        ...action.payload,
        filter: 'all',
        entityStatus: 'idle',
      })
    },
    removeTodoList: (state, { payload: todoId }: PayloadAction<string>) => {
      adapter.removeOne(state, todoId)
    },
    changeTodoList: (state, action: PayloadAction<{ todoId: string; model: UpdateModelTodo }>) => {
      const { todoId, model } = action.payload
      adapter.updateOne(state, { id: todoId, changes: model })
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(clearCurrentState, () => ({
        ids: [],
        entities: {},
        isLoading: false,
      }))
      .addCase(fetchTodoLists.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchTodoLists.fulfilled, (state, { payload }) => {
        const todoLists = payload.map((el) => ({
          ...el,
          filter: 'all' as Filter,
          entityStatus: 'idle' as CurrentStatus,
        }))
        adapter.setAll(state, todoLists)
        state.isLoading = false
      })
      .addCase(fetchTodoLists.rejected, (state) => {
        state.isLoading = false
      })
      .addCase(deleteTodolist.fulfilled, (state, { payload: todoId }) => {
        adapter.removeOne(state, todoId)
      })
      .addCase(createTodolist.fulfilled, (state, { payload: todoList }) => {
        adapter.addOne(state, {
          ...todoList,
          filter: 'all',
          entityStatus: 'idle',
        })
      })
      .addCase(updateTitleTodolist.fulfilled, (state, { payload }) => {
        const { todoId, model } = payload
        adapter.updateOne(state, { id: todoId, changes: model })
      })
      .addMatcher(isPending(deleteTodolist, updateTitleTodolist), (state, { meta }) => {
        const todoId = typeof meta.arg === 'string' ? meta.arg : meta.arg.todoId
        adapter.updateOne(state, { id: todoId, changes: { entityStatus: 'loading' } })
      })
      .addMatcher(isRejected(deleteTodolist, updateTitleTodolist), (state, { meta }) => {
        const todoId = typeof meta.arg === 'string' ? meta.arg : meta.arg.todoId
        adapter.updateOne(state, { id: todoId, changes: { entityStatus: 'failed' } })
      }),
})

export const { reducer: todoListReducer, actions: todoListActions } = slice
