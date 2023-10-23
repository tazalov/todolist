import { TaskModel } from '../../types/TasksSchema'
import { AppThunk } from 'app/providers/store'
import { getModelSpecificTask } from '../../selectors/tasks'
import { ChangeTask } from '../../actions/tasks.actions'
import { SetStatus, handleServerError, handleNetworkError } from 'entities/notification'
import { ResultCodes } from 'shared/api/types/todolist'

export const updateTask =
  (todoListId: string, taskId: string, taskModel: TaskModel): AppThunk =>
  async (dispatch, getState, extra) => {
    const { tasksAPI } = extra
    dispatch(SetStatus('loading'))
    const taskModelFromState = getModelSpecificTask(todoListId, taskId)(getState())
    if (taskModelFromState) {
      const updatedTask = {
        ...taskModelFromState,
        ...taskModel,
      }
      try {
        const response = await tasksAPI.updateTask(todoListId, taskId, updatedTask)
        if (response.data.resultCode === ResultCodes.Success) {
          dispatch(ChangeTask(taskId, response.data.data.item))
          dispatch(SetStatus('succeed'))
        } else {
          handleServerError(response.data, dispatch)
        }
      } catch (e: any) {
        handleNetworkError(e.message, dispatch)
      }
    } else {
      handleNetworkError('', dispatch)
    }
  }
