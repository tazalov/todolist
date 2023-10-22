import { StateSchema } from 'app/providers/store'

export const getError = (state: StateSchema) => state.notification.error

export const getStatus = (state: StateSchema) => state.notification.status
