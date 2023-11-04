import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { NotificationSchema, NotificationData } from '../types/NotificationSchema'

export const initialState: NotificationSchema = {
  status: 'idle',
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setStatus: (state, action: PayloadAction<CurrentStatus>) => {
      state.status = action.payload
    },
    setError: (state, action: PayloadAction<string | undefined>) => {
      state.error = action.payload
    },
    setNotificationData: (state, action: PayloadAction<NotificationData>) => {
      const { status, error, success } = action.payload
      state.status = status
      state.error = error
      state.success = success
    },
  },
})

export const { reducer: notificationReducer, actions: notificationActions } = notificationSlice
