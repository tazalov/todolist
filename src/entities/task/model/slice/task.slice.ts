import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { TasksSchema, TaskT } from '../types/TasksSchema'

import { clearCurrentState } from 'app/providers/store'

import { addTodoList, setTodoLists, removeTodoList } from 'entities/todolist'

export const initialState: TasksSchema = {}

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    setTasks: (state, action: PayloadAction<{ todoId: string; tasks: TaskT[] }>) => {
      const { todoId, tasks } = action.payload
      state[todoId] = tasks.map((el) => ({ ...el, entityStatus: 'idle' }))
    },
    addTask: (state, action: PayloadAction<TaskT>) => {
      const task = action.payload
      state[task.todoListId].unshift({ ...task, entityStatus: 'idle' })
    },
    removeTask: (state, action: PayloadAction<{ todoId: string; taskId: string }>) => {
      const { todoId, taskId } = action.payload
      const idx = state[todoId].findIndex((el) => el.id === taskId)
      if (idx !== -1) {
        state[todoId].splice(idx, 1)
      }
    },
    changeTask: (state, action: PayloadAction<TaskT>) => {
      const task = action.payload
      const idx = state[task.todoListId].findIndex((el) => el.id === task.id)
      if (idx !== -1) {
        state[task.todoListId][idx] = { ...state[task.todoListId][idx], ...task }
      }
    },
    changeTaskStatus: (state, action: PayloadAction<{ todoId: string; entityStatus: CurrentStatus }>) => {
      const { todoId, entityStatus } = action.payload
      state[todoId] = state[todoId].map((el) => ({ ...el, entityStatus }))
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(clearCurrentState, () => initialState)
      .addCase(setTodoLists, (_, action) => {
        return action.payload.reduce((acc: TasksSchema, el) => {
          acc[el.id] = []
          return acc
        }, {})
      })
      .addCase(addTodoList, (state, action) => {
        const { id } = action.payload
        state[id] = []
      })
      .addCase(removeTodoList, (state, action) => {
        delete state[action.payload]
      }),
})

export const { reducer: taskReducer, actions: taskActions } = taskSlice
