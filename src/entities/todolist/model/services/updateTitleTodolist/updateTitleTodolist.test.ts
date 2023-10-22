import { updateTitleTodolist } from './updateTitleTodolist'
import { todolistAPI, TodolistAPI } from '../../../api/todolists.api'
import { StateSchema, AppThunkExtra } from 'app/providers/store'
import { AxiosResponse } from 'axios'
import { TodoListT } from '../../types/TodolistsSchema'
import { ChangeTodolist } from '../../actions/todolist.actions'
import { BaseResponseT } from 'shared/api/types/todolist'

jest.mock('../../../api/todolists.api')

const todolistAPIMock = todolistAPI as jest.Mocked<TodolistAPI>

const todolist: TodoListT = {
  id: '1',
  title: 'new',
  order: -1,
  addedDate: new Date(),
}

describe('updateTitleTodolist thunk', () => {
  it('set of actions for a successful request is correct', async () => {
    const dispatch = jest.fn()
    const getState = () => ({}) as StateSchema
    const extra = {
      todolistAPI: todolistAPIMock,
    } as unknown as AppThunkExtra

    const result = {
      data: [todolist],
    }

    todolistAPIMock.updateTodolist.mockReturnValue(
      Promise.resolve(result as unknown as AxiosResponse<BaseResponseT>),
    )

    await updateTitleTodolist('1', 'title')(dispatch, getState, extra)

    expect(dispatch).toHaveBeenCalledTimes(1)
    expect(dispatch).toHaveBeenCalledWith(ChangeTodolist('1', { title: 'title' }))
  })
})
