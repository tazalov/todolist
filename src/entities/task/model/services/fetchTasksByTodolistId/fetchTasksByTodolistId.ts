import { SetTasks } from '../../actions/tasks.actions'

import { AppThunk } from 'app/providers/store'
import { notificationActions, handleNetworkError } from 'entities/notification'

export const fetchTasksByTodolistId =
  (todoListId: string): AppThunk =>
  async (dispatch, _, extra) => {
    const { tasksAPI } = extra
    dispatch(notificationActions.setStatus('loading'))
    try {
      const response = await tasksAPI.getTasks(todoListId)
      if (!response.data.error) {
        dispatch(SetTasks(todoListId, response.data.items))
        dispatch(notificationActions.setStatus('succeed'))
      } else {
        handleNetworkError(response.data.error, dispatch)
      }
    } catch (e: any) {
      handleNetworkError(e.message, dispatch)
    }
  }
