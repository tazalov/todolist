import { authReducer, authActions } from './auth.slice'

import { AuthSchema } from '../types/AuthSchema'

describe('auth reducer', () => {
  let initialState: AuthSchema
  beforeEach(() => {
    initialState = {
      data: null,
      captcha: null,
      _inited: false,
    }
  })

  it('correct user data should be set', () => {
    const userData = {
      email: 'email',
      login: 'login',
      userId: 1,
    }

    const action = authActions.setUserData(userData)
    const newState = authReducer(initialState, action)

    expect(newState.data).toEqual(userData)
  })

  it('correct captcha should be set', () => {
    const captcha = 'some url with captcha img'

    const action = authActions.setCaptcha(captcha)
    const newState = authReducer(initialState, action)

    expect(newState.captcha).toBe(captcha)
  })

  it('correct _inited value should be set', () => {
    const action = authActions.setInited(true)
    const newState = authReducer(initialState, action)

    expect(newState._inited).toBeTruthy()
  })
})
