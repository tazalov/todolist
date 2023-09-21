import { TasksST } from 'entities/task'
import { tasksReducer } from 'entities/task/model/reducer/tasks.reducer'
import { AddTodoList } from '../actions/todolist.actions'
import { TodoListST } from '../types/todolist.reducer'
import { todoListReducer } from './todolist.reducer'

test('ids should be equals', () => {
  const startTasksState: TasksST = {}
  const startTodoListsState: TodoListST = []

  const action = AddTodoList('new todolist')

  const endTasksState = tasksReducer(startTasksState, action)
  const endTodoListsState = todoListReducer(startTodoListsState, action)

  const keys = Object.keys(endTasksState)
  const idFromTasks = keys[0]
  const idFromTodoLists = endTodoListsState[0].id

  expect(idFromTasks).toBe(action.payload.newTodolistId)
  expect(idFromTodoLists).toBe(action.payload.newTodolistId)
})
