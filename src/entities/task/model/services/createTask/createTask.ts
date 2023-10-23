import { AppThunk } from 'app/providers/store'
import { AddTask } from '../../actions/tasks.actions'
import { SetError, SetStatus } from 'entities/notification'
import { ResultCodes } from 'shared/api/types/todolist'

export const createTask =
  (todoListId: string, title: string): AppThunk =>
  async (dispatch, _, extra) => {
    const { tasksAPI } = extra
    dispatch(SetStatus('loading'))
    try {
      const response = await tasksAPI.createTask(todoListId, title)
      if (response.data.resultCode === ResultCodes.Success) {
        dispatch(AddTask(response.data.data.item))
        dispatch(SetStatus('succeed'))
      } else {
        throw new Error(response.data.messages[0] || 'Some error occurred')
      }
    } catch (e: any) {
      dispatch(SetError(e.message))
      dispatch(SetStatus('failed'))
    }
  }
