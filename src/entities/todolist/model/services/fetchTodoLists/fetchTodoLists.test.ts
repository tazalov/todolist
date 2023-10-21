import { fetchTodoLists } from './fetchTodoLists'
import { todolistAPI, TodolistAPI } from 'api/config/todolists.api'
import { StateSchema, AppThunkExtra } from 'app/providers/store'
import { AxiosResponse } from 'axios'
import { TodoListT } from '../../types/TodolistsSchema'
import { SetTodoLists } from '../../actions/todolist.actions'

jest.mock('api/config/todolists.api')

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

    expect(dispatch).toHaveBeenCalledTimes(1)
    expect(dispatch).toHaveBeenCalledWith(SetTodoLists(result.data))
  })
})
