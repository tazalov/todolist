import { AppThunk } from 'app/providers/store/config/store'
import { SetTasks } from '../../actions/tasks.actions'

export const fetchTasksByTodolistId =
  (todoListId: string): AppThunk =>
  async (dispatch, _, extra) => {
    const { tasksAPI } = extra
    const response = await tasksAPI.getTasks(todoListId)
    dispatch(SetTasks(todoListId, response.data.items))
  }
