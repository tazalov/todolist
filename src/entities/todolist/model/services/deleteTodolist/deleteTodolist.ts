import { AppThunk } from 'app/providers/store'
import { RemoveTodolist, ChangeTodolist } from '../../actions/todolist.actions'
import { SetStatus } from 'entities/notification'

export const deleteTodolist =
  (todoListId: string): AppThunk =>
  async (dispatch, _, extra) => {
    const { todolistAPI } = extra
    dispatch(SetStatus('loading'))
    dispatch(ChangeTodolist(todoListId, { entityStatus: 'loading' }))
    const response = await todolistAPI.deleteTodolist(todoListId)
    dispatch(RemoveTodolist(todoListId))
    dispatch(ChangeTodolist(todoListId, { entityStatus: 'succeed' }))
    dispatch(SetStatus('succeed'))
  }
