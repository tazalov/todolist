import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { initUser } from '../services/initUser/initUser'
import { loginUser } from '../services/loginUser/loginUser'
import { logoutUser } from '../services/logoutUser/logoutUser'
import { AuthSchema } from '../types/AuthSchema'

const initialState: AuthSchema = {
  data: null,
  _inited: false,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCaptcha: (state, action: PayloadAction<string>) => {
      state.captcha = action.payload
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(initUser.pending, (state) => {
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
      })
      .addCase(loginUser.pending, (state) => {
        state.data = null
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.data = payload
      })
      .addCase(loginUser.rejected, (state) => {
        state.data = null
      })
      .addCase(logoutUser.fulfilled, (state, { payload }) => {
        state.data = null
      }),
})

export const { reducer: authReducer, actions: authActions } = authSlice
