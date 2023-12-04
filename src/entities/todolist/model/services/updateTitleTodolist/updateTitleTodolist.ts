import { createAsyncThunk } from '@reduxjs/toolkit'

import { UpdateModelTodo } from '../../types/TodolistsSchema'

import { ThunkConfig } from 'app/providers/store'
import { ResultCodes, BaseResponse } from 'shared/api/types/todolist'

interface UpdateTitleParams {
  todoId: string
  model: UpdateModelTodo
}

export const updateTitleTodolist = createAsyncThunk<
  UpdateTitleParams,
  { todoId: string; title: string },
  ThunkConfig<BaseResponse>
>('entities/todolist/updateTitleTodolist', async ({ todoId, title }, thunkAPI) => {
  const { extra, rejectWithValue } = thunkAPI

  const res = await extra.todolistAPI.updateTodolist({ todoId, title })
  if (res.data.resultCode === ResultCodes.Success) {
    return { todoId, model: { title, entityStatus: 'succeed' } }
  } else {
    return rejectWithValue(res.data)
  }
})
