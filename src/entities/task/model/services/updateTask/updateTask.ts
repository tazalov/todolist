import { ChangeTask, ChangeTaskStatus } from '../../actions/tasks.actions'
import { getModelSpecificTask } from '../../selectors/tasks'
import { TaskModel } from '../../types/TasksSchema'

import { AppThunk } from 'app/providers/store'

import { notificationActions, handleServerError, handleNetworkError } from 'entities/notification'
import { ResultCodes } from 'shared/api/types/todolist'

export const updateTask =
  (todoListId: string, taskId: string, taskModel: TaskModel): AppThunk =>
  async (dispatch, getState, extra) => {
    const { tasksAPI } = extra
    dispatch(notificationActions.setStatus('loading'))
    dispatch(ChangeTaskStatus(todoListId, 'loading'))
    const taskModelFromState = getModelSpecificTask(todoListId, taskId)(getState())
    if (taskModelFromState) {
      const updatedTask = {
        ...taskModelFromState,
        ...taskModel,
      }
      try {
        const response = await tasksAPI.updateTask(todoListId, taskId, updatedTask)
        if (response.data.resultCode === ResultCodes.Success) {
          dispatch(ChangeTask(taskId, response.data.data.item))
          dispatch(ChangeTaskStatus(todoListId, 'succeed'))
          dispatch(notificationActions.setStatus('succeed'))
        } else {
          handleServerError(response.data, dispatch)
          dispatch(ChangeTaskStatus(todoListId, 'failed'))
        }
      } catch (e: any) {
        handleNetworkError(e.message, dispatch)
        dispatch(ChangeTaskStatus(todoListId, 'failed'))
      }
    }
  }
