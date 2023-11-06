import { authActions } from '../../slice/auth.slice'

import { AppThunk, clearCurrentState } from 'app/providers/store'
import { notificationActions, handleServerError, handleNetworkError } from 'entities/notification'
import { ResultCodes } from 'shared/api/types/todolist'

export const logoutUser = (): AppThunk => async (dispatch, _, extra) => {
  const { authAPI } = extra
  dispatch(notificationActions.setStatus('loading'))
  try {
    const response = await authAPI.logoutUser()
    if (response.data.resultCode === ResultCodes.Success) {
      dispatch(clearCurrentState())
      dispatch(authActions.setUserData(null))
      dispatch(notificationActions.setStatus('succeed'))
    } else {
      handleServerError(response.data, dispatch)
    }
  } catch (e: any) {
    handleNetworkError(e.message, dispatch)
  }
}
