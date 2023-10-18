import { AddTodolistAT, RemoveTodolistAT, SetTodoListsAT } from 'entities/todolist'
import {
  AddTask,
  ChangeStatusTask,
  ChangeTitleTask,
  RemoveTask,
  SetTasks,
} from '../actions/tasks.actions'

export type TasksAT =
  | AddTodolistAT
  | RemoveTodolistAT
  | SetTasksAT
  | SetTodoListsAT
  | AddTaskAT
  | RemoveTaskAT
  | ChangeStatusTaskAT
  | ChangeTitleTaskAT

type SetTasksAT = ReturnType<typeof SetTasks>
type AddTaskAT = ReturnType<typeof AddTask>
type RemoveTaskAT = ReturnType<typeof RemoveTask>
type ChangeStatusTaskAT = ReturnType<typeof ChangeStatusTask>
type ChangeTitleTaskAT = ReturnType<typeof ChangeTitleTask>
