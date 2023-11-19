import { createAsyncThunk } from '@reduxjs/toolkit'

import { taskSelectors } from '../../selectors/tasks'
import { TaskModel, TaskT } from '../../types/TasksSchema'

import { ThunkConfig } from 'app/providers/store'

import { notificationActions, handleServerError, handleNetworkError } from 'entities/notification'
import { ResultCodes } from 'shared/api/types/todolist'

interface UpdateTaskParams {
  todoId: string
  taskId: string
  taskModel: TaskModel
}

export const updateTask = createAsyncThunk<
  TaskT | undefined,
  UpdateTaskParams,
  ThunkConfig<{ todoId: string; taskId: string }>
>('entities/task/updateTask', async ({ todoId, taskId, taskModel }, thunkAPI) => {
  const { extra, dispatch, getState, rejectWithValue } = thunkAPI

  dispatch(notificationActions.setNotificationData({ status: 'loading' }))

  const taskModelFromState = taskSelectors.itemModelById(todoId, taskId)(getState())
  if (taskModelFromState) {
    const model = {
      ...taskModelFromState,
      ...taskModel,
    }
    try {
      const response = await extra.tasksAPI.updateTask({ todoId, taskId, model })
      if (response.data.resultCode === ResultCodes.Success) {
        dispatch(notificationActions.setNotificationData({ status: 'succeed', success: 'Task updated!' }))
        return response.data.data.item
      } else {
        handleServerError(response.data, dispatch)
        return rejectWithValue({ todoId, taskId })
      }
    } catch (e: any) {
      handleNetworkError(e.message, dispatch)
      return rejectWithValue({ todoId, taskId })
    }
  }
})
