import { SetError, SetStatus } from '../actions/notification.actions'
import { notificationReducer } from './notification.reducer'
import { NotificationSchema } from '../types/NotificationSchema'

describe('notification reducer', () => {
  let initialState: NotificationSchema
  beforeEach(() => {
    initialState = {
      status: 'idle',
      error: null,
    }
  })

  it('correct error should be set', () => {
    const action1 = SetError('some error')
    const newState1 = notificationReducer(initialState, action1)

    expect(newState1.error).toBe('some error')
    expect(newState1.status).toBe('idle')

    const action2 = SetError(null)
    const newState2 = notificationReducer(newState1, action2)

    expect(newState2.error).toBe(null)
    expect(newState2.status).toBe('idle')
  })

  it('correct status should be set', () => {
    const action1 = SetStatus('loading')
    const newState1 = notificationReducer(initialState, action1)

    expect(newState1.error).toBe(null)
    expect(newState1.status).toBe('loading')

    const action2 = SetStatus('succeed')
    const newState2 = notificationReducer(newState1, action2)

    expect(newState2.error).toBe(null)
    expect(newState2.status).toBe('succeed')
  })
})
