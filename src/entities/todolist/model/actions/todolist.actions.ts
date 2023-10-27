import { TodoListT, UpdateModelTodoList } from '../types/TodolistsSchema'

export const ClearState = () => ({ type: 'todolist/clear_current_state' }) as const

export const SetTodoLists = (todolists: TodoListT[]) =>
  ({
    type: 'todolist/list/set',
    payload: todolists,
  }) as const

export const AddTodoList = (todolist: TodoListT) =>
  ({
    type: 'todolist/list/add',
    payload: { todolist },
  }) as const

export const RemoveTodolist = (todoListId: string) =>
  ({
    type: 'todolist/list/remove',
    payload: { todoListId },
  }) as const

export const ChangeTodolist = (todoListId: string, model: UpdateModelTodoList) =>
  ({
    type: 'todolist/list/change',
    payload: { todoListId, model },
  }) as const
