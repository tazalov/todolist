import { AppDispatch } from 'app/providers/store'
import { SetError, SetStatus } from '../model/actions/notification.actions'

export const handleNetworkError = (message: string, dispatch: AppDispatch) => {
  dispatch(SetError(message || 'Some error occurred'))
  dispatch(SetStatus('failed'))
}
