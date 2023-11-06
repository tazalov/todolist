import { createAsyncThunk } from '@reduxjs/toolkit'

import { UpdateModelTodoList } from '../../types/TodolistsSchema'

import { ThunkConfig } from 'app/providers/store'
import { notificationActions, handleServerError, handleNetworkError } from 'entities/notification'
import { ResultCodes } from 'shared/api/types/todolist'

interface UpdateTitleParams {
  todoId: string
  model: UpdateModelTodoList
}

export const updateTitleTodolist = createAsyncThunk<
  UpdateTitleParams,
  { todoId: string; title: string },
  ThunkConfig<string>
>('entities/todolist/updateTitleTodolist', async ({ todoId, title }, thunkAPI) => {
  const { extra, dispatch, rejectWithValue } = thunkAPI
  dispatch(notificationActions.setNotificationData({ status: 'loading' }))
  try {
    const response = await extra.todolistAPI.updateTodolist(todoId, title)
    if (response.data.resultCode === ResultCodes.Success) {
      dispatch(notificationActions.setNotificationData({ status: 'succeed', success: `Title updated!` }))
      return { todoId, model: { title, entityStatus: 'succeed' } }
    } else {
      handleServerError(response.data, dispatch)
      //? надо ли? вопрос остается открытым:)
      return rejectWithValue(todoId)
    }
  } catch (e: any) {
    handleNetworkError(e.message, dispatch)
    //? надо ли? вопрос остается открытым:)
    return rejectWithValue(todoId)
  }
})
