import {
  AddTodoList,
  ChangeFilterTodolist,
  ChangeTitleTodolist,
  RemoveTodolist,
} from '../actions/todolist.actions'

export type ActionsT =
  | AddTodolistAT
  | RemoveTodolistAT
  | ChangeFilterTodolistAT
  | ChangeTitleTodolistAT

export type AddTodolistAT = ReturnType<typeof AddTodoList>
export type RemoveTodolistAT = ReturnType<typeof RemoveTodolist>
type ChangeFilterTodolistAT = ReturnType<typeof ChangeFilterTodolist>
type ChangeTitleTodolistAT = ReturnType<typeof ChangeTitleTodolist>
