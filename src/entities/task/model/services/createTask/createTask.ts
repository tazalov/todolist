import { AppThunk } from 'app/providers/store'
import { AddTask } from '../../actions/tasks.actions'

export const createTask =
  (todoListId: string, title: string): AppThunk =>
  async (dispatch, _, extra) => {
    const { tasksAPI } = extra
    const response = await tasksAPI.createTask(todoListId, title)
    dispatch(AddTask(response.data.data.item))
  }
