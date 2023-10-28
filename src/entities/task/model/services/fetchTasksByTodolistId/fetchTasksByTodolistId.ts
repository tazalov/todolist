import { taskActions } from '../../slice/task.slice'

import { AppThunk } from 'app/providers/store'
import { notificationActions, handleNetworkError } from 'entities/notification'

export const fetchTasksByTodolistId =
  (todoId: string): AppThunk =>
  async (dispatch, _, extra) => {
    const { tasksAPI } = extra
    dispatch(notificationActions.setStatus('loading'))
    try {
      const response = await tasksAPI.getTasks(todoId)
      if (!response.data.error) {
        dispatch(taskActions.setTasks({ todoId, tasks: response.data.items }))
        dispatch(notificationActions.setStatus('succeed'))
      } else {
        handleNetworkError(response.data.error, dispatch)
      }
    } catch (e: any) {
      handleNetworkError(e.message, dispatch)
    }
  }
