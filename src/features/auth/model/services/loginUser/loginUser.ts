import { SetUserData } from '../../actions/auth.actions'
import { LoginDataForm } from '../../types/AuthSchema'

import { AppThunk } from 'app/providers/store'
import { handleServerError, handleNetworkError, SetStatus } from 'entities/notification'
import { ResultCodes } from 'shared/api/types/todolist'

export const loginUser =
  (loginDataForm: LoginDataForm): AppThunk =>
  async (dispatch, _, extra) => {
    const { authAPI } = extra
    dispatch(SetStatus('loading'))
    try {
      const response = await authAPI.loginUser(loginDataForm)
      if (response.data.resultCode === ResultCodes.Success) {
        dispatch(SetUserData({ userId: response.data.data.userId, email: loginDataForm.email }))
        dispatch(SetStatus('succeed'))
      } else {
        handleServerError(response.data, dispatch)
      }
    } catch (e: any) {
      handleNetworkError(e.message, dispatch)
    }
  }
