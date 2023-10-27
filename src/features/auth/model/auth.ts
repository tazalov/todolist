import { StateSchema } from 'app/providers/store'
import { UserData } from './types/AuthSchema'

export const getUserData = (state: StateSchema): UserData | null => state.auth.data
