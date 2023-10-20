import { TasksSchema, tasksReducer } from 'entities/task'
import { AddTodoList } from '../actions/todolist.actions'
import { TodoListsSchema } from '../types/TodolistsSchema'
import { todoListReducer } from './todolist.reducer'

const date = new Date(2023, 0, 1, 0, 0, 0, 0)

test('ids should be equals', () => {
  const startTasksState: TasksSchema = {}
  const startTodoListsState: TodoListsSchema = []

  const action = AddTodoList({ id: 'some_id', title: 'new todolist', order: 0, addedDate: date })

  const endTasksState = tasksReducer(startTasksState, action)
  const endTodoListsState = todoListReducer(startTodoListsState, action)

  const keys = Object.keys(endTasksState)
  const idFromTasks = keys[0]
  const idFromTodoLists = endTodoListsState[0].id

  expect(idFromTasks).toBe(idFromTodoLists)
})
