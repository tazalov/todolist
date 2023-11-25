import { createAsyncThunk } from '@reduxjs/toolkit'

import { todoListActions } from '../../slice/todolist.slice'

import { ThunkConfig } from 'app/providers/store'
import { notificationActions, handleServerError, handleNetworkError } from 'entities/notification'
import { ResultCodes } from 'shared/api/types/todolist'
import { getCurrentLang } from 'shared/lib/i18n/getCurrentLang'

export const deleteTodolist = createAsyncThunk<string, string, ThunkConfig>(
  'entities/todoList/deleteTodolist',
  async (todoId, thunkAPI) => {
    const { extra, dispatch, rejectWithValue } = thunkAPI

    const currentLang = getCurrentLang()

    dispatch(notificationActions.setNotificationData({ status: 'loading' }))

    dispatch(todoListActions.changeTodoList({ todoId, model: { entityStatus: 'loading' } }))

    try {
      const response = await extra.todolistAPI.deleteTodolist(todoId)
      if (response.data.resultCode === ResultCodes.Success) {
        const successMsg = currentLang === 'en' ? 'Todolist deleted!' : `Список дел удален!`

        dispatch(notificationActions.setNotificationData({ status: 'succeed', success: successMsg }))

        return todoId
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
