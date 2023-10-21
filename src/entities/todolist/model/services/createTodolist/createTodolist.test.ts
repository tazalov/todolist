import { createTodolist } from './createTodolist'
import { todolistAPI, TodolistAPI } from 'api/config/todolists.api'
import { BaseResponseT } from 'api/types/todolist'
import { StateSchema, AppThunkExtra } from 'app/providers/store'
import { AxiosResponse } from 'axios'
import { TodoListT } from '../../types/TodolistsSchema'
import { AddTodoList } from '../../actions/todolist.actions'

jest.mock('api/config/todolists.api')

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
        messages: [],
        fieldsErrors: [],
      },
    }

    todolistAPIMock.createTodolist.mockReturnValue(
      Promise.resolve(result as unknown as AxiosResponse<BaseResponseT<{ item: TodoListT }>>),
    )

    await createTodolist('title')(dispatch, getState, extra)

    expect(dispatch).toHaveBeenCalledTimes(1)
    expect(dispatch).toHaveBeenCalledWith(AddTodoList(result.data.data.item))
  })
})
