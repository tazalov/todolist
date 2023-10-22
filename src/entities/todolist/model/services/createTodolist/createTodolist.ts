import { AppThunk } from 'app/providers/store'
import { AddTodoList } from '../../actions/todolist.actions'
import { SetStatus, SetError } from 'entities/notification'
import { ResultCodes } from 'shared/api/types/todolist'

export const createTodolist =
  (title: string): AppThunk =>
  async (dispatch, _, extra) => {
    const { todolistAPI } = extra
    dispatch(SetStatus('loading'))
    const response = await todolistAPI.createTodolist(title)
    if (response.data.resultCode === ResultCodes.Success) {
      dispatch(AddTodoList(response.data.data.item))
      dispatch(SetStatus('succeed'))
    } else {
      dispatch(SetError(response.data.messages[0] || 'Some error occurred'))
      dispatch(SetStatus('failed'))
    }
  }
