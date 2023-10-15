import { v1 } from 'uuid'
import {
  AddTodoList,
  ChangeFilterTodolist,
  ChangeTitleTodolist,
  RemoveTodolist,
} from '../actions/todolist.actions'
import { TodoListsSchema } from '../types/TodolistsSchema'
import { todoListReducer } from './todolist.reducer'

describe('todolist reducer', () => {
  const todoListId1 = v1()
  const todoListId2 = v1()
  let initialState: TodoListsSchema = []

  beforeEach(() => {
    initialState = [
      { id: todoListId1, title: 'What to learn', filter: 'all', order: 0, addedDate: new Date() },
      { id: todoListId2, title: 'What to byu', filter: 'active', order: 0, addedDate: new Date() },
    ]
  })

  it('correct todolist should be added', () => {
    const title = 'new title todolist'
    const action = AddTodoList(title)
    const newState = todoListReducer(initialState, action)

    expect(newState.length).toBe(3)
    expect(newState[newState.length - 1].id).toBeDefined()
    expect(newState[newState.length - 1].title).toBe(title)
    expect(newState[newState.length - 1].filter).toBe('all')
  })

  it('correct todolist should be removed', () => {
    const action = RemoveTodolist(todoListId1)
    const newState = todoListReducer(initialState, action)

    expect(newState.length).toBe(1)
    expect(newState[0].id).toBe(todoListId2)
    expect(newState[0].title).toBe('What to byu')
    expect(newState[0].filter).toBe('active')
  })

  it('todolist filter should be changed', () => {
    const action = ChangeFilterTodolist(todoListId1, 'active')
    const newState = todoListReducer(initialState, action)

    expect(newState.length).toBe(2)
    expect(newState[0].title).toBe('What to learn')
    expect(newState[0].filter).toBe('active')
  })

  it('todolist title should be changed', () => {
    const title = 'new title todolist'
    const action = ChangeTitleTodolist(todoListId1, title)
    const newState = todoListReducer(initialState, action)

    expect(newState.length).toBe(2)
    expect(newState[0].title).toBe(title)
    expect(newState[0].filter).toBe('all')
  })

  it('should return the current state for unknown actions', () => {
    const action = { type: 'unknown' }
    //@ts-ignore
    const newState = todoListReducer(initialState, action)

    expect(newState).toEqual(initialState)
  })
})
