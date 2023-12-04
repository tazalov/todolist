import { createSlice, isPending, PayloadAction, isRejected } from '@reduxjs/toolkit'

import { createTask } from '../services/createTask/createTask'
import { deleteTask } from '../services/deleteTask/deleteTask'
import { fetchTasksByTodolistId } from '../services/fetchTasksByTodolistId/fetchTasksByTodolistId'
import { updateTask } from '../services/updateTask/updateTask'
import { TasksSchema, TasksItems, Task } from '../types/TasksSchema'
import { findIdxTaskByTodoId } from '../utils/findIdxTaskByTodoId'

import { clearCurrentState } from 'app/providers/store'
import { todoListThunks } from 'entities/todolist'

export const initialState: TasksSchema = {
  items: {},
  isLoading: false,
}

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    setTasks: (state, action: PayloadAction<{ todoId: string; tasks: Task[] }>) => {
      const { todoId, tasks } = action.payload
      state.items[todoId] = tasks.map((el) => ({ ...el, entityStatus: 'idle' }))
    },
    addTask: (state, action: PayloadAction<Task>) => {
      const task = action.payload
      state.items[task.todoListId].unshift({ ...task, entityStatus: 'idle' })
    },
    removeTask: (state, action: PayloadAction<{ todoId: string; taskId: string }>) => {
      const { todoId, taskId } = action.payload
      const idx = state.items[todoId].findIndex((el) => el.id === taskId)
      if (idx !== -1) {
        state.items[todoId].splice(idx, 1)
      }
    },
    changeTask: (state, action: PayloadAction<Task>) => {
      const task = action.payload
      const idx = state.items[task.todoListId].findIndex((el) => el.id === task.id)
      if (idx !== -1) {
        state.items[task.todoListId][idx] = { ...state.items[task.todoListId][idx], ...task }
      }
    },
    changeTaskStatus: (state, action: PayloadAction<{ todoId: string; entityStatus: CurrentStatus }>) => {
      const { todoId, entityStatus } = action.payload
      state.items[todoId] = state.items[todoId].map((el) => ({ ...el, entityStatus }))
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(clearCurrentState, () => initialState)
      .addCase(fetchTasksByTodolistId.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchTasksByTodolistId.fulfilled, (state, { payload }) => {
        state.isLoading = false
        const { tasks, todoId } = payload
        state.items[todoId] = tasks.map((el) => ({ ...el, entityStatus: 'idle' }))
      })
      .addCase(fetchTasksByTodolistId.rejected, (state) => {
        state.isLoading = false
      })
      .addCase(createTask.fulfilled, (state, { payload: task }) => {
        state.items[task.todoListId].unshift({ ...task, entityStatus: 'idle' })
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
      .addCase(deleteTask.fulfilled, (state, { payload }) => {
        const { todoId, taskId } = payload
        const idx = findIdxTaskByTodoId(state, todoId, taskId)
        if (idx !== -1) {
          state.items[todoId].splice(idx, 1)
        }
      })
      .addCase(todoListThunks.fetchTodoLists.fulfilled, (state, { payload: todoLists }) => {
        state.items = todoLists.reduce((acc: TasksItems, el) => {
          acc[el.id] = []
          return acc
        }, {})
      })
      .addCase(todoListThunks.createTodolist.fulfilled, (state, { payload: todoList }) => {
        state.items[todoList.id] = []
      })
      .addCase(todoListThunks.deleteTodolist.fulfilled, (state, { payload: todoListId }) => {
        delete state.items[todoListId]
      })
      .addMatcher(isPending(updateTask, deleteTask), (state, { meta }) => {
        const { taskId, todoId } = meta.arg
        const idx = findIdxTaskByTodoId(state, todoId, taskId)
        if (idx !== -1) {
          state.items[todoId][idx].entityStatus = 'loading'
        }
      })
      .addMatcher(isRejected(updateTask, deleteTask), (state, { meta }) => {
        const { taskId, todoId } = meta.arg
        const idx = findIdxTaskByTodoId(state, todoId, taskId)
        if (idx !== -1) {
          state.items[todoId][idx].entityStatus = 'failed'
        }
      }),
})

export const { reducer: taskReducer, actions } = taskSlice
