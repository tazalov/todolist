import { authReducer, authActions } from './auth.slice'

import { initUser } from '../services/initUser/initUser'
import { AuthSchema } from '../types/AuthSchema'

// TODO если вспомнишь, сделай тесты на все остальные экшены, которые из санок возвращаются
describe('auth reducer', () => {
  let initialState: AuthSchema
  beforeEach(() => {
    initialState = {
      data: null,
      _inited: false,
    }
  })

  it('correct captcha should be set', () => {
    const captcha = 'some url with captcha img'

    const action = authActions.setCaptcha(captcha)
    const newState = authReducer(initialState, action)

    expect(newState.captcha).toBe(captcha)
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
