import { LoginDataForm, UserData } from '../model/types/AuthSchema'

import { todolist } from 'shared/api/config/todolist'
import { BaseResponseT } from 'shared/api/types/todolist'

export const authAPI = {
  loginUser(userData: LoginDataForm) {
    return todolist.post<BaseResponseT<{ userId: number }>>('auth/login', userData)
  },
  logoutUser() {
    return todolist.delete<BaseResponseT>('auth/login')
  },
  authMe() {
    return todolist.get<BaseResponseT<UserData>>('auth/me')
  },
}

export type AuthAPI = typeof authAPI
