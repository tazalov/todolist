import axios from 'axios'

import { notificationActions } from '../slice/notification.slice'

import { AppDispatch } from 'app/providers/store'

export const handleNetworkError = (err: unknown, dispatch: AppDispatch) => {
  let errorMessage = 'Some error occurred'

  if (axios.isAxiosError(err)) {
    errorMessage = err.response?.data?.message || err?.message || errorMessage
  } else if (err instanceof Error) {
    errorMessage = `Native error: ${err.message}`
  } else {
    errorMessage = JSON.stringify(err)
  }
  dispatch(notificationActions.setNotificationData({ error: errorMessage, status: 'failed' }))
}
