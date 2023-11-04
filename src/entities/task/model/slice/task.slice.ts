import { createSlice } from '@reduxjs/toolkit'

import { createTask } from '../services/createTask/createTask'
import { deleteTask } from '../services/deleteTask/deleteTask'
import { fetchTasksByTodolistId } from '../services/fetchTasksByTodolistId/fetchTasksByTodolistId'
import { updateTask } from '../services/updateTask/updateTask'
import { TasksSchema, TasksObj } from '../types/TasksSchema'

import { findIdxTaskByTodoId } from '../utils/findIdxTaskByTodoId'

import { clearCurrentState } from 'app/providers/store'
import { addTodoList, setTodoLists, removeTodoList } from 'entities/todolist'

export const initialState: TasksSchema = {
  items: {},
  isLoading: false,
}

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(clearCurrentState, () => initialState)
      .addCase(fetchTasksByTodolistId.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchTasksByTodolistId.fulfilled, (state, { payload }) => {
        state.isLoading = false
        if (payload) {
          const { tasks, todoId } = payload
          state.items[todoId] = tasks.map((el) => ({ ...el, entityStatus: 'idle' }))
        }
      })
      .addCase(fetchTasksByTodolistId.rejected, (state) => {
        state.isLoading = false
      })
      .addCase(deleteTask.pending, (state, { meta }) => {
        const { arg } = meta
        const idx = findIdxTaskByTodoId(state, arg.todoId, arg.taskId)
        if (idx !== -1) {
          state.items[arg.todoId][idx].entityStatus = 'loading'
        }
      })
      .addCase(deleteTask.fulfilled, (state, { payload }) => {
        if (payload) {
          const { todoId, taskId } = payload
          const idx = findIdxTaskByTodoId(state, todoId, taskId)
          if (idx !== -1) {
            state.items[todoId].splice(idx, 1)
          }
        }
      })
      /*.addCase(deleteTask.rejected, (state, { payload }) => {
      
      })*/
      .addCase(createTask.fulfilled, (state, { payload: task }) => {
        if (task) {
          state.items[task.todoListId].unshift({ ...task, entityStatus: 'idle' })
        }
      })
      .addCase(updateTask.pending, (state, { meta }) => {
        const { arg } = meta
        const idx = findIdxTaskByTodoId(state, arg.todoId, arg.taskId)
        if (idx !== -1) {
          state.items[arg.todoId][idx].entityStatus = 'loading'
        }
      })
      .addCase(updateTask.fulfilled, (state, { payload: task }) => {
        if (task) {
          const idx = findIdxTaskByTodoId(state, task.todoListId, task.id)
          if (idx !== -1) {
            state.items[task.todoListId][idx] = {
              ...state.items[task.todoListId][idx],
              ...task,
              entityStatus: 'succeed',
            }
          }
        }
      })
      .addCase(updateTask.rejected, (state, { payload }) => {
        if (payload) {
          const { todoId, taskId } = payload
          const idx = findIdxTaskByTodoId(state, todoId, taskId)
          if (idx !== -1) {
            state.items[todoId][idx].entityStatus = 'failed'
          }
        }
      })
      .addCase(setTodoLists, (state, { payload: todoLists }) => {
        state.items = todoLists.reduce((acc: TasksObj, el) => {
          acc[el.id] = []
          return acc
        }, {})
      })
      .addCase(addTodoList, (state, { payload: todoList }) => {
        const { id } = todoList
        state.items[id] = []
      })
      .addCase(removeTodoList, (state, { payload: todoListId }) => {
        delete state.items[todoListId]
      }),
})

export const { reducer: taskReducer, actions: taskActions } = taskSlice
