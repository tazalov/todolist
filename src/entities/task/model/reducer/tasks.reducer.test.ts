import { AddTodoList, RemoveTodolist } from 'entities/todolist'
import { AddTask, RemoveTask, SetTasks, ChangeTask } from '../actions/tasks.actions'
import { tasksReducer } from './tasks.reducer'
import { TasksSchema, TaskStatus, TaskPriority } from '../types/TasksSchema'

describe('tasks reducer', () => {
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
    const action = SetTasks(todoListId, tasks)
    const newState = tasksReducer(initialState, action)

    expect(newState[todoListId].length).toBe(1)
    expect(newState[todoListId]).toEqual([{ ...tasks[0], entityStatus: 'idle' }])
  })

  it('correct task should be added to correct array', () => {
    const action = AddTask({
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
    const newState = tasksReducer(initialState, action)

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

  it('should remove task', () => {
    const action = RemoveTask('todolistId2', '2')
    const newState = tasksReducer(initialState, action)

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
    const action = ChangeTask('1', updatedTask)
    const newState = tasksReducer(initialState, action)

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
    const action = ChangeTask('1', updatedTask)
    const newState = tasksReducer(initialState, action)

    expect(newState['todolistId1'][0].title).toBe('CSS')
    expect(newState['todolistId2'][0].title).toBe('new title task')
  })

  it('new array should be added when new todolist is added', () => {
    const action = AddTodoList({ id: 'some_id', title: 'new title todolist', order: 0, addedDate: date })

    const newState = tasksReducer(initialState, action)

    const keys = Object.keys(newState)
    const newKey = keys.find(k => k !== 'todolistId1' && k !== 'todolistId2')
    if (!newKey) {
      throw Error('new key should be added')
    }

    expect(keys.length).toBe(3)
    expect(newState[newKey]).toEqual([])
  })

  it('property with todolistId should be deleted', () => {
    const action = RemoveTodolist('todolistId2')

    const newState = tasksReducer(initialState, action)

    const keys = Object.keys(newState)

    expect(keys.length).toBe(1)
    expect(newState['todolistId2']).not.toBeDefined()
  })

  it('should return the current state for unknown actions', () => {
    const action = { type: 'unknown' }
    //@ts-ignore
    const newState = tasksReducer(initialState, action)

    expect(newState).toEqual(initialState)
  })
})
