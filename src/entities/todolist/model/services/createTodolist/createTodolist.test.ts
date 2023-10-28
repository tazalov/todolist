import { AxiosResponse } from 'axios'

import { createTodolist } from './createTodolist'

import { todolistAPI, TodolistAPI } from '../../../api/todolists.api'

import { AddTodoList } from '../../actions/todolist.actions'
import { TodoListT } from '../../types/TodolistsSchema'

import { StateSchema, AppThunkExtra } from 'app/providers/store'

import { SetStatus, SetError } from 'entities/notification'
import { BaseResponseT } from 'shared/api/types/todolist'

jest.mock('../../../api/todolists.api')

const todolistAPIMock = todolistAPI as jest.Mocked<TodolistAPI>

const todolist: TodoListT = {
  id: '1',
  title: 'new',
  order: -1,
  addedDate: new Date(),
}

describe('createTodolist thunk', () => {
  it('set of actions for a successful request is correct', async () => {
    const dispatch = jest.fn()
    const getState = () => ({}) as StateSchema
    const extra = {
      todolistAPI: todolistAPIMock,
    } as unknown as AppThunkExtra

    const result = {
      data: {
        resultCode: 0,
        data: { item: todolist },
      },
    } as unknown as AxiosResponse<BaseResponseT<{ item: TodoListT }>>

    todolistAPIMock.createTodolist.mockReturnValue(Promise.resolve(result))

    await createTodolist('title')(dispatch, getState, extra)

    expect(dispatch).toHaveBeenCalledTimes(3)
    expect(dispatch).toHaveBeenNthCalledWith(1, SetStatus('loading'))
    expect(dispatch).toHaveBeenNthCalledWith(2, AddTodoList(result.data.data.item))
    expect(dispatch).toHaveBeenNthCalledWith(3, SetStatus('succeed'))
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
        messages: ['some error occurred'],
      },
    } as unknown as AxiosResponse<BaseResponseT<{ item: TodoListT }>>

    todolistAPIMock.createTodolist.mockReturnValue(Promise.resolve(result))

    await createTodolist('title')(dispatch, getState, extra)

    expect(dispatch).toHaveBeenCalledTimes(3)
    expect(dispatch).toHaveBeenNthCalledWith(1, SetStatus('loading'))
    expect(dispatch).toHaveBeenNthCalledWith(2, SetError('some error occurred'))
    expect(dispatch).toHaveBeenNthCalledWith(3, SetStatus('failed'))
  })

  it('set of actions for a bad request is correct', async () => {
    const dispatch = jest.fn()
    const getState = () => ({}) as StateSchema
    const extra = {
      todolistAPI: todolistAPIMock,
    } as unknown as AppThunkExtra

    todolistAPIMock.createTodolist.mockReturnValue(Promise.reject(new Error('some error')))

    await createTodolist('title')(dispatch, getState, extra)

    expect(dispatch).toHaveBeenCalledTimes(3)
    expect(dispatch).toHaveBeenNthCalledWith(1, SetStatus('loading'))
    expect(dispatch).toHaveBeenNthCalledWith(2, SetError('some error'))
    expect(dispatch).toHaveBeenNthCalledWith(3, SetStatus('failed'))
  })
})
