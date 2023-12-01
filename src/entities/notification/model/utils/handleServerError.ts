import { notificationActions } from '../slice/notification.slice'

import { AppDispatch } from 'app/providers/store'
import { BaseResponse } from 'shared/api/types/todolist'

/**
 * @param data - response from server
 * @param dispatch - redux dispatch
 * @param showError - flag for show notification with error (optional)
 */

export const handleServerError = <D>(data: BaseResponse<D>, dispatch: AppDispatch, showError = true) => {
  if (showError) {
    dispatch(
      notificationActions.setNotificationData({ error: data.messages[0] || 'Some error occurred', status: 'failed' }),
    )
  }
}
