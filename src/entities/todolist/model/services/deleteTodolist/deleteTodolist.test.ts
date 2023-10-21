import { deleteTodolist } from './deleteTodolist'
import { todolistAPI, TodolistAPI } from '../../../api/todolists.api'
import { BaseResponseT } from 'shared/api/types/todolist'
import { StateSchema, AppThunkExtra } from 'app/providers/store'
import { AxiosResponse } from 'axios'
import { RemoveTodolist } from '../../actions/todolist.actions'

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
    }

    todolistAPIMock.deleteTodolist.mockReturnValue(
      Promise.resolve(result as unknown as AxiosResponse<BaseResponseT>),
    )

    await deleteTodolist('1')(dispatch, getState, extra)

    expect(dispatch).toHaveBeenCalledTimes(1)
    expect(dispatch).toHaveBeenCalledWith(RemoveTodolist('1'))
  })
})
