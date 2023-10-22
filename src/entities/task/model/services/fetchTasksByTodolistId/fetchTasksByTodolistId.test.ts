import { fetchTasksByTodolistId } from './fetchTasksByTodolistId'
import { tasksAPI, TasksAPI } from '../../../api/tasks.api'
import { ItemsResponseT } from 'shared/api/types/todolist'
import { TaskT } from '../../types/TasksSchema'
import { StateSchema, AppThunkExtra } from 'app/providers/store'
import { SetTasks } from '../../actions/tasks.actions'
import { AxiosResponse } from 'axios'
import { SetStatus, SetError } from 'entities/notification'

jest.mock('../../../api/tasks.api')

const tasksAPIMock = tasksAPI as jest.Mocked<TasksAPI>

const task: TaskT = {
  id: '747a7bb8-8905-41a8-aef0-70598b2108a2',
  title: 'new',
  description: 'asd',
  todoListId: '13afa779-0be4-44d4-9e74-817c3e6b503a',
  order: -1,
  status: 1,
  priority: 1,
  startDate: new Date(),
  deadline: new Date(),
  addedDate: new Date(),
}

describe('fetchTasksByTodolistId thunk', () => {
  it('set of actions for a successful request is correct', async () => {
    const dispatch = jest.fn()
    const getState = () => ({}) as StateSchema
    const extra = {
      tasksAPI: tasksAPIMock,
    } as unknown as AppThunkExtra

    const result = {
      data: {
        items: [task],
      },
    }

    tasksAPIMock.getTasks.mockReturnValue(
      Promise.resolve(result as unknown as AxiosResponse<ItemsResponseT<TaskT>>),
    )

    await fetchTasksByTodolistId('1')(dispatch, getState, extra)

    expect(dispatch).toHaveBeenCalledTimes(3)
    expect(dispatch).toHaveBeenNthCalledWith(1, SetStatus('loading'))
    expect(dispatch).toHaveBeenNthCalledWith(2, SetTasks('1', result.data.items))
    expect(dispatch).toHaveBeenNthCalledWith(3, SetStatus('succeed'))
  })

  it('set of actions for a bad request is correct', async () => {
    const dispatch = jest.fn()
    const getState = () => ({}) as StateSchema
    const extra = {
      tasksAPI: tasksAPIMock,
    } as unknown as AppThunkExtra

    const result = {
      data: {
        error: 'some occurred error',
      },
    }

    tasksAPIMock.getTasks.mockReturnValue(
      Promise.resolve(result as unknown as AxiosResponse<ItemsResponseT<TaskT>>),
    )

    await fetchTasksByTodolistId('1')(dispatch, getState, extra)

    expect(dispatch).toHaveBeenCalledTimes(3)
    expect(dispatch).toHaveBeenNthCalledWith(1, SetStatus('loading'))
    expect(dispatch).toHaveBeenNthCalledWith(2, SetError('some occurred error'))
    expect(dispatch).toHaveBeenNthCalledWith(3, SetStatus('failed'))
  })
})
