import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { initUser } from '../services/initUser/initUser'
import { AuthSchema, UserData } from '../types/AuthSchema'

const initialState: AuthSchema = {
  data: null,
  captcha: null,
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
      .addCase(initUser.fulfilled, (state, action) => {
        const { userData, _inited } = action.payload
        state._inited = _inited
        state.data = userData
      })
      .addCase(initUser.rejected, (state, action) => {
        state.data = action.payload
        state._inited = false
      }),
})

export const { reducer: authReducer, actions: authActions } = authSlice
