import { TasksSchema, tasksReducer } from 'entities/task'
import { AddTodoList } from '../actions/todolist.actions'
import { TodoListsSchema } from '../types/TodolistsSchema'
import { todoListReducer } from './todolist.reducer'

test('ids should be equals', () => {
  const startTasksState: TasksSchema = {}
  const startTodoListsState: TodoListsSchema = []

  const action = AddTodoList('new todolist')

  const endTasksState = tasksReducer(startTasksState, action)
  const endTodoListsState = todoListReducer(startTodoListsState, action)

  const keys = Object.keys(endTasksState)
  const idFromTasks = keys[0]
  const idFromTodoLists = endTodoListsState[0].id

  expect(idFromTasks).toBe(action.payload.newTodolistId)
  expect(idFromTodoLists).toBe(action.payload.newTodolistId)
})
