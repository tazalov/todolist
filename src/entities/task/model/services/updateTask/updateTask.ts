import { TaskModel } from '../../types/TasksSchema'
import { AppThunk } from 'app/providers/store'
import { getModelSpecificTask } from '../../selectors/tasks'
import { ChangeTask } from '../../actions/tasks.actions'

export const updateTask =
  (todoListId: string, taskId: string, taskModel: TaskModel): AppThunk =>
  async (dispatch, getState, extra) => {
    const { tasksAPI } = extra
    const taskModelFromState = getModelSpecificTask(todoListId, taskId)(getState())
    if (taskModelFromState) {
      const updatedTask = {
        ...taskModelFromState,
        ...taskModel,
      }
      const response = await tasksAPI.updateTask(todoListId, taskId, updatedTask)
      dispatch(ChangeTask(taskId, response.data.data.item))
    }
  }
