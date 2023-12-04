import { createSlice, isFulfilled, isPending, PayloadAction } from '@reduxjs/toolkit'
import { AnyAction } from 'redux'

import { NotificationSchema, NotificationData } from '../types/NotificationSchema'

import { getSuccessMsg } from '../utils/getSuccessMsg'

import { getCurrentLang } from 'shared/lib/i18n/getCurrentLang'

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
  extraReducers: (builder) => {
    builder
      .addMatcher(isPending, (state, action) => {
        state.status = 'loading'
      })
      .addMatcher(isFulfilled, (state, action) => {
        state.status = 'succeed'
        const currentLang = getCurrentLang()
        state.success = getSuccessMsg(action.type, currentLang)
      })
      .addMatcher(
        (action: AnyAction) => action.type.endsWith('/rejected'),
        (state, action) => {
          state.status = 'failed'
          if (action.payload) {
            state.error = action.payload.messages[0] || 'Some error occurred'
          } else {
            state.error = action.error.message
          }
        },
      )
  },
})

export const { reducer: notificationReducer, actions: notificationActions } = notificationSlice
