import { v1 } from 'uuid'

import { todoListReducer, changeTodoList } from './todolist.slice'

import { createTodolist } from '../services/createTodolist/createTodolist'
import { deleteTodolist } from '../services/deleteTodolist/deleteTodolist'
import { fetchTodoLists } from '../services/fetchTodoLists/fetchTodoLists'
import { TodoListsSchema } from '../types/TodolistsSchema'

import { clearCurrentState } from 'app/providers/store'

describe('todolist reducer', () => {
  const id1 = v1()
  const id2 = v1()

  const date = new Date(2023, 0, 1, 0, 0, 0, 0)

  let initialState: TodoListsSchema = {
    items: [],
    isLoading: false,
  }

  beforeEach(() => {
    initialState = {
      items: [
        {
          id: id1,
          title: 'What to learn',
          filter: 'all',
          order: 0,
          addedDate: date,
          entityStatus: 'idle',
        },
        {
          id: id2,
          title: 'What to byu',
          filter: 'active',
          order: 0,
          addedDate: date,
          entityStatus: 'idle',
        },
      ],
      isLoading: false,
    }
  })

  it('correct todolists should be set', () => {
    const todoListsFromServer = [
      { id: id1, title: 'What to learn', order: 0, addedDate: date },
      { id: id2, title: 'What to byu', order: 0, addedDate: date },
    ]
    const action = fetchTodoLists.fulfilled(todoListsFromServer, 'requestId', undefined)
    const newState = todoListReducer({ items: [], isLoading: false }, action)

    expect(newState.items.length).toBe(2)
    expect(newState.items).toEqual([
      {
        id: id1,
        title: 'What to learn',
        filter: 'all',
        order: 0,
        addedDate: date,
        entityStatus: 'idle',
      },
      {
        id: id2,
        title: 'What to byu',
        filter: 'all',
        order: 0,
        addedDate: date,
        entityStatus: 'idle',
      },
    ])
  })

  it('correct todolist should be added', () => {
    const todolistFromServer = { id: id1, title: 'new title todolist', order: 0, addedDate: date }
    const action = createTodolist.fulfilled(todolistFromServer, 'requestId', 'new title todolist')
    const newState = todoListReducer(initialState, action)

    expect(newState.items.length).toBe(3)
    expect(newState.items[0].id).toBe(id1)
    expect(newState.items[0].title).toBe('new title todolist')
    expect(newState.items[0].filter).toBe('all')
  })

  it('correct todolist should be removed', () => {
    const newState = todoListReducer(initialState, deleteTodolist.fulfilled(id1, 'requestId', id1))

    expect(newState.items.length).toBe(1)
    expect(newState.items[0].id).toBe(id2)
    expect(newState.items[0].title).toBe('What to byu')
    expect(newState.items[0].filter).toBe('active')
  })

  it('todolist entityStatus should be changed', () => {
    const action = changeTodoList({
      todoId: id1,
      model: { entityStatus: 'loading' },
    })
    const newState = todoListReducer(initialState, action)

    expect(newState.items.length).toBe(2)
    expect(newState.items[0].entityStatus).toBe('loading')
  })

  it('todolist filter should be changed', () => {
    const action = changeTodoList({
      todoId: id1,
      model: { filter: 'active' },
    })
    const newState = todoListReducer(initialState, action)

    expect(newState.items.length).toBe(2)
    expect(newState.items[0].filter).toBe('active')
  })

  it('todolist title should be changed', () => {
    const title = 'new title todolist'
    const action = changeTodoList({
      todoId: id1,
      model: { title },
    })
    const newState = todoListReducer(initialState, action)

    expect(newState.items.length).toBe(2)
    expect(newState.items[0].title).toBe(title)
    expect(newState.items[0].filter).toBe('all')
  })

  it('sholud return empty state', () => {
    const initialState: TodoListsSchema = {
      items: [],
      isLoading: false,
    }

    const endTasksState = todoListReducer(initialState, clearCurrentState)

    expect(endTasksState).toEqual(initialState)
  })

  it('should return the current state for unknown actions', () => {
    const action = { type: 'unknown' }
    //@ts-ignore
    const newState = todoListReducer(initialState, action)

    expect(newState).toEqual(initialState)
  })
})
