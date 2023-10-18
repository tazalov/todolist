import {
  AddTodoList,
  ChangeFilterTodolist,
  ChangeTitleTodolist,
  RemoveTodolist,
  SetTodoLists,
} from '../actions/todolist.actions'

export type TodoListAT =
  | SetTodoListsAT
  | AddTodolistAT
  | RemoveTodolistAT
  | ChangeFilterTodolistAT
  | ChangeTitleTodolistAT

export type SetTodoListsAT = ReturnType<typeof SetTodoLists>
export type AddTodolistAT = ReturnType<typeof AddTodoList>
export type RemoveTodolistAT = ReturnType<typeof RemoveTodolist>
type ChangeFilterTodolistAT = ReturnType<typeof ChangeFilterTodolist>
type ChangeTitleTodolistAT = ReturnType<typeof ChangeTitleTodolist>
