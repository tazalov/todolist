import { createAsyncThunk } from '@reduxjs/toolkit'

import { Todo } from '../../types/TodolistsSchema'

import { ThunkConfig } from 'app/providers/store'

export const fetchTodoLists = createAsyncThunk<Todo[], undefined, ThunkConfig>(
  'entities/todolist/fetchTodoLists',
  async (_, thunkAPI) => {
    const { extra } = thunkAPI
    const response = await extra.todolistAPI.getTodolists()
    return response.data
  },
)
