import { AddTodolistAT, RemoveTodolistAT, SetTodoListsAT } from 'entities/todolist'
import { AddTask, RemoveTask, SetTasks, ChangeTask, ChangeTaskStatus } from '../actions/tasks.actions'

export type TasksAT =
  | AddTodolistAT
  | RemoveTodolistAT
  | SetTasksAT
  | SetTodoListsAT
  | AddTaskAT
  | RemoveTaskAT
  | ChangeTaskAT
  | ChangeTaskStatusAT

type SetTasksAT = ReturnType<typeof SetTasks>
type AddTaskAT = ReturnType<typeof AddTask>
type RemoveTaskAT = ReturnType<typeof RemoveTask>
type ChangeTaskAT = ReturnType<typeof ChangeTask>
type ChangeTaskStatusAT = ReturnType<typeof ChangeTaskStatus>
