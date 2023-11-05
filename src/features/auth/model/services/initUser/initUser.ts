import { createAsyncThunk } from '@reduxjs/toolkit'

import { UserData } from '../../types/AuthSchema'

import { ThunkConfig } from 'app/providers/store'
import { ResultCodes } from 'shared/api/types/todolist'

export const initUser = createAsyncThunk<UserData, void, ThunkConfig<string>>('auth/initUser', async (_, thunkAPI) => {
  const { extra, rejectWithValue } = thunkAPI
  const { authAPI } = extra
  try {
    const response = await authAPI.authMe()

    if (response.data.resultCode === ResultCodes.Success) {
      return response.data.data
    } else {
      return rejectWithValue('Some error occurred!')
    }
  } catch (e) {
    return rejectWithValue('Some error occurred!')
  }
})
