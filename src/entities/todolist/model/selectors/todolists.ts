import { TodoListsSchema } from '../types/TodolistsSchema'

import { StateSchema } from 'app/providers/store'

export const getTodolists = (state: StateSchema): TodoListsSchema => state.todoList
