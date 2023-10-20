import { TaskModel } from '../../types/TasksSchema'
import { AppThunk } from 'app/providers/store'
import { getSpecificTask } from '../../selectors/tasks'
import { ChangeTask } from '../../actions/tasks.actions'

export const updateTask =
  (todoListId: string, taskId: string, taskModel: TaskModel): AppThunk =>
  async (dispatch, getState, extra) => {
    const { tasksAPI } = extra
    const taskFromState = getSpecificTask(todoListId, taskId)(getState())
    if (taskFromState) {
      const updatedTask = {
        ...taskFromState,
        ...taskModel,
      }
      const response = await tasksAPI.updateTask(todoListId, taskId, updatedTask)
      dispatch(ChangeTask(taskId, response.data.data.item))
    }
  }
