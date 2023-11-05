import { authActions } from '../../../slice/auth.slice'
import { LoginDataForm } from '../../../types/AuthSchema'

import { AppThunk } from 'app/providers/store'
import { handleServerError, handleNetworkError, notificationActions } from 'entities/notification'
import { ResultCodes } from 'shared/api/types/todolist'

export const loginUser =
  (loginDataForm: LoginDataForm): AppThunk =>
  async (dispatch, _, extra) => {
    const { authAPI } = extra
    dispatch(notificationActions.setStatus('loading'))
    try {
      const response = await authAPI.loginUser(loginDataForm)
      if (response.data.resultCode === ResultCodes.Success) {
        //dispatch(authActions.setUserData({ userId: response.data.data.userId, email: loginDataForm.email }))
        dispatch(notificationActions.setStatus('succeed'))
      } else {
        handleServerError(response.data, dispatch)
      }
    } catch (e: any) {
      handleNetworkError(e.message, dispatch)
    }
  }
