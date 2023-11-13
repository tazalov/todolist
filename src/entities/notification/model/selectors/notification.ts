import { StateSchema } from 'app/providers/store'

const error = (state: StateSchema) => state.notification.error

const success = (state: StateSchema) => state.notification.success

const status = (state: StateSchema) => state.notification.status

export const notificationSelectors = {
  error,
  success,
  status,
}
