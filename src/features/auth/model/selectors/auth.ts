import { UserData } from '../types/AuthSchema'

import { StateSchema } from 'app/providers/store'

export const getUserData = (state: StateSchema): UserData | null => state.auth.data

export const getInited = (state: StateSchema): boolean => state.auth._inited
