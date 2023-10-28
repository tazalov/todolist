import { AxiosResponse } from 'axios'

import { deleteTask } from './deleteTask'

import { tasksAPI, TasksAPI } from '../../../api/tasks.api'

import { RemoveTask } from '../../actions/tasks.actions'

import { StateSchema, AppThunkExtra } from 'app/providers/store'
import { SetStatus, SetError } from 'entities/notification'
import { BaseResponseT } from 'shared/api/types/todolist'

jest.mock('../../../api/tasks.api')

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
    } as unknown as AxiosResponse<BaseResponseT>

    tasksAPIMock.deleteTask.mockReturnValue(Promise.resolve(result))

    await deleteTask('1', '2')(dispatch, getState, extra)

    expect(dispatch).toHaveBeenCalledTimes(3)
    expect(dispatch).toHaveBeenNthCalledWith(1, SetStatus('loading'))
    expect(dispatch).toHaveBeenNthCalledWith(2, RemoveTask('1', '2'))
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
    } as unknown as AxiosResponse<BaseResponseT>

    tasksAPIMock.deleteTask.mockReturnValue(Promise.resolve(result))

    await deleteTask('1', '2')(dispatch, getState, extra)

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

    tasksAPIMock.deleteTask.mockReturnValue(Promise.reject(new Error('Some error occurred')))

    await deleteTask('1', '2')(dispatch, getState, extra)

    expect(dispatch).toHaveBeenCalledTimes(3)
    expect(dispatch).toHaveBeenNthCalledWith(1, SetStatus('loading'))
    expect(dispatch).toHaveBeenNthCalledWith(2, SetError('Some error occurred'))
    expect(dispatch).toHaveBeenNthCalledWith(3, SetStatus('failed'))
  })
})
