import { fetchTodoLists } from './fetchTodoLists'
import { todolistAPI, TodolistAPI } from '../../../api/todolists.api'
import { StateSchema, AppThunkExtra } from 'app/providers/store'
import { AxiosResponse } from 'axios'
import { TodoListT } from '../../types/TodolistsSchema'
import { SetTodoLists } from '../../actions/todolist.actions'
import { SetStatus } from 'entities/notification'

jest.mock('../../../api/todolists.api')

const todolistAPIMock = todolistAPI as jest.Mocked<TodolistAPI>

const todolist: TodoListT = {
  id: '1',
  title: 'new',
  order: -1,
  addedDate: new Date(),
}

describe('fetchTodoLists thunk', () => {
  it('set of actions for a successful request is correct', async () => {
    const dispatch = jest.fn()
    const getState = () => ({}) as StateSchema
    const extra = {
      todolistAPI: todolistAPIMock,
    } as unknown as AppThunkExtra

    const result = {
      data: [todolist],
    }

    todolistAPIMock.getTodolists.mockReturnValue(
      Promise.resolve(result as unknown as AxiosResponse<TodoListT[]>),
    )

    await fetchTodoLists()(dispatch, getState, extra)

    expect(dispatch).toHaveBeenCalledTimes(3)
    expect(dispatch).toHaveBeenNthCalledWith(1, SetStatus('loading'))
    expect(dispatch).toHaveBeenNthCalledWith(2, SetTodoLists(result.data))
    expect(dispatch).toHaveBeenNthCalledWith(3, SetStatus('succeed'))
  })
})
