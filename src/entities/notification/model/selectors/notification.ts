import { StateSchema } from 'app/providers/store'

export const getNotificationError = (state: StateSchema) => state.notification.error

export const getNotificationSuccess = (state: StateSchema) => state.notification.success

export const getNotificationStatus = (state: StateSchema) => state.notification.status
