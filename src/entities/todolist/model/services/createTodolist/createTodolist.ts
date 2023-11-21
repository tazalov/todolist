import { createAsyncThunk } from '@reduxjs/toolkit'

import { TodoT } from '../../types/TodolistsSchema'

import { ThunkConfig } from 'app/providers/store'
import { notificationActions, handleServerError, handleNetworkError } from 'entities/notification'
import { ResultCodes } from 'shared/api/types/todolist'
import { getCurrentLang } from 'shared/lib/i18n/getCurrentLang'

export const createTodolist = createAsyncThunk<TodoT, string, ThunkConfig>(
  'entities/todolist/createTodolist',
  async (title, thunkAPI) => {
    const { extra, dispatch, rejectWithValue } = thunkAPI

    const currentLang = getCurrentLang()

    dispatch(notificationActions.setNotificationData({ status: 'loading' }))

    try {
      const response = await extra.todolistAPI.createTodolist(title)
      if (response.data.resultCode === ResultCodes.Success) {
        const successMsg = currentLang === 'en' ? `Todolist "${title}" created!` : `Список дел "${title}" создан!`

        dispatch(notificationActions.setNotificationData({ status: 'succeed', success: successMsg }))

        return response.data.data.item
      } else {
        handleServerError(response.data, dispatch)
        return rejectWithValue(null)
      }
    } catch (e) {
      handleNetworkError(e, dispatch)
      return rejectWithValue(null)
    }
  },
)
