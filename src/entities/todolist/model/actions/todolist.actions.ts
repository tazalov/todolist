import { FilterT, TodoListT } from '../types/TodolistsSchema'

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

export const ChangeFilterTodolist = (todoListId: string, filter: FilterT) =>
  ({
    type: 'todolist/list/changeFilter',
    payload: { todoListId, filter },
  }) as const

export const ChangeTitleTodolist = (todoListId: string, title: string) =>
  ({
    type: 'todolist/list/changeTitle',
    payload: { todoListId, title },
  }) as const
