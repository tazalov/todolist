import { AxiosResponse } from 'axios'

import { updateTitleTodolist } from './updateTitleTodolist'

import { todolistAPI, TodolistAPI } from '../../../api/todolists.api'

import { ChangeTodolist } from '../../actions/todolist.actions'

import { StateSchema, AppThunkExtra } from 'app/providers/store'

import { SetStatus, SetError } from 'entities/notification'
import { BaseResponseT } from 'shared/api/types/todolist'

jest.mock('../../../api/todolists.api')

const todolistAPIMock = todolistAPI as jest.Mocked<TodolistAPI>

describe('updateTitleTodolist thunk', () => {
  it('set of actions for a successful request is correct', async () => {
    const dispatch = jest.fn()
    const getState = () => ({}) as StateSchema
    const extra = {
      todolistAPI: todolistAPIMock,
    } as unknown as AppThunkExtra

    const result = {
      data: {
        resultCode: 0,
      },
    } as unknown as AxiosResponse<BaseResponseT>

    todolistAPIMock.updateTodolist.mockReturnValue(Promise.resolve(result))

    await updateTitleTodolist('1', 'title')(dispatch, getState, extra)

    expect(dispatch).toHaveBeenCalledTimes(4)
    expect(dispatch).toHaveBeenNthCalledWith(1, SetStatus('loading'))
    expect(dispatch).toHaveBeenNthCalledWith(2, ChangeTodolist('1', { entityStatus: 'loading' }))
    expect(dispatch).toHaveBeenNthCalledWith(3, ChangeTodolist('1', { title: 'title', entityStatus: 'succeed' }))
    expect(dispatch).toHaveBeenNthCalledWith(4, SetStatus('succeed'))
  })

  it('set of actions for a successful request with error is correct', async () => {
    const dispatch = jest.fn()
    const getState = () => ({}) as StateSchema
    const extra = {
      todolistAPI: todolistAPIMock,
    } as unknown as AppThunkExtra

    const result = {
      data: {
        resultCode: 1,
        messages: ['error text'],
      },
    } as unknown as AxiosResponse<BaseResponseT>

    todolistAPIMock.updateTodolist.mockReturnValue(Promise.resolve(result))

    await updateTitleTodolist('1', 'title')(dispatch, getState, extra)

    expect(dispatch).toHaveBeenCalledTimes(5)
    expect(dispatch).toHaveBeenNthCalledWith(1, SetStatus('loading'))
    expect(dispatch).toHaveBeenNthCalledWith(2, ChangeTodolist('1', { entityStatus: 'loading' }))
    expect(dispatch).toHaveBeenNthCalledWith(3, SetError('error text'))
    expect(dispatch).toHaveBeenNthCalledWith(4, SetStatus('failed'))
    expect(dispatch).toHaveBeenNthCalledWith(5, ChangeTodolist('1', { entityStatus: 'failed' }))
  })
})
