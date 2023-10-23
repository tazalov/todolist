import { AppThunk } from 'app/providers/store'
import { RemoveTodolist, ChangeTodolist } from '../../actions/todolist.actions'
import { SetStatus, handleServerError, handleNetworkError } from 'entities/notification'
import { ResultCodes } from 'shared/api/types/todolist'

export const deleteTodolist =
  (todoListId: string): AppThunk =>
  async (dispatch, _, extra) => {
    const { todolistAPI } = extra
    dispatch(SetStatus('loading'))
    dispatch(ChangeTodolist(todoListId, { entityStatus: 'loading' }))
    try {
      const response = await todolistAPI.deleteTodolist(todoListId)
      if (response.data.resultCode === ResultCodes.Success) {
        dispatch(RemoveTodolist(todoListId))
        dispatch(ChangeTodolist(todoListId, { entityStatus: 'succeed' }))
        dispatch(SetStatus('succeed'))
      } else {
        handleServerError(response.data, dispatch)
      }
    } catch (e: any) {
      handleNetworkError(e.message, dispatch)
    }
  }
