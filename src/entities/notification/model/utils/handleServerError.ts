import { notificationActions } from '../slice/notification.slice'

import { AppDispatch } from 'app/providers/store'
import { BaseResponseT } from 'shared/api/types/todolist'

export const handleServerError = (data: BaseResponseT, dispatch: AppDispatch) => {
  if (data.messages.length) {
    dispatch(notificationActions.setError(data.messages[0]))
  } else {
    dispatch(notificationActions.setError('Some error occurred'))
  }
  dispatch(notificationActions.setStatus('failed'))
}
