import { AxiosResponse } from 'axios'

import { deleteTodolist } from './deleteTodolist'

import { todolistAPI, TodolistAPI } from '../../../api/todolists.api'

import { RemoveTodolist, ChangeTodolist } from '../../actions/todolist.actions'

import { StateSchema, AppThunkExtra } from 'app/providers/store'

import { SetStatus } from 'entities/notification'
import { BaseResponseT } from 'shared/api/types/todolist'

jest.mock('../../../api/todolists.api')

const todolistAPIMock = todolistAPI as jest.Mocked<TodolistAPI>

describe('deleteTodolist thunk', () => {
  it('set of actions for a successful request is correct', async () => {
    const dispatch = jest.fn()
    const getState = () => ({}) as StateSchema
    const extra = {
      todolistAPI: todolistAPIMock,
    } as unknown as AppThunkExtra

    const result = {
      data: {
        resultCode: 0,
        data: {},
        messages: [],
        fieldsErrors: [],
      },
    } as unknown as AxiosResponse<BaseResponseT>

    todolistAPIMock.deleteTodolist.mockReturnValue(Promise.resolve(result))

    await deleteTodolist('1')(dispatch, getState, extra)

    expect(dispatch).toHaveBeenCalledTimes(5)
    expect(dispatch).toHaveBeenNthCalledWith(1, SetStatus('loading'))
    expect(dispatch).toHaveBeenNthCalledWith(2, ChangeTodolist('1', { entityStatus: 'loading' }))
    expect(dispatch).toHaveBeenNthCalledWith(3, RemoveTodolist('1'))
    expect(dispatch).toHaveBeenNthCalledWith(4, ChangeTodolist('1', { entityStatus: 'succeed' }))
    expect(dispatch).toHaveBeenNthCalledWith(5, SetStatus('succeed'))
  })
})
