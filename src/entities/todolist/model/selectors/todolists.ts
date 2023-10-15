import { StateSchema } from 'app/providers/store'
import { TodoListsSchema } from '../types/TodolistsSchema'

export const getTodolists = (state: StateSchema): TodoListsSchema => state.todoList
