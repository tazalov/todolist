import { AddTodolistAT, RemoveTodolistAT, SetTodoListsAT } from 'entities/todolist'
import { AddTask, RemoveTask, SetTasks, ChangeTask } from '../actions/tasks.actions'

export type TasksAT =
  | AddTodolistAT
  | RemoveTodolistAT
  | SetTasksAT
  | SetTodoListsAT
  | AddTaskAT
  | RemoveTaskAT
  | ChangeTaskAT

type SetTasksAT = ReturnType<typeof SetTasks>
type AddTaskAT = ReturnType<typeof AddTask>
type RemoveTaskAT = ReturnType<typeof RemoveTask>
type ChangeTaskAT = ReturnType<typeof ChangeTask>
