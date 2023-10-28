import { notificationActions } from '../slice/notification.slice'

import { AppDispatch } from 'app/providers/store'

export const handleNetworkError = (message: string, dispatch: AppDispatch) => {
  dispatch(notificationActions.setError(message || 'Some error occurred'))
  dispatch(notificationActions.setStatus('failed'))
}
