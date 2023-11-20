import { createAsyncThunk } from '@reduxjs/toolkit'

import { taskSelectors } from '../../selectors/tasks'
import { TaskModel, TaskT } from '../../types/TasksSchema'

import { ThunkConfig } from 'app/providers/store'

import { notificationActions, handleServerError, handleNetworkError } from 'entities/notification'
import { ResultCodes } from 'shared/api/types/todolist'
import { getCurrentLang } from 'shared/lib/i18n/getCurrentLang'

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

  const currentLang = getCurrentLang()

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
        const successMsg = currentLang === 'en' ? 'Task updated!' : `Задача обновлена!`

        dispatch(notificationActions.setNotificationData({ status: 'succeed', success: successMsg }))

        return response.data.data.item
      } else {
        handleServerError(response.data, dispatch)
        return rejectWithValue({ todoId, taskId })
      }
    } catch (e) {
      handleNetworkError(e, dispatch)
      return rejectWithValue({ todoId, taskId })
    }
  }
})
