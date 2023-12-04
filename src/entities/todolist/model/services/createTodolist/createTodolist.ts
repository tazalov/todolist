import { createAsyncThunk } from '@reduxjs/toolkit'

import { Todo } from '../../types/TodolistsSchema'

import { ThunkConfig } from 'app/providers/store'
import { ResultCodes, BaseResponse } from 'shared/api/types/todolist'

export const createTodolist = createAsyncThunk<Todo, string, ThunkConfig<BaseResponse>>(
  'entities/todolist/createTodolist',
  async (title, thunkAPI) => {
    const { extra, rejectWithValue } = thunkAPI

    const response = await extra.todolistAPI.createTodolist(title)
    if (response.data.resultCode === ResultCodes.Success) {
      return response.data.data.item
    } else {
      return rejectWithValue(response.data)
    }
  },
)
