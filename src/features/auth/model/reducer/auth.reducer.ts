import { AuthSchema } from '../types/AuthSchema'
import { AuthAT } from '../types/AuthActions'

const initialState: AuthSchema = {
  data: null,
  captcha: null,
  _inited: false,
}

export const authReducer = (state = initialState, action: AuthAT): AuthSchema => {
  switch (action.type) {
    case 'todolist/auth/setUserData': {
      const { data } = action.payload
      return { ...state, data: data }
    }
    case 'todolist/auth/setCaptcha': {
      const { captcha } = action.payload
      return { ...state, captcha }
    }
    case 'todolist/auth/setInited': {
      const { inited } = action.payload
      return { ...state, _inited: inited }
    }
    default: {
      return state
    }
  }
}
