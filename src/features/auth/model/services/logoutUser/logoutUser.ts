import { AppThunk } from 'app/providers/store'
import { ResultCodes } from 'shared/api/types/todolist'
import { SetUserData } from '../../actions/auth.actions'
import { SetStatus, handleServerError, handleNetworkError } from 'entities/notification'
import { ClearState } from 'entities/todolist'

export const logoutUser = (): AppThunk => async (dispatch, _, extra) => {
  const { authAPI } = extra
  dispatch(SetStatus('loading'))
  try {
    const response = await authAPI.logoutUser()
    if (response.data.resultCode === ResultCodes.Success) {
      dispatch(ClearState())
      dispatch(SetUserData(null))
      dispatch(SetStatus('succeed'))
    } else {
      handleServerError(response.data, dispatch)
    }
  } catch (e: any) {
    handleNetworkError(e.message, dispatch)
  }
}
