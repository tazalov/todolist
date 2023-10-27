import { todolist } from 'shared/api/config/todolist'
import { LoginDataForm } from '../model/types/AuthSchema'
import { BaseResponseT } from 'shared/api/types/todolist'

export const authAPI = {
  loginUser(userData: LoginDataForm) {
    return todolist.post<BaseResponseT<{ userId: number }>>('auth/login', userData)
  },
  authMe() {},
}

export type AuthAPI = typeof authAPI
