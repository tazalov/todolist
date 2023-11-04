import { notificationReducer, notificationActions } from './notification.slice'

import { NotificationSchema } from '../types/NotificationSchema'

describe('notification reducer', () => {
  let initialState: NotificationSchema
  beforeEach(() => {
    initialState = {
      status: 'idle',
    }
  })

  it('correct error should be set', () => {
    const action1 = notificationActions.setError('some error')
    const newState1 = notificationReducer(initialState, action1)

    expect(newState1.error).toBe('some error')
    expect(newState1.status).toBe('idle')

    const action2 = notificationActions.setError(undefined)
    const newState2 = notificationReducer(newState1, action2)

    expect(newState2.error).not.toBeDefined()
    expect(newState2.status).toBe('idle')
  })

  it('correct status should be set', () => {
    const action1 = notificationActions.setStatus('loading')
    const newState1 = notificationReducer(initialState, action1)

    expect(newState1.error).not.toBeDefined()
    expect(newState1.status).toBe('loading')

    const action2 = notificationActions.setStatus('succeed')
    const newState2 = notificationReducer(newState1, action2)

    expect(newState2.error).not.toBeDefined()
    expect(newState2.status).toBe('succeed')
  })

  it('correct notification data with error message should be set', () => {
    const action1 = notificationActions.setNotificationData({ error: 'some error', status: 'failed' })
    const newState1 = notificationReducer(initialState, action1)

    expect(newState1.success).not.toBeDefined()
    expect(newState1.error).toBe('some error')
    expect(newState1.status).toBe('failed')
  })

  it('correct notification data with success message should be set', () => {
    const action1 = notificationActions.setNotificationData({ success: 'some success', status: 'succeed' })
    const newState1 = notificationReducer(initialState, action1)

    expect(newState1.error).not.toBeDefined()
    expect(newState1.success).toBe('some success')
    expect(newState1.status).toBe('succeed')
  })
})
