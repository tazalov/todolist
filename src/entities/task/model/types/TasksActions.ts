import { AddTodolistAT, RemoveTodolistAT } from 'entities/todolist'
import { AddTask, ChangeStatusTask, ChangeTitleTask, RemoveTask } from '../actions/tasks.actions'

export type TasksAT =
  | AddTaskAT
  | RemoveTaskAT
  | ChangeStatusTaskAT
  | ChangeTitleTaskAT
  | AddTodolistAT
  | RemoveTodolistAT

type AddTaskAT = ReturnType<typeof AddTask>
type RemoveTaskAT = ReturnType<typeof RemoveTask>
type ChangeStatusTaskAT = ReturnType<typeof ChangeStatusTask>
type ChangeTitleTaskAT = ReturnType<typeof ChangeTitleTask>
