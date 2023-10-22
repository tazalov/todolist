import { NotificationSchema } from '../types/NotificationSchema'
import { NotificationAT } from '../types/NotificationActions'

export const notificationInitialState: NotificationSchema = {
  status: 'idle',
  error: null,
}

export const notificationReducer = (
  state = notificationInitialState,
  action: NotificationAT,
): NotificationSchema => {
  switch (action.type) {
    case 'todolist/notification/status/set': {
      const { status } = action.payload
      return {
        ...state,
        status,
      }
    }
    case 'todolist/notification/error/set': {
      const { error } = action.payload
      return {
        ...state,
        error,
      }
    }
    default: {
      return state
    }
  }
}
