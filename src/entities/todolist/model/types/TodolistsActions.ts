import { AddTodoList, RemoveTodolist, SetTodoLists, ChangeTodolist } from '../actions/todolist.actions'

export type TodoListAT = SetTodoListsAT | AddTodolistAT | RemoveTodolistAT | ChangeTodolistAT

export type SetTodoListsAT = ReturnType<typeof SetTodoLists>
export type AddTodolistAT = ReturnType<typeof AddTodoList>
export type RemoveTodolistAT = ReturnType<typeof RemoveTodolist>
type ChangeTodolistAT = ReturnType<typeof ChangeTodolist>
