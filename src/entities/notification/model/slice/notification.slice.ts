import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { NotificationSchema } from '../types/NotificationSchema'

export const initialState: NotificationSchema = {
  status: 'idle',
  error: null,
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setStatus: (state, action: PayloadAction<CurrentStatus>) => {
      state.status = action.payload
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
  },
})

export const { reducer: notificationReducer, actions: notificationActions } = notificationSlice
