import { notificationActions } from '../slice/notification.slice'

import { AppDispatch } from 'app/providers/store'

export const handleSuccessMessage = (success: string, dispatch: AppDispatch) => {
  dispatch(notificationActions.setNotificationData({ success, status: 'succeed' }))
}
