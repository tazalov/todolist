import { initUser } from './initUser'

import { TestAsyncThunk } from 'shared/lib/tests/TestAsyncThunk'

describe('initUser async thunk', () => {
  it('set of actions for a successful request with resultCode - 0 is correct', async () => {
    const thunk = new TestAsyncThunk(initUser)

    const userData = {
      userId: 1,
      email: 'email',
      login: 'login',
    }

    thunk.authAPI.authMe.mockReturnValue(
      Promise.resolve({
        data: {
          data: userData,
          resultCode: 0,
        },
      }),
    )

    const result = await thunk.callThunk()

    expect(thunk.authAPI.authMe).toHaveBeenCalled()
    expect(result.meta.requestStatus).toBe('fulfilled')
    expect(result.payload).toEqual(userData)
  })

  it('set of actions for a successful request with resultCode - 1 is correct', async () => {
    const thunk = new TestAsyncThunk(initUser)

    thunk.authAPI.authMe.mockReturnValue(
      Promise.resolve({
        data: {
          data: {},
          messages: ['you are not authorized'],
          resultCode: 1,
        },
      }),
    )

    const result = await thunk.callThunk()

    expect(thunk.authAPI.authMe).toHaveBeenCalled()
    expect(thunk.dispatch).toHaveBeenCalledTimes(2) // initUser.pending, initUser.fulfilled, notificationActions.setNotificationData
    expect(result.meta.requestStatus).toBe('fulfilled')
    expect(result.payload).toBe(null)
  })

  it('set of actions for a erroneous request is correct', async () => {
    const thunk = new TestAsyncThunk(initUser)
    thunk.authAPI.authMe.mockReturnValue(Promise.reject(''))

    const result = await thunk.callThunk()

    expect(thunk.authAPI.authMe).toHaveBeenCalled()
    expect(result.meta.requestStatus).toBe('rejected')
    expect(result.payload).toBe('Some error occurred!')
  })
})
