import { SetStatus, SetError } from '../actions/notification.actions'

export type NotificationAT = SetStatusAT | SetErrorAT

type SetStatusAT = ReturnType<typeof SetStatus>
type SetErrorAT = ReturnType<typeof SetError>
