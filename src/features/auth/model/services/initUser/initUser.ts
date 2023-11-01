import { createAsyncThunk } from '@reduxjs/toolkit'

import { UserData } from '../../types/AuthSchema'

import { ThunkConfig } from 'app/providers/store'
import { ResultCodes } from 'shared/api/types/todolist'

interface InitUserReturn {
  userData: UserData | null
  _inited: boolean
}

export const initUser = createAsyncThunk<InitUserReturn, void, ThunkConfig<null>>(
  'auth/initUser',
  async (_, thunkAPI) => {
    const { extra, rejectWithValue } = thunkAPI
    const { authAPI } = extra
    try {
      const response = await authAPI.authMe()

      if (response.data.resultCode === ResultCodes.Success) {
        return {
          userData: response.data.data,
          _inited: true,
        }
      } else {
        return {
          userData: null,
          _inited: true,
        }
      }
    } catch (e) {
      return rejectWithValue(null)
    }
  },
)
