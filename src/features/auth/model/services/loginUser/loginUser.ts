import { createAsyncThunk } from '@reduxjs/toolkit'

import { LoginDataForm, UserData } from '../../types/AuthSchema'

import { ThunkConfig } from 'app/providers/store'
import { handleServerError, handleNetworkError, notificationActions } from 'entities/notification'
import { ResultCodes } from 'shared/api/types/todolist'

interface RejectValues {
  errors: string[]
  fieldsErrors?: { field: string; error: string }[]
}

export const loginUser = createAsyncThunk<UserData, LoginDataForm, ThunkConfig<RejectValues>>(
  'features/auth/loginUser',
  async (loginDataForm, thunkAPI) => {
    const { extra, dispatch, rejectWithValue } = thunkAPI

    dispatch(notificationActions.setNotificationData({ status: 'loading' }))
    try {
      const response = await extra.authAPI.loginUser(loginDataForm)
      if (response.data.resultCode === ResultCodes.Success) {
        dispatch(notificationActions.setNotificationData({ status: 'succeed', success: 'Success login!' }))
        return { userId: response.data.data.userId, email: loginDataForm.email }
      } else {
        handleServerError(response.data, dispatch)
        return rejectWithValue({
          errors: response.data.messages,
          fieldsErrors: response.data.fieldsErrors,
        })
      }
    } catch (e: any) {
      handleNetworkError(e.message, dispatch)
      return rejectWithValue({
        errors: [e.message],
        fieldsErrors: undefined,
      })
    }
  },
)
