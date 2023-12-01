import { createAsyncThunk } from '@reduxjs/toolkit'

import { LoginDataForm, UserData } from '../../types/AuthSchema'

import { ThunkConfig } from 'app/providers/store'
import { handleServerError, handleNetworkError, notificationActions } from 'entities/notification'
import { ResultCodes, BaseResponse } from 'shared/api/types/todolist'

export const loginUser = createAsyncThunk<UserData, LoginDataForm, ThunkConfig<BaseResponse | null>>(
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
        const isShowAppError = !response.data.fieldsErrors.length
        handleServerError(response.data, dispatch, isShowAppError)
        return rejectWithValue(response.data)
      }
    } catch (e: any) {
      handleNetworkError(e.message, dispatch)
      return rejectWithValue(null)
    }
  },
)
