import { AppThunk } from 'app/providers/store'
import { ResultCodes } from 'shared/api/types/todolist'
import { SetUserData, SetInited } from '../../actions/auth.actions'

export const initUser = (): AppThunk => async (dispatch, _, extra) => {
  const { authAPI } = extra
  try {
    const response = await authAPI.authMe()

    if (response.data.resultCode === ResultCodes.Success) {
      dispatch(SetUserData(response.data.data))
    }
    dispatch(SetInited(true))
  } catch (e) {
    console.log(e)
  }
}
