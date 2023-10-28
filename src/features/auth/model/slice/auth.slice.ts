import { createSlice, PayloadAction } from '@reduxjs/toolkit'

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
})

export const { reducer: authReducer, actions: authActions } = authSlice
