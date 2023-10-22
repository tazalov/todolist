import { AppThunk } from 'app/providers/store'
import { SetTasks } from '../../actions/tasks.actions'
import { SetStatus, SetError } from 'entities/notification'

export const fetchTasksByTodolistId =
  (todoListId: string): AppThunk =>
  async (dispatch, _, extra) => {
    const { tasksAPI } = extra
    dispatch(SetStatus('loading'))
    const response = await tasksAPI.getTasks(todoListId)
    if (!response.data.error) {
      dispatch(SetTasks(todoListId, response.data.items))
      dispatch(SetStatus('succeed'))
    } else {
      dispatch(SetError(response.data.error || 'Some error occurred'))
      dispatch(SetStatus('failed'))
    }
  }
