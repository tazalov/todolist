import { UserData } from '../types/AuthSchema'

export const SetUserData = (data: UserData) =>
  ({
    type: 'todolist/auth/setUserData',
    payload: { data },
  }) as const

export const SetCaptcha = (captcha: string) =>
  ({
    type: 'todolist/auth/setCaptcha',
    payload: { captcha },
  }) as const

export const SetInited = (inited: boolean) =>
  ({
    type: 'todolist/auth/setInited',
    payload: { inited },
  }) as const
