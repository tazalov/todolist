import { SetError, SetStatus } from '../model/actions/notification.actions'

import { AppDispatch } from 'app/providers/store'
import { BaseResponseT } from 'shared/api/types/todolist'

export const handleServerError = (data: BaseResponseT, dispatch: AppDispatch) => {
  if (data.messages.length) {
    dispatch(SetError(data.messages[0]))
  } else {
    dispatch(SetError('Some error occurred'))
  }
  dispatch(SetStatus('failed'))
}
