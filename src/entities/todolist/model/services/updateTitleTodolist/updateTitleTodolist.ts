import { createAsyncThunk } from '@reduxjs/toolkit'

import { UpdateModelTodo } from '../../types/TodolistsSchema'

import { ThunkConfig } from 'app/providers/store'
import { notificationActions, handleServerError, handleNetworkError } from 'entities/notification'
import { ResultCodes } from 'shared/api/types/todolist'
import { getCurrentLang } from 'shared/lib/i18n/getCurrentLang'

interface UpdateTitleParams {
  todoId: string
  model: UpdateModelTodo
}

export const updateTitleTodolist = createAsyncThunk<
  UpdateTitleParams,
  { todoId: string; title: string },
  ThunkConfig<string>
>('entities/todolist/updateTitleTodolist', async ({ todoId, title }, thunkAPI) => {
  const { extra, dispatch, rejectWithValue } = thunkAPI

  const currentLang = getCurrentLang()

  dispatch(notificationActions.setNotificationData({ status: 'loading' }))

  try {
    const response = await extra.todolistAPI.updateTodolist({ todoId, title })
    if (response.data.resultCode === ResultCodes.Success) {
      const successMsg = currentLang === 'en' ? 'Title updated!' : `Имя списка обновлено!`

      dispatch(notificationActions.setNotificationData({ status: 'succeed', success: successMsg }))

      return { todoId, model: { title, entityStatus: 'succeed' } }
    } else {
      handleServerError(response.data, dispatch)
      return rejectWithValue(todoId)
    }
  } catch (e) {
    handleNetworkError(e, dispatch)
    return rejectWithValue(todoId)
  }
})
