import { initUser } from './initUser'

import { notificationActions } from 'entities/notification'
import { TestAsyncThunk } from 'shared/lib/tests/TestAsyncThunk'

describe('initUser async thunk', () => {
  it('set of actions for a successful request with resultCode - 0 is correct', async () => {
    //* Создаем инстанс для тестирования
    const thunk = new TestAsyncThunk(initUser)

    const userData = {
      userId: 1,
      email: 'email',
      login: 'login',
    }

    //* Мокаем результат запроса
    thunk.authAPI.authMe.mockReturnValue(
      Promise.resolve({
        data: {
          data: userData,
          resultCode: 0,
        },
      }),
    )

    //* Вызываем санку (если нужно, то передаем в callThunk данные, с которым должна вызваться санка)
    const result = await thunk.callThunk()

    expect(thunk.authAPI.authMe).toHaveBeenCalled()
    expect(result.meta.requestStatus).toBe('fulfilled')
    expect(result.payload).toEqual(userData)
  })

  it('set of actions for a successful request with resultCode - 1 is correct', async () => {
    //* Создаем инстанс для тестирования
    const thunk = new TestAsyncThunk(initUser)

    //* Мокаем результат запроса
    thunk.authAPI.authMe.mockReturnValue(
      Promise.resolve({
        data: {
          data: {},
          messages: ['you are not authorized'],
          resultCode: 1,
        },
      }),
    )

    //* Вызываем санку (если нужно, то передаем в callThunk данные, с которым должна вызваться санка)
    const result = await thunk.callThunk()

    expect(thunk.authAPI.authMe).toHaveBeenCalled()
    expect(thunk.dispatch).toHaveBeenCalledTimes(3) // initUser.pending, initUser.fulfilled, notificationActions.setNotificationData
    expect(thunk.dispatch).toHaveBeenCalledWith(
      notificationActions.setNotificationData({ error: 'you are not authorized', status: 'failed' }),
    )
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
