import { SetError, SetStatus } from '../model/actions/notification.actions'

import { AppDispatch } from 'app/providers/store'

export const handleNetworkError = (message: string, dispatch: AppDispatch) => {
  dispatch(SetError(message || 'Some error occurred'))
  dispatch(SetStatus('failed'))
}
