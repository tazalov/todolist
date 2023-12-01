import { createAsyncThunk } from '@reduxjs/toolkit'

import { Todo } from '../../types/TodolistsSchema'

import { ThunkConfig } from 'app/providers/store'
import { handleNetworkError } from 'entities/notification'

export const fetchTodoLists = createAsyncThunk<Todo[], undefined, ThunkConfig>(
  'entities/todolist/fetchTodoLists',
  async (_, thunkAPI) => {
    const { extra, dispatch } = thunkAPI
    try {
      const response = await extra.todolistAPI.getTodolists()
      return response.data
    } catch (e) {
      handleNetworkError(e, dispatch)
      return []
    }
  },
)
