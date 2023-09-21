import { v1 } from 'uuid'
import { TasksAT } from '../types/tasks.actions'
import { TasksST } from '../types/tasks.reducer'

export const tasksInitialState: TasksST = {}

export const tasksReducer = (state = tasksInitialState, action: TasksAT): TasksST => {
  switch (action.type) {
    case 'todolist/tasks/add': {
      const { todolistId, title } = action.payload
      const newTask = { id: v1(), title, isDone: false }
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
      const { todolistId, taskId, isDone } = action.payload
      return {
        ...state,
        [todolistId]: state[todolistId].map(el => (el.id === taskId ? { ...el, isDone } : el)),
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
