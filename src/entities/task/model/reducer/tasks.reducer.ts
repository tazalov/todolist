import { v1 } from 'uuid'
import { TasksAT } from '../types/TasksActions'
import { TasksSchema, TaskT, TaskPriority, TaskStatus } from '../types/TasksSchema'

export const tasksInitialState: TasksSchema = {}

export const tasksReducer = (state = tasksInitialState, action: TasksAT): TasksSchema => {
  switch (action.type) {
    case 'todolist/list/set': {
      return action.payload.reduce((acc: TasksSchema, el) => {
        acc[el.id] = []
        return acc
      }, {})
    }
    case 'todolist/tasks/set': {
      const { todolistId, tasks } = action.payload
      return {
        ...state,
        [todolistId]: tasks,
      }
    }
    case 'todolist/tasks/add': {
      const { todolistId, title } = action.payload
      const newTask: TaskT = {
        id: v1(),
        title,
        addedDate: new Date(),
        deadline: new Date(),
        description: '',
        order: 0,
        priority: TaskPriority.LOW,
        status: TaskStatus.NEW,
        startDate: new Date(),
        todoListId: todolistId,
      }
      return { ...state, [todolistId]: [newTask, ...state[todolistId]] }
    }
    case 'todolist/tasks/remove': {
      const { todolistId, taskId } = action.payload
      return {
        ...state,
        [todolistId]: state[todolistId].filter(el => el.id !== taskId),
      }
    }
    case 'todolist/tasks/changeStatus': {
      const { todolistId, taskId, status } = action.payload
      return {
        ...state,
        [todolistId]: state[todolistId].map(el => (el.id === taskId ? { ...el, status } : el)),
      }
    }
    case 'todolist/tasks/changeTitle': {
      const { todolistId, taskId, title } = action.payload
      return {
        ...state,
        [todolistId]: state[todolistId].map(el => (el.id === taskId ? { ...el, title } : el)),
      }
    }
    case 'todolist/list/add': {
      const { newTodolistId } = action.payload
      return {
        ...state,
        [newTodolistId]: [],
      }
    }
    case 'todolist/list/remove': {
      const { todoListId } = action.payload
      const { [todoListId]: deleted, ...stateCopy } = state
      return stateCopy
    }
    default: {
      return state
    }
  }
}
