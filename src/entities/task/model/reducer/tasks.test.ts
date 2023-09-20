import { AddTodoList, RemoveTodolist } from '../../../todolist'
import { AddTask, ChangeStatusTask, ChangeTitleTask, RemoveTask } from '../actions/tasks.actions'
import { tasksReducer } from './tasks.reducer'
import { TasksST } from '../types/tasks.reducer'

describe('tasks reducer', () => {
  let initialState: TasksST
  beforeEach(() => {
    initialState = {
      todolistId1: [
        { id: '1', title: 'CSS', isDone: false },
        { id: '2', title: 'JS', isDone: true },
        { id: '3', title: 'React', isDone: false },
      ],
      todolistId2: [
        { id: '1', title: 'bread', isDone: false },
        { id: '2', title: 'milk', isDone: true },
        { id: '3', title: 'tea', isDone: false },
      ],
    }
  })

  it('correct task should be added to correct array', () => {
    const title = 'new task'
    const action = AddTask('todolistId1', title)
    const newState = tasksReducer(initialState, action)

    expect(newState['todolistId2'].length).toBe(3)
    expect(newState['todolistId1'].length).toBe(4)
    expect(newState['todolistId1'][0].id).toBeDefined()
    expect(newState['todolistId1'][0].title).toBe(title)
    expect(newState['todolistId1'][0].isDone).toBeFalsy()
  })

  it('should remove task', () => {
    const action = RemoveTask('todolistId2', '2')
    const newState = tasksReducer(initialState, action)

    expect(newState).toEqual({
      todolistId1: [
        { id: '1', title: 'CSS', isDone: false },
        { id: '2', title: 'JS', isDone: true },
        { id: '3', title: 'React', isDone: false },
      ],
      todolistId2: [
        { id: '1', title: 'bread', isDone: false },
        { id: '3', title: 'tea', isDone: false },
      ],
    })
  })

  it('status of specified task should be changed', () => {
    const action = ChangeStatusTask('todolistId2', '2', false)
    const newState = tasksReducer(initialState, action)

    expect(newState['todolistId1'][1].isDone).toBeTruthy()
    expect(newState['todolistId2'][1].isDone).toBeFalsy()
  })

  it('title of specified task should be changed', () => {
    const title = 'new title task'
    const action = ChangeTitleTask('todolistId2', '3', title)
    const newState = tasksReducer(initialState, action)

    expect(newState['todolistId1'][2].title).toBe('React')
    expect(newState['todolistId2'][2].title).toBe(title)
  })

  it('new array should be added when new todolist is added', () => {
    const action = AddTodoList('new todolist')

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
