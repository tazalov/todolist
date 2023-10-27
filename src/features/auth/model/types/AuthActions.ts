import { SetUserData, SetCaptcha, SetInited } from '../actions/auth.actions'

export type AuthAT = SetUserDataAT | SetCaptchaAT | SetInitedAT

type SetUserDataAT = ReturnType<typeof SetUserData>
type SetCaptchaAT = ReturnType<typeof SetCaptcha>
type SetInitedAT = ReturnType<typeof SetInited>
