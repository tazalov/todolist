import { notificationActions } from '../slice/notification.slice'

import { AppDispatch } from 'app/providers/store'
import { BaseResponseT } from 'shared/api/types/todolist'

export const handleServerError = (data: BaseResponseT, dispatch: AppDispatch) => {
  const error = data.messages[0] || 'Some error occurred'
  dispatch(notificationActions.setNotificationData({ error, status: 'failed' }))
}
