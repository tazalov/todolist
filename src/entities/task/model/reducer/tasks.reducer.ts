import { TasksAT } from '../types/TasksActions'
import { TasksSchema } from '../types/TasksSchema'

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
      const { task } = action.payload
      return { ...state, [task.todoListId]: [task, ...state[task.todoListId]] }
    }
    case 'todolist/tasks/remove': {
      const { todolistId, taskId } = action.payload
      return {
        ...state,
        [todolistId]: state[todolistId].filter(el => el.id !== taskId),
      }
    }
    case 'todolist/tasks/change': {
      const { taskId, task } = action.payload
      return {
        ...state,
        [task.todoListId]: state[task.todoListId].map(el => (el.id === taskId ? { ...el, ...task } : el)),
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
