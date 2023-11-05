import { createAsyncThunk } from '@reduxjs/toolkit'

import { TodoListT } from '../../types/TodolistsSchema'

import { ThunkConfig } from 'app/providers/store'
import { notificationActions, handleServerError, handleNetworkError } from 'entities/notification'
import { ResultCodes } from 'shared/api/types/todolist'

export const createTodolist = createAsyncThunk<TodoListT | void, string, ThunkConfig>(
  'entities/todolist/createTodolist',
  async (title, thunkAPI) => {
    const { extra, dispatch } = thunkAPI
    dispatch(notificationActions.setNotificationData({ status: 'loading' }))
    try {
      const response = await extra.todolistAPI.createTodolist(title)
      if (response.data.resultCode === ResultCodes.Success) {
        dispatch(
          notificationActions.setNotificationData({ status: 'succeed', success: `Todolist "${title}" created!` }),
        )
        return response.data.data.item
      } else {
        handleServerError(response.data, dispatch)
      }
    } catch (e: any) {
      handleNetworkError(e.message, dispatch)
    }
  },
)
