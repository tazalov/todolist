import { createAsyncThunk } from '@reduxjs/toolkit'

import { clearCurrentState, ThunkConfig } from 'app/providers/store'
import { notificationActions, handleServerError, handleNetworkError } from 'entities/notification'
import { ResultCodes } from 'shared/api/types/todolist'

export const logoutUser = createAsyncThunk<void, undefined, ThunkConfig>(
  'features/auth/logoutUser',
  async (_, thunkAPI) => {
    const { extra, dispatch, rejectWithValue } = thunkAPI

    dispatch(notificationActions.setNotificationData({ status: 'loading' }))

    try {
      const response = await extra.authAPI.logoutUser()
      if (response.data.resultCode === ResultCodes.Success) {
        dispatch(clearCurrentState())
        dispatch(
          notificationActions.setNotificationData({
            status: 'succeed',
            success: 'Success logout! Please login to continue',
          }),
        )
      } else {
        handleServerError(response.data, dispatch)
        return rejectWithValue(null)
      }
    } catch (e: any) {
      handleNetworkError(e.message, dispatch)
      return rejectWithValue(null)
    }
  },
)
