import { StateSchema } from 'app/providers/store'

export const error = (state: StateSchema) => state.notification.error

export const success = (state: StateSchema) => state.notification.success

export const status = (state: StateSchema) => state.notification.status
