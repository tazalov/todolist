import { createAsyncThunk } from '@reduxjs/toolkit'

import { UserData } from '../../types/AuthSchema'

import { ThunkConfig } from 'app/providers/store'
import { notificationActions } from 'entities/notification'
import { ResultCodes } from 'shared/api/types/todolist'

export const initUser = createAsyncThunk<UserData | null, void, ThunkConfig<string>>(
  'auth/initUser',
  async (_, thunkAPI) => {
    const { extra, dispatch, rejectWithValue } = thunkAPI
    const { authAPI } = extra
    try {
      const response = await authAPI.authMe()

      if (response.data.resultCode === ResultCodes.Success) {
        return response.data.data
      } else {
        dispatch(notificationActions.setNotificationData({ error: response.data.messages[0], status: 'failed' }))
        return null
      }
    } catch (e) {
      return rejectWithValue('Some error occurred!')
    }
  },
)
