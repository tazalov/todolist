import { AppThunk } from 'app/providers/store'
import { RemoveTask } from '../../actions/tasks.actions'
import { SetStatus, SetError } from 'entities/notification'
import { ResultCodes } from 'shared/api/types/todolist'

export const deleteTask =
  (todoListId: string, taskId: string): AppThunk =>
  async (dispatch, _, extra) => {
    const { tasksAPI } = extra
    dispatch(SetStatus('loading'))
    try {
      const response = await tasksAPI.deleteTask(todoListId, taskId)
      if (response.data.resultCode === ResultCodes.Success) {
        dispatch(RemoveTask(todoListId, taskId))
        dispatch(SetStatus('succeed'))
      } else {
        throw new Error(response.data.messages[0] || 'Some error occurred')
      }
    } catch (e: any) {
      dispatch(SetError(e.message))
      dispatch(SetStatus('failed'))
    }
  }
