import { deleteTask } from './deleteTask'
import { tasksAPI, TasksAPI } from 'api/config/tasks.api'
import { BaseResponseT } from 'api/types/todolist'
import { StateSchema, AppThunkExtra } from 'app/providers/store'
import { RemoveTask } from '../../actions/tasks.actions'
import { AxiosResponse } from 'axios'

jest.mock('api/config/tasks.api')

const tasksAPIMock = tasksAPI as jest.Mocked<TasksAPI>

describe('deleteTask thunk', () => {
  it('set of actions for a successful request is correct', async () => {
    const dispatch = jest.fn()
    const getState = () => ({}) as StateSchema
    const extra = {
      tasksAPI: tasksAPIMock,
    } as unknown as AppThunkExtra

    const result = {
      data: {
        resultCode: 0,
        data: {},
        messages: [],
        fieldsErrors: [],
      },
    }

    tasksAPIMock.deleteTask.mockReturnValue(
      Promise.resolve(result as unknown as AxiosResponse<BaseResponseT>),
    )

    await deleteTask('1', '2')(dispatch, getState, extra)

    expect(dispatch).toHaveBeenCalledTimes(1)
    expect(dispatch).toHaveBeenCalledWith(RemoveTask('1', '2'))
  })
})
