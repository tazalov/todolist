import { authActions } from '../../../slice/auth.slice'

import { AppThunk } from 'app/providers/store'
import { ResultCodes } from 'shared/api/types/todolist'

export const initUser = (): AppThunk => async (dispatch, _, extra) => {
  const { authAPI } = extra
  try {
    const response = await authAPI.authMe()

    if (response.data.resultCode === ResultCodes.Success) {
      //dispatch(authActions.setUserData(response.data.data))
    }
    //dispatch(authActions.setInited(true))
  } catch (e) {
    console.log(e)
  }
}
