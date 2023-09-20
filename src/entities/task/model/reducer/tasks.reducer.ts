import { v1 } from 'uuid'
import { todoListId1, todoListId2 } from '../../../todolist/model/reducer/todolist.reducer'
import { ActionsT } from '../types/tasks.actions'
import { TasksST } from '../types/tasks.reducer'

export const initialState: TasksST = {
  [todoListId1]: [
    { id: v1(), title: 'HTML&CSS', isDone: true },
    { id: v1(), title: 'JS', isDone: true },
    { id: v1(), title: 'ReactJS', isDone: false },
  ],
  [todoListId2]: [
    { id: v1(), title: 'Milk', isDone: true },
    { id: v1(), title: 'Bread', isDone: true },
    { id: v1(), title: 'Butter', isDone: false },
    { id: v1(), title: 'Butter', isDone: false },
    { id: v1(), title: 'Butter', isDone: false },
  ],
}

export const tasksReducer = (state = initialState, action: ActionsT) => {
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
