import { AxiosResponse } from 'axios'

import { createTask } from './createTask'

import { tasksAPI, TasksAPI } from '../../../api/tasks.api'

import { AddTask } from '../../actions/tasks.actions'
import { TaskT } from '../../types/TasksSchema'

import { StateSchema, AppThunkExtra } from 'app/providers/store'
import { SetStatus, SetError } from 'entities/notification'
import { BaseResponseT } from 'shared/api/types/todolist'

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

describe('createTask thunk', () => {
  it('set of actions for a successful request is correct', async () => {
    const dispatch = jest.fn()
    const getState = () => ({}) as StateSchema
    const extra = {
      tasksAPI: tasksAPIMock,
    } as unknown as AppThunkExtra

    const result = {
      data: {
        resultCode: 0,
        data: { item: task },
        messages: [],
        fieldsErrors: [],
      },
    } as unknown as AxiosResponse<BaseResponseT<{ item: TaskT }>>

    tasksAPIMock.createTask.mockReturnValue(Promise.resolve(result))

    await createTask('1', 'title')(dispatch, getState, extra)

    expect(dispatch).toHaveBeenCalledTimes(3)
    expect(dispatch).toHaveBeenNthCalledWith(1, SetStatus('loading'))
    expect(dispatch).toHaveBeenNthCalledWith(2, AddTask(task))
    expect(dispatch).toHaveBeenNthCalledWith(3, SetStatus('succeed'))
  })

  it('set of actions for a successful request with error is correct', async () => {
    const dispatch = jest.fn()
    const getState = () => ({}) as StateSchema
    const extra = {
      tasksAPI: tasksAPIMock,
    } as unknown as AppThunkExtra

    const result = {
      data: {
        resultCode: 1,
        messages: ['some error occurred'],
      },
    } as unknown as AxiosResponse<BaseResponseT<{ item: TaskT }>>

    tasksAPIMock.createTask.mockReturnValue(Promise.resolve(result))

    await createTask('1', 'title')(dispatch, getState, extra)

    expect(dispatch).toHaveBeenCalledTimes(3)
    expect(dispatch).toHaveBeenNthCalledWith(1, SetStatus('loading'))
    expect(dispatch).toHaveBeenNthCalledWith(2, SetError('some error occurred'))
    expect(dispatch).toHaveBeenNthCalledWith(3, SetStatus('failed'))
  })

  it('set of actions for a bad request is correct', async () => {
    const dispatch = jest.fn()
    const getState = () => ({}) as StateSchema
    const extra = {
      tasksAPI: tasksAPIMock,
    } as unknown as AppThunkExtra

    tasksAPIMock.createTask.mockReturnValue(Promise.reject(new Error('Some error occurred')))

    await createTask('1', 'title')(dispatch, getState, extra)

    expect(dispatch).toHaveBeenCalledTimes(3)
    expect(dispatch).toHaveBeenNthCalledWith(1, SetStatus('loading'))
    expect(dispatch).toHaveBeenNthCalledWith(2, SetError('Some error occurred'))
    expect(dispatch).toHaveBeenNthCalledWith(3, SetStatus('failed'))
  })
})
