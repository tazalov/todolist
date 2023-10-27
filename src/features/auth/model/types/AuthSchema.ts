export type UserData = {
  userId?: number
  email?: string
  login?: string
}

export type LoginDataForm = {
  email: string
  password: string
  rememberMe: boolean
  captcha?: string
}

export interface AuthSchema {
  data: UserData | null
  captcha: string | null

  //* инициализируем юзера через auth/me, а потом меняем флаг на true
  _inited: false
}
