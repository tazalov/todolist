import { taskReducer, taskActions } from './task.slice'

import { TasksSchema, TaskStatus, TaskPriority } from '../types/TasksSchema'

import { clearCurrentState } from 'app/providers/store'
import { addTodoList, removeTodoList, TodoListsSchema, todoListReducer, setTodoLists } from 'entities/todolist'

describe('task reducer', () => {
  const date = new Date(2023, 0, 1, 0, 0, 0, 0)
  let initialState: TasksSchema
  beforeEach(() => {
    initialState = {
      todolistId1: [
        {
          id: '1',
          title: 'CSS',
          status: TaskStatus.NEW,
          startDate: date,
          todoListId: 'todolistId1',
          order: 0,
          priority: TaskPriority.LOW,
          description: '',
          deadline: date,
          addedDate: date,
          entityStatus: 'idle',
        },
      ],
      todolistId2: [
        {
          id: '1',
          title: 'bread',
          status: TaskStatus.NEW,
          startDate: date,
          todoListId: 'todolistId2',
          order: 0,
          priority: TaskPriority.LOW,
          description: '',
          deadline: date,
          addedDate: date,
          entityStatus: 'idle',
        },
        {
          id: '2',
          title: 'milk',
          status: TaskStatus.NEW,
          startDate: date,
          todoListId: 'todolistId2',
          order: 0,
          priority: TaskPriority.LOW,
          description: '',
          deadline: date,
          addedDate: date,
          entityStatus: 'idle',
        },
      ],
    }
  })

  it('correct task should be set', () => {
    const todoListId = 'todolistIdFromServer'
    const tasks = [
      {
        id: 'asd',
        title: 'TASK FROM SERVER',
        status: TaskStatus.NEW,
        startDate: date,
        todoListId,
        order: 0,
        priority: TaskPriority.LOW,
        description: '',
        deadline: date,
        addedDate: date,
      },
    ]
    const action = taskActions.setTasks({
      todoId: todoListId,
      tasks,
    })
    const newState = taskReducer(initialState, action)

    expect(newState[todoListId].length).toBe(1)
    expect(newState[todoListId]).toEqual([{ ...tasks[0], entityStatus: 'idle' }])
  })

  it('correct task should be added to correct array', () => {
    const action = taskActions.addTask({
      id: 'asd',
      title: 'TASK FROM SERVER',
      status: TaskStatus.NEW,
      startDate: date,
      todoListId: 'todolistId1',
      order: 0,
      priority: TaskPriority.LOW,
      description: '',
      deadline: date,
      addedDate: date,
    })
    const newState = taskReducer(initialState, action)

    expect(newState['todolistId2'].length).toBe(2)
    expect(newState['todolistId1'].length).toBe(2)
    expect(newState['todolistId1'][0]).toEqual({
      id: 'asd',
      title: 'TASK FROM SERVER',
      status: TaskStatus.NEW,
      startDate: date,
      todoListId: 'todolistId1',
      order: 0,
      priority: TaskPriority.LOW,
      description: '',
      deadline: date,
      addedDate: date,
      entityStatus: 'idle',
    })
  })

  it('correct task should be removed to correct array', () => {
    const action = taskActions.removeTask({
      todoId: 'todolistId2',
      taskId: '2',
    })
    const newState = taskReducer(initialState, action)

    expect(newState).toEqual({
      todolistId1: [
        {
          id: '1',
          title: 'CSS',
          status: TaskStatus.NEW,
          startDate: date,
          todoListId: 'todolistId1',
          order: 0,
          priority: TaskPriority.LOW,
          description: '',
          deadline: date,
          addedDate: date,
          entityStatus: 'idle',
        },
      ],
      todolistId2: [
        {
          id: '1',
          title: 'bread',
          status: TaskStatus.NEW,
          startDate: date,
          todoListId: 'todolistId2',
          order: 0,
          priority: TaskPriority.LOW,
          description: '',
          deadline: date,
          addedDate: date,
          entityStatus: 'idle',
        },
      ],
    })
  })

  it('status of specified task should be changed', () => {
    const updatedTask = {
      id: '1',
      title: 'bread',
      status: TaskStatus.COMPLETED,
      startDate: date,
      todoListId: 'todolistId2',
      order: 0,
      priority: TaskPriority.LOW,
      description: '',
      deadline: date,
      addedDate: date,
    }
    const action = taskActions.changeTask(updatedTask)
    const newState = taskReducer(initialState, action)

    expect(newState['todolistId1'][0].status).toBe(TaskStatus.NEW)
    expect(newState['todolistId2'][0].status).toBe(TaskStatus.COMPLETED)
  })

  it('title of specified task should be changed', () => {
    const updatedTask = {
      id: '1',
      title: 'new title task',
      status: TaskStatus.COMPLETED,
      startDate: date,
      todoListId: 'todolistId2',
      order: 0,
      priority: TaskPriority.LOW,
      description: '',
      deadline: date,
      addedDate: date,
    }
    const action = taskActions.changeTask(updatedTask)
    const newState = taskReducer(initialState, action)

    expect(newState['todolistId1'][0].title).toBe('CSS')
    expect(newState['todolistId2'][0].title).toBe('new title task')
  })

  it('new array should be added when new todolist is added', () => {
    const action = addTodoList({ id: 'some_id', title: 'new title todolist', order: 0, addedDate: date })

    const newState = taskReducer(initialState, action)

    const keys = Object.keys(newState)
    const newKey = keys.find((k) => k !== 'todolistId1' && k !== 'todolistId2')
    if (!newKey) {
      throw Error('new key should be added')
    }

    expect(keys.length).toBe(3)
    expect(newState[newKey]).toEqual([])
  })

  it('property with todolistId should be deleted', () => {
    const action = removeTodoList('todolistId2')

    const newState = taskReducer(initialState, action)

    const keys = Object.keys(newState)

    expect(keys.length).toBe(1)
    expect(newState['todolistId2']).not.toBeDefined()
  })

  it('ids should be equals for addTodolist', () => {
    const startTasksState: TasksSchema = {}
    const startTodoListsState: TodoListsSchema = []

    const action = addTodoList({ id: 'some_id', title: 'new todolist', order: 0, addedDate: date })

    const endTasksState = taskReducer(startTasksState, action)
    const endTodoListsState = todoListReducer(startTodoListsState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodoLists = endTodoListsState[0].id

    expect(idFromTasks).toBe(idFromTodoLists)
  })

  it('ids should be equals for setTodoLists', () => {
    const startTasksState: TasksSchema = {}
    const startTodoListsState: TodoListsSchema = []

    const action = setTodoLists([
      { id: 'some_id1', title: 'new todolist', order: 0, addedDate: date },
      { id: 'some_id2', title: 'new todolist', order: 0, addedDate: date },
    ])

    const endTasksState = taskReducer(startTasksState, action)
    const endTodoListsState = todoListReducer(startTodoListsState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodoLists = endTodoListsState[0].id

    expect(idFromTasks).toBe(idFromTodoLists)
  })

  it('sholud return empty state', () => {
    const initialState: TasksSchema = {}

    const endTasksState = taskReducer(initialState, clearCurrentState)

    expect(endTasksState).toEqual(initialState)
  })

  it('should return the current state for unknown actions', () => {
    const action = { type: 'unknown' }
    //@ts-ignore
    const newState = taskReducer(initialState, action)

    expect(newState).toEqual(initialState)
  })
})
