import { v1 } from 'uuid'
import { ActionsT } from '../types/todolist.actions'
import { TodoListST } from '../types/todolist.reducer'

export const todoListId1 = v1()
export const todoListId2 = v1()

export const initialState: TodoListST = [
  { id: todoListId1, title: 'What to learn', filter: 'all' },
  { id: todoListId2, title: 'What to byu', filter: 'active' },
]

export const todoListReducer = (state = initialState, action: ActionsT) => {
  switch (action.type) {
    case 'todolist/list/add': {
      const { newTodolistId, title } = action.payload
      const newTodoList = {
        id: newTodolistId,
        title,
        filter: 'all',
      }
      return [...state, newTodoList]
    }
    case 'todolist/list/remove': {
      const { todoListId } = action.payload
      return state.filter(el => el.id !== todoListId)
    }
    case 'todolist/list/changeFilter': {
      const { todoListId, filter } = action.payload
      return state.map(el => (el.id === todoListId ? { ...el, filter } : el))
    }
    case 'todolist/list/changeTitle': {
      const { todoListId, title } = action.payload
      return state.map(el => (el.id === todoListId ? { ...el, title } : el))
    }
    default: {
      return state
    }
  }
}
