import { getTasksItemModel } from '../../selectors/tasks'
import { taskActions } from '../../slice/task.slice'
import { TaskModel } from '../../types/TasksSchema'

import { AppThunk } from 'app/providers/store'

import { notificationActions, handleServerError, handleNetworkError } from 'entities/notification'
import { ResultCodes } from 'shared/api/types/todolist'

export const updateTask =
  (todoId: string, taskId: string, taskModel: TaskModel): AppThunk =>
  async (dispatch, getState, extra) => {
    const { tasksAPI } = extra
    dispatch(notificationActions.setStatus('loading'))
    dispatch(taskActions.changeTaskStatus({ todoId, entityStatus: 'loading' }))
    const taskModelFromState = getTasksItemModel(todoId, taskId)(getState())
    if (taskModelFromState) {
      const updatedTask = {
        ...taskModelFromState,
        ...taskModel,
      }
      try {
        const response = await tasksAPI.updateTask(todoId, taskId, updatedTask)
        if (response.data.resultCode === ResultCodes.Success) {
          dispatch(taskActions.changeTask(response.data.data.item))
          dispatch(taskActions.changeTaskStatus({ todoId, entityStatus: 'succeed' }))
          dispatch(notificationActions.setStatus('succeed'))
        } else {
          handleServerError(response.data, dispatch)
          dispatch(taskActions.changeTaskStatus({ todoId, entityStatus: 'failed' }))
        }
      } catch (e: any) {
        handleNetworkError(e.message, dispatch)
        dispatch(taskActions.changeTaskStatus({ todoId, entityStatus: 'failed' }))
      }
    }
  }
