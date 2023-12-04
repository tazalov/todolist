import { createAsyncThunk } from '@reduxjs/toolkit'

import { taskSelectors } from '../../selectors/tasks'
import { TaskModel, Task } from '../../types/TasksSchema'

import { ThunkConfig } from 'app/providers/store'
import { ResultCodes, BaseResponse } from 'shared/api/types/todolist'

interface UpdateTaskParams {
  todoId: string
  taskId: string
  taskModel: TaskModel
}

export const updateTask = createAsyncThunk<Task | undefined, UpdateTaskParams, ThunkConfig<BaseResponse>>(
  'entities/task/updateTask',
  async ({ todoId, taskId, taskModel }, thunkAPI) => {
    const { extra, getState, rejectWithValue } = thunkAPI

    const taskModelFromState = taskSelectors.itemModelById(todoId, taskId)(getState())
    if (taskModelFromState) {
      const model = {
        ...taskModelFromState,
        ...taskModel,
      }

      const response = await extra.tasksAPI.updateTask({ todoId, taskId, model })
      if (response.data.resultCode === ResultCodes.Success) {
        return response.data.data.item
      } else {
        return rejectWithValue(response.data)
      }
    }
  },
)
