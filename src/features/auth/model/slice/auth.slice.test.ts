import { authReducer, authActions } from './auth.slice'

import { initUser } from '../services/initUser/initUser'
import { AuthSchema } from '../types/AuthSchema'

describe('auth reducer', () => {
  let initialState: AuthSchema
  beforeEach(() => {
    initialState = {
      data: null,
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

  it('correct state should be set (initUser.pending)', () => {
    const newState = authReducer(initialState, initUser.pending)

    expect(newState._inited).toBeFalsy()
    expect(newState.data).toBe(null)
    expect(newState.error).not.toBeDefined()
  })

  it('correct state should be set (initUser.fulfilled)', () => {
    const userDataFromServer = { userId: 1, email: 'email', login: 'login' }

    const newState = authReducer(initialState, initUser.fulfilled(userDataFromServer, ''))

    expect(newState._inited).toBeTruthy()
    expect(newState.data).toEqual(userDataFromServer)
    expect(newState.error).not.toBeDefined()
  })

  it('correct state should be set (initUser.rejected)', () => {
    const newState = authReducer(initialState, initUser.rejected)

    expect(newState._inited).toBeTruthy()
    expect(newState.data).toBe(null)
  })
})
