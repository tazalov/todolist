import { createAsyncThunk } from '@reduxjs/toolkit'

import { TodoT } from '../../types/TodolistsSchema'

import { ThunkConfig } from 'app/providers/store'
import { handleNetworkError } from 'entities/notification'

export const fetchTodoLists = createAsyncThunk<TodoT[], undefined, ThunkConfig>(
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
