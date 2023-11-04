import { StateSchema } from 'app/providers/store'

export const getUserData = (state: StateSchema) => state.auth.data ?? null

export const getInited = (state: StateSchema) => state.auth._inited

export const getAuthError = (state: StateSchema) => state.auth.error
