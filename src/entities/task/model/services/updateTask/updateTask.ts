import { TaskModel } from '../../types/TasksSchema'
import { AppThunk } from 'app/providers/store'
import { getModelSpecificTask } from '../../selectors/tasks'
import { ChangeTask } from '../../actions/tasks.actions'
import { SetStatus, SetError } from 'entities/notification'
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
          throw new Error(response.data.messages[0] || 'Some error occurred')
        }
      } catch (e: any) {
        dispatch(SetError(e.message))
        dispatch(SetStatus('failed'))
      }
    } else {
      dispatch(SetError('Task not found!'))
    }
  }
