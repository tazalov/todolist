import { createAsyncThunk } from '@reduxjs/toolkit'

import { changeTodoList } from '../../slice/todolist.slice'

import { ThunkConfig } from 'app/providers/store'
import { notificationActions, handleServerError, handleNetworkError } from 'entities/notification'
import { ResultCodes } from 'shared/api/types/todolist'

export const deleteTodolist = createAsyncThunk<string | void, string, ThunkConfig>(
  'entities/todoList/deleteTodolist',
  async (todoId, thunkAPI) => {
    const { extra, dispatch } = thunkAPI
    dispatch(notificationActions.setNotificationData({ status: 'loading' }))
    dispatch(changeTodoList({ todoId, model: { entityStatus: 'loading' } }))
    try {
      const response = await extra.todolistAPI.deleteTodolist(todoId)
      if (response.data.resultCode === ResultCodes.Success) {
        dispatch(notificationActions.setNotificationData({ status: 'succeed', success: 'Todolist deleted!' }))
        return todoId
      } else {
        handleServerError(response.data, dispatch)
      }
    } catch (e: any) {
      handleNetworkError(e.message, dispatch)
    }
  },
)
