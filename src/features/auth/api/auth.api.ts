import { LoginDataForm, UserData } from '../model/types/AuthSchema'

import { todolist } from 'shared/api/config/todolist'
import { BaseResponse } from 'shared/api/types/todolist'

export const authAPI = {
  loginUser(userData: LoginDataForm) {
    return todolist.post<BaseResponse<{ userId: number }>>('auth/login', userData)
  },
  logoutUser() {
    return todolist.delete<BaseResponse>('auth/login')
  },
  authMe() {
    return todolist.get<BaseResponse<UserData>>('auth/me')
  },
}

export type AuthAPI = typeof authAPI
