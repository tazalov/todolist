import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { initUser } from '../services/initUser/initUser'
import { AuthSchema, UserData } from '../types/AuthSchema'

const initialState: AuthSchema = {
  data: null,
  _inited: false,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<UserData | null>) => {
      state.data = action.payload
    },
    setCaptcha: (state, action: PayloadAction<string>) => {
      state.captcha = action.payload
    },
    setInited: (state, action: PayloadAction<boolean>) => {
      state._inited = action.payload
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(initUser.pending, (state, action) => {
        state.data = null
        state._inited = false
        state.error = undefined
      })
      .addCase(initUser.fulfilled, (state, action) => {
        state.data = action.payload
        state._inited = true
        state.error = undefined
      })
      .addCase(initUser.rejected, (state, action) => {
        state.data = null
        state._inited = true
        state.error = action.payload
      }),
})

export const { reducer: authReducer, actions: authActions } = authSlice
