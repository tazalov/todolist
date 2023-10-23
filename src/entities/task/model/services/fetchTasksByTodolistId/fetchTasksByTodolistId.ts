import { AppThunk } from 'app/providers/store'
import { SetTasks } from '../../actions/tasks.actions'
import { SetStatus, SetError } from 'entities/notification'

export const fetchTasksByTodolistId =
  (todoListId: string): AppThunk =>
  async (dispatch, _, extra) => {
    const { tasksAPI } = extra
    dispatch(SetStatus('loading'))
    try {
      const response = await tasksAPI.getTasks(todoListId)
      if (!response.data.error) {
        dispatch(SetTasks(todoListId, response.data.items))
        dispatch(SetStatus('succeed'))
      } else {
        throw new Error(response.data.error || 'Some error occurred')
      }
    } catch (e: any) {
      dispatch(SetError(e.message))
      dispatch(SetStatus('failed'))
    }
  }
