import { TodoListAT } from '../types/TodolistsActions'
import { UpdatedTodoListT, TodoListsSchema } from '../types/TodolistsSchema'

export const initialTodolistState: TodoListsSchema = []

export const todoListReducer = (state = initialTodolistState, action: TodoListAT): TodoListsSchema => {
  switch (action.type) {
    case 'todolist/list/set': {
      return action.payload.map(el => ({
        ...el,
        addedDate: new Date(el.addedDate),
        filter: 'all',
        entityStatus: 'idle',
      }))
    }
    case 'todolist/list/add': {
      const { todolist } = action.payload
      const newTodoList: UpdatedTodoListT = {
        ...todolist,
        addedDate: new Date(todolist.addedDate),
        filter: 'all',
        entityStatus: 'idle',
      }
      return [newTodoList, ...state]
    }
    case 'todolist/list/remove': {
      const { todoListId } = action.payload
      return state.filter(el => el.id !== todoListId)
    }
    case 'todolist/list/change': {
      const { todoListId, model } = action.payload
      return state.map(el => (el.id === todoListId ? { ...el, ...model } : el))
    }
    default: {
      return state
    }
  }
}
