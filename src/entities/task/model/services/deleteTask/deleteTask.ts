import { AppThunk } from 'app/providers/store/config/store'
import { RemoveTask } from '../../actions/tasks.actions'

export const deleteTask =
  (todoListId: string, taskId: string): AppThunk =>
  async (dispatch, _, extra) => {
    const { tasksAPI } = extra
    const response = await tasksAPI.deleteTask(todoListId, taskId)
    dispatch(RemoveTask(todoListId, taskId))
  }
