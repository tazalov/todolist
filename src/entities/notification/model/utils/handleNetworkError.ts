import { notificationActions } from '../slice/notification.slice'

import { AppDispatch } from 'app/providers/store'

export const handleNetworkError = (message: string, dispatch: AppDispatch) => {
  dispatch(notificationActions.setNotificationData({ error: message || 'Some error occurred', status: 'failed' }))
}
